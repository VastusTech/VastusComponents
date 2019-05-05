import QL from "../../api/GraphQL";
import S3 from "../../api/S3Storage";
import {setError, setIsLoading, setIsNotLoading} from "./infoActions";
import {addHandlerAndUnsubscription} from "./ablyActions";
import {err, log} from "../../../Constants";
import {getBoardChannel, CLEAR_ALL_BOARDS, SET_BOARD_READ, CLEAR_BOARD, ADD_QUERY, ADD_MESSAGE} from "../reducers/messageReducer";
const notFoundPicture = require('../../img/not_found.png');
const defaultProfilePicture = require("../../img/roundProfile.png");

// =========================================================================================================
// ~ High-Level Message Actions
// =========================================================================================================

/**
 * Fetches the first message in a board. Primarily used for previews of boards.
 *
 * @param {string} board The name of the board to get the first message of.
 * @param {function({})} dataHandler The function to handle the fetched first message.
 * @param {function(error)} failureHandler The function to handle any errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function peekAtFirstMessageFromBoard(board, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        if (getStore().message.boards[board] && getStore().message.boards[board].length > 0) {
            if (dataHandler) { dataHandler(getStore().message.boards[board][0]); }
            dispatch(setIsNotLoading());
        }
        else {
            // Fetch it
            dispatch(queryNextMessagesFromBoardOptionalSubscribe(board, 1, false, (messages) => {
                if (dataHandler) {
                    if (messages && messages.length > 0) { dataHandler(messages[0]); }
                    else { dataHandler(null); }
                }
            }, failureHandler));
        }
    }
}

/**
 * Fetches another batch of messages from a board. For actually looking at the messages in the board viewer.
 *
 * @param {string} board The board to receive the messages for.
 * @param {number} limit The number of messages to receive from the query.
 * @param {function([{}])} dataHandler The function to handle the number of messages received.
 * @param {function(error)} failureHandler The function to handle any errors that may occur.
 * @return {function(function(*))} The given function to dispatch a new action in the redux system.
 */
export function queryNextMessagesFromBoard(board, limit, dataHandler, failureHandler) {
    return (dispatch) => {
        dispatch(setIsLoading());
        dispatch(queryNextMessagesFromBoardOptionalSubscribe(board, limit, true, dataHandler, failureHandler));
    }
}

/**
 * Queries the next messages from the board, potentially also subscribing to the board's updates.
 *
 * @param {string} board The board to query the next messages from.
 * @param {number} limit The limit of messages to receive from the query.
 * @param {boolean} ifSubscribe If the query should also subscribe to the board.
 * @param {function([{}])} dataHandler The function to handle the fetched messages.
 * @param {function(error)} failureHandler The function to handle any errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
function queryNextMessagesFromBoardOptionalSubscribe(board, limit, ifSubscribe, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        let ifFirst = getStore().message.boardIfFirsts[board];
        if (ifFirst !== false) {
            ifFirst = true;
        }
        // If this is the first time querying the board, Ably subscribe to it.
        if (ifSubscribe && getStore().message.boardIfSubscribed[board] !== true) {
            dispatch(addHandlerAndUnsubscription(getBoardChannel(board), (message) => {
                dispatch(addMessageFromNotification(board, message.data));
            }, (state) => {
                // When it unsubscribes, we clear the board
                clearBoard(board, dispatch);
            }));
        }
        let nextToken = getStore().message.boardNextTokens[board];
        // console.log("IF FIRST = " + ifFirst + ", NEXT TOKEN = " + nextToken);
        if (ifFirst || nextToken) {
            // Then you do the query
            QL.queryMessages(QL.constructMessageQuery(board, ["from", "name", "profileImagePath", "message", "type", "board", "id", "time_created", "lastSeenFor"], null, limit, nextToken), (data) => {
                if (data) {
                    // console.log(JSON.stringify(data));
                    if (!data.items) { data.items = []; }
                    addURLToMessages(data.items, "message", "messageURL", notFoundPicture, (message) => {return message.type}, (messages) => {
                        addURLToMessages(messages, "profileImagePath", "profilePicture", defaultProfilePicture, (message) => {return message.profileImagePath}, (messages) => {
                            dispatch(addQueryToBoard(board, messages, data.nextToken, ifSubscribe, dispatch));
                            if (dataHandler) {
                                dataHandler(messages);
                            }
                            dispatch(setIsNotLoading());
                        });
                    });
                }
                else {
                    const error = new Error("query messages came back with null?");
                    err&&console.error(JSON.stringify(error));
                    dispatch(setError(error));
                    dispatch(setIsNotLoading());
                    if (failureHandler) { failureHandler(error); }
                }
            }, (error) => {
                err&&console.error("ERROR INSIDE GET NEXT MESSAGES");
                err&&console.error(JSON.stringify(error));
                dispatch(setError(error));
                dispatch(setIsNotLoading());
                if (failureHandler) { failureHandler(error); }
            });
        }
        else {
            if (dataHandler) { dataHandler(null); }
        }
    };
}

/**
 * This function takes in a list of messages and fetches all of their image attributes from AWS S3.
 *
 * @param {[{}]} messages The list of messages to fetch the image attribute of.
 * @param {string} messagePathField The field in the Message object that contains the S3 path for the image.
 * @param {string} messageURLField The field in the Message object to put the URL in.
 * @param {string} defaultURL The default URL to put into the URL field (if fails or not applicable).
 * @param {function({})} fetchChecker {boolean} The checker that takes in a Message object and returns a boolean for
 * if the message should be fetched
 * @param {function([{}])} dataHandler The handler that returns the updated messages.
 */
function addURLToMessages(messages, messagePathField, messageURLField, defaultURL, fetchChecker, dataHandler) {
    const messagesLength = messages.length;
    let messagesReturned = 0;
    const returnMessage = () => {
        messagesReturned++;
        if (messagesReturned >= messagesLength) {
            dataHandler(messages);
        }
    };
    for (let i = 0; i < messagesLength; i++) {
        const message = messages[i];
        addURLToMessage(message, messagePathField, messageURLField, defaultURL, fetchChecker, returnMessage);
    }
    if (messagesLength === 0) {
        dataHandler(messages);
    }
}

/**
 * Adds S3 data to the message based on the fields given.
 *
 * @param {{}} message The message object to update.
 * @param {string} messagePathField The field in the Message object that contains the S3 path for the image.
 * @param {string} messageURLField The field in the Message object to put the URL in.
 * @param {string} defaultURL The default URL to put into the URL field (if fails or not applicable).
 * @param {function({message: string})} fetchChecker {boolean} The checker that takes in a Message object and returns a boolean for
 * if the message should be fetched
 * @param {function({})} dataHandler The handler that returns the updated message.
 */
function addURLToMessage(message, messagePathField, messageURLField, defaultURL, fetchChecker, dataHandler) {
    if (fetchChecker(message)) {
        S3.get(message[messagePathField], (url) => {
            message[messageURLField] = url;
            dataHandler(message);
        }, (error) => {
            err&&console.error("FAILED TO RECEIVE URL FOR MEDIA IN MESSAGE! ERROR = " + JSON.stringify(error));
            message[messageURLField] = defaultURL;
            dataHandler(message);
        });
    }
    else {
        message[messageURLField] = defaultURL;
        dataHandler(message);
    }
}

/**
 * Adds a message to its board from an Ably notification that comes in.
 *
 * @param {string} board The board to update with the newly received message.
 * @param {{message: string}} message The message received from the Ably notification.
 * @param {function({})} dataHandler The function to handle the successfully placed message.
 * @param {function(error)} failureHandler The function to handle any errors that may occur.
 * @return {function(function(*))} The given function to dispatch a new action in the redux system.
 */
export function addMessageFromNotification(board, message, dataHandler, failureHandler) {
    return (dispatch) => {
        dispatch(setIsLoading());
        addURLToMessage(message, "message", "messageURL", notFoundPicture, (message) => {return message.type}, (message) => {
            addURLToMessage(message, "profileImagePath", "profilePicture", defaultProfilePicture, (message) => {return message.profileImagePath}, (message) => {
                dispatch(addMessageToBoard(board, message));
                log && console.log("Successfully received message from Ably! Message = " + JSON.stringify(message));
                if (dataHandler) {
                    dataHandler(message);
                }
                dispatch(setIsNotLoading());
            }, (error) => {
                message.message = "";
                err && console.error("Error getting media for message from notification! Error = " + JSON.stringify(error));
                dispatch(addMessageToBoard(board, message));
                if (failureHandler) {
                    failureHandler(error);
                }
                dispatch(setError(error));
                dispatch(setIsNotLoading());
            });
        });
    };
}

// =========================================================================================================
// ~ Low-Level Message Actions
// =========================================================================================================

export function setBoardRead(board, userID) {
    return {
        type: SET_BOARD_READ,
        payload: {
            board,
            userID
        }
    }
}
export function discardBoard(board) {
    return (dispatch) => {
        dispatch(setIsLoading());
        dispatch(clearBoard(board));
        dispatch(setIsNotLoading());
    };
}
export function addMessageToBoard(board, message) {
    return {
        type: ADD_MESSAGE,
            payload: {
                board,
                message,
        }
    };
}
function addQueryToBoard(board, messages, nextToken, ifSubscribed) {
    return {
        type: ADD_QUERY,
        payload: {
            board,
            nextToken,
            messages,
            ifSubscribed,
        }
    };
}
function clearBoard(board) {
    return {
        type: CLEAR_BOARD,
        payload: {
            board
        }
    }
}
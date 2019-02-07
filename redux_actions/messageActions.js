import QL from "../api/GraphQL";
import S3 from "../api/S3Storage";
import {setError, setIsLoading, setIsNotLoading} from "./infoActions";
import {removeChannel, setHandlerAndUnsubscription} from "./ablyActions";
import {err, log} from "../../Constants";

const notFoundPicture = require('../img/not_found.png');
const defaultProfilePicture = require("../img/roundProfile.png");

const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_QUERY = 'ADD_QUERY';
const CLEAR_BOARD = 'CLEAR_BOARD';

/**
 * Get the Ably Channel name for the given board.
 *
 * @param board The board to get the Ably channel of.
 * @returns {string} The channel name.
 */
function getBoardChannel(board) {
    return board + "-Board";
}
export function queryNextMessagesFromBoard(board, limit, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        let ifFirst = getStore().message.boardIfFirsts[board];
        if (ifFirst !== false) {
            ifFirst = true;
            // If this is the first time querying the board, Ably subscribe to it.
            alert("Setting handler stuff!");
            dispatch(setHandlerAndUnsubscription(getBoardChannel(board), (message) => {
                dispatch(addMessageFromNotification(board, message.data));
            }, () => {
                // When it unsubscribes, we clear the board
                clearBoard(board);
            }));
        }
        let nextToken = getStore().message.boardNextTokens[board];
        // console.log("IF FIRST = " + ifFirst + ", NEXT TOKEN = " + nextToken);
        if (ifFirst || nextToken) {
            // Then you do the query
            QL.queryMessages(QL.constructMessageQuery(board, ["from", "name", "profileImagePath", "message", "type", "board", "id", "time_created"], null, limit, nextToken), (data) => {
                if (data) {
                    // console.log(JSON.stringify(data));
                    if (!data.items) { data.items = []; }
                    addURLToMessages(data.items, "message", "messageURL", notFoundPicture, (message) => {return message.type}, (messages) => {
                        addURLToMessages(messages, "profileImagePath", "profilePicture", defaultProfilePicture, (message) => {return message.profileImagePath}, (messages) => {
                            dispatch(addQueryToBoard(board, messages, data.nextToken));
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
 * @param messages The list of messages to fetch the image attribute of.
 * @param messagePathField The field in the Message object that contains the S3 path for the image.
 * @param messageURLField The field in the Message object to put the URL in.
 * @param defaultURL The default URL to put into the URL field (if fails or not applicable).
 * @param fetchChecker The checker that takes in a Message object and returns a boolean for if the message
 * should be fetched
 * @param dataHandler The handler at the end of the function that returns the newly fetched messages array.
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
function addMessageFromNotification(board, message, dataHandler, failureHandler) {
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
export function discardBoard(board) {
    return (dispatch) => {
        dispatch(setIsLoading());
        dispatch(removeChannel(getBoardChannel(board)));
        dispatch(setIsNotLoading());
    };
}
export function addMessageToBoard(board, message) {
    return {
        type: ADD_MESSAGE,
            payload: {
            board,
                message
        }
    };
}
function addQueryToBoard(board, items, nextToken) {
    return {
        type: ADD_QUERY,
        payload: {
            board,
            nextToken,
            items,
        }
    };
}
export function clearBoard(board) {
    return {
        type: CLEAR_BOARD,
        payload: board
    }
}
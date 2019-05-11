import React, {useState, useEffect} from 'react';
import {Header, Grid} from "semantic-ui-react";
import {connect} from "react-redux";
import Spinner from "../../components/props/Spinner";
import MessageBoardCard from "./MessageBoardCard";
import {fetchUserAttributes} from "../../redux/actions/userActions";
import {err, log} from "../../../Constants";
import {getObjectAttribute} from "../../logic/CacheRetrievalHelper";
import {fetchItem} from "../../redux/actions/cacheActions";
import {getItemTypeFromID} from "../../logic/ItemType";
import {queryNextMessagesFromBoard, setBoardRead} from "../../redux/actions/messageActions";
import MessageFunctions from "../../database_functions/MessageFunctions";
import {getIDsFromMessageBoard, ifMessageUnreadFor} from "../../logic/MessageHelper";
import {debugAlert} from "../../logic/DebuggingHelper";

/**
 * Sets the board to seen once the card is clicked.
 *
 * @param {string} userID The ID of the User viewing the message board feed.
 * @param {string} board The name of the board to set the unread status for.
 * @param {{}} cacheBoards The cache of boards in the app.
 * @param {function(string, string)} setBoardRead Message function for updating the read status of a board.
 */
const clickCard = (userID, board, cacheBoards, setBoardRead) => {
    debugAlert("Reading boardID = " + board);
    if (unreadFor(userID, board, cacheBoards)) {
        debugAlert("Actually Reading boardID = " + board);
        //alert("SENDING LAMBDA FOR UNREAD");
        MessageFunctions.addLastSeen(userID, board, cacheBoards[board][0].id, userID, () => {
            setBoardRead(board, userID);
            log&&console.log("Updated message board read status successfully!");
        }, (error) => {
            err&&console.error("Could not update read status for message board!");
            err&&console.error(error);
        });
    }
};

/**
 * Gets the last message of the board.
 *
 * @param {string} board The name of the board to set the unread status for.
 * @param {{}} cacheBoards The cache of boards in the app.
 * @return {{}} The message last sent to the board.
 */
const lastMessage = (board, cacheBoards) => {
    const messages = cacheBoards[board];
    if (messages && messages.length > 0) {
        return messages[0].message;
    }
    return "";
};

/**
 * Gets the title for the board.
 *
 * @param {string} userID The ID of the User viewing the message board feed.
 * @param {string} board The name of the board to set the unread status for.
 * @param {{}} cache The cache of all objects stored in the app.
 * @return {string} The title for the board.
 */
const boardTitle = (userID, board, cache) => {
    const ids = getIDsFromMessageBoard(board);
    if (ids.length === 1) {
        // challenge / event / group ? Will these be here? Actually totally yes!
    }
    else if (ids.length === 2) {
        // other user(s)
        // single chat
        for (const key in ids) {
            if (ids.hasOwnProperty(key) && userID !== ids[key]) {
                return getObjectAttribute(ids[key], "name", cache);
            }
        }
    }
    else {
        // Multi-group chat
    }
    return "";
};

/**
 * Get
 *
 * @param {string} userID The ID of the User viewing the message board feed.
 * @param {string} board The name of the board to set the unread status for.
 * @param {{}} cache The cache of all objects stored in the app.
 * @return {*} The profile picture for the board.
 */
const boardProfilePicture = (userID, board, cache) => {
    const ids = getIDsFromMessageBoard(board);
    if (ids.length === 1) {
        // challenge / event / group ? Will these be here? Actually totally yes!
    }
    else if (ids.length === 2) {
        // other user(s)
        // single chat
        for (const key in ids) {
            if (ids.hasOwnProperty(key) && userID !== ids[key]) {
                return getObjectAttribute(ids[key], "profileImage", cache);
            }
        }
    }
    else {
        // Multi-group chat
    }
    return "";
};

/**
 * Calculates whether the board has been read by the given user or not.
 *
 * @param {string} userID The ID of the User viewing the message board feed.
 * @param {string} board The name of the board to set the unread status for.
 * @param {{}} cacheBoards The cache of boards in the app.
 * @return {boolean} If the board has not been read yet.
 */
const unreadFor = (userID, board, cacheBoards) => {
    if (board && cacheBoards[board] && cacheBoards[board].length > 0) {
        return ifMessageUnreadFor(userID, cacheBoards[board][0]);
    }
    return false;
};

/**
 * Gets the message board cards for the boards that the User currently has.
 *
 * @param {string} userID The ID of the User viewing the message board feed.
 * @param {[string]} messageBoardIDs The message board IDs for the User.
 * @param {{}} cache The cache of all objects stored in the app.
 * @param {{}} cacheBoards The cache of boards in the app.
 * @param {function(string, string)} setBoardRead Message function for updating the read status of a board.
 * @return {*} The React JSX to display the message board cards.
 */
const messageBoardCards = (userID, messageBoardIDs, cache, cacheBoards, setBoardRead) => {
    const cards = [];
    for (let i = 0; i < messageBoardIDs.length; i++) {
        const board = messageBoardIDs[i];
        cards.push(
            <MessageBoardCard
                messageBoardProPic={boardProfilePicture(userID, board, cache)}
                messageBoardTitle={boardTitle(userID, board, cache)}
                messageBoardLastMessage={lastMessage(board, cacheBoards)}
                messageBoardID={board}
                unread={unreadFor(userID, board, cacheBoards)}
                onClickCard={() => clickCard(userID, board, cacheBoards, setBoardRead)}
            />
        );
    }
    return cards;
};

/**
 * This class will display all the Message boards we are currently a part of
 */
const MessageBoardFeed = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [messageBoards, setMessageBoards] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        props.fetchUserAttributes(["messageBoards"], (user) => {
            setIsLoading(false);
        });
    }, [props.userID]);

    useEffect(() => {
        const user = props.user;
        if (user.messageBoards) {
            setMessageBoards(user.messageBoards);
            for (const key in user.messageBoards) {
                if (user.messageBoards.hasOwnProperty(key)) {
                    const board = user.messageBoards[key];
                    const ids = getIDsFromMessageBoard(board);
                    for (const key in ids) {
                        if (ids.hasOwnProperty(key) && ids[key] !== props.user.id) {
                            // fetch the attributes
                            const id = ids[key];
                            const itemType = getItemTypeFromID(id);
                            if (itemType === "Client" || itemType === "Trainer") {
                                props.fetchItem(id, itemType, ["name", "profileImagePath"]);
                            }
                        }
                    }
                }
            }
        }
    }, [props.user.messageBoards]);

    if (isLoading) {
        return(
            <Spinner/>
        )
    }
    else if (messageBoards && messageBoards.length > 0) {
        return (
            <Grid fluid>
                <Header> Message Boards: </Header>
                {messageBoardCards(props.user.id, messageBoards, props.cache, props.message.boards, props.setBoardRead)}
            </Grid>
        );
    }
    else {
        return(
            <div>
                <Header> No Message Boards Yet! </Header>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
    cache: state.cache,
    info: state.info,
    message: state.message
});

const mapDispatchToProps = dispatch => {
    return {
        fetchUserAttributes: (variableList, dataHandler) => {
            dispatch(fetchUserAttributes(variableList, dataHandler));
        },
        fetchItem: (itemType, id, variableList, dataHandler, failureHandler) => {
            dispatch(fetchItem(itemType, id, variableList, dataHandler, failureHandler));
        },
        queryNextMessagesFromBoard: (board, limit, dataHandler, failureHandler) => {
            dispatch(queryNextMessagesFromBoard(board, limit, dataHandler, failureHandler));
        },
        setBoardRead: (board, userID) => {
            dispatch(setBoardRead(board, userID));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoardFeed);
import {removeChannelSubscription} from "../actions/ablyActions";
import {err} from "../../../Constants";

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_QUERY = 'ADD_QUERY';
export const SET_BOARD_READ = 'SET_BOARD_READ';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export const CLEAR_ALL_BOARDS = 'CLEAR_ALL_BOARDS';

/**
 * Gets the Ably Channel name for the given board.
 *
 * @param {string} board The board to get the Ably channel of.
 * @returns {string} The channel name.
 */
export function getBoardChannel(board) {
    return board + "-Board";
}

// This is the number of MESSAGES that the cache can hold (not boards)!
const messageCacheSize = 1000;

type MessageReducer = {
    boards: Map<string, [Object]>,
    boardLRUHandler: [string],
    boardNextTokens: Map<string, string>,
    boardIfFirsts: Map<string, boolean>,
    boardIfSubscribed: Map<string, boolean>,
    numMessages: number,
}

// How to make sure that this doesn't get out of control?
/**
 * The initial state for the Message Reducer.
 *
 * @type {MessageReducer}
 */
const initialState = {
    boards: {},
    boardLRUHandler: [],
    boardNextTokens: {},
    boardIfFirsts: {},
    boardIfSubscribed: {},
    numMessages: 0,
};

/**
 * Deeply copies the state of the Message reducer.
 *
 * @param {MessageReducer} state The current state of the Message Reducer.
 * @return {MessageReducer} The newly copied reducer.
 */
const copyState = (state) => {
    state = { ...state };
    state.boards = { ...state.boards };
    state.boardLRUHandler = [ ...state.boardLRUHandler ];
    state.boardNextTokens = { ...state.boardNextTokens };
    state.boardIfFirsts = { ...state.boardIfFirsts };
    state.boardIfSubscribed = { ...state.boardIfSubscribed };
    return state;
};

/**
 * Message Reducer:
 *
 * Handles all the message logic for the application. Basically the same as cache reducer, but more integrated and
 * optimized because Message objects are in a different table and need to handled differently.
 *
 * @param {MessageReducer} state The current state of the message reducer.
 * @param {{type: string, payload: *, asyncDispatch: Function}} action The action to specify how to update the reducer.
 * @return {MessageReducer} The next state for the reducer.
 */
export default (state: MessageReducer = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            state = copyState(state);
            addMessage(state, action.payload.board, action.payload.message, action.asyncDispatch);
            break;
        case ADD_QUERY:
            state = copyState(state);
            addQuery(state, action.payload.board, action.payload.messages, action.payload.nextToken, action.payload.ifSubscribed, action.asyncDispatch);
            break;
        case SET_BOARD_READ:
            state = copyState(state);
            setBoardRead(state, action.payload.board, action.payload.userID);
            break;
        case CLEAR_BOARD:
            state = copyState(state);
            clearBoard(state, action.payload.board, action.asyncDispatch);
            break;
        case CLEAR_ALL_BOARDS:
            state = copyState(state);
            clearAllBoards(state, action.asyncDispatch);
            break;
        default:
            break;
    }
    return state;
}

/**
 * Adds a message to the beginning of the board and potentially deletes other messages to make room for it. This is
 * used whenever a NEW message has been discovered through Ably.
 *
 * @param {MessageReducer} state The current state of the message reducer.
 * @param {string} board The name of the board to add the message to.
 * @param {*} message The message object to add to the board.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 */
function addMessage(state, board, message, dispatch) {
    // When we add a message, we update the LRU Handler for that cache, and we potentially throw away some.
    clearBoardsForMessages(state, board, 1, dispatch);
    if (!state.boards[board]) {
        state.boards[board] = [message];
    }
    else {
        state.boards[board].unshift(message);
    }
    state.numMessages += 1;
    updateLRUBoard(state, board);
}

/**
 * Adds a new query of messages to the end of the board and potentially deletes other messages to make room for them.
 * This is used whenever another query of Messages is added to a board from an earlier time.
 *
 * @param {MessageReducer} state The current state of the message reducer.
 * @param {string} board The name of the board to add the messages to.
 * @param {[*]} messages The list of messages to add to the board.
 * @param {string} nextToken The next token string received from the query.
 * @param {boolean} ifSubscribed If the query is subscribed to its Ably channel.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 */
function addQuery(state, board, messages, nextToken, ifSubscribed, dispatch) {
    state.boardIfFirsts[board] = false;
    state.boardNextTokens[board] = nextToken;
    state.boardIfSubscribed[board] = ifSubscribed;
    clearBoardsForMessages(state, board, messages.length, dispatch);
    if (state.boards[board]) {
        state.boards[board] = [...state.boards[board], ...messages];
    }
    else {
        state.boards[board] = messages;
    }
    state.numMessages += messages.length;
    updateLRUBoard(state, board);
}

/**
 * Sets the board read for a specific board by a certain user. This sets the read status of this board.
 *
 * @param {MessageReducer} state The current state of the message reducer.
 * @param {string} boardName The name of the board to update the read status.
 * @param {string} userID The id of user to update the read status for.
 */
function setBoardRead(state, boardName, userID) {
    const board = state.boards[boardName];
    if (board && board.length > 0) {
        const message = board[0];
        if (message.lastSeenFor) {
            message.lastSeenFor = [
                ...board[0].lastSeenFor,
                userID,
            ]
        }
        else {
            message.lastSeenFor = [userID];
        }
    }
}

/**
 * Clears boards in order to make room for a number of messages that are going to be added to the cache.
 *
 * @param {MessageReducer} state The current state of the message reducer.
 * @param {string} board The name of the board that the messages will be added to.
 * @param {number} messagesLength The number of messages about to be added.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 */
function clearBoardsForMessages(state, board, messagesLength, dispatch) {
    // Make room for the messages and make sure that you don't delete the board we're adding to
    while (messageCacheSize < messagesLength + state.numMessages
        && (state.boardLRUHandler.length !== 1 || state.boardLRUHandler[0] !== board)) {
        // Delete the last board to get rid of messages!
        removeLastBoard(state, dispatch);
    }
}

/**
 * Updates the LRU status of a board within the cache. Puts it to the front of the LRU handler.
 *
 * @param {MessageReducer} state The current state of the message reducer.
 * @param {string} board The name of the board to update the LRU status of.
 */
function updateLRUBoard(state, board) {
    const index = state.boardLRUHandler.indexOf(board);
    if (index !== -1) {
        // already in here
        state.boardLRUHandler.splice(index, 1);
    }
    // put in here
    state.boardLRUHandler.unshift(board);
}

/**
 * Removes the last board in the LRU handler from the state and unsubscribes from Ably.
 *
 * @param {MessageReducer} state The current state of the message reducer.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 */
function removeLastBoard(state, dispatch) {
    const board = state.boardLRUHandler.pop();
    state.numMessages -= state.boards[board].length;
    delete state.boardNextTokens[board];
    delete state.boardIfFirsts[board];
    delete state.boards[board];
    dispatch(removeChannelSubscription(getBoardChannel(board)));
}

/**
 * Clears a board of the messages and removes it from the handlers involved. Also unsubscribes from the channel and
 * handles the unsubscription.
 *
 * @param {MessageReducer} state The current state of the message reducer.
 * @param {string} board The name of the board to clear.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 */
function clearBoard(state, board, dispatch) {
    const index = state.boardLRUHandler.indexOf(board);
    if (index !== -1) {
        state.boardLRUHandler.splice(index, 1);
    }
    else {
        err&&console.error("Clearing board that isn't here?");
        return;
    }
    state.numMessages -= state.boards[board].length;
    delete state.boardNextTokens[board];
    delete state.boardIfFirsts[board];
    delete state.boards[board];
    delete state.boardIfSubscribed[board];
    dispatch(removeChannelSubscription(getBoardChannel(board)));
}

/**
 * Clears every single board from the cache.
 *
 * @param {MessageReducer} state The current state of the message reducer.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 */
function clearAllBoards(state, dispatch) {
    while (state.boardLRUHandler.length > 0) {
        removeLastBoard(state, dispatch);
    }
}

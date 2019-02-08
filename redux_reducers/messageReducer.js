import {removeChannelSubscription} from "../redux_actions/ablyActions";
import {err} from "../../Constants";

const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_QUERY = 'ADD_QUERY';
const CLEAR_BOARD = 'CLEAR_BOARD';
const CLEAR_ALL_BOARDS = 'CLEAR_ALL_BOARDS';

/**
 * Get the Ably Channel name for the given board.
 *
 * @param board The board to get the Ably channel of.
 * @returns {string} The channel name.
 */
export function getBoardChannel(board) {
    return board + "-Board";
}

// This is the number of MESSAGES that the cache can hold (not boards)!
const messageCacheSize = 1000;

// How to make sure that this doesn't get out of control?
const initialState = {
    boards: {},
    boardLRUHandler: [],
    boardNextTokens: {},
    boardIfFirsts: {},
    numMessages: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            state = { ...state };
            addMessage(state, action.payload.board, action.payload.message, action.payload.dispatch);
            break;
        case ADD_QUERY:
            state = { ...state };
            addQuery(state, action.payload.board, action.payload.messages, action.payload.nextToken, action.payload.dispatch);
            break;
        case CLEAR_BOARD:
            state = { ...state };
            clearBoard(state, action.payload.board, action.payload.dispatch);
            break;
        case CLEAR_ALL_BOARDS:
            state = { ...state };
            clearAllBoards(state, action.payload.dispatch);
            break;
        default:
            state = {
                ...state
            };
            break;
    }
    return state;
}

function addMessage(state, board, message, dispatch) {
    // When we add a message, we update the LRU Handler for that cache, and we potentially throw away
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
function addQuery(state, board, messages, nextToken, dispatch) {
    state.boardIfFirsts[board] = false;
    state.boardNextTokens[board] = nextToken;
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

function clearBoardsForMessages(state, board, messagesLength, dispatch) {
    // Make room for the messages and make sure that you don't delete the board we're adding to
    while (messageCacheSize < messagesLength + state.numMessages
        && (state.boardLRUHandler.length !== 1 || state.boardLRUHandler[0] !== board)) {
        // Delete the last board to get rid of messages!
        removeLastBoard(state, dispatch);
    }
}

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
 * @param state The message state.
 * @param dispatch The dispatch function for redux.
 */
function removeLastBoard(state, dispatch) {
    const board = state.boardLRUHandler.pop();
    state.numMessages -= state.boards[board].length;
    delete state.boardNextTokens[board];
    delete state.boardIfFirsts[board];
    delete state.boards[board];
    dispatch(removeChannelSubscription(getBoardChannel(board)));
}

function clearBoard(state, board, dispatch) {
    const index = state.boardLRUHandler.indexOf(board);
    if (index !== -1) {
        state.boardLRUHandler.splice(index, 1);
    }
    else {
        err&&console.error("Clearing board that isn't here?");
    }
    state.numMessages -= state.boards[board].length;
    delete state.boardNextTokens[board];
    delete state.boardIfFirsts[board];
    delete state.boards[board];
    dispatch(removeChannelSubscription(getBoardChannel(board)));
}

function clearAllBoards(state, dispatch) {
    while (state.boardLRUHandler.length > 0) {
        removeLastBoard(state, dispatch);
    }
}

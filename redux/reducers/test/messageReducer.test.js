import "../../../testing/SetTesting";
import message, {ADD_MESSAGE, ADD_QUERY, CLEAR_BOARD, SET_BOARD_READ, CLEAR_ALL_BOARDS, getBoardChannel}
from "../messageReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(message({}, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql({}));
});

// export const ADD_MESSAGE = 'ADD_MESSAGE';
describe(ADD_MESSAGE, function () {

});

// export const ADD_QUERY = 'ADD_QUERY';
describe(ADD_QUERY, function () {

});

// export const SET_BOARD_READ = 'SET_BOARD_READ';
describe(SET_BOARD_READ, function () {

});

// export const CLEAR_BOARD = 'CLEAR_BOARD';
describe(CLEAR_BOARD, function () {

});

// export const CLEAR_ALL_BOARDS = 'CLEAR_ALL_BOARDS';
describe(CLEAR_ALL_BOARDS, function () {

});

it("Gets the initial state properly", function () {
    expect(message(undefined, {type: "__INIT__", payload: null})).to.eql({
        boards: {},
        boardLRUHandler: [],
        boardNextTokens: {},
        boardIfFirsts: {},
        boardIfSubscribed: {},
        numMessages: 0,
    });
});

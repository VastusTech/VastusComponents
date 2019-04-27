import "../../../testing/SetTesting";
import message, {ADD_MESSAGE, ADD_QUERY, CLEAR_BOARD, SET_BOARD_READ, CLEAR_ALL_BOARDS, getBoardChannel}
from "../messageReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(message({}, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql({}));
});

// export const ADD_MESSAGE = 'ADD_MESSAGE';
describe(ADD_MESSAGE, function () {
    it("Should add a message to a non-existent board to the front");
    it("Should add a message to an existent and empty board to the front");
    it("Should add a message to an existent and non-empty board to the front");
});

// export const ADD_QUERY = 'ADD_QUERY';
describe(ADD_QUERY, function () {
    it("Should add a list of messages to a non-existent board to the back");
    it("Should add a list of messages to an existent and empty board to the back");
    it("Should add a list of messages to an existent and non-empty board to the back");
});

// export const SET_BOARD_READ = 'SET_BOARD_READ';
describe(SET_BOARD_READ, function () {
    it("Should set the board read for a board with one message");
    it("Should set the board read for a board with more than one message");
    it("Should do nothing for a non-existent board");
    it("Should do nothing for a board with no messages");
});

// export const CLEAR_BOARD = 'CLEAR_BOARD';
describe(CLEAR_BOARD, function () {
    it("Should clear a board with messages");
    it("Should clear a board with no messages");
    it("Should clear a non-existent board");
});

// export const CLEAR_ALL_BOARDS = 'CLEAR_ALL_BOARDS';
describe(CLEAR_ALL_BOARDS, function () {
    it("Should clear a non-empty board cache");
    it("Should clear an empty board cache");
});

describe("Get Message Board Channel", function () {
    it("Should get the correct channel name for the message board", function() {
        expect(getBoardChannel("CH0001")).to.be.equal("CH0001-Board");
    });
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

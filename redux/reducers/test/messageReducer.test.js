import message from "../messageReducer";
import {expect} from "chai";

describe("messageReducer.js", function () {
    it("Ignores other actions correctly", () => {
        const state = {};
        expect(message(state, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql(state));
    });
});

// export const ADD_MESSAGE = 'ADD_MESSAGE';
// export const ADD_QUERY = 'ADD_QUERY';
// export const SET_BOARD_READ = 'SET_BOARD_READ';
// export const CLEAR_BOARD = 'CLEAR_BOARD';
// export const CLEAR_ALL_BOARDS = 'CLEAR_ALL_BOARDS';

import ably from "../ablyReducer";
import {expect} from "chai";

describe('ablyReducer.js', () => {
    it("Ignores other actions correctly", () => {
        const state = {};
        expect(ably(state, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql(state));
    });
});

// export const ADD_HANDLER = 'ADD_HANDLER';
// export const SET_HANDLER = 'SET_HANDLER';
// export const SET_PERMANENT_HANDLER = 'ADD_PERMANENT_CHANNEL';
// export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
// export const CLEAR_CHANNELS = 'CLEAR_CHANNELS';

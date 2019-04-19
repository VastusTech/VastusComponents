import info from "../infoReducer";
import {expect} from "chai";

describe("infoReducer.js", function () {
    it("Ignores other actions correctly", () => {
        const state = {};
        expect(info(state, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql(state));
    });
});

// export const SET_ERROR = 'SET_ERROR';
// export const CLEAR_ERROR = 'CLEAR_ERROR';
// export const SET_IS_LOADING = 'SET_IS_LOADING';
// export const SET_IS_NOT_LOADING = 'SET_IS_NOT_LOADING';
// export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';

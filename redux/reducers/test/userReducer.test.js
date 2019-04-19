import user from "../userReducer";
import {expect} from "chai";

describe("userReducer.js", function () {
    it("Ignores other actions correctly", () => {
        const state = {};
        expect(user(state, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql(state));
    });
});

// const SET_USER = 'SET_USER';
// const FORCE_SET_USER = 'FORCE_SET_USER';
// const CLEAR_USER = 'CLEAR_USER';

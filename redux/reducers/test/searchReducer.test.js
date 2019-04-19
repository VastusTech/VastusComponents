import search from "../searchReducer";
import {expect} from "chai";

describe("searchReducer.js", function () {
    it("Ignores other actions correctly", () => {
        const state = {};
        expect(search(state, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql(state));
    });
});

// export const ENABLE_TYPE = 'ENABLE_TYPE';
// export const DISABLE_TYPE = 'DISABLE_TYPE';
// export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
// export const SET_TYPE_FILTER = 'SET_TYPE_FILTER';
// export const SET_TYPE_NEXT_TOKEN = 'SET_TYPE_NEXT_TOKEN';
// export const ADD_TYPE_RESULTS = 'ADD_TYPE_RESULTS';
// export const RESET_TYPE_QUERY = 'RESET_TYPE_QUERY';
// export const RESET_QUERY = 'RESET_QUERY';
// export const ENABLE_SEARCH_BAR = 'ENABLE_SEARCH_BAR';
// export const DISABLE_SEARCH_BAR = 'DISABLE_SEARCH_BAR';

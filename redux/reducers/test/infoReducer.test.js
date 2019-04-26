import "../../../testing/SetTesting";
import info, {SET_ERROR, CLEAR_ERROR, SET_IS_LOADING, SET_IS_NOT_LOADING, TOGGLE_IS_LOADING} from "../infoReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(info({}, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql({}));
});

// export const SET_ERROR = 'SET_ERROR';
describe(SET_ERROR, function () {

});

// export const CLEAR_ERROR = 'CLEAR_ERROR';
describe(CLEAR_ERROR, function () {

});

// export const SET_IS_LOADING = 'SET_IS_LOADING';
describe(SET_IS_LOADING, function () {

});

// export const SET_IS_NOT_LOADING = 'SET_IS_NOT_LOADING';
describe(SET_IS_NOT_LOADING, function () {

});

// export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
describe(TOGGLE_IS_LOADING, function () {

});

it("Gets the initial state properly", function () {
    expect(info(undefined, {type: "__INIT__", payload: null})).to.eql({
        isLoading: false,
        error: null
    });
});

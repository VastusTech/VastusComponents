import "../../../testing/SetTesting";
import info, {SET_ERROR, CLEAR_ERROR, SET_IS_LOADING, SET_IS_NOT_LOADING, TOGGLE_IS_LOADING} from "../infoReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(info({}, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql({}));
});

// export const SET_ERROR = 'SET_ERROR';
describe(SET_ERROR, function () {
    it("Should set the error from null");
    it("Should overwrite an existing error");
    it("Should set the error to null")
});

// export const CLEAR_ERROR = 'CLEAR_ERROR';
describe(CLEAR_ERROR, function () {
    it("Should set a null error to null");
    it("Should set a non-null error to null");
});

// export const SET_IS_LOADING = 'SET_IS_LOADING';
describe(SET_IS_LOADING, function () {
    it("Should set false to true");
    it("Should set true to true");
});

// export const SET_IS_NOT_LOADING = 'SET_IS_NOT_LOADING';
describe(SET_IS_NOT_LOADING, function () {
    it("Should set true to false");
    it("Should set false to false");
});

// export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
describe(TOGGLE_IS_LOADING, function () {
    it("Should set true to false");
    it("Should set false to true");
});

it("Gets the initial state properly", function () {
    expect(info(undefined, {type: "__INIT__", payload: null})).to.eql({
        isLoading: false,
        error: null
    });
});

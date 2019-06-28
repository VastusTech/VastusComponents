import "../../../testing/SetTesting";
import info, {
  SET_ERROR,
  CLEAR_ERROR,
  SET_IS_LOADING,
  SET_IS_NOT_LOADING,
  TOGGLE_IS_LOADING,
  SET_APP_IS_NOT_LOADING
} from "../infoReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
  expect(info({}, {type: "__NOT_A_REAL_ACTION__", payload: null})).to.eql({});
});

describe("Info Reducer", () => {
  let infoState;

  beforeEach(() => {
    infoState = info(undefined, {type: "__INIT__", payload: null});
    infoState.error = null;
  });

// export const SET_ERROR = 'SET_ERROR';
  describe(SET_ERROR, () => {
    it("Should set the error from null", () => {
      const error = Error("Test Error");
      expect(info(infoState, {type: SET_ERROR, payload: error})).to.eql({
        isLoading: false,
        appIsLoading: true,
        error
      });
    });
    it("Should overwrite an existing error", () => {
      infoState.error = Error("Existing Test Error");
      const error = Error("Test Error");
      expect(info(infoState, {type: SET_ERROR, payload: error})).to.eql({
        isLoading: false,
        appIsLoading: true,
        error
      });
    });
  });

// export const CLEAR_ERROR = 'CLEAR_ERROR';
  describe(CLEAR_ERROR, function () {
    it("Should set a null error to null", () => {
      expect(info(infoState, {type: CLEAR_ERROR})).to.eql({
        isLoading: false,
        appIsLoading: true,
        error: null
      });
    });
    it("Should set a non-null error to null", () => {
      infoState.error = Error("Existing Test Error");
      expect(info(infoState, {type: CLEAR_ERROR})).to.eql({
        isLoading: false,
        appIsLoading: true,
        error: null
      });
    });
  });

// export const SET_IS_LOADING = 'SET_IS_LOADING';
  describe(SET_IS_LOADING, function () {
    it("Should set false to true", () => {
      infoState.isLoading = false;
      expect(info(infoState, {type: SET_IS_LOADING})).to.eql({
        isLoading: true,
        appIsLoading: true,
        error: null
      });
    });
    it("Should set true to true", () => {
      infoState.isLoading = true;
      expect(info(infoState, {type: SET_IS_LOADING})).to.eql({
        isLoading: true,
        appIsLoading: true,
        error: null
      });
    });
  });

// export const SET_IS_NOT_LOADING = 'SET_IS_NOT_LOADING';
  describe(SET_IS_NOT_LOADING, function () {
    it("Should set true to false", () => {
      infoState.isLoading = true;
      expect(info(infoState, {type: SET_IS_NOT_LOADING})).to.eql({
        isLoading: false,
        appIsLoading: true,
        error: null
      });
    });
    it("Should set false to false", () => {
      infoState.isLoading = false;
      expect(info(infoState, {type: SET_IS_NOT_LOADING})).to.eql({
        isLoading: false,
        appIsLoading: true,
        error: null
      });
    });
  });

// export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
  describe(TOGGLE_IS_LOADING, function () {
    it("Should set true to false", () => {
      infoState.isLoading = true;
      expect(info(infoState, {type: TOGGLE_IS_LOADING})).to.eql({
        isLoading: false,
        appIsLoading: true,
        error: null
      });
    });
    it("Should set false to true", () => {
      infoState.isLoading = false;
      expect(info(infoState, {type: TOGGLE_IS_LOADING})).to.eql({
        isLoading: true,
        appIsLoading: true,
        error: null
      });
    });
  });

  describe(SET_APP_IS_NOT_LOADING, () => {
    it("Should set app is not loading", () => {
      expect(info(infoState, {type: SET_APP_IS_NOT_LOADING})).to.eql({
        isLoading: false,
        appIsLoading: false,
        error: null
      });
    });
  });
});

it("Gets the initial state properly", function () {
  expect(info(undefined, {type: "__INIT__", payload: null})).to.eql({
    isLoading: false,
    appIsLoading: true,
    error: null
  });
});

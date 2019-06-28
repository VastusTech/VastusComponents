import "../../../testing/SetTesting";
import {expect} from "chai";
import {setIsLoading, setError, setIsNotLoading, clearError, toggleIsLoading} from "../infoActions";
import info, {CLEAR_ERROR, SET_ERROR, TOGGLE_IS_LOADING} from "../../reducers/infoReducer";
import {getInitialReduxStore, store} from "../../../testing/TestHelper";
import {SET_IS_LOADING, SET_IS_NOT_LOADING} from "../../reducers/infoReducer";

describe("Info Actions", function () {
  let reduxStore;
  beforeEach(() => {
    reduxStore = store(getInitialReduxStore(['info']));
  });

  describe("Set is loading", () => {
    it("Sets loading to true", (done) => {
      reduxStore.dispatch(setIsLoading()).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([{type: SET_IS_LOADING}]);
        done();
      });
    });
  });
  describe("Set is not loading", () => {
    it("Sets loading to false", (done) => {
      reduxStore.dispatch(setIsNotLoading()).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([{type: SET_IS_NOT_LOADING}]);
        done();
      });
    });
  });
  describe("Toggle loading", () => {
    it("Sets loading to true", (done) => {
      reduxStore.dispatch(toggleIsLoading()).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([{type: TOGGLE_IS_LOADING}]);
        done();
      });
    });

    it("Sets loading to false", (done) => {
      const initialStore = getInitialReduxStore(['info']);
      initialStore.info = info(initialStore, {type: SET_IS_LOADING});
      reduxStore = store(initialStore);
      reduxStore.dispatch(toggleIsLoading()).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([{type: TOGGLE_IS_LOADING}]);
        done();
      });
    });
  });
  describe("Set Error", () => {
    it("Sets error from null", (done) => {
      const error = Error("Test Error");
      reduxStore.dispatch(setError(error)).then(() => {
        expect(reduxStore.getActions()).excluding(['asyncDispatch', 'payload']).to.eql([{type: SET_ERROR}]);
        done();
      });
    });
    it("Sets error from other error", (done) => {
      const error = Error("Test Error");
      const otherError = Error("Other Test Error");
      const initialStore = getInitialReduxStore(['info']);
      initialStore.info = info(initialStore, {type: SET_ERROR, payload: otherError});
      reduxStore = store(initialStore);
      reduxStore.dispatch(setError(error)).then(() => {
        expect(reduxStore.getActions()).excluding(['asyncDispatch', 'payload']).to.eql([{type: SET_ERROR}]);
        done();
      });
    });
  });
  describe("Clear Error", () => {
    it("Clears error from null", (done) => {
      reduxStore.dispatch(clearError()).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([{type: CLEAR_ERROR}]);
        done();
      });
    });
    it("Clears error from error", (done) => {
      const initialStore = getInitialReduxStore(['info']);
      initialStore.info = info(initialStore, {type: SET_ERROR, payload: Error("Test Error")});
      reduxStore = store(initialStore);
      reduxStore.dispatch(clearError()).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([{type: CLEAR_ERROR}]);
        done();
      });
    });
  });
});

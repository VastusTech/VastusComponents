import "../../../testing/SetTesting";
import {expect} from "chai";
import {
  setBoardRead, peekAtFirstMessageFromBoard, queryNextMessagesFromBoard, discardBoard, addMessageFromNotification,
  addMessageToBoard
} from "../messageActions";
import {getInitialReduxStore, store} from "../../../testing/TestHelper";

describe("Message Actions", function () {
  let reduxStore;
  beforeEach(() => {
    reduxStore = store(getInitialReduxStore(['message', 'user']));
  });

  describe("Set Board Read", () => {
    it("Should set board read", (done) => {
      reduxStore.dispatch(setBoardRead("BOARD", "CL0001")).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
          {payload: {userID: 'CL0001', board: 'BOARD'}, type: 'SET_BOARD_READ'}
        ]);
        done();
      });
    });
  });
  describe("Peek At First Message from Board", () => {
    it("Should peek at first message", (done) => {
      reduxStore.dispatch(peekAtFirstMessageFromBoard("BOARD")).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
          {type: 'SET_IS_LOADING'},
          {payload: {ifSubscribed: false, messages: [], nextToken: null, board: 'BOARD'}, type: 'ADD_QUERY'},
          {type: 'SET_IS_NOT_LOADING'}
        ]);
        done();
      });
    });
  });
  describe("Query Next Messages From Board", () => {
    it("Should query next messages", (done) => {
      reduxStore.dispatch(queryNextMessagesFromBoard("BOARD", 10)).then(() => {
        expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'messageHandler', 'unsubscriptionHandler', 'handler']).to.eql([
          {type: 'SET_IS_LOADING'},
          {type: 'SET_IS_LOADING'},
          {payload: {channel: 'BOARD-Board'}, type: 'ADD_HANDLER'},
          {type: 'SET_IS_NOT_LOADING'},
          {payload: {ifSubscribed: true, messages: [], nextToken: null, board: 'BOARD'}, type: 'ADD_QUERY'},
          {type: 'SET_IS_NOT_LOADING'}
        ]);
        done();
      });
    });
  });
  describe("Discard Board", () => {
    it("Should discard board", (done) => {
      reduxStore.dispatch(discardBoard("BOARD")).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
          {type: 'SET_IS_LOADING'},
          {payload: {board: 'BOARD'}, type: 'CLEAR_BOARD'},
          {type: 'SET_IS_NOT_LOADING'}
        ]);
        done();
      });
    });
  });
  describe("Add Message from Notification", () => {
    it("Should add message from notification", (done) => {
      reduxStore.dispatch(addMessageFromNotification("BOARD", {message: "MESSAGE"})).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
          {type: 'SET_IS_LOADING'},
          {
            payload: {
              message: {
                message: "MESSAGE", messageURL: "not_found.png",
                profilePicture: "roundProfile.png"
              }, board: 'BOARD'
            }, type: 'ADD_MESSAGE'
          },
          {type: 'SET_IS_NOT_LOADING'}
        ]);
        done();
      });
    });
  });
  describe("Add Message To Board", () => {
    it("Should add message from notification", (done) => {
      reduxStore.dispatch(addMessageToBoard("BOARD", {message: "MESSAGE"})).then(() => {
        expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
          {payload: {message: {message: "MESSAGE"}, board: 'BOARD'}, type: 'ADD_MESSAGE'}
        ]);
        done();
      });
    });
  });
});

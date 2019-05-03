import "../../../testing/SetTesting";
import { expect, assert } from "chai";
import {removeChannelSubscription, addHandlerAndUnsubscription, setHandlerAndUnsubscription,
    removeAllHandlers, setPermanentHandlerAndUnsubscription
} from "../ablyActions";
import {store} from "../../../testing/TestHelper";
import {ADD_HANDLER, SET_HANDLER, SET_PERMANENT_HANDLER} from "../../reducers/ablyReducer";
import {SET_IS_LOADING, SET_IS_NOT_LOADING} from "../../reducers/infoReducer";

describe("Ably Actions", () => {
    let reduxStore;
    beforeEach(() => {
        reduxStore = store();
    });

    describe("Add Handler and Unsubscription", () => {
        it("Adds a handler to a not subscribed to channel", (done) => {
            reduxStore.dispatch(addHandlerAndUnsubscription('CHANNEL', () => {}, () => {})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['handler', 'asyncDispatch']).to.eql([{
                    type: SET_IS_LOADING,
                }, {
                    type: ADD_HANDLER,
                    payload: {
                        channel: "CHANNEL",
                        unsubscriptionHandler: {},
                        messageHandler: {}
                    },
                }, {
                    type: SET_IS_NOT_LOADING,
                }, ]);
                done();
            });
        });
        it("Adds a handler to an already subscribed to channel", (done) => {
            reduxStore.dispatch(addHandlerAndUnsubscription('CHANNEL', () => {}, () => {}));
            reduxStore.dispatch(addHandlerAndUnsubscription('CHANNEL', () => {}, () => {})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['handler', 'asyncDispatch']).to.eql([{
                    type: SET_IS_LOADING,
                }, {
                    type: ADD_HANDLER,
                    payload: {
                        channel: "CHANNEL",
                        unsubscriptionHandler: {},
                        messageHandler: {}
                    },
                }, {
                    type: SET_IS_NOT_LOADING,
                }, {
                    type: SET_IS_LOADING,
                }, {
                    type: ADD_HANDLER,
                    payload: {
                        channel: "CHANNEL",
                        unsubscriptionHandler: {},
                        messageHandler: {}
                    },
                }, {
                    type: SET_IS_NOT_LOADING,
                }]);
                done();
            });
        });
    });
    describe("Set Handler and Unsubscription", () => {
        it("Sets the handler for a not subscribed to channel", (done) => {
            reduxStore.dispatch(setHandlerAndUnsubscription('CHANNEL', () => {}, () => {})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['handler', 'asyncDispatch']).to.eql([{
                    type: SET_IS_LOADING,
                }, {
                    type: SET_HANDLER,
                    payload: {
                        channel: "CHANNEL",
                        unsubscriptionHandler: {},
                        messageHandler: {}
                    },
                }, {
                    type: SET_IS_NOT_LOADING,
                }, ]);
                done();
            });
        });
        it("Sets the handler for an already subscribed to channel", (done) => {
            reduxStore.dispatch(setHandlerAndUnsubscription('CHANNEL', () => {}, () => {}));
            reduxStore.dispatch(setHandlerAndUnsubscription('CHANNEL', () => {}, () => {})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['handler', 'asyncDispatch']).to.eql([{
                    type: SET_IS_LOADING,
                }, {
                    type: SET_HANDLER,
                    payload: {
                        channel: "CHANNEL",
                        unsubscriptionHandler: {},
                        messageHandler: {}
                    },
                }, {
                    type: SET_IS_NOT_LOADING,
                }, {
                    type: SET_IS_LOADING,
                }, {
                    type: SET_HANDLER,
                    payload: {
                        channel: "CHANNEL",
                        unsubscriptionHandler: {},
                        messageHandler: {}
                    },
                }, {
                    type: SET_IS_NOT_LOADING,
                }]);
                done();
            });
        });
    });
    describe("Set permanent handler and unsubscription", () => {
        it("Sets the permanent handler for a not subscribed to channel", (done) => {
            reduxStore.dispatch(setPermanentHandlerAndUnsubscription('CHANNEL', () => {}, () => {})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['handler', 'asyncDispatch']).to.eql([{
                    type: SET_IS_LOADING,
                }, {
                    type: SET_PERMANENT_HANDLER,
                    payload: {
                        channel: "CHANNEL",
                        unsubscriptionHandler: {},
                        messageHandler: {}
                    },
                }, {
                    type: SET_IS_NOT_LOADING,
                }, ]);
                done();
            });
        });
        it("Sets the permanent handler for an already subscribed to channel", (done) => {
            reduxStore.dispatch(setPermanentHandlerAndUnsubscription('CHANNEL', () => {}, () => {}));
            reduxStore.dispatch(setPermanentHandlerAndUnsubscription('CHANNEL', () => {}, () => {})).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['handler', 'asyncDispatch']).to.eql([{
                    type: SET_IS_LOADING,
                }, {
                    type: SET_PERMANENT_HANDLER,
                    payload: {
                        channel: "CHANNEL",
                        unsubscriptionHandler: {},
                        messageHandler: {}
                    },
                }, {
                    type: SET_IS_NOT_LOADING,
                }, {
                    type: SET_IS_LOADING,
                }, {
                    type: SET_PERMANENT_HANDLER,
                    payload: {
                        channel: "CHANNEL",
                        unsubscriptionHandler: {},
                        messageHandler: {}
                    },
                }, {
                    type: SET_IS_NOT_LOADING,
                }]);
                done();
            });
        });
    });
    describe("Remove Channel Subscription", () => {
        it("Removes an already subscribed channel", (done) => {

        });
        it("Removes a not subscribed channel", (done) => {

        });
    });
    describe("Remove all handlers", () => {
        it("Removes all handlers with 0 channels");
        it("Removes all handlers with 1 channel and calls the unsubscription");
        it("Removes all handlers with 2 channels and calls both unsubscriptions");
    });
});

import "../../../testing/SetTesting";
import { expect } from "chai";
import ably from "../../reducers/ablyReducer";
import {removeChannelSubscription, addHandlerAndUnsubscription, setHandlerAndUnsubscription,
    removeAllHandlers, setPermanentHandlerAndUnsubscription
} from "../ablyActions";
import {getInitialReduxStore, store} from "../../../testing/TestHelper";
import {ADD_HANDLER, SET_HANDLER, SET_PERMANENT_HANDLER} from "../../reducers/ablyReducer";
import {SET_IS_LOADING, SET_IS_NOT_LOADING} from "../../reducers/infoReducer";

describe("Ably Actions", () => {
    let reduxStore;
    beforeEach(() => {
        reduxStore = store(getInitialReduxStore(['ably']));
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
            const initialStore = getInitialReduxStore(['ably']);
            initialStore.ably = ably(initialStore.ably, {type: ADD_HANDLER, asyncDispatch: () => {}, payload: {
                channel: "CHANNEL", handler: () => {}, messageHandler: () => {}, unsubscriptionHandler: () => {}
            }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeChannelSubscription('CHANNEL')).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { channel: 'CHANNEL' }, type: 'REMOVE_CHANNEL' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Removes a not subscribed channel", (done) => {
            reduxStore.dispatch(removeChannelSubscription('CHANNEL')).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Remove all handlers", () => {
        it("Removes all handlers with 0 channels", (done) => {
            reduxStore.dispatch(removeAllHandlers()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'CLEAR_CHANNELS' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Removes all handlers with 1 channel", (done) => {
            const initialStore = getInitialReduxStore(['ably']);
            initialStore.ably = ably(initialStore.ably, {type: ADD_HANDLER, asyncDispatch: () => {}, payload: {
                channel: "CHANNEL", handler: () => {}, messageHandler: () => {}, unsubscriptionHandler: () => {}
            }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeAllHandlers()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'CLEAR_CHANNELS' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
        it("Removes all handlers with 2 channels", (done) => {
            const initialStore = getInitialReduxStore(['ably']);
            initialStore.ably = ably(initialStore.ably, {type: ADD_HANDLER, asyncDispatch: () => {}, payload: {
                channel: "CHANNEL1", handler: () => {}, messageHandler: () => {}, unsubscriptionHandler: () => {}
            }});
            initialStore.ably = ably(initialStore.ably, {type: ADD_HANDLER, asyncDispatch: () => {}, payload: {
                channel: "CHANNEL2", handler: () => {}, messageHandler: () => {}, unsubscriptionHandler: () => {}
            }});
            reduxStore = store(initialStore);
            reduxStore.dispatch(removeAllHandlers()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'CLEAR_CHANNELS' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
});

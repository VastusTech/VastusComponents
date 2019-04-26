import "../../../testing/setTesting";
import ably, {ADD_HANDLER, CLEAR_CHANNELS, SET_HANDLER, SET_PERMANENT_HANDLER, REMOVE_CHANNEL} from "../ablyReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(ably({}, {type: "__NOT_A_REAL_ACTION__", payload: null})).to.eql({});
});

// export const ADD_HANDLER = 'ADD_HANDLER';
describe(ADD_HANDLER, function () {
    it("Adds a first handler successfully", () => {
        expect(ably(undefined, {type: ADD_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER",
                messageHandler: "MESSAGE_HANDLER"
            }})
        ).to.eql({
            subscribedChannels: {CHANNEL: "CHANNEL"},
            subscribedChannelLRUHandler: ["CHANNEL"],
            notificationHandlers: {CHANNEL: ["HANDLER"]},
            unsubscriptionHandlers: {CHANNEL: ["UNSUBSCRIPTION_HANDLER"]},
            numPermanentHandlers: 0
        });
    });
    it("Adds a second handler successfully", () => {
        const state = ably(undefined, {type: ADD_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER1",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER1",
                messageHandler: "MESSAGE_HANDLER1"
            }});
        expect(ably(state, {type: ADD_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER2",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER2",
                messageHandler: "MESSAGE_HANDLER2"
            }})
        ).to.eql({
            subscribedChannels: {CHANNEL: "CHANNEL"},
            subscribedChannelLRUHandler: ["CHANNEL"],
            notificationHandlers: {CHANNEL: ["HANDLER1", "HANDLER2"]},
            unsubscriptionHandlers: {CHANNEL: ["UNSUBSCRIPTION_HANDLER1", "UNSUBSCRIPTION_HANDLER2"]},
            numPermanentHandlers: 0
        });
    });
});

// export const SET_HANDLER = 'SET_HANDLER';
describe(SET_HANDLER, function () {
    it("Sets the first Handler correctly", () => {
        expect(ably(undefined, {type: SET_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER",
                messageHandler: "MESSAGE_HANDLER"
            }})
        ).to.eql({
            subscribedChannels: {CHANNEL: "CHANNEL"},
            subscribedChannelLRUHandler: ["CHANNEL"],
            notificationHandlers: {CHANNEL: ["HANDLER"]},
            unsubscriptionHandlers: {CHANNEL: ["UNSUBSCRIPTION_HANDLER"]},
            numPermanentHandlers: 0
        });
    });
    it("Adds the second handler successfully", () => {
        const state = ably(undefined, {type: SET_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER1",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER1",
                messageHandler: "MESSAGE_HANDLER1"
            }});
        expect(ably(state, {type: SET_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER2",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER2",
                messageHandler: "MESSAGE_HANDLER2"
            }})
        ).to.eql({
            subscribedChannels: {CHANNEL: "CHANNEL"},
            subscribedChannelLRUHandler: ["CHANNEL"],
            notificationHandlers: {CHANNEL: ["HANDLER2"]},
            unsubscriptionHandlers: {CHANNEL: ["UNSUBSCRIPTION_HANDLER2"]},
            numPermanentHandlers: 0
        });
    });

});
// export const SET_PERMANENT_HANDLER = 'ADD_PERMANENT_CHANNEL';
describe(SET_PERMANENT_HANDLER, function () {
    it("Sets the first permanent Handler correctly", () => {
        expect(ably(undefined, {type: SET_PERMANENT_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER",
                messageHandler: "MESSAGE_HANDLER"
            }})
        ).to.eql({
            subscribedChannels: {CHANNEL: "CHANNEL"},
            subscribedChannelLRUHandler: [],
            notificationHandlers: {CHANNEL: ["HANDLER"]},
            unsubscriptionHandlers: {CHANNEL: ["UNSUBSCRIPTION_HANDLER"]},
            numPermanentHandlers: 1
        });
    });
    it("Adds the second permanent handler successfully", () => {
        const state = ably(undefined, {type: SET_PERMANENT_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER1",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER1",
                messageHandler: "MESSAGE_HANDLER1"
            }});
        expect(ably(state, {type: SET_PERMANENT_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER2",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER2",
                messageHandler: "MESSAGE_HANDLER2"
            }})
        ).to.eql({
            subscribedChannels: {CHANNEL: "CHANNEL"},
            subscribedChannelLRUHandler: [],
            notificationHandlers: {CHANNEL: ["HANDLER2"]},
            unsubscriptionHandlers: {CHANNEL: ["UNSUBSCRIPTION_HANDLER2"]},
            numPermanentHandlers: 1
        });
    });
    it("Adds another permanent handler successfully", () => {
        const state = ably(undefined, {type: SET_PERMANENT_HANDLER, payload: {
                channel: "CHANNEL1",
                handler: "HANDLER1",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER1",
                messageHandler: "MESSAGE_HANDLER1"
            }});
        expect(ably(state, {type: SET_PERMANENT_HANDLER, payload: {
                channel: "CHANNEL2",
                handler: "HANDLER2",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER2",
                messageHandler: "MESSAGE_HANDLER2"
            }})
        ).to.eql({
            subscribedChannels: {CHANNEL1: "CHANNEL1", CHANNEL2: "CHANNEL2"},
            subscribedChannelLRUHandler: [],
            notificationHandlers: {CHANNEL1: ["HANDLER1"], CHANNEL2: ["HANDLER2"]},
            unsubscriptionHandlers: {CHANNEL1: ["UNSUBSCRIPTION_HANDLER1"], CHANNEL2: ["UNSUBSCRIPTION_HANDLER2"]},
            numPermanentHandlers: 2
        });
    });
});

// export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
describe(REMOVE_CHANNEL, function () {
    it("Removes a first handler successfully", () => {
        const state = ably(undefined, {type: ADD_HANDLER, payload: {
                channel: "CHANNEL",
                handler: "HANDLER",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER",
                messageHandler: "MESSAGE_HANDLER"
            }});
        expect(ably(state, {type: REMOVE_CHANNEL, payload: {
                channel: "CHANNEL",
            }})
        ).to.eql({
            subscribedChannels: {},
            subscribedChannelLRUHandler: [],
            notificationHandlers: {},
            unsubscriptionHandlers: {},
            numPermanentHandlers: 0
        });
    });

});
// export const CLEAR_CHANNELS = 'CLEAR_CHANNELS';
describe(CLEAR_CHANNELS, function () {
    it("Clears all channels successfully", function () {
        let state = ably(undefined, {
            type: ADD_HANDLER, payload: {
                channel: "CHANNEL1",
                handler: "HANDLER1",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER1",
                messageHandler: "MESSAGE_HANDLER1"
            }
        });
        state = ably(state, {
            type: ADD_HANDLER, payload: {
                channel: "CHANNEL2",
                handler: "HANDLER2",
                unsubscriptionHandler: "UNSUBSCRIPTION_HANDLER2",
                messageHandler: "MESSAGE_HANDLER2"
            }
        });
        expect(ably(state, {type: CLEAR_CHANNELS})
        ).to.eql({
            subscribedChannels: {},
            subscribedChannelLRUHandler: [],
            notificationHandlers: {},
            unsubscriptionHandlers: {},
            numPermanentHandlers: 0
        });
    });
});

it("Gets the initial state properly", function () {
    expect(ably(undefined, {type: "__INIT__", payload: null})).to.eql({
        subscribedChannels: {},
        subscribedChannelLRUHandler: [],
        notificationHandlers: {},
        unsubscriptionHandlers: {},
        numPermanentHandlers: 0
    });
});

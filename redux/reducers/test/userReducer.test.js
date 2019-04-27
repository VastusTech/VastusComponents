import "../../../testing/SetTesting";
import user, {FORCE_SET_USER, CLEAR_USER, SET_USER} from "../userReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(user({}, {type: "__NOT_A_REAL_ACTION__", payload: null})).to.eql({});
});

// const SET_USER = 'SET_USER';
describe(SET_USER, function () {
    it("Should set for an empty user", function () {
        expect(user(undefined, {type: SET_USER, payload: {
                id: "CL0001"
            }})
        ).to.eql({
            id: "CL0001"
        });
    });
    it("Should update an existing user", function() {
        expect(user({
                id: "CL0001",
            }, {type: SET_USER, payload: {
                id: "CL0001",
                attributeName: "attributeValue"
            }})
        ).to.eql({
            id: "CL0001",
            attributeName: "attributeValue"
        });
    });
    it("Should update an existing user's attributes", function() {
        expect(user({
                id: "CL0001",
                attributeName: "oldAttributeValue"
            }, {type: SET_USER, payload: {
                    id: "CL0001",
                    attributeName: "attributeValue"
                }})
        ).to.eql({
            id: "CL0001",
            attributeName: "attributeValue"
        });
    });
});

// const FORCE_SET_USER = 'FORCE_SET_USER';
describe(FORCE_SET_USER, function () {
    it("Should set for an empty user", function () {
        expect(user(undefined, {type: FORCE_SET_USER, payload: {
                id: "CL0001"
            }})
        ).to.eql({
            id: "CL0001"
        });
    });
    it("Should reset an existing user", function() {
        expect(user({
                id: "CL0001",
            }, {type: FORCE_SET_USER, payload: {
                    id: "CL0002",
                    attributeName: "attributeValue"
                }})
        ).to.eql({
            id: "CL0002",
            attributeName: "attributeValue"
        });
    });
});

// const CLEAR_USER = 'CLEAR_USER';
describe(CLEAR_USER, function () {
    it("Should reset the user to the inital state", function () {
        expect(user({
            id: "CL0001",
            name: "User's Name"
        }, {
            type: CLEAR_USER
        })).to.eql({
            id: null
        });
    });
});

it("Gets the initial state properly", function () {
    expect(user(undefined, {type: "__INIT__", payload: null})).to.eql({
        id: null
    });
});

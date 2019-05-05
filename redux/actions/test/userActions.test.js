import "../../../testing/SetTesting";
import { expect } from "chai";
import {addToUserAttribute, updateUserFromCache, setUserAttribute, setUser, subscribeFetchUserAttributes,
    fetchUserAttributes, clearUser, forceFetchUserAttributes, forceSetUser, removeFromUserAttribute,
    removeFromUserAttributeAtIndex, setUserAttributeAtIndex
} from "../userActions";
import {getInitialReduxStore, store} from "../../../testing/TestHelper";

describe("User Actions", function () {
    let reduxStore;

    beforeEach(() => {
        const initialStore = getInitialReduxStore(['cache', 'user']);
        initialStore.user.id = "CL0001";
        reduxStore = store(initialStore);
    });

    describe("Fetch User Attributes", () => {
        it("Should fetch user attributes", (done) => {
            reduxStore.dispatch(fetchUserAttributes(["attributeName1", "attributeName2"])).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: undefined, type: 'SET_USER' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Force Fetch User Attributes", () => {
        it("Should force fetch user attributes", (done) => {
            reduxStore.dispatch(forceFetchUserAttributes(["attributeName1", "attributeName2"])).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: undefined, type: 'SET_USER' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Subscribe Fetch User Attributes", () => {
        it("Should subscribe fetch user attributes", (done) => {
            reduxStore.dispatch(subscribeFetchUserAttributes(["attributeName1", "attributeName2"])).then(() => {
                expect(reduxStore.getActions()).excludingEvery(['asyncDispatch', 'handler', 'unsubscriptionHandler', 'messageHandler']).to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'SET_IS_LOADING' },
                    { payload: { channel: 'CL0001-Updates' }, type: 'ADD_HANDLER' },
                    { type: 'SET_IS_NOT_LOADING' },
                    { payload: { item: {__stale__: false}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { type: 'SET_IS_LOADING' },
                    { payload: { item: {}, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: undefined, type: 'SET_USER' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Set User", () => {
        it("Should set user", (done) => {
            reduxStore.dispatch(setUser({id: "CL0001", item_type: "Client", attributeName: "attributeValue"})).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { payload: { attributeName: 'attributeValue', item_type: 'Client', id: 'CL0001' }, type: 'SET_USER' }
                ]);
                done();
            });
        });
    });
    describe("Force Set User", () => {
        it("Should force set user", (done) => {
            reduxStore.dispatch(forceSetUser({ id: "CL0001", item_type: "Client", attributeName: "attributeValue" })).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { payload: { attributeName: 'attributeValue', item_type: 'Client', id: 'CL0001' }, type: 'FORCE_SET_USER' }
                ]);
                done();
            });
        });
    });
    describe("Clear User", () => {
        it("Should clear the user", (done) => {
            reduxStore.dispatch(clearUser()).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { type: 'CLEAR_USER' }
                ]);
                done();
            });
        });
    });
    describe("Set User Attribute", () => {
        it("Should set user attributes", (done) => {
            reduxStore.dispatch(setUserAttribute("attributeName", "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { payload: { item: { attributeName: "attributeValue" }, itemType: 'Client', id: 'CL0001' }, type: 'PUT_ITEM' },
                    { payload: undefined, type: 'SET_USER' }
                ]);
                done();
            });
        });
    });
    describe("set User Attribute At Index", () => {
        it("Should set user attributes at index", (done) => {
            reduxStore.dispatch(setUserAttributeAtIndex("attributeName", 0, "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { payload: {
                        attributeValue: 'attributeValue',
                        index: 0,
                        attributeName: 'attributeName',
                        itemType: 'Client',
                        id: 'CL0001'
                    }, type: 'SET_ITEM_ATTRIBUTE_INDEX' },
                    { payload: undefined, type: 'SET_USER' }
                ]);
                done();
            });
        });
    });
    describe("Add to User Attribute", () => {
        it("Should add to the user's attribute", (done) => {
            reduxStore.dispatch(addToUserAttribute("attributeName", "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { payload: { attributes: {attributeName: ["attributeValue"]}, itemType: 'Client', id: 'CL0001' }, type: 'ADD_TO_ITEM_ATTRIBUTES' },
                    { payload: undefined, type: 'SET_USER' }
                ]);
                done();
            });
        });
    });
    describe("Remove From User Attribute", () => {
        it("Should remove from the user attribute", (done) => {
            reduxStore.dispatch(removeFromUserAttribute("attributeName", "attributeValue")).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { payload: { attributes: {attributeName: ["attributeValue"]}, itemType: 'Client', id: 'CL0001' },
                        type: 'REMOVE_FROM_ITEM_ATTRIBUTES' },
                    { payload: undefined, type: 'SET_USER' }
                ]);
                done();
            });
        });
    });
    describe("Remove From User Attribute At Index", () => {
        it("Should remove from the user attribute at index", (done) => {
            reduxStore.dispatch(removeFromUserAttributeAtIndex("attributeName", 0)).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([ {
                    payload: {
                        index: 0,
                        attributeName: 'attributeName',
                        itemType: 'Client',
                        id: 'CL0001'
                    }, type: 'REMOVE_ITEM_ATTRIBUTE_INDEX' },
                    { payload: undefined, type: 'SET_USER' }
                ]);
                done();
            });
        });
    });
    describe("Update User from cache", () => {
        it("Should update the user from the cache", (done) => {
            reduxStore.dispatch(updateUserFromCache()).then(() => {
                expect(reduxStore.getActions()).excluding('asyncDispatch').to.eql([
                    { payload: undefined, type: 'SET_USER' }
                ]);
                done();
            });
        });
    });
});

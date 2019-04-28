import "../../testing/SetTesting";
import ClientFunctions from "../ClientFunctions";
import {expect} from "chai";

describe("high level functions", () => {
    // static createClient(fromID, name, email, username, successHandler, failureHandler) {
    it("Should create a bare minimum Client correctly", () => {
        expect(ClientFunctions.createClient(
            "FROMID", "NAME", "EMAIL", "USERNAME"
        )).to.eql({
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Client',
            createClientRequest: {
                name: 'NAME',
                gender: null,
                birthday: null,
                email: 'EMAIL',
                username: 'USERNAME',
                bio: null,
                stripeID: null,
                federatedID: null
            }
        });
    });
    // static createClientOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
    it("Should create an optional Client correctly", () => {
        expect(ClientFunctions.createClientOptional(
            "FROMID", "NAME", "GENDER", "BIRTHDAY", "EMAIL", "USERNAME", "BIO"
        )).to.eql({
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Client',
            createClientRequest: {
                name: 'NAME',
                gender: 'GENDER',
                birthday: 'BIRTHDAY',
                email: 'EMAIL',
                username: 'USERNAME',
                bio: null,
                stripeID: 'BIO',
                federatedID: null }
        });
    });
    // static createFederatedClient(fromID, name, email, username, federatedID, successHandler, failureHandler) {
    it("Should create a bare minimum federated Client correctly", () => {
        expect(ClientFunctions.createFederatedClient(
            "FROMID", "NAME", "EMAIL", "USERNAME", "FEDERATEDID"
        )).to.eql({
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Client',
            createClientRequest: {
                name: 'NAME',
                gender: null,
                birthday: null,
                email: 'EMAIL',
                username: 'USERNAME',
                bio: null,
                stripeID: null,
                federatedID: 'FEDERATEDID'
            }
        });
    });
    // static createFederatedClientOptional(fromID, name, gender, birthday, email, username, federatedID, bio, successHandler, failureHandler) {
    it("Should create an optional federated Client correctly", () => {
        expect(ClientFunctions.createFederatedClientOptional(
            "FROMID", "NAME", "GENDER", "BIRTHDAY", "EMAIL", "USERNAME", "FEDERATEDID", "BIO"
        )).to.eql({
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Client',
            createClientRequest: {
                name: 'NAME',
                gender: 'GENDER',
                birthday: 'BIRTHDAY',
                email: 'EMAIL',
                username: 'USERNAME',
                bio: 'BIO',
                stripeID: null,
                federatedID: 'FEDERATEDID' }
        });
    });
});
describe("low level functions", () => {
    it("Should send a create payload for a client correctly", () => {
        expect(ClientFunctions.create(
            "FROMID", "NAME", "GENDER", "BIRTHDAY", "EMAIL", "USERNAME", "STRIPEID", "FEDERATEDID", "BIO"
        )).to.eql({
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Client',
            createClientRequest: {
                name: 'NAME',
                gender: 'GENDER',
                birthday: 'BIRTHDAY',
                email: 'EMAIL',
                username: 'USERNAME',
                bio: 'BIO',
                stripeID: 'STRIPEID',
                federatedID: 'FEDERATEDID' }
        });
    });
// static updateAdd(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update add payload for a client correctly", () => {
        expect(ClientFunctions.updateAdd(
            "FROMID", "CLIENTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Client',
            identifiers: [ 'CLIENTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update remove payload for a client correctly", () => {
        expect(ClientFunctions.updateRemove(
            "FROMID", "CLIENTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Client',
            identifiers: [ 'CLIENTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update set payload for a client correctly", () => {
        expect(ClientFunctions.updateSet(
            "FROMID", "CLIENTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Client',
            identifiers: [ 'CLIENTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static delete(fromID, challengeID, successHandler, failureHandler) {
    it("Should send a delete payload for a client correctly", () => {
        expect(ClientFunctions.delete(
            "FROMID", "CLIENTID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'DELETE',
            itemType: 'Client',
            identifiers: [ 'CLIENTID' ]
        });
    });
});

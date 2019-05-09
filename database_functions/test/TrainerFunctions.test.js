import "../../testing/SetTesting";
import TrainerFunctions from "../TrainerFunctions";
import {expect} from "chai";

describe("high level functions", () => {
    // static createTrainer(fromID, name, email, username, successHandler, failureHandler) {
    it("Should create a bare minimum trainer correctly", () => {
        expect(TrainerFunctions.createTrainer(
            "FROMID", "NAME", "EMAIL", "USERNAME"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Trainer',
            createTrainerRequest: {
                name: 'NAME',
                gender: null,
                birthday: null,
                username: 'USERNAME',
                email: 'EMAIL',
                bio: null,
                stripeID: null,
                federatedID: null
            }
        });
    });
    // static createTrainerOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
    it("Should create an optional trainer correctly", () => {
        expect(TrainerFunctions.createTrainerOptional(
            "FROMID", "NAME", "GENDER", "BIRTHDAY", "EMAIL", "USERNAME", "BIO"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Trainer',
            createTrainerRequest: {
                name: 'NAME',
                gender: 'GENDER',
                birthday: 'BIRTHDAY',
                username: 'USERNAME',
                email: 'EMAIL',
                bio: 'BIO',
                stripeID: null,
                federatedID: null
            }
        });
    });
    // static createFederatedTrainer(fromID, name, email, username, federatedID, successHandler, failureHandler) {
    it("Should create a bare minimum federated ID trainer correctly", () => {
        expect(TrainerFunctions.createFederatedTrainer(
            "FROMID", "NAME", "EMAIL", "USERNAME", "FEDERATEDID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Trainer',
            createTrainerRequest: {
                name: 'NAME',
                gender: null,
                birthday: null,
                username: 'USERNAME',
                email: 'EMAIL',
                bio: null,
                stripeID: null,
                federatedID: 'FEDERATEDID'
            }
        });
    });
    // static createFederatedTrainerOptional(fromID, name, gender, birthday, email, username, federatedID, bio, successHandler, failureHandler) {
    it("Should create an optional federated ID trainer correctly", () => {
        expect(TrainerFunctions.createFederatedTrainerOptional(
            "FROMID", "NAME", "GENDER", "BIRTHDAY", "EMAIL", "USERNAME", "FEDERATEDID", "BIO"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Trainer',
            createTrainerRequest: {
                name: 'NAME',
                gender: 'GENDER',
                birthday: 'BIRTHDAY',
                username: 'USERNAME',
                email: 'EMAIL',
                bio: 'BIO',
                stripeID: null,
                federatedID: 'FEDERATEDID'
            }
        });
    });
});
describe("low level functions", () => {
    it("Should send a create payload for a submission correctly", () => {
        expect(TrainerFunctions.create(
            "FROMID", "NAME", "GENDER", "BIRTHDAY", "EMAIL", "USERNAME", "STRIPEID", "FEDERATEDID", "BIO"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Trainer',
            createTrainerRequest: {
                name: 'NAME',
                gender: 'GENDER',
                birthday: 'BIRTHDAY',
                username: 'USERNAME',
                email: 'EMAIL',
                bio: 'BIO',
                stripeID: 'STRIPEID',
                federatedID: 'FEDERATEDID'
            }
        });
    });
// static updateAdd(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update add payload for a trainer correctly", () => {
        expect(TrainerFunctions.updateAdd(
            "FROMID", "TRAINERID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Trainer',
            identifiers: [ 'TRAINERID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update remove payload for a trainer correctly", () => {
        expect(TrainerFunctions.updateRemove(
            "FROMID", "TRAINERID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Trainer',
            identifiers: [ 'TRAINERID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update set payload for a trainer correctly", () => {
        expect(TrainerFunctions.updateSet(
            "FROMID", "TRAINERID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Trainer',
            identifiers: [ 'TRAINERID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static delete(fromID, challengeID, successHandler, failureHandler) {
    it("Should send a delete payload for a trainer correctly", () => {
        expect(TrainerFunctions.delete(
            "FROMID", "TRAINERID",
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'DELETE',
            itemType: 'Trainer',
            identifiers: [ 'TRAINERID' ]
        });
    });
});

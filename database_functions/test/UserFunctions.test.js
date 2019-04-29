import "../../testing/SetTesting";
import UserFunctions from "../UserFunctions";
import {expect} from "chai";

describe("high level functions", () => {
    // Update Functions ============================================================
    // static addProfileImage(fromID, userID, image, profileImagePath, successHandler, failureHandler) {
    it("Should add profile image to user correctly", () => {
        expect(UserFunctions.addProfileImage(
            "FROMID", "USERID", "IMAGE", "PROFILEIMAGEPATH"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'profileImagePaths',
            attributeValues: [ 'PROFILEIMAGEPATH' ]
        });
    });
    // static removeProfileImage(fromID, userID, profileImagePath, successHandler, failureHandler) {
    it("Should remove profile image from user correctly", () => {
        expect(UserFunctions.removeProfileImage(
            "FROMID", "USERID", "PROFILEIMAGEPATH"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'profileImagePaths',
            attributeValues: [ 'PROFILEIMAGEPATH' ]
        });
    });
    // static addFriend(fromID, userID, friendID, successHandler, failureHandler) {
    it("Should add friend to user correctly", () => {
        expect(UserFunctions.addFriend(
            "FROMID", "USERID", "FRIENDID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'friends',
            attributeValues: [ 'FRIENDID' ]
        });
    });
    // static removeFriend(fromID, userID, friendID, successHandler, failureHandler) {
    it("Should remove friend from user correctly", () => {
        expect(UserFunctions.removeFriend(
            "FROMID", "USERID", "FRIENDID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'friends',
            attributeValues: [ 'FRIENDID' ]
        });
    });
    // static addChallenge(fromID, userID, challengeID, successHandler, failureHandler) {
    it("Should add challenge to user correctly", () => {
        expect(UserFunctions.addChallenge(
            "FROMID", "USERID", "CHALLENGEID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'challenges',
            attributeValues: [ 'CHALLENGEID' ]
        });
    });
    // static removeChallenge(fromID, userID, challengeID, successHandler, failureHandler) {
    it("Should remove challenge from user correctly", () => {
        expect(UserFunctions.removeChallenge(
            "FROMID", "USERID", "CHALLENGEID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'challenges',
            attributeValues: [ 'CHALLENGEID' ]
        });
    });
    // static addEvent(fromID, userID, eventID, successHandler, failureHandler) {
    it("Should add event to user correctly", () => {
        expect(UserFunctions.addEvent(
            "FROMID", "USERID", "EVENTID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'scheduledEvents',
            attributeValues: [ 'EVENTID' ]
        });
    });
    // static removeEvent(fromID, userID, eventID, successHandler, failureHandler) {
    it("Should remove event from user correctly", () => {
        expect(UserFunctions.removeEvent(
            "FROMID", "USERID", "EVENTID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'scheduledEvents',
            attributeValues: [ 'EVENTID' ]
        });
    });
    // static addGroup(fromID, userID, groupID, successHandler, failureHandler) {
    it("Should add group to user correctly", () => {
        expect(UserFunctions.addGroup(
            "FROMID", "USERID", "GROUPID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'groups',
            attributeValues: [ 'GROUPID' ]
        });
    });
    // static removeGroup(fromID, userID, groupID, successHandler, failureHandler) {
    it("Should remove group from user correctly", () => {
        expect(UserFunctions.removeGroup(
            "FROMID", "USERID", "GROUPID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'groups',
            attributeValues: [ 'GROUPID' ]
        });
    });
    // static addMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler) {
    it("Should add message board to user correctly", () => {
        expect(UserFunctions.addMessageBoard(
            "FROMID", "USERID", "MESSAGEBOARD",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'messageBoards',
            attributeValues: [ 'MESSAGEBOARD' ]
        });
    });
    // static removeMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler) {
    it("Should remove message board from user correctly", () => {
        expect(UserFunctions.removeMessageBoard(
            "FROMID", "USERID", "MESSAGEBOARD",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'messageBoards',
            attributeValues: [ 'MESSAGEBOARD' ]
        });
    });
    // static updateName(fromID, userID, name, successHandler, failureHandler) {
    it("Should update user name correctly", () => {
        expect(UserFunctions.updateName(
            "FROMID", "USERID", "NAME",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'name',
            attributeValues: [ 'NAME' ]
        });
    });
    // static updateGender(fromID, userID, gender, successHandler, failureHandler) {
    it("Should update user gender correctly", () => {
        expect(UserFunctions.updateGender(
            "FROMID", "USERID", "GENDER",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'gender',
            attributeValues: [ 'GENDER' ]
        });
    });
    // static updateBirthday(fromID, userID, birthday, successHandler, failureHandler) {
    it("Should update user birthday correctly", () => {
        expect(UserFunctions.updateBirthday(
            "FROMID", "USERID", "BIRTHDAY",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'birthday',
            attributeValues: [ 'BIRTHDAY' ]
        });
    });
    // static updateLocation(fromID, userID, location, successHandler, failureHandler) {
    it("Should update user location correctly", () => {
        expect(UserFunctions.updateLocation(
            "FROMID", "USERID", "LOCATION",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'location',
            attributeValues: [ 'LOCATION' ]
        });
    });
    // static updateBio(fromID, userID, bio, successHandler, failureHandler) {
    it("Should update user bio correctly", () => {
        expect(UserFunctions.updateBio(
            "FROMID", "USERID", "BIO",
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'bio',
            attributeValues: [ 'BIO' ]
        });
    });
    // static updateProfileImage(fromID, userID, profileImage, profileImagePath, successHandler, failureHandler) {
    it("Should update user profile image correctly", () => {
        expect(UserFunctions.updateProfileImage(
            "FROMID", "USERID", "IMAGE", "PROFILEIMAGEPATH"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'profileImagePath',
            attributeValues: [ 'PROFILEIMAGEPATH' ]
        });
    });
});
describe("low level functions", () => {
    it("Should send an update add payload for a user correctly", () => {
        expect(UserFunctions.updateAdd(
            "FROMID", "CL0001", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({ fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Client',
            identifiers: [ 'CL0001' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update remove payload for a user correctly", () => {
        expect(UserFunctions.updateRemove(
            "FROMID", "CL0001", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Client',
            identifiers: [ 'CL0001' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update set payload for a user correctly", () => {
        expect(UserFunctions.updateSet(
            "FROMID", "CL0001", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Client',
            identifiers: [ 'CL0001' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static delete(fromID, challengeID, successHandler, failureHandler) {
    it("Should send a delete payload for a user correctly", () => {
        expect(UserFunctions.delete(
            "FROMID", "CL0001",
        )).to.eql({
            fromID: 'FROMID',
            action: 'DELETE',
            itemType: 'Client',
            identifiers: [ 'CL0001' ]
        });
    });
});

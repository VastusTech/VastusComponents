import "../../testing/SetTesting";
import EventFunctions from "../EventFunctions";
import {expect} from "chai";

describe("high level functions", () => {
    // static createEvent(fromID, owner, time, capacity, address, title, tags, access, successHandler, failureHandler) {
    it("Should create a bare minimum event correctly", () => {
        expect(EventFunctions.createEvent(
            "FROMID", "OWNER", "TIME", "CAPACITY", "ADDRESS", "TITLE", ["TAG1", "TAG2", "TAG3"], "ACCESS"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Event',
            createEventRequest: {
                owner: 'OWNER',
                time: 'TIME',
                capacity: 'CAPACITY',
                address: 'ADDRESS',
                title: 'TITLE',
                description: null,
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                members: null,
                access: 'ACCESS',
                restriction: null,
                challenge: null,
                group: null }
        });
    });
    // static createEventOptional(fromID, owner, time, capacity, address, title, description, tags, memberIDs, access, restriction, successHandler, failureHandler) {
    it("Should create an optional event correctly", () => {
        expect(EventFunctions.createEventOptional(
            "FROMID", "OWNER", "TIME", "CAPACITY", "ADDRESS", "TITLE", "DESCRIPTION", ["TAG1", "TAG2", "TAG3"],
            ["MEMBER1", "MEMBER2", "MEMBER3"], "ACCESS", "RESTRICTION"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Event',
            createEventRequest: {
                owner: 'OWNER',
                time: 'TIME',
                capacity: 'CAPACITY',
                address: 'ADDRESS',
                title: 'TITLE',
                description: 'DESCRIPTION',
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                members: [ 'MEMBER1', 'MEMBER2', 'MEMBER3' ],
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                challenge: null,
                group: null }
        });
    });
    // static createChallengeEvent(fromID, challengeID, owner, time, capacity, address, title, tags, access, successHandler, failureHandler) {
    it("Should create a bare minimum challenge event correctly", () => {
        expect(EventFunctions.createChallengeEvent(
            "FROMID", "CHALLENGEID", "OWNER", "TIME", "CAPACITY", "ADDRESS", "TITLE", ["TAG1", "TAG2", "TAG3"], "ACCESS"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Event',
            createEventRequest: {
                owner: 'OWNER',
                time: 'TIME',
                capacity: 'CAPACITY',
                address: 'ADDRESS',
                title: 'TITLE',
                description: null,
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                members: null,
                access: 'ACCESS',
                restriction: null,
                challenge: 'CHALLENGEID',
                group: null }
        });
    });
    // static createChallengeEventOptional(fromID, challengeID, owner, time, capacity, address, title, description, tags, memberIDs, access, restriction, successHandler, failureHandler) {
    it("Should create an optional challenge event correctly", () => {
        expect(EventFunctions.createChallengeEventOptional(
            "FROMID", "CHALLENGEID", "OWNER", "TIME", "CAPACITY", "ADDRESS", "TITLE", "DESCRIPTION", ["TAG1", "TAG2", "TAG3"],
            ["MEMBER1", "MEMBER2", "MEMBER3"], "ACCESS", "RESTRICTION"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Event',
            createEventRequest: {
                owner: 'OWNER',
                time: 'TIME',
                capacity: 'CAPACITY',
                address: 'ADDRESS',
                title: 'TITLE',
                description: 'DESCRIPTION',
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                members: [ 'MEMBER1', 'MEMBER2', 'MEMBER3' ],
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                challenge: 'CHALLENGEID',
                group: null }
        });
    });
    // static createGroupEvent(fromID, groupID, owner, time, capacity, address, title, access, tags, successHandler, failureHandler) {
    it("Should create a bare minimum group event correctly", () => {
        expect(EventFunctions.createGroupEvent(
            "FROMID", "GROUPID", "OWNER", "TIME", "CAPACITY", "ADDRESS", "TITLE", ["TAG1", "TAG2", "TAG3"], "ACCESS"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Event',
            createEventRequest: {
                owner: 'OWNER',
                time: 'TIME',
                capacity: 'CAPACITY',
                address: 'ADDRESS',
                title: 'TITLE',
                description: null,
                tags: 'ACCESS',
                members: null,
                access: [ 'TAG1', 'TAG2', 'TAG3' ],
                restriction: null,
                challenge: null,
                group: 'GROUPID' }
        });
    });
    // static createGroupEventOptional(fromID, groupID, owner, time, capacity, address, title, description, tags, memberIDs, access, restriction, successHandler, failureHandler) {
    it("Should create an optional group event correctly", () => {
        expect(EventFunctions.createGroupEventOptional(
            "FROMID", "GROUPID", "OWNER", "TIME", "CAPACITY", "ADDRESS", "TITLE", "DESCRIPTION", ["TAG1", "TAG2", "TAG3"],
            ["MEMBER1", "MEMBER2", "MEMBER3"], "ACCESS", "RESTRICTION"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Event',
            createEventRequest: {
                owner: 'OWNER',
                time: 'TIME',
                capacity: 'CAPACITY',
                address: 'ADDRESS',
                title: 'TITLE',
                description: 'DESCRIPTION',
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                members: [ 'MEMBER1', 'MEMBER2', 'MEMBER3' ],
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                challenge: null,
                group: 'GROUPID' }
        });
    });
    // static updateToPrivate(fromID, eventID, successHandler, failureHandler) {
    it("Should update an event to private", () => {
        expect(EventFunctions.updateToPrivate(
            "FROMID", "EVENTID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'access',
            attributeValues: [ 'private' ]
        });
    });
    // static updateToPublic(fromID, eventID, successHandler, failureHandler) {
    it("Should update an event to public", () => {
        expect(EventFunctions.updateToPublic(
            "FROMID", "EVENTID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'access',
            attributeValues: [ 'public' ]
        });
    });
    // static updateToInviteOnly(fromID, eventID, successHandler, failureHandler) {
    it("Should update an event to invite only", () => {
        expect(EventFunctions.updateToInviteOnly(
            "FROMID", "EVENTID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'restriction',
            attributeValues: [ 'invite' ]
        });
    });
    // static updateToUnrestricted(fromID, eventID, successHandler, failureHandler) {
    it("Should update an event to unrestricted", () => {
        expect(EventFunctions.updateToUnrestricted(
            "FROMID", "EVENTID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'restriction',
            attributeValues: [ null ]
        });
    });
    // static addTag(fromID, eventID, tag, successHandler, failureHandler) {
    it("Should add a tag to the event", () => {
        expect(EventFunctions.addTag(
            "FROMID", "EVENTID", "TAG"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'tags',
            attributeValues: [ 'TAG' ]
        });
    });
    // static removeTag(fromID, eventID, tag, successHandler, failureHandler) {
    it("Should remove a tag from the event", () => {
        expect(EventFunctions.removeTag(
            "FROMID", "EVENTID", "TAG"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'tags',
            attributeValues: [ 'TAG' ]
        });
    });
    // static addMember(fromID, eventID, userID, successHandler, failureHandler) {
    // it("Should add a member to the event", () => {
    //     expect(EventFunctions.addMember(
    //         "FROMID", "EVENTID", "MEMBER"
    //     )).to.eql({
    //         environmentType: 'test',
    //         fromID: 'FROMID',
    //         action: 'UPDATEADD',
    //         itemType: 'Message',
    //         identifiers: [ 'MEMBER' ],
    //         attributeName: 'scheduledEvents',
    //         attributeValues: [ 'EVENTID' ]
    //     });
    // });
    // static removeMember(fromID, eventID, userID, successHandler, failureHandler) {
    it("Should remove a member from the event", () => {
        expect(EventFunctions.removeMember(
            "FROMID", "EVENTID", "MEMBER"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Message',
            identifiers: [ 'MEMBER' ],
            attributeName: 'scheduledEvents',
            attributeValues: [ 'EVENTID' ]
        });
    });
    // static updateAddress(fromID, eventID, address, successHandler, failureHandler) {
    it("Should update an event's address", () => {
        expect(EventFunctions.updateAddress(
            "FROMID", "EVENTID", "ADDRESS"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'address',
            attributeValues: [ 'ADDRESS' ]
        });
    });
    // static updateCapacity(fromID, eventID, capacity, successHandler, failureHandler) {
    it("Should update an event's capacity", () => {
        expect(EventFunctions.updateCapacity(
            "FROMID", "EVENTID", "CAPACITY"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'capacity',
            attributeValues: [ 'CAPACITY' ]
        });
    });
    // static updateTitle(fromID, eventID, title, successHandler, failureHandler) {
    it("Should update an event's title", () => {
        expect(EventFunctions.updateTitle(
            "FROMID", "EVENTID", "TITLE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'title',
            attributeValues: [ 'TITLE' ]
        });
    });
    // static updateDescription(fromID, eventID, description, successHandler, failureHandler) {
    it("Should update an event's description", () => {
        expect(EventFunctions.updateDescription(
            "FROMID", "EVENTID", "DESCRIPTION"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'description',
            attributeValues: [ 'DESCRIPTION' ]
        });
    });
});
describe("low level functions", () => {
    it("Should send a create payload for an event correctly", () => {
        expect(EventFunctions.create(
            "FROMID", "OWNER", "TIME", "CAPACITY", "ADDRESS", "TITLE", "DESCRIPTION", ["TAG1", "TAG2", "TAG3"],
            ["MEMBER1", "MEMBER2", "MEMBER3"], "ACCESS", "RESTRICTION", "CHALLENGEID", "GROUPID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Event',
            createEventRequest: {
                owner: 'OWNER',
                time: 'TIME',
                capacity: 'CAPACITY',
                address: 'ADDRESS',
                title: 'TITLE',
                description: 'DESCRIPTION',
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                members: [ 'MEMBER1', 'MEMBER2', 'MEMBER3' ],
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                challenge: 'CHALLENGEID',
                group: 'GROUPID' }
        });
    });
// static updateAdd(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update add payload for an event correctly", () => {
        expect(EventFunctions.updateAdd(
            "FROMID", "EVENTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update remove payload for an event correctly", () => {
        expect(EventFunctions.updateRemove(
            "FROMID", "EVENTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update set payload for an event correctly", () => {
        expect(EventFunctions.updateSet(
            "FROMID", "EVENTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static delete(fromID, challengeID, successHandler, failureHandler) {
    it("Should send a delete payload for an event correctly", () => {
        expect(EventFunctions.delete(
            "FROMID", "EVENTID",
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'DELETE',
            itemType: 'Event',
            identifiers: [ 'EVENTID' ]
        });
    });
});

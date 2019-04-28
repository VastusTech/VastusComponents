import "../../testing/SetTesting";
import GroupFunctions from "../GroupFunctions";
import {expect} from "chai";

describe("high level functions", () => {
    // static createGroup(fromID, title, description, access, successHandler, failureHandler) {
    it("Should create a bare minimum group correctly", () => {
        expect(GroupFunctions.createGroup(
            "FROMID", "TITLE", "DESCRIPTION", "ACCESS"
        )).to.eql({
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Group',
            createGroupRequest: {
                title: 'TITLE',
                description: 'DESCRIPTION',
                motto: null,
                owners: null,
                members: null,
                tags: null,
                access: 'ACCESS',
                restriction: null,
                groupImagePath: null }
        });
    });
    // static createGroupOptional(fromID, title, description, motto, groupImage, owners, members, tags, access, restriction, successHandler, failureHandler) {
    it("Should create an optional group correctly", () => {
        expect(GroupFunctions.createGroupOptional(
            "FROMID", "TITLE", "DESCRIPTION", "MOTTO", "GROUPIMAGE", ["OWNER1", "OWNER2", "OWNER3"],
            ["MEMBER1", "MEMBER2", "MEMBER3"], ["TAG1", "TAG2", "TAG3"], "ACCESS", "RESTRICTION"
        )).to.eql({
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Group',
            createGroupRequest: {
                title: 'TITLE',
                description: 'DESCRIPTION',
                motto: 'MOTTO',
                owners: [ 'OWNER1', 'OWNER2', 'OWNER3' ],
                members: [ 'MEMBER1', 'MEMBER2', 'MEMBER3' ],
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                groupImagePath: 'groupImage' }
        });
    });
    // static updateToPrivate(fromID, groupID, successHandler, failureHandler) {
    it("Should update a group to private", () => {
        expect(GroupFunctions.updateToPrivate(
            "FROMID", "GROUPID"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'access',
            attributeValues: [ 'private' ]
        });
    });
    // static updateToPublic(fromID, groupID, successHandler, failureHandler) {
    it("Should update a group to public", () => {
        expect(GroupFunctions.updateToPublic(
            "FROMID", "GROUPID"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'access',
            attributeValues: [ 'public' ]
        });
    });
    // static updateToInviteOnly(fromID, groupID, successHandler, failureHandler) {
    it("Should update a group to invite only", () => {
        expect(GroupFunctions.updateToInviteOnly(
            "FROMID", "GROUPID"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'restriction',
            attributeValues: [ 'invite' ]
        });
    });
    // static updateToUnrestricted(fromID, groupID, successHandler, failureHandler) {
    it("Should update a group to unrestricted", () => {
        expect(GroupFunctions.updateToUnrestricted(
            "FROMID", "GROUPID"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'restriction',
            attributeValues: [ null ]
        });
    });
    // static addTag(fromID, groupID, tag, successHandler, failureHandler) {
    it("Should add a tag to a group", () => {
        expect(GroupFunctions.addTag(
            "FROMID", "GROUPID", "TAG"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'tags',
            attributeValues: [ 'TAG' ]
        });
    });
    // static removeTag(fromID, groupID, tag, successHandler, failureHandler) {
    it("Should remove a tag from a group", () => {
        expect(GroupFunctions.removeTag(
            "FROMID", "GROUPID", "TAG"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'tags',
            attributeValues: [ 'TAG' ]
        });
    });
    // static addMember(fromID, groupID, userID, successHandler, failureHandler) {
    it("Should add a member to a group", () => {
        expect(GroupFunctions.addMember(
            "FROMID", "GROUPID", "MEMBER"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Message',
            identifiers: [ 'MEMBER' ],
            attributeName: 'groups',
            attributeValues: [ 'GROUPID' ]
        });
    });
    // static removeMember(fromID, groupID, userID, successHandler, failureHandler) {
    it("Should remove a member from a group", () => {
        expect(GroupFunctions.removeMember(
            "FROMID", "GROUPID", "MEMBER"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Message',
            identifiers: [ 'MEMBER' ],
            attributeName: 'groups',
            attributeValues: [ 'GROUPID' ]
        });
    });
    // static updateTitle(fromID, groupID, title, successHandler, failureHandler) {
    it("Should update the title of a group", () => {
        expect(GroupFunctions.updateTitle(
            "FROMID", "GROUPID", "TITLE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'title',
            attributeValues: [ 'TITLE' ]
        });
    });
    // static updateMotto(fromID, groupID, motto, successHandler, failureHandler) {
    it("Should update the motto of a group", () => {
        expect(GroupFunctions.updateMotto(
            "FROMID", "GROUPID", "MOTTO"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'motto',
            attributeValues: [ 'MOTTO' ]
        });
    });
    // static updateDescription(fromID, groupID, description, successHandler, failureHandler) {
    it("Should update the description of a group", () => {
        expect(GroupFunctions.updateDescription(
            "FROMID", "GROUPID", "DESCRIPTION"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'description',
            attributeValues: [ 'DESCRIPTION' ]
        });
    });
    // static updateGroupImage(fromID, groupID, groupImage, successHandler, failureHandler) {
    it("Should update the group image of a group", () => {
        expect(GroupFunctions.updateGroupImage(
            "FROMID", "GROUPID", "GROUPIMAGE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'groupImagePath',
            attributeValues: [ 'groupImage' ]
        });
    });
});
describe("low level functions", () => {
    it("Should send a create payload for a group correctly", () => {
        expect(GroupFunctions.create(
            "FROMID", "TITLE", "DESCRIPTION", "MOTTO", "GROUPIMAGE", ["OWNER1", "OWNER2", "OWNER3"],
            ["MEMBER1", "MEMBER2", "MEMBER3"], ["TAG1", "TAG2", "TAG3"], "ACCESS", "RESTRICTION"
        )).to.eql({
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Group',
            createGroupRequest: {
                title: 'TITLE',
                description: 'DESCRIPTION',
                motto: 'MOTTO',
                owners: [ 'OWNER1', 'OWNER2', 'OWNER3' ],
                members: [ 'MEMBER1', 'MEMBER2', 'MEMBER3' ],
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                groupImagePath: 'groupImage' }
        });
    });
// static updateAdd(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update add payload for a group correctly", () => {
        expect(GroupFunctions.updateAdd(
            "FROMID", "GROUPID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update remove payload for a group correctly", () => {
        expect(GroupFunctions.updateRemove(
            "FROMID", "GROUPID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update set payload for a group correctly", () => {
        expect(GroupFunctions.updateSet(
            "FROMID", "GROUPID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static delete(fromID, challengeID, successHandler, failureHandler) {
    it("Should send a delete payload for a group correctly", () => {
        expect(GroupFunctions.delete(
            "FROMID", "GROUPID",
        )).to.eql({
            fromID: 'FROMID',
            action: 'DELETE',
            itemType: 'Group',
            identifiers: [ 'GROUPID' ]
        });
    });
});

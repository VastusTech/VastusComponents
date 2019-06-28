import "../../testing/SetTesting";
import InviteFunctions from "../InviteFunctions";
import {expect} from "chai";

describe("high level functions", () => {
  // static createFriendRequest(fromID, from, to, successHandler, failureHandler) {
  it("Should create a friend request correctly", () => {
    expect(InviteFunctions.createFriendRequest(
      "FROMID", "FROM", "TO"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'TO',
        inviteType: 'friendRequest',
        about: 'FROM',
        description: null
      }
    });
  });
  // static createFriendRequestOptional(fromID, from, to, message, successHandler, failureHandler) {
  it("Should create a friend request with message correctly", () => {
    expect(InviteFunctions.createFriendRequestOptional(
      "FROMID", "FROM", "TO", "MESSAGE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'TO',
        inviteType: 'friendRequest',
        about: 'FROM',
        description: 'MESSAGE'
      }
    });
  });
  // static createEventInvite(fromID, from, to, eventID, successHandler, failureHandler) {
  it("Should create an event invite correctly", () => {
    expect(InviteFunctions.createEventInvite(
      "FROMID", "FROM", "TO", "EVENTID"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'TO',
        inviteType: 'eventInvite',
        about: 'EVENTID',
        description: null
      }
    });
  });
  // static createEventInviteOptional(fromID, from, to, eventID, message, successHandler, failureHandler) {
  it("Should create an event invite with message correctly", () => {
    expect(InviteFunctions.createEventInviteOptional(
      "FROMID", "FROM", "TO", "EVENTID", "MESSAGE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'TO',
        inviteType: 'eventInvite',
        about: 'EVENTID',
        description: 'MESSAGE'
      }
    });
  });
  // static createChallengeInvite(fromID, from, to, challengeID, successHandler, failureHandler) {
  it("Should create a challenge invite correctly", () => {
    expect(InviteFunctions.createChallengeInvite(
      "FROMID", "FROM", "TO", "CHALLENGEID"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'TO',
        inviteType: 'challengeInvite',
        about: 'CHALLENGEID',
        description: null
      }
    });
  });
  // static createChallengeInviteOptional(fromID, from, to, challengeID, message, successHandler, failureHandler) {
  it("Should create a challenge invite with message correctly", () => {
    expect(InviteFunctions.createChallengeInviteOptional(
      "FROMID", "FROM", "TO", "CHALLENGEID", "MESSAGE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'TO',
        inviteType: 'challengeInvite',
        about: 'CHALLENGEID',
        description: 'MESSAGE'
      }
    });
  });
  // static createGroupInvite(fromID, from, to, groupID, successHandler, failureHandler) {
  it("Should create a group invite correctly", () => {
    expect(InviteFunctions.createGroupInvite(
      "FROMID", "FROM", "TO", "GROUPID"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'TO',
        inviteType: 'challengeInvite',
        about: 'GROUPID',
        description: null
      }
    });
  });
  // static createGroupInviteOptional(fromID, from, to, groupID, message, successHandler, failureHandler) {
  it("Should create a group invite with message correctly", () => {
    expect(InviteFunctions.createGroupInviteOptional(
      "FROMID", "FROM", "TO", "GROUPID", "MESSAGE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'TO',
        inviteType: 'groupInvite',
        about: 'GROUPID',
        description: 'MESSAGE'
      }
    });
  });
  // static createEventRequest(fromID, from, eventID, successHandler, failureHandler) {
  it("Should create an event request correctly", () => {
    expect(InviteFunctions.createEventRequest(
      "FROMID", "FROM", "EVENTID"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'EVENTID',
        inviteType: 'eventRequest',
        about: 'FROM',
        description: null
      }
    });
  });
  // static createEventRequestOptional(fromID, from, eventID, message, successHandler, failureHandler) {
  it("Should create an event request with message correctly", () => {
    expect(InviteFunctions.createEventRequestOptional(
      "FROMID", "FROM", "EVENTID", "MESSAGE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'EVENTID',
        inviteType: 'eventRequest',
        about: 'FROM',
        description: 'MESSAGE'
      }
    });
  });
  // static createChallengeRequest(fromID, from, challengeID, successHandler, failureHandler) {
  it("Should create a challenge request correctly", () => {
    expect(InviteFunctions.createChallengeRequest(
      "FROMID", "FROM", "CHALLENGEID"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'CHALLENGEID',
        inviteType: 'challengeRequest',
        about: 'FROM',
        description: null
      }
    });
  });
  // static createChallengeRequestOptional(fromID, from, challengeID, message, successHandler, failureHandler) {
  it("Should create a challenge request with message correctly", () => {
    expect(InviteFunctions.createChallengeRequestOptional(
      "FROMID", "FROM", "CHALLENGEID", "MESSAGE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'CHALLENGEID',
        inviteType: 'challengeRequest',
        about: 'FROM',
        description: 'MESSAGE'
      }
    });
  });
  // static createGroupRequest(fromID, from, groupID, successHandler, failureHandler) {
  it("Should create a group request correctly", () => {
    expect(InviteFunctions.createGroupRequest(
      "FROMID", "FROM", "GROUPID"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'GROUPID',
        inviteType: 'groupRequest',
        about: 'FROM',
        description: null
      }
    });
  });
  // static createGroupRequestOptional(fromID, from, groupID, message, successHandler, failureHandler) {
  it("Should create a group request with message correctly", () => {
    expect(InviteFunctions.createGroupRequestOptional(
      "FROMID", "FROM", "GROUPID", "MESSAGE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'GROUPID',
        inviteType: 'groupRequest',
        about: 'FROM',
        description: 'MESSAGE'
      }
    });
  });
});
describe("low level functions", () => {
  it("Should send a create payload for an invite correctly", () => {
    expect(InviteFunctions.create(
      "FROMID", "FROM", "TO", "INVITETYPE", "ABOUT", "DESCRIPTION"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Invite',
      createInviteRequest: {
        from: 'FROM',
        to: 'TO',
        inviteType: 'INVITETYPE',
        about: 'ABOUT',
        description: 'DESCRIPTION'
      }
    });
  });
  it("Should send an update add payload for an invite correctly", () => {
    expect(InviteFunctions.updateAdd(
      "FROMID", "INVITEID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEADD',
      itemType: 'Invite',
      identifiers: ['INVITEID'],
      attributeName: 'ATTRIBUTENAME',
      attributeValues: ['ATTRIBUTEVALUE']
    });
  });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
  it("Should send an update remove payload for an invite correctly", () => {
    expect(InviteFunctions.updateRemove(
      "FROMID", "INVITEID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEREMOVE',
      itemType: 'Invite',
      identifiers: ['INVITEID'],
      attributeName: 'ATTRIBUTENAME',
      attributeValues: ['ATTRIBUTEVALUE']
    });
  });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
  it("Should send an update set payload for an invite correctly", () => {
    expect(InviteFunctions.updateSet(
      "FROMID", "INVITEID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATESET',
      itemType: 'Invite',
      identifiers: ['INVITEID'],
      attributeName: 'ATTRIBUTENAME',
      attributeValues: ['ATTRIBUTEVALUE']
    });
  });
// static delete(fromID, challengeID, successHandler, failureHandler) {
  it("Should send a delete payload for an invite correctly", () => {
    expect(InviteFunctions.delete(
      "FROMID", "INVITEID",
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'DELETE',
      itemType: 'Invite',
      identifiers: ['INVITEID']
    });
  });
});

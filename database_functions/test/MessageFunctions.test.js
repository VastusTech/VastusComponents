import "../../testing/SetTesting";
import MessageFunctions from "../MessageFunctions";
import {expect} from "chai";

describe("high level functions", () => {
  // static createTextMessage(fromID, from, name, profileImagePath, board, message, successHandler, failureHandler) {
  it("Should create a text message correctly", () => {
    expect(MessageFunctions.createTextMessage(
      "FROMID", "FROM", "NAME", "PROFILEIMAGEPATH", "BOARD", "MESSAGE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Message',
      createMessageRequest: {
        from: 'FROM',
        name: 'NAME',
        profileImagePath: 'PROFILEIMAGEPATH',
        board: 'BOARD',
        type: null,
        message: 'MESSAGE'
      }
    });
  });
  // static createPictureMessage(fromID, from, name, profileImagePath, board, picture, picturePath, successHandler, failureHandler) {
  it("Should create a picture message correctly", () => {
    expect(MessageFunctions.createPictureMessage(
      "FROMID", "FROM", "NAME", "PROFILEIMAGEPATH", "BOARD", "PICTURE", "PICTUREPATH"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Message',
      createMessageRequest: {
        from: 'FROM',
        name: 'NAME',
        profileImagePath: 'PROFILEIMAGEPATH',
        board: 'BOARD',
        type: 'picture',
        message: 'PICTUREPATH'
      }
    });
  });
  // static createVideoMessage(fromID, from, name, profileImagePath, board, video, videoPath, successHandler, failureHandler) {
  it("Should create a video message correctly", () => {
    expect(MessageFunctions.createVideoMessage(
      "FROMID", "FROM", "NAME", "PROFILEIMAGEPATH", "BOARD", "VIDEO", "VIDEOPATH"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Message',
      createMessageRequest: {
        from: 'FROM',
        name: 'NAME',
        profileImagePath: 'PROFILEIMAGEPATH',
        board: 'BOARD',
        type: 'video',
        message: 'VIDEOPATH'
      }
    });
  });
  // static addLastSeen(fromID, board, messageID, userID, successHandler, failureHandler) {
  it("Should update the last seen of the message correctly", () => {
    expect(MessageFunctions.addLastSeen(
      "FROMID", "BOARD", "MESSAGEID", "USERID"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEADD',
      itemType: 'Message',
      identifiers: ['MESSAGEID'],
      secondaryIdentifier: 'BOARD',
      attributeName: 'lastSeenFor',
      attributeValues: ['USERID']
    });
  });
});
describe("low level functions", () => {
  it("Should send a create payload for a message correctly", () => {
    expect(MessageFunctions.create(
      "FROMID", "BOARD", "FROM", "NAME", "PROFILEIMAGEPATH", "TYPE", "MESSAGE", "FILE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Message',
      createMessageRequest: {
        from: 'FROM',
        name: 'NAME',
        profileImagePath: 'PROFILEIMAGEPATH',
        board: 'BOARD',
        type: 'TYPE',
        message: 'MESSAGE'
      }
    });
  });
  it("Should send an update add payload for a message correctly", () => {
    expect(MessageFunctions.updateAdd(
      "FROMID", "BOARD", "MESSAGEID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEADD',
      itemType: 'Message',
      identifiers: ['MESSAGEID'],
      secondaryIdentifier: 'BOARD',
      attributeName: 'ATTRIBUTENAME',
      attributeValues: ['ATTRIBUTEVALUE']
    });
  });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
  it("Should send an update remove payload for a message correctly", () => {
    expect(MessageFunctions.updateRemove(
      "FROMID", "BOARD", "MESSAGEID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEREMOVE',
      itemType: 'Message',
      identifiers: ['MESSAGEID'],
      secondaryIdentifier: 'BOARD',
      attributeName: 'ATTRIBUTENAME',
      attributeValues: ['ATTRIBUTEVALUE']
    });
  });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
  it("Should send an update set payload for a message correctly", () => {
    expect(MessageFunctions.updateSet(
      "FROMID", "BOARD", "MESSAGEID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATESET',
      itemType: 'Message',
      identifiers: ['MESSAGEID'],
      secondaryIdentifier: 'BOARD',
      attributeName: 'ATTRIBUTENAME',
      attributeValues: ['ATTRIBUTEVALUE']
    });
  });
// static delete(fromID, challengeID, successHandler, failureHandler) {
  it("Should send a delete payload for a message correctly", () => {
    expect(MessageFunctions.delete(
      "FROMID", "BOARD", "MESSAGEID",
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'DELETE',
      itemType: 'Message',
      identifiers: ['MESSAGEID'],
      secondaryIdentifier: 'BOARD'
    });
  });
});

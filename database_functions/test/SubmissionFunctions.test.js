import "../../testing/SetTesting";
import SubmissionFunctions from "../SubmissionFunctions";
import {expect} from "chai";

describe("high level functions", () => {
  // static createSubmission(fromID, by, challengeID, description, pictures, videos, successHandler, failureHandler) {
  it("Should create a submission correctly", () => {
    expect(SubmissionFunctions.createSubmission(
      "FROMID", "BY", "DESCRIPTION", "ABOUT", {"PICTUREPATH": "PICTURE"}, {"VIDEOPATH": "VIDEO"}
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Submission',
      createSubmissionRequest: {
        by: 'BY',
        description: 'ABOUT',
        about: 'DESCRIPTION',
        picturePaths: ['PICTUREPATH'],
        videoPaths: ['VIDEOPATH']
      }
    });
  });
  // static updateDescription(fromID, submissionID, description, successHandler, failureHandler) {
  it("Should update a submission's description correctly", () => {
    expect(SubmissionFunctions.updateDescription(
      "FROMID", "SUBMISSIONID", "DESCRIPTION"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATESET',
      itemType: 'Submission',
      identifiers: ['SUBMISSIONID'],
      attributeName: 'description',
      attributeValues: ['DESCRIPTION']
    });
  });
  // static addPicture(fromID, submissionID, picture, picturePath, successHandler, failureHandler) {
  it("Should add a picture to a submission correctly", () => {
    expect(SubmissionFunctions.addPicture(
      "FROMID", "SUBMISSIONID", "PICTURE", "PICTUREPATH"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEADD',
      itemType: 'Submission',
      identifiers: ['SUBMISSIONID'],
      attributeName: 'picturePaths',
      attributeValues: ['PICTUREPATH']
    });
  });
  // static addVideo(fromID, submissionID, video, videoPath, successHandler, failureHandler) {
  it("Should add a video to a submission correctly", () => {
    expect(SubmissionFunctions.addVideo(
      "FROMID", "SUBMISSIONID", "VIDEO", "VIDEOPATH"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEADD',
      itemType: 'Submission',
      identifiers: ['SUBMISSIONID'],
      attributeName: 'videoPaths',
      attributeValues: ['VIDEOPATH']
    });
  });
  // static removePicture(fromID, submissionID, picturePath, successHandler, failureHandler) {
  it("Should remove a picture from a submission correctly", () => {
    expect(SubmissionFunctions.removePicture(
      "FROMID", "SUBMISSIONID", "PICTUREPATH"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEREMOVE',
      itemType: 'Submission',
      identifiers: ['SUBMISSIONID'],
      attributeName: 'picturePaths',
      attributeValues: ['PICTUREPATH']
    });
  });
  // static removeVideo(fromID, submissionID, videoPath, successHandler, failureHandler) {
  it("Should remove a video from a submission correctly", () => {
    expect(SubmissionFunctions.removeVideo(
      "FROMID", "SUBMISSIONID", "VIDEOPATH"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEREMOVE',
      itemType: 'Submission',
      identifiers: ['SUBMISSIONID'],
      attributeName: 'videoPaths',
      attributeValues: ['VIDEOPATH']
    });
  });
});
describe("low level functions", () => {
  it("Should send a create payload for a submission correctly", () => {
    expect(SubmissionFunctions.create(
      "FROMID", "BY", "DESCRIPTION", "ABOUT", {"PICTUREPATH": "PICTURE"}, {"VIDEOPATH": "VIDEO"}
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'CREATE',
      itemType: 'Submission',
      createSubmissionRequest: {
        by: 'BY',
        description: 'DESCRIPTION',
        about: 'ABOUT',
        picturePaths: ['PICTUREPATH'],
        videoPaths: ['VIDEOPATH']
      }
    });
  });
// static updateAdd(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
  it("Should send an update add payload for a submission correctly", () => {
    expect(SubmissionFunctions.updateAdd(
      "FROMID", "SUBMISSIONID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEADD',
      itemType: 'Submission',
      identifiers: ['SUBMISSIONID'],
      attributeName: 'ATTRIBUTENAME',
      attributeValues: ['ATTRIBUTEVALUE']
    });
  });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
  it("Should send an update remove payload for a submission correctly", () => {
    expect(SubmissionFunctions.updateRemove(
      "FROMID", "SUBMISSIONID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATEREMOVE',
      itemType: 'Submission',
      identifiers: ['SUBMISSIONID'],
      attributeName: 'ATTRIBUTENAME',
      attributeValues: ['ATTRIBUTEVALUE']
    });
  });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
  it("Should send an update set payload for a submission correctly", () => {
    expect(SubmissionFunctions.updateSet(
      "FROMID", "SUBMISSIONID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'UPDATESET',
      itemType: 'Submission',
      identifiers: ['SUBMISSIONID'],
      attributeName: 'ATTRIBUTENAME',
      attributeValues: ['ATTRIBUTEVALUE']
    });
  });
// static delete(fromID, challengeID, successHandler, failureHandler) {
  it("Should send a delete payload for a submission correctly", () => {
    expect(SubmissionFunctions.delete(
      "FROMID", "SUBMISSIONID",
    )).to.eql({
      environmentType: 'test',
      fromID: 'FROMID',
      action: 'DELETE',
      itemType: 'Submission',
      identifiers: ['SUBMISSIONID']
    });
  });
});

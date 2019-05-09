import "../../testing/SetTesting";
import CommentFunctions from "../CommentFunctions";
import {expect} from "chai";

describe("high level functions", () => {
    // static createComment(fromID, byID, onID, comment, successHandler, failureHandler) {
    it("Should create a comment correctly", () => {
        expect(CommentFunctions.createComment(
            "FROMID", "BYID", "ONID", "COMMENT"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Comment',
            createCommentRequest: {
                by: 'BYID',
                on: 'ONID',
                message: 'COMMENT'
            }
        });
    });
    // static updateComment(fromID, commentID, comment, successHandler, failureHandler) {
    it("Should update a comment correctly", () => {
        expect(CommentFunctions.updateComment(
            "FROMID", "COMMENTID", "COMMENT"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Comment',
            identifiers: [ 'COMMENTID' ],
            attributeName: 'comment',
            attributeValues: [ 'COMMENT' ]
        });
    });
});
describe("low level functions", () => {
    it("Should send a create payload for a comment correctly", () => {
        expect(CommentFunctions.create(
            "FROMID", "BY", "ON", "COMMENT"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Comment',
            createCommentRequest: {
                by: 'BY',
                on: 'ON',
                message: 'COMMENT'
            }
        });
    });
// static updateAdd(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update add payload for a comment correctly", () => {
        expect(CommentFunctions.updateAdd(
            "FROMID", "COMMENTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Comment',
            identifiers: [ 'COMMENTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update remove payload for a comment correctly", () => {
        expect(CommentFunctions.updateRemove(
            "FROMID", "COMMENTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Comment',
            identifiers: [ 'COMMENTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update set payload for a comment correctly", () => {
        expect(CommentFunctions.updateSet(
            "FROMID", "COMMENTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Comment',
            identifiers: [ 'COMMENTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static delete(fromID, challengeID, successHandler, failureHandler) {
    it("Should send a delete payload for a comment correctly", () => {
        expect(CommentFunctions.delete(
            "FROMID", "COMMENTID",
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'DELETE',
            itemType: 'Comment',
            identifiers: [ 'COMMENTID' ]
        });
    });
});

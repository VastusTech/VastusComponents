import "../../testing/SetTesting";
import PostFunctions from "../PostFunctions";
import {expect} from "chai";

describe("high level functions", () => {
    // static createPost(fromID, by, description, access, successHandler, failureHandler) {
    it("Should create a bare post correctly", () => {
        expect(PostFunctions.createPost(
            "FROMID", "BY", "DESCRIPTION", "ACCESS"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Post',
            createPostRequest: {
                by: 'BY',
                description: 'DESCRIPTION',
                access: 'ACCESS',
                postType: null,
                about: null,
                picturePaths: null,
                videoPaths: null
            }
        });
    });
    // static createPostOptional(fromID, by, description, access, pictures, videos, successHandler, failureHandler) {
    it("Should create an optional post correctly", () => {
        expect(PostFunctions.createPostOptional(
            "FROMID", "BY", "DESCRIPTION", "ACCESS", {"PICTUREPATH": "PICTURE"}, {"VIDEOPATH": "VIDEO"}
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Post',
            createPostRequest: {
                by: 'BY',
                description: 'DESCRIPTION',
                access: 'ACCESS',
                postType: null,
                about: null,
                picturePaths: [ 'PICTUREPATH' ],
                videoPaths: [ 'VIDEOPATH' ]
            }
        });
    });
    // static createShareItemPost(fromID, by, description, access, itemType, itemID, successHandler, failureHandler) {
    it("Should create a bare share item post correctly", () => {
        expect(PostFunctions.createShareItemPost(
            "FROMID", "BY", "DESCRIPTION", "ACCESS", "ITEMTYPE", "ITEMID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Post',
            createPostRequest: {
                by: 'BY',
                description: 'DESCRIPTION',
                access: 'ACCESS',
                postType: 'ITEMTYPE',
                about: 'ITEMID',
                picturePaths: null,
                videoPaths: null
            }
        });
    });
    // static createShareItemPostOptional(fromID, by, description, access, itemType, itemID, pictures, videos, successHandler, failureHandler) {
    it("Should create an optional share item post correctly", () => {
        expect(PostFunctions.createShareItemPostOptional(
            "FROMID", "BY", "DESCRIPTION", "ACCESS", "ITEMTYPE", "ITEMID", {"PICTUREPATH": "PICTURE"},
            {"VIDEOPATH": "VIDEO"}
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Post',
            createPostRequest: {
                by: 'BY',
                description: 'DESCRIPTION',
                access: 'ACCESS',
                postType: 'ITEMTYPE',
                about: 'ITEMID',
                picturePaths: [ 'PICTUREPATH' ],
                videoPaths: [ 'VIDEOPATH' ]
            }
        });
    });
    // static updateDescription(fromID, postID, description, successHandler, failureHandler) {
    it("Should update a post's description correctly", () => {
        expect(PostFunctions.updateDescription(
            "FROMID", "POSTID", "DESCRIPTION"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Post',
            identifiers: [ 'POSTID' ],
            attributeName: 'description',
            attributeValues: [ 'DESCRIPTION' ]
        });
    });
    // static updateAccess(fromID, postID, access, successHandler, failureHandler) {
    it("Should update a post's access correctly", () => {
        expect(PostFunctions.updateAccess(
            "FROMID", "POSTID", "ACCESS"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Post',
            identifiers: [ 'POSTID' ],
            attributeName: 'access',
            attributeValues: [ 'ACCESS' ]
        });
    });
    // static addPicture(fromID, postID, picture, picturePath, successHandler, failureHandler) {
    it("Should add a picture to a post correctly", () => {
        expect(PostFunctions.addPicture(
            "FROMID", "POSTID", "PICTURE", "PICTUREPATH"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Post',
            identifiers: [ 'POSTID' ],
            attributeName: 'picturePaths',
            attributeValues: [ 'PICTUREPATH' ]
        });
    });
    // static addVideo(fromID, postID, video, videoPath, successHandler, failureHandler) {
    it("Should add a video to a post correctly", () => {
        expect(PostFunctions.addVideo(
            "FROMID", "POSTID", "VIDEO", "VIDEOPATH"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Post',
            identifiers: [ 'POSTID' ],
            attributeName: 'videoPaths',
            attributeValues: [ 'VIDEOPATH' ]
        });
    });
    // static removePicture(fromID, postID, picturePath, successHandler, failureHandler) {
    it("Should remove a picture from a post correctly", () => {
        expect(PostFunctions.removePicture(
            "FROMID", "POSTID", "PICTUREPATH"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Post',
            identifiers: [ 'POSTID' ],
            attributeName: 'picturePaths',
            attributeValues: [ 'PICTUREPATH' ]
        });
    });
    // static removeVideo(fromID, postID, videoPath, successHandler, failureHandler) {
    it("Should remove a video from a post correctly", () => {
        expect(PostFunctions.removeVideo(
            "FROMID", "POSTID", "VIDEOPATh"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Post',
            identifiers: [ 'POSTID' ],
            attributeName: 'videoPaths',
            attributeValues: [ 'VIDEOPATh' ]
        });
    });
});
describe("low level functions", () => {
    it("Should send a create payload for a post correctly", () => {
        expect(PostFunctions.create(
            "FROMID", "BY", "DESCRIPTION", "ACCESS", "POSTTYPE", "ABOUT", {"PICTUREPATH": "PICTURE"},
            {"VIDEOPATH": "VIDEO"}
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Post',
            createPostRequest: {
                by: 'BY',
                description: 'DESCRIPTION',
                access: 'ACCESS',
                postType: 'POSTTYPE',
                about: 'ABOUT',
                picturePaths: [ 'PICTUREPATH' ],
                videoPaths: [ 'VIDEOPATH' ]
            }
        });
    });
    it("Should send an update add payload for a post correctly", () => {
        expect(PostFunctions.updateAdd(
            "FROMID", "POSTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Post',
            identifiers: [ 'POSTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update remove payload for a post correctly", () => {
        expect(PostFunctions.updateRemove(
            "FROMID", "POSTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Post',
            identifiers: [ 'POSTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update set payload for a post correctly", () => {
        expect(PostFunctions.updateSet(
            "FROMID", "POSTID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Post',
            identifiers: [ 'POSTID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static delete(fromID, challengeID, successHandler, failureHandler) {
    it("Should send a delete payload for a post correctly", () => {
        expect(PostFunctions.delete(
            "FROMID", "POSTID",
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'DELETE',
            itemType: 'Post',
            identifiers: [ 'POSTID' ]
        });
    });
});

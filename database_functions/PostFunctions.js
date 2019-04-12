import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";

/**
 * Holds all the potential properly formatted Lambda functions for Posts.
 */
class PostFunctions {
    // ======================================================================================================
    // Post High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================
    // TODO IMPORTANT: pictures and videos are objects with { key = S3Path : value = file }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param by
     * @param description
     * @param access
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createBarePost(fromID, by, description, access, successHandler, failureHandler) {
        return this.createNormalPost(fromID, by, description, access, null, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param by
     * @param description
     * @param access
     * @param eventID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createNewEventPost(fromID, by, description, access, eventID, successHandler, failureHandler) {
        return this.createNewItemPost(fromID, by, description, access, "Event", eventID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param by
     * @param description
     * @param access
     * @param challengeID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createNewChallengePost(fromID, by, description, access, challengeID, successHandler, failureHandler) {
        return this.createNewItemPost(fromID, by, description, access, "Challenge", challengeID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param by
     * @param description
     * @param access
     * @param pictures
     * @param videos
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createNormalPost(fromID, by, description, access, pictures, videos, successHandler, failureHandler) {
        return this.create(fromID, by, description, access, null, null, pictures, videos, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param by
     * @param description
     * @param access
     * @param itemType
     * @param itemID
     * @param pictures
     * @param videos
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createShareItemPost(fromID, by, description, access, itemType, itemID, pictures, videos, successHandler, failureHandler) {
        return this.create(fromID, by, description, access, itemType, itemID, pictures, videos, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param by
     * @param description
     * @param access
     * @param itemType
     * @param itemID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createNewItemPost(fromID, by, description, access, itemType, itemID, successHandler, failureHandler) {
        return this.create(fromID, by, description, access, "new" + itemType, itemID, null, null, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param postID
     * @param description
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateDescription(fromID, postID, description, successHandler, failureHandler) {
        return this.updateSet(fromID, postID, "description", description, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param postID
     * @param access
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateAccess(fromID, postID, access, successHandler, failureHandler) {
        return this.updateSet(fromID, postID, "access", access, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param postID
     * @param picture
     * @param picturePath
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     */
    static addPicture(fromID, postID, picture, picturePath, successHandler, failureHandler) {
        S3.putImage(picturePath, picture, () => {
            return this.updateAdd(fromID, postID, "picturePaths", picturePath, successHandler, (error) => {
                // Try your best to correct, then give up...
                S3.delete(picturePath);
                failureHandler(error);
            });
        }, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param postID
     * @param video
     * @param videoPath
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     */
    static addVideo(fromID, postID, video, videoPath, successHandler, failureHandler) {
        S3.putVideo(videoPath, video, successHandler, failureHandler, () => {
            return this.updateAdd(fromID, postID, "videoPaths", videoPath, successHandler, (error) => {
                // Try your best to correct, then give up...
                S3.delete(videoPath);
                failureHandler(error);
            });
        }, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param postID
     * @param picturePath
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removePicture(fromID, postID, picturePath, successHandler, failureHandler) {
        return this.updateRemove(fromID, postID, "picturePaths", picturePath, (data) => {
            S3.delete(picturePath, () => {
                successHandler(data);
            }, failureHandler);
        }, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param postID
     * @param videoPath
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeVideo(fromID, postID, videoPath, successHandler, failureHandler) {
        return this.updateRemove(fromID, postID, "videoPaths", videoPath, (data) => {
            S3.delete(videoPath, () => {
                successHandler(data);
            }, failureHandler);
        }, failureHandler);
    }

    // ======================================================================================================
    // Post Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param by
     * @param description
     * @param access
     * @param postType
     * @param about
     * @param pictures
     * @param videos
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, by, description, access, postType, about, pictures, videos, successHandler, failureHandler) {
        let picturePaths = null;
        let videoPaths = null;
        if(pictures) {
            picturePaths = Object.keys(pictures);
        }
        if(videos) {
            videoPaths = Object.keys(videos);
        }
        let numPictures = 0;
        let numVideos = 0;
        if (picturePaths) { numPictures = picturePaths.length; }
        if (videoPaths) { numVideos = videoPaths.length; }
        return Lambda.create(fromID, "Post", {
            by,
            description,
            access,
            postType,
            about,
            picturePaths,
            videoPaths,
        }, (data) => {
            const id = data.data;
            const numVideosAndPictures = numPictures + numVideos;
            let numFinished = 0;
            function finish() {
                numFinished++;
                if (numFinished >= numVideosAndPictures) { successHandler(data); }
            }
            function error(error) {
                // TODO Delete the object and abort!
                PostFunctions.delete(fromID, id);
                failureHandler(error);
            }
            if (numVideosAndPictures === 0) {
                successHandler(data);
            }
            else {
                if (pictures) {
                    for (const key in pictures) {
                        if (pictures.hasOwnProperty(key) && pictures[key]) {
                            S3.putImage(id + "/" + key, pictures[key], finish, error);
                        }
                    }
                }
                if (videos) {
                    for (const key in videos) {
                        if (videos.hasOwnProperty(key) && videos[key]) {
                            S3.putVideo(id + "/" + key, videos[key], finish, error);
                        }
                    }
                }
            }
        }, failureHandler);
    }

    static updateAdd(fromID, postID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, postID, "Post", attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, postID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, postID, "Post", attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, postID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, postID, "Post", attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param postID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, postID, successHandler, failureHandler) {
        return Lambda.delete(fromID, postID, "Post", successHandler, failureHandler);
    }
}

export default PostFunctions;

import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";
import TestHelper from "../testing/TestHelper";

/**
 * Holds all the potential properly formatted Lambda functions for Posts.
 */
class PostFunctions {
    // ======================================================================================================
    // Post High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     * Creates a bare bones Post in the database using as little information as possible.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} by The ID of the User who created the Submission.
     * @param {string} description The string description for the Submission.
     * @param {string} access The access of the Post and who can view it. ("public" or "private").
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createPost(fromID, by, description, access, successHandler, failureHandler) {
        return PostFunctions.createPostOptional(fromID, by, description, access, null, null, successHandler, failureHandler);
    }

    /**
     * Creates a normal Post in the database with a description, photos, or videos. Just a normal post.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} by The ID of the User who created the Submission.
     * @param {string} description The string description for the Submission.
     * @param {string} access The access of the Post and who can view it. ("public" or "private").
     * @param {{}} pictures The picture map with key/value = S3Path : file, dictating the pictures to add with what key.
     * @param {{}} videos The video map with key/value = S3Path : file, dictating the videos to add with what key.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createPostOptional(fromID, by, description, access, pictures, videos, successHandler, failureHandler) {
        return PostFunctions.create(fromID, by, description, access, null, null, pictures, videos, successHandler, failureHandler);
    }

    /**
     * Creates a bare bones share-item Post in the database using as little information as possible. Basically allows
     * the User to share an item in their Post feed.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} by The ID of the User who created the Submission.
     * @param {string} description The string description for the Submission.
     * @param {string} access The access of the Post and who can view it. ("public" or "private").
     * @param {string} itemType The type of the item to share in the Post.
     * @param {string} itemID The ID of the item to share in the Post.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createShareItemPost(fromID, by, description, access, itemType, itemID, successHandler, failureHandler) {
        return PostFunctions.createShareItemPostOptional(fromID, by, description, access, itemType, itemID, null, null, successHandler, failureHandler);
    }

    /**
     * Creates a share-item Post in the database using as description, pictures, or videos. Basically allows
     * the User to share an item in their Post feed.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} by The ID of the User who created the Submission.
     * @param {string} description The string description for the Submission.
     * @param {string} access The access of the Post and who can view it. ("public" or "private").
     * @param {string} itemType The type of the item to share in the Post.
     * @param {string} itemID The ID of the item to share in the Post.
     * @param {{}} pictures The picture map with key/value = S3Path : file, dictating the pictures to add with what key.
     * @param {{}} videos The video map with key/value = S3Path : file, dictating the videos to add with what key.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createShareItemPostOptional(fromID, by, description, access, itemType, itemID, pictures, videos, successHandler, failureHandler) {
        return PostFunctions.create(fromID, by, description, access, itemType, itemID, pictures, videos, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * Updates the description of a Post in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} postID The ID of the Post to update.
     * @param {string} description The description for the Post to set.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateDescription(fromID, postID, description, successHandler, failureHandler) {
        return PostFunctions.updateSet(fromID, postID, "description", description, successHandler, failureHandler);
    }

    /**
     * Updates the access of the Post in the database, changing who can view and access it.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} postID The ID of the Post to update.
     * @param {string} access The new access of the Post. ("public" or "private").
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateAccess(fromID, postID, access, successHandler, failureHandler) {
        return PostFunctions.updateSet(fromID, postID, "access", access, successHandler, failureHandler);
    }

    /**
     * Adds a picture to a Post object in the database and in S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} postID The ID of the Post to update.
     * @param {*} picture The picture file to place into S3.
     * @param {string} picturePath The path of the picture to put into S3 and add to the Post.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     */
    static addPicture(fromID, postID, picture, picturePath, successHandler, failureHandler) {
        S3.putImage(picturePath, picture, () => {
            PostFunctions.updateAdd(fromID, postID, "picturePaths", picturePath, successHandler, (error) => {
                // Try your best to correct, then give up...
                S3.delete(picturePath);
                failureHandler(error);
            });
        }, failureHandler);
        if (TestHelper.ifTesting) {
            return PostFunctions.updateAdd(fromID, postID, "picturePaths", picturePath);
        }
    }

    /**
     * Adds a video to a Post object in the database and in S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} postID The ID of the Post to update.
     * @param {*} video The video file to place into S3.
     * @param {string} videoPath The path of the video to put into S3 and add to the Post.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     */
    static addVideo(fromID, postID, video, videoPath, successHandler, failureHandler) {
        S3.putVideo(videoPath, video, successHandler, failureHandler, () => {
            PostFunctions.updateAdd(fromID, postID, "videoPaths", videoPath, successHandler, (error) => {
                // Try your best to correct, then give up...
                S3.delete(videoPath);
                failureHandler(error);
            });
        }, failureHandler);
        if (TestHelper.ifTesting) {
            return PostFunctions.updateAdd(fromID, postID, "videoPaths", videoPath);
        }
    }

    /**
     * Removes a picture from a Post in the database and in S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} postID The ID of the Post to update.
     * @param {string} picturePath The S3 path of the picture.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removePicture(fromID, postID, picturePath, successHandler, failureHandler) {
        return PostFunctions.updateRemove(fromID, postID, "picturePaths", picturePath, (data) => {
            S3.delete(picturePath, () => {
                if (successHandler) {
                    successHandler(data);
                }
            }, failureHandler);
        }, failureHandler);
    }

    /**
     * Removes a video from a Post in the database and in S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} postID The ID of the Post to update.
     * @param {string} videoPath The S3 path of the video.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeVideo(fromID, postID, videoPath, successHandler, failureHandler) {
        return PostFunctions.updateRemove(fromID, postID, "videoPaths", videoPath, (data) => {
            S3.delete(videoPath, () => {
                if (successHandler) {
                    successHandler(data);
                }
            }, failureHandler);
        }, failureHandler);
    }

    // ======================================================================================================
    // Post Low-Level Functions ~
    // ======================================================================================================

    /**
     * Creates a Post in the database using the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} by The ID of the User who created the Submission.
     * @param {string} description The string description for the Submission.
     * @param {string} access The access of the Post and who can view it. ("public" or "private").
     * @param {string} postType The type of the Post to place within the database.
     * @param {string} about The ID of the item that this Post is referencing.
     * @param {{}} pictures The picture map with key/value = S3Path : file, dictating the pictures to add with what key.
     * @param {{}} videos The video map with key/value = S3Path : file, dictating the videos to add with what key.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, by, description, access, postType, about, pictures, videos, successHandler, failureHandler) {
        let picturePaths = null;
        let videoPaths = null;
        if (pictures) {
            picturePaths = Object.keys(pictures);
        }
        if (videos) {
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
            if (data) {
                const id = data.data;
                const numVideosAndPictures = numPictures + numVideos;
                let numFinished = 0;
                const finish = () => {
                    numFinished++;
                    if (numFinished >= numVideosAndPictures) {
                        successHandler(data);
                    }
                };
                const error = (error) => {
                    // TODO Delete the object and abort!
                    PostFunctions.delete(fromID, id);
                    failureHandler(error);
                };
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
     * Deletes a Post from the database and all of its dependencies.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} postID The ID of the Post to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, postID, successHandler, failureHandler) {
        // TODO Delete all the S3 Paths within the Post?
        return Lambda.delete(fromID, postID, "Post", successHandler, failureHandler);
    }
}

export default PostFunctions;

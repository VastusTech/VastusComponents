import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";

/**
 * Holds all the potential properly formatted Lambda functions for Submissions.
 */
class SubmissionFunctions {
    // ======================================================================================================
    // Submission High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================
    // TODO IMPORTANT: pictures and videos are objects with { key = S3Path : value = file }

    /**
     * TODO
     *
     * @param fromID
     * @param by
     * @param challengeID
     * @param description
     * @param pictures
     * @param videos
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createSubmission(fromID, by, challengeID, description, pictures, videos, successHandler, failureHandler) {
        return this.create(fromID, by, description, challengeID, pictures, videos, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param postID
     * @param description
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateDescription(fromID, postID, description, successHandler, failureHandler) {
        return this.updateSet(fromID, postID, "description", description, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param postID
     * @param picture
     * @param picturePath
     * @param successHandler
     * @param failureHandler
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
     * @param fromID
     * @param postID
     * @param video
     * @param videoPath
     * @param successHandler
     * @param failureHandler
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
     * @param fromID
     * @param postID
     * @param picturePath
     * @param successHandler
     * @param failureHandler
     * @return {*}
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
     * @param fromID
     * @param postID
     * @param videoPath
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeVideo(fromID, postID, videoPath, successHandler, failureHandler) {
        return this.updateRemove(fromID, postID, "videoPaths", videoPath, (data) => {
            S3.delete(videoPath, () => {
                successHandler(data);
            }, failureHandler);
        }, failureHandler);
    }

    // ======================================================================================================
    // Submission Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param fromID
     * @param by
     * @param description
     * @param about
     * @param pictures
     * @param videos
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static create(fromID, by, description, about, pictures, videos, successHandler, failureHandler) {
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
        return Lambda.create(fromID, "Submission", {
            by,
            description,
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
                SubmissionFunctions.delete(fromID, id);
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
        return Lambda.updateAddToAttribute(fromID, postID, "Submission", attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, postID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, postID, "Submission", attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, postID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, postID, "Submission", attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param postID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static delete(fromID, postID, successHandler, failureHandler) {
        return Lambda.delete(fromID, postID, "Submission", successHandler, failureHandler);
    }
}

export default SubmissionFunctions;

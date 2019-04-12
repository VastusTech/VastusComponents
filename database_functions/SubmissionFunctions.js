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

    /**
     * Creates a Submission within a Challenge to become a candidate for winning a Challenge.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} by The ID of the User who created the Submission.
     * @param {string} challengeID The ID of the Challenge to complete the submission for.
     * @param {string} description The string description for the Submission.
     * @param {{}} pictures The picture map with key/value = S3Path : file, dictating the pictures to add with what key.
     * @param {{}} videos The video map with key/value = S3Path : file, dictating the videos to add with what key.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createSubmission(fromID, by, challengeID, description, pictures, videos, successHandler, failureHandler) {
        return this.create(fromID, by, description, challengeID, pictures, videos, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * Updates the description of a Submission in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} submissionID The ID of the Submission to update.
     * @param {string} description The description for the Submission to set.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateDescription(fromID, submissionID, description, successHandler, failureHandler) {
        return this.updateSet(fromID, submissionID, "description", description, successHandler, failureHandler);
    }

    /**
     * Adds a picture to a Submission object in the database and in S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} submissionID The ID of the Submission to update.
     * @param {*} picture The picture file to place into S3.
     * @param {string} picturePath The path of the picture to put into S3 and add to the Submission.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     */
    static addPicture(fromID, submissionID, picture, picturePath, successHandler, failureHandler) {
        S3.putImage(picturePath, picture, () => {
            return this.updateAdd(fromID, submissionID, "picturePaths", picturePath, successHandler, (error) => {
                // Try your best to correct, then give up...
                S3.delete(picturePath);
                failureHandler(error);
            });
        }, failureHandler);
    }

    /**
     * Adds a video to a Submission object in the database and in S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} submissionID The ID of the Submission to update.
     * @param {*} video The video file to place into S3.
     * @param {string} videoPath The path of the video to put into S3 and add to the Submission.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     */
    static addVideo(fromID, submissionID, video, videoPath, successHandler, failureHandler) {
        S3.putVideo(videoPath, video, successHandler, failureHandler, () => {
            return this.updateAdd(fromID, submissionID, "videoPaths", videoPath, successHandler, (error) => {
                // Try your best to correct, then give up...
                S3.delete(videoPath);
                failureHandler(error);
            });
        }, failureHandler);
    }

    /**
     * Removes a picture from a Submission in the database and in S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} submissionID The ID of the Submission to update.
     * @param {string} picturePath The S3 path of the picture.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removePicture(fromID, submissionID, picturePath, successHandler, failureHandler) {
        return this.updateRemove(fromID, submissionID, "picturePaths", picturePath, (data) => {
            S3.delete(picturePath, () => {
                successHandler(data);
            }, failureHandler);
        }, failureHandler);
    }

    /**
     * Removes a video from a Submission in the database and in S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} submissionID The ID of the Submission to update.
     * @param {string} videoPath The S3 path of the video.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeVideo(fromID, submissionID, videoPath, successHandler, failureHandler) {
        return this.updateRemove(fromID, submissionID, "videoPaths", videoPath, (data) => {
            S3.delete(videoPath, () => {
                successHandler(data);
            }, failureHandler);
        }, failureHandler);
    }

    // ======================================================================================================
    // Submission Low-Level Functions ~
    // ======================================================================================================

    /**
     * Creates a Submission object in the database using the information given.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} by The ID of the User who created the Submission.
     * @param {string} about The ID of the object to complete the submission for.
     * @param {string} description The string description for the Submission.
     * @param {{}} pictures The picture map with key/value = S3Path : file, dictating the pictures to add with what key.
     * @param {{}} videos The video map with key/value = S3Path : file, dictating the videos to add with what key.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
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

    static updateAdd(fromID, submissionID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, submissionID, "Submission", attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, submissionID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, submissionID, "Submission", attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, submissionID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, submissionID, "Submission", attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * Deletes a Submission from the database and all of its dependencies.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} submissionID The ID of the Submission to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, submissionID, successHandler, failureHandler) {
        // TODO Delete all the S3 Paths within the Post?
        return Lambda.delete(fromID, submissionID, "Submission", successHandler, failureHandler);
    }
}

export default SubmissionFunctions;

import * as AWS from "aws-sdk";
import { Storage } from "aws-amplify";
import {err, log} from "../../Constants";
import TestHelper from "../testing/TestHelper";

/**
 * Class for handling all the interactions with our S3 Bucket files.
 */
class S3Storage {
    static bucketName = process.env.NODE_ENV === "production" ? 'vastusofficial' : 'vastusdevelopmentofficial';
    static multipartSize = 10 * 1024 * 1024;
    static multipartQueueSize = 8;

    // ======================================================================================================
    // S3 Storage High-Level Functions ~
    // ======================================================================================================

    /**
     * Puts an image into the S3 bucket at a specific path (using file structure syntax).
     *
     * @param {string} path The key path for the file.
     * @param {*} image The file to place into the S3 bucket.
     * @param {function(*)} successHandler The function to handle the result of the S3 placement.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the S3 operation.
     */
    static putImage(path, image, successHandler, failureHandler) {
        return S3Storage.put(path, image, "image/*", progress => console.log(progress.loaded + "/" + progress.total),
            successHandler, failureHandler);
    }

    /**
     * Puts a video into the S3 bucket at a specific path (using file structure syntax).
     *
     * @param {string} path The key path for the file.
     * @param {*} video The file to place into the S3 bucket.
     * @param {function(*)} successHandler The function to handle the result of the S3 placement.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the S3 operation.
     */
    static putVideo(path, video, successHandler, failureHandler) {
        return S3Storage.multipartPut(path, video, "video/*", progress => console.log("Uploaded :: " +
            parseInt((progress.loaded * 100) / progress.total )+'%'), successHandler, failureHandler);
    }

    /**
     * Puts either a picture or a video into the S3 bucket at a specific path (using file structure syntax).
     *
     * @param {string} path The key path for the file.
     * @param {*} media The file to place into the S3 bucket.
     * @param {function(*)} successHandler The function to handle the result of the S3 placement.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the S3 operation.
     */
    static putVideoOrImage(path, media, successHandler, failureHandler) {
        return S3Storage.put(path, media, "video/*;image/*", progress => console.log(progress.loaded + "/" + progress.total),
            successHandler, failureHandler);
    }

    /**
     * Determines whether or not the given path actually corresponds to a file in S3 or not.
     *
     * @param {string} path The key path for the file.
     * @param {function(boolean)} successHandler The function to handle the answer of whether or not the path exists.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the S3 operation.
     */
    static ifExists(path, successHandler, failureHandler) {
        if (TestHelper.ifTesting) {
            if (successHandler) {
                successHandler(true);
            }
        }
        else {
            let bucket = new AWS.S3({params: {Bucket: S3Storage.bucketName}});
            bucket.headObject({
                Bucket: S3Storage.bucketName,
                Key: path
            }, (err) => {
                if (err) {
                    if (err.code === "NotFound") {
                        if (successHandler) {
                            successHandler(false);
                        }
                    }
                    else {
                        if (failureHandler) {
                            failureHandler(err);
                        }
                    }
                }
                else {
                    if (successHandler) {
                        successHandler(true);
                    }
                }
            });
        }
        return path;
    }

    // ======================================================================================================
    // S3 Storage Low-Level Functions ~
    // ======================================================================================================

    /**
     * Gets the media from the S3 bucket for a file at a specific path.
     *
     * @param {string} path The key path for the file.
     * @param {function(*)} successHandler The function to handle the successfully received file.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the S3 operation.
     */
    static get(path, successHandler, failureHandler) {
        // returns URL
        if (TestHelper.ifTesting && successHandler ) {
            successHandler(null);
        }
        TestHelper.ifTesting || Storage.get(path).then((url) => {
            log&&console.log("Storage successfully retrieved file! URL = " + url);
            if (successHandler) { successHandler(url); }
        }).catch((error) => {
            err&&console.error("Storage failed to retrieve file with path = " + path + "... Error: " + error);
            if (failureHandler) { failureHandler(error); }
        });
        return path;
    }

    /**
     * Puts a file into S3 using the Amplify Storage module.
     *
     * @param {string} path The key path for the file.
     * @param {*} file The file to place into the S3 bucket.
     * @param {string} contentType The type of the content to place into the bucket.
     * @param {function({loaded: number, total: number})} progressHandler
     * @param {function(*)} successHandler The function to handle the result of the S3 placement.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the S3 operation.
     */
    static put(path, file, contentType, progressHandler, successHandler, failureHandler) {
        if (TestHelper.ifTesting && successHandler ) {
            successHandler(null);
        }
        TestHelper.ifTesting || Storage.put(path, file, { contentType, progressCallback: progressHandler}).then((result) => {
            log&&console.log("Storage successfully put file in! Result: " + JSON.stringify(result));
            if (successHandler) { successHandler(result); }
        }).catch((error) => {
            err&&console.error("Storage failed put function... Error: " + error);
            if (failureHandler) { failureHandler(error); }
        });
        return path;
    }

    /**
     * Uses the AWS S3 Module's Multipart put to make a put operation go faster. Uses multi-threading to speed up the
     * upload.
     *
     * @param {string} path The key path for the file.
     * @param {*} file The file to place into the S3 bucket.
     * @param {string} contentType The type of the content to place into the bucket.
     * @param {function({loaded: number, total: number})} progressHandler
     * @param {function(*)} successHandler The function to handle the result of the S3 placement.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the S3 operation.
     */
    static multipartPut(path, file, contentType, progressHandler, successHandler, failureHandler) {
        if (TestHelper.ifTesting) {
            if (successHandler) {
                successHandler(null);
            }
        }
        else {
            let bucket = new AWS.S3({params: {Bucket: S3Storage.bucketName}});
            let params = {Key: "public/" + path, ContentType: contentType, Body: file};
            let options = {partSize: S3Storage.multipartSize, queueSize: S3Storage.multipartQueueSize};
            bucket.upload(params, options).on('httpUploadProgress', progressHandler).send((error, data) => {
                if (error) {
                    err && console.error(error);
                    if (failureHandler) {
                        failureHandler(err);
                    }
                }
                else {
                    if (successHandler) {
                        successHandler(data);
                    }
                    log && console.log("Video uploaded successfully.");
                }
            });
        }
        return path;
    }

    /**
     * Deletes a file from the S3 bucket at the given path.
     *
     * @param {string} path The key path of the file.
     * @param {function(*)} successHandler The function to handle the result of the successful deletion.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the S3 operation.
     */
    static delete(path, successHandler, failureHandler) {
        if (TestHelper.ifTesting && successHandler) {
            successHandler(null);
        }
        TestHelper.ifTesting || Storage.remove(path).then((result) => {
            log&&console.log("Storage successfully removed file! Result: " + JSON.stringify(result));
            if (successHandler) { successHandler(result); }
        }).catch((error) => {
            err&&console.error("Storage failed remove function... Error: " + error);
            if (failureHandler) { failureHandler(error); }
        });
        return path;
    }
}

export default S3Storage;

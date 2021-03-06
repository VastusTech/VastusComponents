import * as AWS from "aws-sdk";
import { Storage } from "aws-amplify";
import {err, log} from "../../Constants";

/**
 * Class for handling all the interactions with our S3 Bucket files.
 */
class S3Storage {
    static bucketName = 'vastusofficial';
    // User-Level Functions

    /**
     * TODO
     *
     * @param path
     * @param image
     * @param successHandler
     * @param failureHandler
     */
    static putImage(path, image, successHandler, failureHandler) {
        S3Storage.put(path, image, "image/*", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param path
     * @param video
     * @param successHandler
     * @param failureHandler
     */
    static putVideo(path, video, successHandler, failureHandler) {
        let bucket = new AWS.S3({params: {Bucket: S3Storage.bucketName}});
        if (video) {
            let params = {Key: "public/" + path, ContentType: video.type, Body: video};
            let options = {partSize: 10 * 1024 * 1024, queueSize: 8};
            bucket.upload(params, options).on('httpUploadProgress', function(evt) {
                console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total )+'%');
            }).send(function(error, data) {
                if (error) {
                    err&&console.error(error);
                    failureHandler(err);
                }
                else {
                    successHandler(data);
                    log&&console.log("Video uploaded successfully.");
                }
            });
        }
    }

    /**
     * TODO
     *
     * @param path
     * @param media
     * @param successHandler
     * @param failureHandler
     */
    static putVideoOrImage(path, media, successHandler, failureHandler) {
        S3Storage.put(path, media, "video/*;image/*", successHandler, failureHandler);
    }

    // Low Level Functions
    /**
     * TODO
     *
     * @param path
     * @param successHandler
     * @param failureHandler
     */
    static get(path, successHandler, failureHandler) {
        // returns URL
        Storage.get(path).then((url) => {
            log&&console.log("Storage successfully retrieved file! URL = " + url);
            if (successHandler) { successHandler(url); }
        }).catch((error) => {
            err&&console.error("Storage failed to retrieve file with path = " + path + "... Error: " + error);
            if (failureHandler) { failureHandler(error); }
        });
    }

    /**
     * TODO
     *
     * @param path
     * @param successHandler
     * @param failureHandler
     */
    static ifExists(path, successHandler, failureHandler) {
        let bucket = new AWS.S3({params: {Bucket: S3Storage.bucketName}});
        bucket.headObject({
            Bucket: S3Storage.bucketName,
            Key: path
        }, (err) => {
            if (err) {
                if (err.code === "NotFound") {
                    successHandler(false);
                }
                else {
                    failureHandler(err);
                }
            }
            else {
                successHandler(true);
            }
        });
    }

    /**
     * TODO
     *
     * @param path
     * @param file
     * @param contentType
     * @param successHandler
     * @param failureHandler
     */
    static put(path, file, contentType, successHandler, failureHandler) {
        Storage.put(path, file, { contentType, progressCallback(progress) { console.log(`Uploaded: ${progress.loaded}/${progress.total}`);} }).then((result) => {
            log&&console.log("Storage successfully put file in! Result: " + JSON.stringify(result));
            if (successHandler) { successHandler(result); }
        }).catch((error) => {
            err&&console.error("Storage failed put function... Error: " + error);
            if (failureHandler) { failureHandler(error); }
        });
    }

    /**
     * TODO
     *
     * @param path
     * @param successHandler
     * @param failureHandler
     */
    static delete(path, successHandler, failureHandler) {
        Storage.remove(path).then((result) => {
            log&&console.log("Storage successfully removed file! Result: " + JSON.stringify(result));
            if (successHandler) { successHandler(result); }
        }).catch((error) => {
            err&&console.error("Storage failed remove function... Error: " + error);
            if (failureHandler) { failureHandler(error); }
        });
    }
}

export default S3Storage;

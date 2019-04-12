import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";

const itemType = "Message";

/**
 * Holds all the potential properly formatted Lambda functions for Messages.
 */
class MessageFunctions {
    // ======================================================================================================
    // Message High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param name
     * @param profileImagePath
     * @param board
     * @param message
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createTextMessage(fromID, from, name, profileImagePath, board, message, successHandler, failureHandler) {
        return this.create(fromID, board, from, name, profileImagePath, null, message, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param name
     * @param profileImagePath
     * @param board
     * @param picture
     * @param picturePath
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createPictureMessage(fromID, from, name, profileImagePath, board, picture, picturePath, successHandler, failureHandler) {
        return this.create(fromID, board, from, name, profileImagePath, "picture", picturePath, picture, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param name
     * @param profileImagePath
     * @param board
     * @param video
     * @param videoPath
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createVideoMessage(fromID, from, name, profileImagePath, board, video, videoPath, successHandler, failureHandler) {
        return this.create(fromID, board, from, name, profileImagePath, "video", videoPath, video, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param board
     * @param messageID
     * @param userID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addLastSeen(fromID, board, messageID, userID, successHandler, failureHandler) {
        return this.updateAdd(fromID, board, messageID, "lastSeenFor", userID, successHandler, failureHandler);
    }

    // ======================================================================================================
    // Message Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param board
     * @param from
     * @param name
     * @param profileImagePath
     * @param type
     * @param message
     * @param file
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, board, from, name, profileImagePath, type, message, file, successHandler, failureHandler) {
        return Lambda.create(fromID, "Message", {
            from,
            name,
            profileImagePath,
            board,
            type,
            message,
        }, (data) => {
            // TODO Soon we'll have to adjust the Java project to be able to delete messages!
            if (type) {
                const path = data.data + "/" + message;
                if (type === "picture") {
                    S3.putImage(path, file, () => { successHandler(data); }, failureHandler);
                }
                else if (type === "video") {
                    S3.putVideo(path, file, () => { successHandler(data); }, failureHandler);
                }
            }
            else {
                successHandler(data);
            }
        }, failureHandler);
    }
    static updateAdd(fromID, board, messageID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.invokeDatabaseLambda({
            fromID,
            action: "UPDATEADD",
            itemType,
            identifiers: [messageID],
            secondaryIdentifier: board,
            attributeName,
            attributeValues: [attributeValue],
        }, successHandler, failureHandler);
    }

    // TODO Implement this when we find use cases for this.

    // static updateRemove(fromID, inviteID, attributeName, attributeValue, successHandler, failureHandler) {
    //     Lambda.updateRemoveFromAttribute(fromID, inviteID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    // }
    // static updateSet(fromID, inviteID, attributeName, attributeValue, successHandler, failureHandler) {
    //     Lambda.updateSetAttribute(fromID, inviteID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    // }
    // static delete(fromID, inviteID, successHandler, failureHandler) {
    //     Lambda.invokeDatabaseLambda({
    //         fromID,
    //         itemType,
    //
    //     }, successHandler, failureHandler);
    // }
}

export default MessageFunctions;

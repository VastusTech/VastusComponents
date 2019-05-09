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
     * Creates a normal text Message in the database to send to a board.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User who is sending this Message.
     * @param {string} name The name of the User sending this Message.
     * @param {string} profileImagePath The path of this User's profile image.
     * @param {string} board The Message Board to send the Message to.
     * @param {string} message The actual string text to send the Message with.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createTextMessage(fromID, from, name, profileImagePath, board, message, successHandler, failureHandler) {
        return MessageFunctions.create(fromID, board, from, name, profileImagePath, null, message, null, successHandler, failureHandler);
    }

    /**
     * Creates a picture Message in the database and in S3 to send to a board.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User who is sending this Message.
     * @param {string} name The name of the User sending this Message.
     * @param {string} profileImagePath The path of this User's profile image.
     * @param {string} board The Message Board to send the Message to.
     * @param {string} picture The picture file to send with the Message.
     * @param {string} picturePath The S3 path to add the picture to in the S3 bucket.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createPictureMessage(fromID, from, name, profileImagePath, board, picture, picturePath, successHandler, failureHandler) {
        return MessageFunctions.create(fromID, board, from, name, profileImagePath, "picture", picturePath, picture, successHandler, failureHandler);
    }

    /**
     * Creates a video Message in the database and in S3 to send to a board.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User who is sending this Message.
     * @param {string} name The name of the User sending this Message.
     * @param {string} profileImagePath The path of this User's profile image.
     * @param {string} board The Message Board to send the Message to.
     * @param {string} video The video file to send with the Message.
     * @param {string} videoPath The S3 path to add the video to in the S3 bucket.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createVideoMessage(fromID, from, name, profileImagePath, board, video, videoPath, successHandler, failureHandler) {
        return MessageFunctions.create(fromID, board, from, name, profileImagePath, "video", videoPath, video, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * Updates the last seen attribute of a Message, telling the board that its read status has been updated.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} board The Message Board containing the Message.
     * @param {string} messageID The ID of the message to update.
     * @param {string} userID The User ID to add the read status of.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addLastSeen(fromID, board, messageID, userID, successHandler, failureHandler) {
        return MessageFunctions.updateAdd(fromID, board, messageID, "lastSeenFor", userID, successHandler, failureHandler);
    }

    // ======================================================================================================
    // Message Low-Level Functions ~
    // ======================================================================================================

    /**
     * Creates a Message in the database and adds the paths to S3 using the information given.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} board The Message Board to send the Message to.
     * @param {string} from The ID of the User who is sending this Message.
     * @param {string} name The name of the User sending this Message.
     * @param {string} profileImagePath The path of this User's profile image.
     * @param {string} type The type of Message to send to the database. ("picture", "video", or null).
     * @param {string} message The main message to send to the board.
     * @param {string} file The file to send with the Message.
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
            if (data && type) {
                const path = data.data + "/" + message;
                if (type === "picture") {
                    S3.putImage(path, file, () => { successHandler(data); }, failureHandler);
                }
                else if (type === "video") {
                    S3.putVideo(path, file, () => { successHandler(data); }, failureHandler);
                }
            }
            else {
                if (successHandler) {
                    successHandler(data);
                }
            }
        }, failureHandler);
    }

    static updateAdd(fromID, board, messageID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.invokeDatabaseLambda({
            environmentType: process.env.NODE_ENV,
            fromID,
            action: "UPDATEADD",
            itemType,
            identifiers: [messageID],
            secondaryIdentifier: board,
            attributeName,
            attributeValues: [attributeValue],
        }, successHandler, failureHandler);
    }
    static updateRemove(fromID, board, messageID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.invokeDatabaseLambda({
            environmentType: process.env.NODE_ENV,
            fromID,
            action: "UPDATEREMOVE",
            itemType,
            identifiers: [messageID],
            secondaryIdentifier: board,
            attributeName,
            attributeValues: [attributeValue],
        }, successHandler, failureHandler);
    }
    static updateSet(fromID, board, messageID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.invokeDatabaseLambda({
            environmentType: process.env.NODE_ENV,
            fromID,
            action: "UPDATESET",
            itemType,
            identifiers: [messageID],
            secondaryIdentifier: board,
            attributeName,
            attributeValues: [attributeValue],
        }, successHandler, failureHandler);
    }

    /**
     * Deletes a Message from the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} board The board that the Message is a part of.
     * @param {string} messageID The ID of the Message to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, board, messageID, successHandler, failureHandler) {
        return Lambda.invokeDatabaseLambda({
            environmentType: process.env.NODE_ENV,
            fromID,
            action: "DELETE",
            itemType,
            identifiers: [messageID],
            secondaryIdentifier: board,
        }, successHandler, failureHandler);
    }
}

export default MessageFunctions;

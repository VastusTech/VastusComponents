import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";

const itemType = "Message";

/**
 * Holds all the potential properly formatted Lambda functions for Messages.
 */
class MessageFunctions {
    // TODO THESE ARE THE HIGH-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    // Create Functions ============================================================
    static createTextMessage(fromID, from, name, profileImagePath, board, message, successHandler, failureHandler) {
        return this.create(fromID, board, from, name, profileImagePath, null, message, null, successHandler, failureHandler);
    }
    static createPictureMessage(fromID, from, name, profileImagePath, board, picture, picturePath, successHandler, failureHandler) {
        return this.create(fromID, board, from, name, profileImagePath, "picture", picturePath, picture, successHandler, failureHandler);
    }
    static createVideoMessage(fromID, from, name, profileImagePath, board, video, videoPath, successHandler, failureHandler) {
        return this.create(fromID, board, from, name, profileImagePath, "video", videoPath, video, successHandler, failureHandler);
    }

    // Update Functions ============================================================
    static addLastSeen(fromID, board, messageID, userID, successHandler, failureHandler) {
        return this.updateAdd(fromID, board, messageID, "lastSeenFor", userID, successHandler, failureHandler);
    }

    // TODO THESE ARE THE LOW-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
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

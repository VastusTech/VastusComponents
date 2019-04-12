import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";
import { getItemTypeFromID } from "../logic/ItemType";

/**
 * Holds all the potential properly formatted Lambda functions for Users.
 */
class UserFunctions {
    // ======================================================================================================
    // User High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param image
     * @param profileImagePath
     * @param successHandler
     * @param failureHandler
     */
    static addProfileImage(fromID, userID, image, profileImagePath, successHandler, failureHandler) {
        S3.putImage(profileImagePath, image, () => {
            return this.updateAdd(fromID, userID, "profileImagePaths", profileImagePath, successHandler, (error) => {
                // Try your best to fix S3, then give up...
                S3.delete(profileImagePath);
                failureHandler(error);
            });
        });
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param profileImagePath
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeProfileImage(fromID, userID, profileImagePath, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "profileImagePaths", profileImagePath, (data) => {
            S3.delete(profileImagePath, () => {
                successHandler(data);
            }, failureHandler);
        }, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param friendID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addFriend(fromID, userID, friendID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "friends", friendID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param friendID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeFriend(fromID, userID, friendID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "friends", friendID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addChallenge(fromID, userID, challengeID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "challenges", challengeID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeChallenge(fromID, userID, challengeID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "challenges", challengeID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addEvent(fromID, userID, eventID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "scheduledEvents", eventID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeEvent(fromID, userID, eventID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "scheduledEvents", eventID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param groupID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addGroup(fromID, userID, groupID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "groups", groupID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param groupID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeGroup(fromID, userID, groupID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "groups", groupID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param messageBoard
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "messageBoards", messageBoard, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param messageBoard
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "messageBoards", messageBoard, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param name
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateName(fromID, userID, name, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "name", name, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param gender
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateGender(fromID, userID, gender, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "gender", gender, successHandler, failureHandler);
    }

    /**
     * TODO
     * @param fromID
     * @param userID
     * @param birthday
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateBirthday(fromID, userID, birthday, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "birthday", birthday, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param location
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateLocation(fromID, userID, location, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "location", location, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param bio
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateBio(fromID, userID, bio, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "bio", bio, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param profileImage
     * @param profileImagePath
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateProfileImage(fromID, userID, profileImage, profileImagePath, successHandler, failureHandler) {
        if (profileImage && profileImagePath) {
            S3.putImage(profileImagePath, profileImage, () => {
                return this.updateSet(fromID, userID, "profileImagePath", profileImagePath, successHandler, (error) => {
                    S3.delete(profileImagePath);
                    failureHandler(error);
                });
            }, failureHandler);
        }
        else {
            // Delete it
            return this.updateSet(fromID, userID, "profileImagePath", null, successHandler, failureHandler);
        }
    }

    // ======================================================================================================
    // User Low-Level Functions ~
    // ======================================================================================================

    static updateAdd(fromID, userID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, userID, getItemTypeFromID(userID), attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, userID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, userID, getItemTypeFromID(userID), attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, userID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, userID, getItemTypeFromID(userID), attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param userID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static delete(fromID, userID, successHandler, failureHandler) {
        return Lambda.delete(fromID, userID, getItemTypeFromID(userID), successHandler, failureHandler);
    }
}

export default UserFunctions;

import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";
import { getItemTypeFromID } from "../logic/ItemType";

/**
 * Holds all the potential properly formatted Lambda functions for Users.
 */
class UserFunctions {
    // TODO THESE ARE THE HIGH-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    // Create Functions ============================================================

    // Update Functions ============================================================
    static addProfileImage(fromID, userID, image, profileImagePath, successHandler, failureHandler) {
        S3.putImage(profileImagePath, image, () => {
            return this.updateAdd(fromID, userID, "profileImagePaths", profileImagePath, successHandler, (error) => {
                // Try your best to fix S3, then give up...
                S3.delete(profileImagePath);
                failureHandler(error);
            });
        });
    }
    static removeProfileImage(fromID, userID, profileImagePath, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "profileImagePaths", profileImagePath, (data) => {
            S3.delete(profileImagePath, () => {
                successHandler(data);
            }, failureHandler);
        }, failureHandler);
    }
    static addFriend(fromID, userID, friendID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "friends", friendID, successHandler, failureHandler);
    }
    static removeFriend(fromID, userID, friendID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "friends", friendID, successHandler, failureHandler);
    }
    static addChallenge(fromID, userID, challengeID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "challenges", challengeID, successHandler, failureHandler);
    }
    static removeChallenge(fromID, userID, challengeID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "challenges", challengeID, successHandler, failureHandler);
    }
    static addEvent(fromID, userID, eventID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "scheduledEvents", eventID, successHandler, failureHandler);
    }
    static removeEvent(fromID, userID, eventID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "scheduledEvents", eventID, successHandler, failureHandler);
    }
    static addGroup(fromID, userID, groupID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "groups", groupID, successHandler, failureHandler);
    }
    static removeGroup(fromID, userID, groupID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "groups", groupID, successHandler, failureHandler);
    }
    static addMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "messageBoards", messageBoard, successHandler, failureHandler);
    }
    static removeMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "messageBoards", messageBoard, successHandler, failureHandler);
    }
    static updateName(fromID, userID, name, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "name", name, successHandler, failureHandler);
    }
    static updateGender(fromID, userID, gender, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "gender", gender, successHandler, failureHandler);
    }
    static updateBirthday(fromID, userID, birthday, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "birthday", birthday, successHandler, failureHandler);
    }
    static updateLocation(fromID, userID, location, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "location", location, successHandler, failureHandler);
    }
    static updateBio(fromID, userID, bio, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "bio", bio, successHandler, failureHandler);
    }
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

    // TODO THESE ARE THE LOW-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    static updateAdd(fromID, userID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, userID, getItemTypeFromID(userID), attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, userID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, userID, getItemTypeFromID(userID), attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, userID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, userID, getItemTypeFromID(userID), attributeName, attributeValue, successHandler, failureHandler);
    }
    static delete(fromID, userID, successHandler, failureHandler) {
        return Lambda.delete(fromID, userID, getItemTypeFromID(userID), successHandler, failureHandler);
    }
}

export default UserFunctions;

import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";
import { getItemTypeFromID } from "../logic/ItemType";
import TestHelper from "../testing/TestHelper";

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
     * Adds a profile image to a User's profile image gallery.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {*} image The image file to add to the User's profile images.
     * @param {string} profileImagePath The S3 path to put the profile image into.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     */
    static addProfileImage(fromID, userID, image, profileImagePath, successHandler, failureHandler) {
        S3.putImage(profileImagePath, image, () => {
            this.updateAdd(fromID, userID, "profileImagePaths", profileImagePath, successHandler, (error) => {
                // Try your best to fix S3, then give up...
                S3.delete(profileImagePath);
                if (failureHandler) {
                    failureHandler(error);
                }
            });
        });
        if (TestHelper.ifTesting) {
            return this.updateAdd(fromID, userID, "profileImagePaths", profileImagePath);
        }
    }

    /**
     * Removes a profile image from a User's profile image gallery.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} profileImagePath The S3 path of the image to remove from the User.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeProfileImage(fromID, userID, profileImagePath, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "profileImagePaths", profileImagePath, (data) => {
            S3.delete(profileImagePath, () => {
                if (successHandler) {
                    successHandler(data);
                }
            }, failureHandler);
        }, failureHandler);
    }

    /**
     * Adds a friend to the User's buddy list and vice versa.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} friendID The ID of the User to add as a friend.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addFriend(fromID, userID, friendID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "friends", friendID, successHandler, failureHandler);
    }

    /**
     * Removes a User from another User's buddy list and vice versa.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} friendID The ID of the User to remove as a friend.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeFriend(fromID, userID, friendID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "friends", friendID, successHandler, failureHandler);
    }

    /**
     * Adds the User to a Challenge and the Challenge to the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} challengeID The ID of the Challenge to add the User to.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addChallenge(fromID, userID, challengeID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "challenges", challengeID, successHandler, failureHandler);
    }

    /**
     * Removes the User from a Challenge and the Challenge from the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} challengeID The ID of the Challenge to remove the User from.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeChallenge(fromID, userID, challengeID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "challenges", challengeID, successHandler, failureHandler);
    }

    /**
     * Adds the User to an Event and the Event to the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} eventID The ID of the Event to add the User to.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addEvent(fromID, userID, eventID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "scheduledEvents", eventID, successHandler, failureHandler);
    }

    /**
     * Removes the User from an Event and the Event from the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} eventID The ID of the Event to add the User to.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeEvent(fromID, userID, eventID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "scheduledEvents", eventID, successHandler, failureHandler);
    }

    /**
     * Adds the User to a Group and the Group to the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} groupID The ID of the Group to add the User to.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addGroup(fromID, userID, groupID, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "groups", groupID, successHandler, failureHandler);
    }

    /**
     * Removes the User from a Group and the Group from the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} groupID The ID of the Group for the User to leave.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeGroup(fromID, userID, groupID, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "groups", groupID, successHandler, failureHandler);
    }

    /**
     * Adds a message board to a User's message board feed in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} messageBoard The message board to add to the User's message boards.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler) {
        return this.updateAdd(fromID, userID, "messageBoards", messageBoard, successHandler, failureHandler);
    }

    /**
     * Removes a message board from the User's message board feed in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} messageBoard The message board to remove from the User's message boards.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler) {
        return this.updateRemove(fromID, userID, "messageBoards", messageBoard, successHandler, failureHandler);
    }

    /**
     * Updates the name of a User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} name The name to set for the User.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateName(fromID, userID, name, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "name", name, successHandler, failureHandler);
    }

    /**
     * Updates the gender of the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} gender The gender of the User to set.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateGender(fromID, userID, gender, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "gender", gender, successHandler, failureHandler);
    }

    /**
     * Updates the birthday of the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} birthday The ISO string of the birth date of the User.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateBirthday(fromID, userID, birthday, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "birthday", birthday, successHandler, failureHandler);
    }

    /**
     * Updates the location of the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} location The general location of the User within the database.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateLocation(fromID, userID, location, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "location", location, successHandler, failureHandler);
    }

    /**
     * Updates the biographical information of the User in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {string} bio The biographical description to set for the User.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateBio(fromID, userID, bio, successHandler, failureHandler) {
        return this.updateSet(fromID, userID, "bio", bio, successHandler, failureHandler);
    }

    /**
     * Updates the main profile image of the User and places the image into S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to update.
     * @param {*} profileImage The profile image to place into S3.
     * @param {string} profileImagePath The S3 path of where to place the file.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateProfileImage(fromID, userID, profileImage, profileImagePath, successHandler, failureHandler) {
        if (profileImage && profileImagePath) {
            S3.putImage(profileImagePath, profileImage, () => {
                this.updateSet(fromID, userID, "profileImagePath", profileImagePath, successHandler, (error) => {
                    S3.delete(profileImagePath);
                    if (failureHandler) {
                        failureHandler(error);
                    }
                });
            }, failureHandler);
            if (TestHelper.ifTesting) {
                return this.updateSet(fromID, userID, "profileImagePath", profileImagePath);
            }
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
     * Deletes a User from the database as well as all of its dependencies.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} userID The ID of the User to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, userID, successHandler, failureHandler) {
        // TODO Delete all the S3 Paths within the User?
        return Lambda.delete(fromID, userID, getItemTypeFromID(userID), successHandler, failureHandler);
    }
}

export default UserFunctions;

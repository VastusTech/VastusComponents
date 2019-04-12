import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";
import S3 from "../api/S3Storage";

const itemType = "Group";

/**
 * Holds all the potential properly formatted Lambda functions for Groups.
 */
class GroupFunctions {
    // ======================================================================================================
    // Group High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param title
     * @param description
     * @param access
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroup(fromID, title, description, access, successHandler, failureHandler) {
        return this.create(fromID, title, description, null, null, access, null, null, null, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param title
     * @param description
     * @param motto
     * @param groupImage
     * @param access
     * @param restriction
     * @param owners
     * @param members
     * @param tags
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupOptional(fromID, title, description, motto, groupImage, access, restriction, owners, members, tags, successHandler, failureHandler) {
        return this.create(fromID, title, description, motto, groupImage, access, restriction, owners, members, tags, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToPrivate(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "access", "private", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToPublic(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "access", "public", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToInviteOnly(fromID, eventID, successHandler, failureHandler) {
        return this.updateAdd(fromID, eventID, "restriction", "invite", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToUnrestricted(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "restriction", null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param tag
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addTag(fromID, eventID, tag, successHandler, failureHandler) {
        return this.updateAdd(fromID, eventID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param tag
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeTag(fromID, eventID, tag, successHandler, failureHandler) {
        return this.updateRemove(fromID, eventID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param groupID
     * @param userID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addMember(fromID, groupID, userID, successHandler, failureHandler) {
        return UserFunctions.addGroup(fromID, userID, groupID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param groupID
     * @param userID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeMember(fromID, groupID, userID, successHandler, failureHandler) {
        return UserFunctions.removeGroup(fromID, userID, groupID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param groupID
     * @param title
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateTitle(fromID, groupID, title, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "title", title, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param groupID
     * @param description
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateDescription(fromID, groupID, description, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "description", description, successHandler, failureHandler);
    }

    // ======================================================================================================
    // Group Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param title
     * @param description
     * @param motto
     * @param groupImage
     * @param access
     * @param restriction
     * @param owners
     * @param members
     * @param tags
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, title, description, motto, groupImage, access, restriction, owners, members, tags, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            title,
            description,
            motto,
            access,
            restriction,
            owners,
            members,
            tags,
            groupImagePath: (groupImage) ? "groupImage" : null,
        }, (data) => {
            if (groupImage) {}
            const id = data.data;
            // Put in the group image
            S3.putImage(id + "/groupImage", groupImage, successHandler, (error) => {
                // Best effort to delete!
                GroupFunctions.delete(fromID, id);
            });
        }, failureHandler);
    }

    static updateAdd(fromID, eventID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, eventID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, eventID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, eventID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, eventID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, eventID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, eventID, successHandler, failureHandler) {
        return Lambda.delete(fromID, eventID, itemType, successHandler, failureHandler);
    }
}

export default GroupFunctions;

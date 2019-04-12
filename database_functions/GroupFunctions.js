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
     * Creates a bare-bones Group in the database with as little information as possible.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} title The display title for the Group.
     * @param {string} description The detail description for the Group.
     * @param {string} access The access of who can see and access the Group. ("public" or "private").
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroup(fromID, title, description, access, successHandler, failureHandler) {
        return this.create(fromID, title, description, null, null, null, null, null, access, null, successHandler, failureHandler);
    }

    /**
     * Creates a Group in the database with optional information available for input.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} title The display title for the Group.
     * @param {string} description The detail description for the Group.
     * @param {string} motto The Group motto and overall purpose for the Group to begin with.
     * @param {*} groupImage The image file to display for the Group.
     * @param {[string]} owners The IDs of the Users who will own the Group.
     * @param {[string]} members The IDs of the Users who will be automatically signed up for the Group.
     * @param {[string]} tags The tags for the Group to indicate what kind of a Group it is.
     * @param {string} access The access of who can see and access the Group. ("public" or "private").
     * @param {string} restriction The restriction of if Users must request to join or not. ("invite" or null).
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupOptional(fromID, title, description, motto, groupImage, owners, members, tags, access, restriction, successHandler, failureHandler) {
        return this.create(fromID, title, description, motto, groupImage, owners, members, tags, access, restriction, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * Updates the access of a Group to private in the database, so only certain Users allowed to see and access it.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToPrivate(fromID, groupID, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "access", "private", successHandler, failureHandler);
    }

    /**
     * Updates the access of a Group to private in the database, making everyone allowed to see and access it.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToPublic(fromID, groupID, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "access", "public", successHandler, failureHandler);
    }

    /**
     * Updates the restriction of a Group to Invite only, forcing Users to request to join instead of directly.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToInviteOnly(fromID, groupID, successHandler, failureHandler) {
        return this.updateAdd(fromID, groupID, "restriction", "invite", successHandler, failureHandler);
    }

    /**
     * Updates the restriction of a Group to unrestricted in the database, allowing Users to directly join the Group.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToUnrestricted(fromID, groupID, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "restriction", null, successHandler, failureHandler);
    }

    /**
     * Adds a tag to the Group's tags in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {string} tag The tag to add to the Group's tags.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addTag(fromID, groupID, tag, successHandler, failureHandler) {
        return this.updateAdd(fromID, groupID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * Removes a tag from the Group's tags in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {string} tag The tag to remove from the Group's tags.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeTag(fromID, groupID, tag, successHandler, failureHandler) {
        return this.updateRemove(fromID, groupID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * Adds a User to the Group and the Group to the member in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {string} userID The ID of the User to add to the Group.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addMember(fromID, groupID, userID, successHandler, failureHandler) {
        return UserFunctions.addGroup(fromID, userID, groupID, successHandler, failureHandler);
    }

    /**
     * Removes a User from the Group and the Group from the member in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {string} userID The ID of the User to remove from the Group's members.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeMember(fromID, groupID, userID, successHandler, failureHandler) {
        return UserFunctions.removeGroup(fromID, userID, groupID, successHandler, failureHandler);
    }

    /**
     * Updates the title of the Group in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {string} title The title to set for the Group.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateTitle(fromID, groupID, title, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "title", title, successHandler, failureHandler);
    }

    /**
     * Updates the Group's main motto phrase in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {string} motto The main motto to set for the Group.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateMotto(fromID, groupID, motto, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "motto", motto, successHandler, failureHandler);
    }

    /**
     * Updates the Groups' detail description in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {string} description The detail description to set for the Group.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateDescription(fromID, groupID, description, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "description", description, successHandler, failureHandler);
    }

    /**
     * Updates the Group's main profile image in the database and in S3.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to update.
     * @param {*} groupImage The image to update the Group image with.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateGroupImage(fromID, groupID, groupImage, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "groupImagePath", groupImage ? "groupImage" : null, (data) => {
            if (groupImage) {
                S3.putImage("groupImage", groupImage, successHandler, failureHandler);
            }
        }, failureHandler)
    }

    // ======================================================================================================
    // Group Low-Level Functions ~
    // ======================================================================================================

    /**
     * Creates a Group in the database and adds the group image in S3 using the information given.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} title The display title for the Group.
     * @param {string} description The detail description for the Group.
     * @param {string} motto The Group motto and overall purpose for the Group to begin with.
     * @param {*} groupImage The image file to display for the Group.
     * @param {[string]} owners The IDs of the Users who will own the Group.
     * @param {[string]} members The IDs of the Users who will be automatically signed up for the Group.
     * @param {[string]} tags The tags for the Group to indicate what kind of a Group it is.
     * @param {string} access The access of who can see and access the Group. ("public" or "private").
     * @param {string} restriction The restriction of if Users must request to join or not. ("invite" or null).
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, title, description, motto, groupImage, owners, members, tags, access, restriction, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            title,
            description,
            motto,
            owners,
            members,
            tags,
            access,
            restriction,
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

    static updateAdd(fromID, groupID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, groupID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, groupID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, groupID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, groupID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, groupID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * Deletes a Group and its dependencies from the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID of the Group to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, groupID, successHandler, failureHandler) {
        return Lambda.delete(fromID, groupID, itemType, successHandler, failureHandler);
    }
}

export default GroupFunctions;

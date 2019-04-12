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
     * @param fromID
     * @param title
     * @param description
     * @param access
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createGroup(fromID, title, description, access, successHandler, failureHandler) {
        return this.create(fromID, title, description, null, null, access, null, null, null, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param title
     * @param description
     * @param motto
     * @param groupImage
     * @param access
     * @param restriction
     * @param owners
     * @param members
     * @param tags
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createGroupOptional(fromID, title, description, motto, groupImage, access, restriction, owners, members, tags, successHandler, failureHandler) {
        return this.create(fromID, title, description, motto, groupImage, access, restriction, owners, members, tags, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateToPrivate(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "access", "private", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateToPublic(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "access", "public", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateToInviteOnly(fromID, eventID, successHandler, failureHandler) {
        return this.updateAdd(fromID, eventID, "restriction", "invite", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateToUnrestricted(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "restriction", null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param tag
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addTag(fromID, eventID, tag, successHandler, failureHandler) {
        return this.updateAdd(fromID, eventID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param tag
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeTag(fromID, eventID, tag, successHandler, failureHandler) {
        return this.updateRemove(fromID, eventID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param groupID
     * @param userID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addMember(fromID, groupID, userID, successHandler, failureHandler) {
        return UserFunctions.addGroup(fromID, userID, groupID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param groupID
     * @param userID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeMember(fromID, groupID, userID, successHandler, failureHandler) {
        return UserFunctions.removeGroup(fromID, userID, groupID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param groupID
     * @param title
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateTitle(fromID, groupID, title, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "title", title, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param groupID
     * @param description
     * @param successHandler
     * @param failureHandler
     * @return {*}
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
     * @param fromID
     * @param title
     * @param description
     * @param motto
     * @param groupImage
     * @param access
     * @param restriction
     * @param owners
     * @param members
     * @param tags
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
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
     * @param fromID
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static delete(fromID, eventID, successHandler, failureHandler) {
        return Lambda.delete(fromID, eventID, itemType, successHandler, failureHandler);
    }
}

export default GroupFunctions;

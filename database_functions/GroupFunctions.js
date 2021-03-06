import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";
import S3 from "../api/S3Storage";

const itemType = "Group";

class GroupFunctions {
    // TODO THESE ARE THE HIGH-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    // Create Functions ============================================================
    static createGroup(fromID, title, description, access, successHandler, failureHandler) {
        return this.create(fromID, title, description, null, null, access, null, null, null, null, successHandler, failureHandler);
    }
    static createGroupOptional(fromID, title, description, motto, groupImage, access, restriction, owners, members, tags, successHandler, failureHandler) {
        return this.create(fromID, title, description, motto, groupImage, access, restriction, owners, members, tags, successHandler, failureHandler);
    }

    // Update Functions ============================================================
    static updateToPrivate(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "access", "private", successHandler, failureHandler);
    }
    static updateToPublic(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "access", "public", successHandler, failureHandler);
    }
    static updateToInviteOnly(fromID, eventID, successHandler, failureHandler) {
        return this.updateAdd(fromID, eventID, "restriction", "invite", successHandler, failureHandler);
    }
    static updateToUnrestricted(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "restriction", null, successHandler, failureHandler);
    }
    static addTag(fromID, eventID, tag, successHandler, failureHandler) {
        return this.updateAdd(fromID, eventID, "tags", tag, successHandler, failureHandler);
    }
    static removeTag(fromID, eventID, tag, successHandler, failureHandler) {
        return this.updateRemove(fromID, eventID, "tags", tag, successHandler, failureHandler);
    }
    static addMember(fromID, groupID, userID, successHandler, failureHandler) {
        return UserFunctions.addGroup(fromID, userID, groupID, successHandler, failureHandler);
    }
    static removeMember(fromID, groupID, userID, successHandler, failureHandler) {
        return UserFunctions.removeGroup(fromID, userID, groupID, successHandler, failureHandler);
    }
    static updateTitle(fromID, groupID, title, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "title", title, successHandler, failureHandler);
    }
    static updateDescription(fromID, groupID, description, successHandler, failureHandler) {
        return this.updateSet(fromID, groupID, "description", description, successHandler, failureHandler);
    }

    // TODO THESE ARE THE LOW-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
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
    static delete(fromID, eventID, successHandler, failureHandler) {
        return Lambda.delete(fromID, eventID, itemType, successHandler, failureHandler);
    }
}

export default GroupFunctions;

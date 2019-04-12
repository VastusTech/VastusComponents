import Lambda from "../api/Lambda";

const itemType = "Invite";

/**
 * Holds all the potential properly formatted Lambda functions for Invites.
 */
class InviteFunctions {
    // ======================================================================================================
    // Invite High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param to
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createFriendRequest(fromID, from, to, successHandler, failureHandler) {
        return this.create(fromID, from, to, "friendRequest", from, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param to
     * @param message
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createFriendRequestOptional(fromID, from, to, message, successHandler, failureHandler) {
        return this.create(fromID, from, to, "friendRequest", from, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param to
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createEventInvite(fromID, from, to, eventID, successHandler, failureHandler) {
        return this.create(fromID, from, to, "eventInvite", eventID, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param to
     * @param eventID
     * @param message
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createEventInviteOptional(fromID, from, to, eventID, message, successHandler, failureHandler) {
        return this.create(fromID, from, to, "eventInvite", eventID, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param to
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createChallengeInvite(fromID, from, to, challengeID, successHandler, failureHandler) {
        return this.create(fromID, from, to, "challengeInvite", challengeID, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param to
     * @param challengeID
     * @param message
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createChallengeInviteOptional(fromID, from, to, challengeID, message, successHandler, failureHandler) {
        return this.create(fromID, from, to, "challengeInvite", challengeID, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createEventRequest(fromID, from, eventID, successHandler, failureHandler) {
        return this.create(fromID, from, eventID, "eventRequest", from, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param eventID
     * @param message
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createEventRequestOptional(fromID, from, eventID, message, successHandler, failureHandler) {
        return this.create(fromID, from, eventID, "eventRequest", from, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createChallengeRequest(fromID, from, challengeID, successHandler, failureHandler) {
        return this.create(fromID, from, challengeID, "challengeRequest", from, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param challengeID
     * @param message
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createChallengeRequestOptional(fromID, from, challengeID, message, successHandler, failureHandler) {
        return this.create(fromID, from, challengeID, "challengeRequest", from, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param groupID
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createGroupRequest(fromID, from, groupID, successHandler, failureHandler) {
        return this.create(fromID, from, groupID, "groupRequest", from, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param groupID
     * @param message
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createGroupRequestOptional(fromID, from, groupID, message, successHandler, failureHandler) {
        return this.create(fromID, from, groupID, "groupRequest", from, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param to
     * @param groupID
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createGroupInvite(fromID, from, to, groupID, successHandler, failureHandler) {
        return this.create(fromID, from, to, "challengeInvite", groupID, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param to
     * @param groupID
     * @param message
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createGroupInviteOptional(fromID, from, to, groupID, message, successHandler, failureHandler) {
        return this.create(fromID, from, to, "groupInvite", groupID, message, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    // ======================================================================================================
    // Invite Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param fromID
     * @param from
     * @param to
     * @param inviteType
     * @param about
     * @param description
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static create(fromID, from, to, inviteType, about, description, successHandler, failureHandler) {
        return Lambda.create(fromID, "Invite", {
            from,
            to,
            inviteType,
            about,
            description,
        }, successHandler, failureHandler);
    }

    static updateAdd(fromID, inviteID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, inviteID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, inviteID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, inviteID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, inviteID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, inviteID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param inviteID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static delete(fromID, inviteID, successHandler, failureHandler) {
        return Lambda.delete(fromID, inviteID, itemType, successHandler, failureHandler);
    }
}

export default InviteFunctions;

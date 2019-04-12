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
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param to
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createFriendRequest(fromID, from, to, successHandler, failureHandler) {
        return this.create(fromID, from, to, "friendRequest", from, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param to
     * @param message
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createFriendRequestOptional(fromID, from, to, message, successHandler, failureHandler) {
        return this.create(fromID, from, to, "friendRequest", from, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param to
     * @param eventID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventInvite(fromID, from, to, eventID, successHandler, failureHandler) {
        return this.create(fromID, from, to, "eventInvite", eventID, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param to
     * @param eventID
     * @param message
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventInviteOptional(fromID, from, to, eventID, message, successHandler, failureHandler) {
        return this.create(fromID, from, to, "eventInvite", eventID, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param to
     * @param challengeID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeInvite(fromID, from, to, challengeID, successHandler, failureHandler) {
        return this.create(fromID, from, to, "challengeInvite", challengeID, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param to
     * @param challengeID
     * @param message
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeInviteOptional(fromID, from, to, challengeID, message, successHandler, failureHandler) {
        return this.create(fromID, from, to, "challengeInvite", challengeID, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param eventID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventRequest(fromID, from, eventID, successHandler, failureHandler) {
        return this.create(fromID, from, eventID, "eventRequest", from, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param eventID
     * @param message
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventRequestOptional(fromID, from, eventID, message, successHandler, failureHandler) {
        return this.create(fromID, from, eventID, "eventRequest", from, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param challengeID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeRequest(fromID, from, challengeID, successHandler, failureHandler) {
        return this.create(fromID, from, challengeID, "challengeRequest", from, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param challengeID
     * @param message
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeRequestOptional(fromID, from, challengeID, message, successHandler, failureHandler) {
        return this.create(fromID, from, challengeID, "challengeRequest", from, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param groupID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupRequest(fromID, from, groupID, successHandler, failureHandler) {
        return this.create(fromID, from, groupID, "groupRequest", from, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param groupID
     * @param message
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupRequestOptional(fromID, from, groupID, message, successHandler, failureHandler) {
        return this.create(fromID, from, groupID, "groupRequest", from, message, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param to
     * @param groupID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupInvite(fromID, from, to, groupID, successHandler, failureHandler) {
        return this.create(fromID, from, to, "challengeInvite", groupID, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param to
     * @param groupID
     * @param message
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
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
     * @param {string} fromID The User invoking the Lambda request.
     * @param from
     * @param to
     * @param inviteType
     * @param about
     * @param description
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
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
     * @param {string} fromID The User invoking the Lambda request.
     * @param inviteID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, inviteID, successHandler, failureHandler) {
        return Lambda.delete(fromID, inviteID, itemType, successHandler, failureHandler);
    }
}

export default InviteFunctions;

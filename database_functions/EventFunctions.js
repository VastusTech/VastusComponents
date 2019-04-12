import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";

const itemType = "Event";

/**
 * Holds all the potential properly formatted Lambda functions for Events.
 */
class EventFunctions {
    // ======================================================================================================
    // Event High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================
    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param owner
     * @param time
     * @param capacity
     * @param address
     * @param title
     * @param access
     * @param tags
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEvent(fromID, owner, time, capacity, address, title, access, tags, successHandler, failureHandler) {
        return this.create(fromID, null, owner, time, capacity, address, title, null, null, access, tags, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param owner
     * @param time
     * @param capacity
     * @param address
     * @param title
     * @param description
     * @param memberIDs
     * @param access
     * @param tags
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventOptional(fromID, owner, time, capacity, address, title, description, memberIDs, access, tags, successHandler, failureHandler) {
        return this.create(fromID, null, owner, time, capacity, address, title, description, memberIDs, access, tags, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param challengeID
     * @param owner
     * @param time
     * @param capacity
     * @param address
     * @param title
     * @param access
     * @param tags
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeEvent(fromID, challengeID, owner, time, capacity, address, title, access, tags, successHandler, failureHandler) {
        return this.create(fromID, challengeID, owner, time, capacity, address, title, tags, null, access, tags, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param challengeID
     * @param owner
     * @param time
     * @param capacity
     * @param address
     * @param title
     * @param description
     * @param memberIDs
     * @param access
     * @param tags
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeEventOptional(fromID, challengeID, owner, time, capacity, address, title, description, memberIDs, access, tags, successHandler, failureHandler) {
        return this.create(fromID, challengeID, owner, time, capacity, address, title, description, memberIDs, access, tags, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param winnerID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateWinner(fromID, eventID, winnerID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "winner", winnerID, successHandler, failureHandler);
    };

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
     * @param eventID
     * @param userID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addMember(fromID, eventID, userID, successHandler, failureHandler) {
        return UserFunctions.addEvent(fromID, userID, eventID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param userID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeMember(fromID, eventID, userID, successHandler, failureHandler) {
        return UserFunctions.removeEvent(fromID, userID, eventID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param challengeID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateChallenge(fromID, eventID, challengeID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "challenge", challengeID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param address
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateAddress(fromID, eventID, address, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "address", address, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param capacity
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateCapacity(fromID, eventID, capacity, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "capacity", capacity, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param title
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateTitle(fromID, eventID, title, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "title", title, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param eventID
     * @param description
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateDescription(fromID, eventID, description, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "description", description, successHandler, failureHandler);
    }

    // ======================================================================================================
    // Event Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param challengeID
     * @param owner
     * @param time
     * @param capacity
     * @param address
     * @param title
     * @param description
     * @param memberIDs
     * @param access
     * @param tags
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, challengeID, owner, time, capacity, address, title, description, memberIDs, access, tags, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            owner,
            time,
            capacity,
            address,
            title,
            description,
            memberIDs,
            access,
            tags,
            challenge: challengeID
        }, successHandler, failureHandler);
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

export default EventFunctions;

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
     * @param fromID
     * @param owner
     * @param time
     * @param capacity
     * @param address
     * @param title
     * @param access
     * @param tags
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createEvent(fromID, owner, time, capacity, address, title, access, tags, successHandler, failureHandler) {
        return this.create(fromID, null, owner, time, capacity, address, title, null, null, access, tags, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param owner
     * @param time
     * @param capacity
     * @param address
     * @param title
     * @param description
     * @param memberIDs
     * @param access
     * @param tags
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createEventOptional(fromID, owner, time, capacity, address, title, description, memberIDs, access, tags, successHandler, failureHandler) {
        return this.create(fromID, null, owner, time, capacity, address, title, description, memberIDs, access, tags, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param owner
     * @param time
     * @param capacity
     * @param address
     * @param title
     * @param access
     * @param tags
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createChallengeEvent(fromID, challengeID, owner, time, capacity, address, title, access, tags, successHandler, failureHandler) {
        return this.create(fromID, challengeID, owner, time, capacity, address, title, tags, null, access, tags, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
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
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createChallengeEventOptional(fromID, challengeID, owner, time, capacity, address, title, description, memberIDs, access, tags, successHandler, failureHandler) {
        return this.create(fromID, challengeID, owner, time, capacity, address, title, description, memberIDs, access, tags, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param winnerID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateWinner(fromID, eventID, winnerID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "winner", winnerID, successHandler, failureHandler);
    };

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
     * @param eventID
     * @param userID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addMember(fromID, eventID, userID, successHandler, failureHandler) {
        return UserFunctions.addEvent(fromID, userID, eventID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param userID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeMember(fromID, eventID, userID, successHandler, failureHandler) {
        return UserFunctions.removeEvent(fromID, userID, eventID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateChallenge(fromID, eventID, challengeID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "challenge", challengeID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param address
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateAddress(fromID, eventID, address, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "address", address, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param capacity
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateCapacity(fromID, eventID, capacity, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "capacity", capacity, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param title
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateTitle(fromID, eventID, title, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "title", title, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param eventID
     * @param description
     * @param successHandler
     * @param failureHandler
     * @return {*}
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
     * @param fromID
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
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
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

export default EventFunctions;

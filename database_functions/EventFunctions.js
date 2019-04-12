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
     * Creates a bare minimum Event in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} owner The ID of the User who will own the Event.
     * @param {string} time The ISO Interval string for when the event will be, from beginning to end.
     * @param {number} capacity The number of members the Event can have at most.
     * @param {string} address The address for where the Event will be held.
     * @param {string} title The display title for the Event.
     * @param {[string]} tags The list of the tags to indicate what kind of Event this will be.
     * @param {string} access The access string for who is able to see and access this Event. ("public" or "private").
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEvent(fromID, owner, time, capacity, address, title, tags, access, successHandler, failureHandler) {
        return this.create(fromID, owner, time, capacity, address, title, null, tags, null, access, null, null, null, successHandler, failureHandler);
    }

    /**
     * Creates a Event with optional information in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} owner The ID of the User who will own the Event.
     * @param {string} time The ISO Interval string for when the event will be, from beginning to end.
     * @param {number} capacity The number of members the Event can have at most.
     * @param {string} address The address for where the Event will be held.
     * @param {string} title The display title for the Event.
     * @param {string} description The detailed description for what happens at this Event.
     * @param {[string]} tags The list of the tags to indicate what kind of Event this will be.
     * @param {[string]} memberIDs The IDs of the Users who will be signed up for this Event automatically.
     * @param {string} access The access string for who is able to see and access this Event. ("public" or "private").
     * @param {string} restriction The restriction for the ability to join without a  request. ("restricted" or null).
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventOptional(fromID, owner, time, capacity, address, title, description, tags, memberIDs, access, restriction, successHandler, failureHandler) {
        return this.create(fromID, owner, time, capacity, address, title, description, tags, memberIDs, access, restriction, null, null, successHandler, failureHandler);
    }

    /**
     * Creates a bare minimum Event for a Challenge in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID for the Challenge that this Event will be a part of.
     * @param {string} owner The ID of the User who will own the Event.
     * @param {string} time The ISO Interval string for when the event will be, from beginning to end.
     * @param {number} capacity The number of members the Event can have at most.
     * @param {string} address The address for where the Event will be held.
     * @param {string} title The display title for the Event.
     * @param {[string]} tags The list of the tags to indicate what kind of Event this will be.
     * @param {string} access The access string for who is able to see and access this Event. ("public" or "private").
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeEvent(fromID, challengeID, owner, time, capacity, address, title, tags, access, successHandler, failureHandler) {
        return this.create(fromID, owner, time, capacity, address, title, null, tags, null, access, null, challengeID, null, successHandler, failureHandler);
    }

    /**
     * Creates an Event for a Challenge with optional information in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID for the Challenge that this Event will be a part of.
     * @param {string} owner The ID of the User who will own the Event.
     * @param {string} time The ISO Interval string for when the event will be, from beginning to end.
     * @param {number} capacity The number of members the Event can have at most.
     * @param {string} address The address for where the Event will be held.
     * @param {string} title The display title for the Event.
     * @param {string} description The detailed description for what happens at this Event.
     * @param {[string]} tags The list of the tags to indicate what kind of Event this will be.
     * @param {[string]} memberIDs The IDs of the Users who will be signed up for this Event automatically.
     * @param {string} access The access string for who is able to see and access this Event. ("public" or "private").
     * @param {string} restriction The restriction for the ability to join without a  request. ("restricted" or null).
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeEventOptional(fromID, challengeID, owner, time, capacity, address, title, description, tags, memberIDs, access, restriction, successHandler, failureHandler) {
        return this.create(fromID, owner, time, capacity, address, title, description, tags, memberIDs, access, restriction, challengeID, null, successHandler, failureHandler);
    }

    /**
     * Creates a bare minimum Event for a Group in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID for the Group that this Event will be a part of.
     * @param {string} owner The ID of the User who will own the Event.
     * @param {string} time The ISO Interval string for when the event will be, from beginning to end.
     * @param {number} capacity The number of members the Event can have at most.
     * @param {string} address The address for where the Event will be held.
     * @param {string} title The display title for the Event.
     * @param {[string]} tags The list of the tags to indicate what kind of Event this will be.
     * @param {string} access The access string for who is able to see and access this Event. ("public" or "private").
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupEvent(fromID, groupID, owner, time, capacity, address, title, access, tags, successHandler, failureHandler) {
        return this.create(fromID, owner, time, capacity, address, title, null, tags, null, access, null, null, groupID, successHandler, failureHandler);
    }

    /**
     * Creates an Event for a Group with optional information in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The ID for the Group that this Event will be a part of.
     * @param {string} owner The ID of the User who will own the Event.
     * @param {string} time The ISO Interval string for when the event will be, from beginning to end.
     * @param {number} capacity The number of members the Event can have at most.
     * @param {string} address The address for where the Event will be held.
     * @param {string} title The display title for the Event.
     * @param {string} description The detailed description for what happens at this Event.
     * @param {[string]} tags The list of the tags to indicate what kind of Event this will be.
     * @param {[string]} memberIDs The IDs of the Users who will be signed up for this Event automatically.
     * @param {string} access The access string for who is able to see and access this Event. ("public" or "private").
     * @param {string} restriction The restriction for the ability to join without a  request. ("restricted" or null).
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupEventOptional(fromID, groupID, owner, time, capacity, address, title, description, tags, memberIDs, access, restriction, successHandler, failureHandler) {
        return this.create(fromID, owner, time, capacity, address, title, description, tags, memberIDs, access, restriction, null, groupID, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * Updates the access of an Event to private in the database, so only certain Users allowed to see and access it.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToPrivate(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "access", "private", successHandler, failureHandler);
    }

    /**
     * Updates the access of an Event to private in the database, making everyone allowed to see and access it.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToPublic(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "access", "public", successHandler, failureHandler);
    }

    /**
     * Updates the restriction of an Event to Invite only, forcing Users to request to join instead of directly.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToInviteOnly(fromID, eventID, successHandler, failureHandler) {
        return this.updateAdd(fromID, eventID, "restriction", "invite", successHandler, failureHandler);
    }

    /**
     * Updates the restriction of an Event to unrestricted in the database, allowing Users to directly join the Event.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToUnrestricted(fromID, eventID, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "restriction", null, successHandler, failureHandler);
    }

    /**
     * Adds a tag to the Event's tags in the database, indicating what kind of an Event it will be.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {string} tag The tag to add to the Event's tags.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addTag(fromID, eventID, tag, successHandler, failureHandler) {
        return this.updateAdd(fromID, eventID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * Removes a tag from the Event's tags in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {string} tag The tag to remove from the Event's tags.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeTag(fromID, eventID, tag, successHandler, failureHandler) {
        return this.updateRemove(fromID, eventID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * Adds a User to the Event's members and the Event to the User's Events in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {string} userID The ID of the User to add as a member to the Event.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addMember(fromID, eventID, userID, successHandler, failureHandler) {
        return UserFunctions.addEvent(fromID, userID, eventID, successHandler, failureHandler);
    }

    /**
     * Removes a User from an Event's members and the Event from the User's Events in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {string} userID The ID of the User to remove from the Event.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeMember(fromID, eventID, userID, successHandler, failureHandler) {
        return UserFunctions.removeEvent(fromID, userID, eventID, successHandler, failureHandler);
    }

    /**
     * Update
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param challengeID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    // TODO Use case for this?
    // static updateChallenge(fromID, eventID, challengeID, successHandler, failureHandler) {
    //     return this.updateSet(fromID, eventID, "challenge", challengeID, successHandler, failureHandler);
    // }

    /**
     * Updates the Event's address in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {string} address The address of where the Event is actually being held.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateAddress(fromID, eventID, address, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "address", address, successHandler, failureHandler);
    }

    /**
     * Updates the Event's capacity for members in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {number} capacity The max number of Users that can be in the Event's members.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateCapacity(fromID, eventID, capacity, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "capacity", capacity, successHandler, failureHandler);
    }

    /**
     * Updates the Event's display title in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {string} title The display title of the Event to set.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateTitle(fromID, eventID, title, successHandler, failureHandler) {
        return this.updateSet(fromID, eventID, "title", title, successHandler, failureHandler);
    }

    /**
     * Updates the detail description of the Event in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to update.
     * @param {string} description The detail description of the Event to set.
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
     * Creates an Event in the database using the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} owner The ID of the User who will own the Event.
     * @param {string} time The ISO Interval string for when the event will be, from beginning to end.
     * @param {number} capacity The number of members the Event can have at most.
     * @param {string} address The address for where the Event will be held.
     * @param {string} title The display title for the Event.
     * @param {string} description The detailed description for what happens at this Event.
     * @param {[string]} tags The list of the tags to indicate what kind of Event this will be.
     * @param {[string]} members The IDs of the Users who will be signed up for this Event automatically.
     * @param {string} access The access string for who is able to see and access this Event. ("public" or "private").
     * @param {string} restriction The restriction for the ability to join without a  request. ("restricted" or null).
     * @param {string} challenge The ID for the Challenge that this Event will be a part of.
     * @param {string} group The ID for the Group that this Event will be a part of.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, owner, time, capacity, address, title, description, tags, members, access, restriction, challenge, group, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            owner,
            time,
            capacity,
            address,
            title,
            description,
            tags,
            members,
            access,
            restriction,
            challenge,
            group
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
     * Deletes an Event from the database and its dependencies.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} eventID The ID of the Event to delete.
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

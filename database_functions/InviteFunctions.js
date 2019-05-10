import Lambda from "../api/Lambda";
import {err} from "../../Constants";

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
     * Sends a friend request to another User that they accept in order to add you as a friend.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the friend request.
     * @param {string} to The ID of the User receiving the friend request.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createFriendRequest(fromID, from, to, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, to, "friendRequest", from, null, (data) => {
            if (props) {
                if (props.addToItemAttribute && props.addToUserAttribute) {
                    props.addToItemAttribute(to, "friendRequests", from);
                    props.addToItemAttribute(to, "receivedInvites", data.data);
                    props.addToUserAttribute("sentInvites", data.data);
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends a friend request to another User that they accept in order to add you as a friend with a message.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the friend request.
     * @param {string} to The ID of the User receiving the friend request.
     * @param {string} message The message they want to send along with the Invite.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createFriendRequestOptional(fromID, from, to, message, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, to, "friendRequest", from, message, (data) => {
            if (props) {
                if (props.addToItemAttribute && props.addToUserAttribute) {
                    props.addToItemAttribute(to, "friendRequests", from);
                    props.addToItemAttribute(to, "receivedInvites", data.data);
                    props.addToUserAttribute("sentInvites", data.data);
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends an Invite to a User, inviting them to become a member of an Event they are also a member of.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the Invite.
     * @param {string} to The ID of the User receiving the Invite.
     * @param {string} eventID The ID of the Event that the "from" is inviting the "to" to.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventInvite(fromID, from, to, eventID, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, to, "eventInvite", eventID, null, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends an Invite to a User, inviting them to become a member of an Event they are also a member of with a message.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the Invite.
     * @param {string} to The ID of the User receiving the Invite.
     * @param {string} eventID The ID of the Event that the "from" is inviting the "to" to.
     * @param {string} message The message they want to send along with the Invite.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventInviteOptional(fromID, from, to, eventID, message, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, to, "eventInvite", eventID, message, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends an Invite to a User, inviting them to become a member of a Challenge they are also a member of.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the Invite.
     * @param {string} to The ID of the User receiving the Invite.
     * @param {string} challengeID The ID of the Challenge that the "from" is inviting the "to" to.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeInvite(fromID, from, to, challengeID, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, to, "challengeInvite", challengeID, null, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends an Invite to a User, inviting them to be a member of a Challenge they are also a member of with a message.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the Invite.
     * @param {string} to The ID of the User receiving the Invite.
     * @param {string} challengeID The ID of the Challenge that the "from" is inviting the "to" to.
     * @param {string} message The message they want to send along with the Invite.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeInviteOptional(fromID, from, to, challengeID, message, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, to, "challengeInvite", challengeID, message, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends an Invite to a User, inviting them to become a member of a Group they are also a member of.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the Invite.
     * @param {string} to The ID of the User receiving the Invite.
     * @param {string} groupID The ID of the Group that the "from" is inviting the "to" to.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupInvite(fromID, from, to, groupID, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, to, "challengeInvite", groupID, null, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends an Invite to a User, inviting them to become a member of a Group they are also a member of with a message.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the Invite.
     * @param {string} to The ID of the User receiving the Invite.
     * @param {string} groupID The ID of the Group that the "from" is inviting the "to" to.
     * @param {string} message The message they want to send along with the Invite.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupInviteOptional(fromID, from, to, groupID, message, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, to, "groupInvite", groupID, message, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends a Invite, requesting that the User be added to an Event that is restricted.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the request Invite.
     * @param {string} eventID The ID of the Event that the "from" is requesting to be a part of.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventRequest(fromID, from, eventID, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, eventID, "eventRequest", from, null, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends a Invite, requesting that the User be added to an Event that is restricted with a message.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the request Invite.
     * @param {string} eventID The ID of the Event that the "from" is requesting to be a part of.
     * @param {string} message The message they want to send along with the Invite.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createEventRequestOptional(fromID, from, eventID, message, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, eventID, "eventRequest", from, message, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends a Invite, requesting that the User be added to an Challenge that is restricted.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the request Invite.
     * @param {string} challengeID The ID of the Challenge that the "from" is requesting to be a part of.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeRequest(fromID, from, challengeID, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, challengeID, "challengeRequest", from, null, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends a Invite, requesting that the User be added to an Challenge that is restricted with a message.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the request Invite.
     * @param {string} challengeID The ID of the Challenge that the "from" is requesting to be a part of.
     * @param {string} message The message they want to send along with the Invite.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeRequestOptional(fromID, from, challengeID, message, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, challengeID, "challengeRequest", from, message, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends a Invite, requesting that the User be added to an Group that is restricted.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the request Invite.
     * @param {string} groupID The ID of the Group that the "from" is requesting to be a part of.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupRequest(fromID, from, groupID, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, groupID, "groupRequest", from, null, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    /**
     * Sends a Invite, requesting that the User be added to an Group that is restricted with a message.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the request Invite.
     * @param {string} groupID The ID of the Group that the "from" is requesting to be a part of.
     * @param {string} message The message they want to send along with the Invite.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupRequestOptional(fromID, from, groupID, message, successHandler, failureHandler, props) {
        return InviteFunctions.create(fromID, from, groupID, "groupRequest", from, message, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }

    // Update Functions ============================================================

    // ======================================================================================================
    // Invite Low-Level Functions ~
    // ======================================================================================================

    /**
     * Creates an Invite object in the database using the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} from The ID of the User sending the Invite.
     * @param {string} to The ID of the object receiving the Invite.
     * @param {string} inviteType The type of Invite being sent.
     * @param {string} about The ID of the object that the Invite is about.
     * @param {string} description The message sent along with the Invite.
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
     * Deletes an Invite and its dependencies from the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} inviteID The ID of the Invite to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem:
     * function(string, string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, inviteID, successHandler, failureHandler, props) {
        return Lambda.delete(fromID, inviteID, itemType, (data) => {
            if (props) {
                if (props.removeFromUserAttribute && props.removeItem) {
                    props.removeFromUserAttribute("receivedInvites", inviteID);
                    props.removeItem("Invite", inviteID);
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler && successHandler(data);
        }, failureHandler);
    }
}

export default InviteFunctions;

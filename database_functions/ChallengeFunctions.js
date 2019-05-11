import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";
import {err} from "../../Constants";

const itemType = "Challenge";

/**
 * Holds all the potential properly formatted Lambda functions for Challenges.
 */
class ChallengeFunctions {
    // ======================================================================================================
    // Challenge High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     * Creates a bare minimum Challenge in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} owner The User to be the owner of the Challenge.
     * @param {string} endTime The ISO string indicating when the Challenge will finish.
     * @param {number} capacity The maximum number of Users who can join the Challenge.
     * @param {string} title The title of the Challenge to display.
     * @param {string} goal The goal for what people of the Challenge need to do to win.
     * @param {string} access The access string of who can see the Challenge. ("public" or "private").
     * @param {string|null} restriction The restriction value of if Users need to request entry. ("restricted" or null).
     * @param {[string]} tags The tags indicating what kind of a Challenge this will be.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallenge(fromID, owner, endTime, capacity, title, goal, access, restriction, tags, successHandler,
                           failureHandler, props) {
        return ChallengeFunctions.create(fromID, owner, endTime, capacity, title, goal, null, null,
            null, tags, access, restriction, null, null, null, null,
            null, null, (data) => {
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
     * Creates a Challenge with optional information in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} owner The User to be the owner of the Challenge.
     * @param {string} endTime The ISO string indicating when the Challenge will finish.
     * @param {number} capacity The maximum number of Users who can join the Challenge.
     * @param {string} title The title of the Challenge to display.
     * @param {string} goal The goal for what people of the Challenge need to do to win.
     * @param {string} description The description for what the Challenge will entail in detail.
     * @param {number} difficulty The difficulty of this given Challenge, in terms of intensity.
     * @param {[string]|null} memberIDs The IDs of the Users who will be automatically signed up for the Challenge.
     * @param {[string]} tags The tags indicating what kind of a Challenge this will be.
     * @param {string} access The access string of who can see the Challenge. ("public" or "private").
     * @param {string|null} restriction The restriction value of if Users need to request entry. ("restricted" or null).
     * @param {string|null} prize The prize for winning a Challenge
     * @param {string|null} challengeType The type of the Challenge that will be run. ("streak" or null).
     * @param {string|null} streakUpdateSpanType The interval of the update span. (i.e. "daily", "hourly", ...).
     * @param {string|null} streakUpdateInterval How many update spans pass for a Streak update.
     * @param {number|null} streakN How many submissions to do until one Streak N is counted.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createChallengeOptional(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs,
                                   tags, access, restriction, prize, challengeType, streakUpdateSpanType,
                                   streakUpdateInterval, streakN, successHandler, failureHandler, props) {
        return ChallengeFunctions.create(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs, tags,
            access, restriction, prize, null, challengeType, streakUpdateSpanType, streakUpdateInterval, streakN,
            (data) => {
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
     * Creates a bare minimum Challenge for a Group in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The Group that this Challenge is a part of.
     * @param {string} owner The User to be the owner of the Challenge.
     * @param {string} endTime The ISO string indicating when the Challenge will finish.
     * @param {number} capacity The maximum number of Users who can join the Challenge.
     * @param {string} title The title of the Challenge to display.
     * @param {string} goal The goal for what people of the Challenge need to do to win.
     * @param {string} access The access string of who can see the Challenge. ("public" or "private").
     * @param {string|null} restriction The restriction value of if Users need to request entry. ("restricted" or null).
     * @param {[string]} tags The tags indicating what kind of a Challenge this will be.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupChallenge(fromID, groupID, owner, endTime, capacity, title, goal, access, restriction, tags, successHandler,
                           failureHandler, props) {
        return ChallengeFunctions.create(fromID, owner, endTime, capacity, title, goal, null, null, null, tags, access, restriction,
            null, groupID, null, null, null, null, (data) => {
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
     * Creates a Challenge for a Group with optional information in the database with the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} groupID The Group that this Challenge is a part of.
     * @param {string} owner The User to be the owner of the Challenge.
     * @param {string} endTime The ISO string indicating when the Challenge will finish.
     * @param {number} capacity The maximum number of Users who can join the Challenge.
     * @param {string} title The title of the Challenge to display.
     * @param {string} goal The goal for what people of the Challenge need to do to win.
     * @param {string} description The description for what the Challenge will entail in detail.
     * @param {number} difficulty The difficulty of this given Challenge, in terms of intensity.
     * @param {[string]|null} memberIDs The IDs of the Users who will be automatically signed up for the Challenge.
     * @param {[string]} tags The tags indicating what kind of a Challenge this will be.
     * @param {string} access The access string of who can see the Challenge. ("public" or "private").
     * @param {string|null} restriction The restriction value of if Users need to request entry. ("restricted" or null).
     * @param {string|null} prize The prize for winning a Challenge
     * @param {string|null} challengeType The type of the Challenge that will be run. ("streak" or null).
     * @param {string|null} streakUpdateSpanType The interval of the update span. (i.e. "daily", "hourly", ...).
     * @param {string|null} streakUpdateInterval How many update spans pass for a Streak update.
     * @param {number|null} streakN How many submissions to do until one Streak N is counted.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createGroupChallengeOptional(fromID, groupID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs,
                                   tags, access, restriction, prize, challengeType, streakUpdateSpanType,
                                   streakUpdateInterval, streakN, successHandler, failureHandler, props) {
        return ChallengeFunctions.create(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs, tags,
            access, restriction, prize, groupID, challengeType, streakUpdateSpanType, streakUpdateInterval, streakN,
            (data) => {
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

    /**
     * Chooses the winner of a Challenge in order to complete the Challenge and declare the winner.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} winnerID The ID of the User to declare the winner.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateWinner(fromID, challengeID, winnerID, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "winner", winnerID, (data) => {
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
    };

    /**
     * Changes the Challenge access to private so that only friends can view it.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToPrivate(fromID, challengeID, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "access", "private", (data) => {
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
     * Changes the Challenge access to public so that anyone can view it.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToPublic(fromID, challengeID, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "access", "public", (data) => {
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
     * Changes the Challenge restriction to invite only so that Users need to send a request to join the Challenge.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToInviteOnly(fromID, challengeID, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateAdd(fromID, challengeID, "restriction", "invite", (data) => {
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
     * Changes the Challenge restriction to unrestricted so that Users can directly join the Challenge.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {function({secretKey: string, timestamp: string, data: *})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateToUnrestricted(fromID, challengeID, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "restriction", null, (data) => {
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
     * Adds a tag to the Challenge's tags.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} tag The name of the tag to add to the Challenge.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addTag(fromID, challengeID, tag, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateAdd(fromID, challengeID, "tags", tag, (data) => {
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
     * Removes a tag from the Challenge's tags.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} tag The name of the tag to remove from the Challenge.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeTag(fromID, challengeID, tag, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateRemove(fromID, challengeID, "tags", tag, (data) => {
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
     * Adds a member to the Challenge directly. Also finishes any invites involved with this operation.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} userID The ID of the User to join the Challenge.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static addMember(fromID, challengeID, userID, successHandler, failureHandler, props) {
        return UserFunctions.addChallenge(fromID, userID, challengeID, null, successHandler, failureHandler, props);
    }

    /**
     * Removes a member from the Challenge directly.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} userID The ID of the User to remove from the Challenge.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static removeMember(fromID, challengeID, userID, successHandler, failureHandler, props) {
        return UserFunctions.removeChallenge(fromID, userID, challengeID, (data) => {
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
     * Updates the end time for a Challenge to indicate when the Challenge will be completed.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} endTime The ISO string of when the Challenge will be finished.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateEndTime(fromID, challengeID, endTime, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "endTime", endTime, (data) => {
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
     * Updates the capacity for a Challenge to indicate the maximum number of Users that can be in a Challenge.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} capacity How many members at most can be a part of the Challenge.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateCapacity(fromID, challengeID, capacity, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "capacity", capacity, (data) => {
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
     * Updates the goal for a Challenge to indicate what the members must do to win the Challenge.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} goal A description of what members must do in order to win the Challenge.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateGoal(fromID, challengeID, goal, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "goal", goal, (data) => {
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
     * Updates the prize for a Challenge to display what the User who wins will earn.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} prize What the winner will get for winning the Challenge.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updatePrize(fromID, challengeID, prize, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "prize", prize, (data) => {
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
     * Updates the title for a Challenge to display for the Challenge.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} title The title of the Challenge to display as preliminary information.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateTitle(fromID, challengeID, title, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "title", title, (data) => {
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
     * Updates the description for a Challenge to give the details of the Challenge.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {string} description The detailed description for information about the Challenge.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateDescription(fromID, challengeID, description, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "description", description, (data) => {
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
     * Updates the difficulty for a Challenge to indicate the intensity of the Challenge.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to update.
     * @param {number} difficulty The difficulty ("1", "2", or "3") or the intensity of the Challenge.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateDifficulty(fromID, challengeID, difficulty, successHandler, failureHandler, props) {
        return ChallengeFunctions.updateSet(fromID, challengeID, "difficulty", difficulty, (data) => {
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

    // ======================================================================================================
    // Challenge Low-Level Functions ~
    // ======================================================================================================

    /**
     * Creates a Challenge object in the database using the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} owner The User to be the owner of the Challenge.
     * @param {string} endTime The ISO string indicating when the Challenge will finish.
     * @param {number} capacity The maximum number of Users who can join the Challenge.
     * @param {string} title The title of the Challenge to display.
     * @param {string} goal The goal for what people of the Challenge need to do to win.
     * @param {string} description The description for what the Challenge will entail in detail.
     * @param {number} difficulty The difficulty of this given Challenge, in terms of intensity.
     * @param {[string]|null} members The IDs of the Users who will be automatically signed up for the Challenge.
     * @param {[string]} tags The tags indicating what kind of a Challenge this will be.
     * @param {string} access The access string of who can see the Challenge. ("public" or "private").
     * @param {string|null} restriction The restriction value of if Users need to request entry. ("restricted" or null).
     * @param {string|null} prize The prize for winning a Challenge
     * @param {string|null} group The Group the Challenge is a part of.
     * @param {string|null} challengeType The type of the Challenge that will be run. ("streak" or null).
     * @param {string|null} streakUpdateSpanType The interval of the update span. (i.e. "daily", "hourly", ...).
     * @param {string|null} streakUpdateInterval How many update spans pass for a Streak update.
     * @param {number|null} streakN How many submissions to do until one Streak N is counted.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, owner, endTime, capacity, title, goal, description, difficulty, members, tags, access,
                  restriction, prize, group, challengeType, streakUpdateSpanType, streakUpdateInterval, streakN, successHandler, failureHandler) {
        return Lambda.create(fromID, "Challenge", {
            owner,
            endTime,
            capacity,
            title,
            goal,
            description,
            tags,
            difficulty,
            prize,
            members,
            access,
            restriction,
            group,
            challengeType,
            streakUpdateSpanType,
            streakUpdateInterval,
            streakN,
        }, successHandler, failureHandler);
    }

    static updateAdd(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, challengeID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, challengeID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, challengeID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * Deletes a Challenge from the database and all of its dependencies.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} challengeID The ID of the Challenge to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, challengeID, successHandler, failureHandler, props) {
        return Lambda.delete(fromID, challengeID, itemType, (data) => {
            if (props) {
                if (props.addToItemAttribute && props.addToUserAttribute) {
                    props.removeFromUserAttribute("challenges", challengeID);
                    props.removeItem("Challenge", challengeID);
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

export default ChallengeFunctions;

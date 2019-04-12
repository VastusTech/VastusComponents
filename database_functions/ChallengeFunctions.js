import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";

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
     * TODO
     *
     * @param fromID
     * @param owner
     * @param endTime
     * @param capacity
     * @param title
     * @param goal
     * @param access
     * @param restriction
     * @param tags
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createChallenge(fromID, owner, endTime, capacity, title, goal, access, restriction, tags, successHandler,
                           failureHandler) {
        return this.create(fromID, owner, endTime, capacity, title, goal, null, null, null, tags, access, restriction,
            null, null, null, null, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param owner
     * @param endTime
     * @param capacity
     * @param title
     * @param goal
     * @param description
     * @param difficulty
     * @param memberIDs
     * @param tags
     * @param access
     * @param restriction
     * @param prize
     * @param challengeType
     * @param streakUpdateSpanType
     * @param streakUpdateInterval
     * @param streakN
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createChallengeOptional(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs,
                                   tags, access, restriction, prize, challengeType, streakUpdateSpanType,
                                   streakUpdateInterval, streakN, successHandler, failureHandler) {
        return this.create(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs, tags,
            access, restriction, prize, challengeType, streakUpdateSpanType, streakUpdateInterval, streakN,
            successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param winnerID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateWinner(fromID, challengeID, winnerID, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "winner", winnerID, successHandler, failureHandler);
    };

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateToPrivate(fromID, challengeID, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "access", "private", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateToPublic(fromID, challengeID, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "access", "public", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateToInviteOnly(fromID, challengeID, successHandler, failureHandler) {
        return this.updateAdd(fromID, challengeID, "restriction", "invite", successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateToUnrestricted(fromID, challengeID, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "restriction", null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param tag
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addTag(fromID, challengeID, tag, successHandler, failureHandler) {
        return this.updateAdd(fromID, challengeID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param tag
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeTag(fromID, challengeID, tag, successHandler, failureHandler) {
        return this.updateRemove(fromID, challengeID, "tags", tag, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param userID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addMember(fromID, challengeID, userID, successHandler, failureHandler) {
        return UserFunctions.addChallenge(fromID, userID, challengeID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param userID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static removeMember(fromID, challengeID, userID, successHandler, failureHandler) {
        return UserFunctions.removeChallenge(fromID, userID, challengeID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param eventID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static addEvent(fromID, challengeID, eventID, successHandler, failureHandler) {
        return this.updateAdd(fromID, challengeID, "events", eventID, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param endTime
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateEndTime(fromID, challengeID, endTime, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "endTime", endTime, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param capacity
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateCapacity(fromID, challengeID, capacity, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "capacity", capacity, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param goal
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateGoal(fromID, challengeID, goal, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "goal", goal, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param prize
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updatePrize(fromID, challengeID, prize, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "prize", prize, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param title
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateTitle(fromID, challengeID, title, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "title", title, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param description
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateDescription(fromID, challengeID, description, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "description", description, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param difficulty
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateDifficulty(fromID, challengeID, difficulty, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "difficulty", difficulty, successHandler, failureHandler);
    }

    // ======================================================================================================
    // Challenge Low-Level Functions ~
    // ======================================================================================================
    /**
     * TODO
     *
     * @param fromID
     * @param owner
     * @param endTime
     * @param capacity
     * @param title
     * @param goal
     * @param description
     * @param difficulty
     * @param memberIDs
     * @param tags
     * @param access
     * @param restriction
     * @param prize
     * @param challengeType
     * @param streakUpdateSpanType
     * @param streakUpdateInterval
     * @param streakN
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static create(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs, tags, access,
                  restriction, prize, challengeType, streakUpdateSpanType, streakUpdateInterval, streakN, successHandler, failureHandler) {
        return Lambda.create(fromID, "Challenge", {
            owner,
            endTime,
            capacity,
            title,
            goal,
            description,
            difficulty,
            memberIDs,
            tags,
            access,
            restriction,
            prize,
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
     * TODO
     *
     * @param fromID
     * @param challengeID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static delete(fromID, challengeID, successHandler, failureHandler) {
        return Lambda.delete(fromID, challengeID, itemType, successHandler, failureHandler);
    }
}

export default ChallengeFunctions;

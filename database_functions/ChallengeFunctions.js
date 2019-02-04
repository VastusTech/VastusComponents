import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";

const itemType = "Challenge";

class ChallengeFunctions {
    // TODO THESE ARE THE HIGH-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    // Create Functions ============================================================
    static createChallenge(fromID, owner, endTime, capacity, title, goal, access, restriction, tags, successHandler, failureHandler) {
        return this.create(fromID, owner, endTime, capacity, title, goal, null, null, null, tags, access, restriction, null, successHandler, failureHandler);
    }
    static createChallengeOptional(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs, tags, access, restriction, prize, successHandler, failureHandler) {
        return this.create(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs, tags, access, restriction, prize, successHandler, failureHandler);
    }

    // Update Functions ============================================================
    static updateWinner(fromID, challengeID, winnerID, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "winner", winnerID, successHandler, failureHandler);
    };
    static updateToPrivate(fromID, challengeID, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "access", "private", successHandler, failureHandler);
    }
    static updateToPublic(fromID, challengeID, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "access", "public", successHandler, failureHandler);
    }
    static updateToInviteOnly(fromID, challengeID, successHandler, failureHandler) {
        return this.updateAdd(fromID, challengeID, "restriction", "invite", successHandler, failureHandler);
    }
    static updateToUnrestricted(fromID, challengeID, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "restriction", null, successHandler, failureHandler);
    }
    static addTag(fromID, challengeID, tag, successHandler, failureHandler) {
        return this.updateAdd(fromID, challengeID, "tags", tag, successHandler, failureHandler);
    }
    static removeTag(fromID, challengeID, tag, successHandler, failureHandler) {
        return this.updateRemove(fromID, challengeID, "tags", tag, successHandler, failureHandler);
    }
    static addMember(fromID, challengeID, userID, successHandler, failureHandler) {
        return UserFunctions.addChallenge(fromID, userID, challengeID, successHandler, failureHandler);
    }
    static removeMember(fromID, challengeID, userID, successHandler, failureHandler) {
        return UserFunctions.removeChallenge(fromID, userID, challengeID, successHandler, failureHandler);
    }
    static addEvent(fromID, challengeID, eventID, successHandler, failureHandler) {
        return this.updateAdd(fromID, challengeID, "events", eventID, successHandler, failureHandler);
    }
    static updateEndTime(fromID, challengeID, endTime, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "endTime", endTime, successHandler, failureHandler);
    }
    static updateCapacity(fromID, challengeID, capacity, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "capacity", capacity, successHandler, failureHandler);
    }
    static updateGoal(fromID, challengeID, goal, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "goal", goal, successHandler, failureHandler);
    }
    static updatePrize(fromID, challengeID, prize, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "prize", prize, successHandler, failureHandler);
    }
    static updateTitle(fromID, challengeID, title, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "title", title, successHandler, failureHandler);
    }
    static updateDescription(fromID, challengeID, description, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "description", description, successHandler, failureHandler);
    }
    static updateDifficulty(fromID, challengeID, difficulty, successHandler, failureHandler) {
        return this.updateSet(fromID, challengeID, "difficulty", difficulty, successHandler, failureHandler);
    }

    // TODO THESE ARE THE LOW-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    static create(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs, tags, access, restriction, prize, successHandler, failureHandler) {
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
    static delete(fromID, challengeID, successHandler, failureHandler) {
        return Lambda.delete(fromID, challengeID, itemType, successHandler, failureHandler);
    }
}

export default ChallengeFunctions;

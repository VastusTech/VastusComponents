import Lambda from "../api/Lambda";

const itemType = "Streak";

class StreakFunctions {
    // TODO THESE ARE THE HIGH-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    // Create Functions ============================================================
    static createStreak(fromID, owner, about, streakType, successHandler, failureHandler) {
        return this.create(fromID, owner, about, streakType, null, successHandler, failureHandler);
    }
    static createStreakOptional(fromID, owner, about, streakType, updateType, successHandler, failureHandler) {
        return this.create(fromID, owner, about, streakType, updateType, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    // TODO THESE ARE THE LOW-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    static create(fromID, owner, about, streakType, updateType, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            owner,
            about,
            streakType,
            updateType
        }, successHandler, failureHandler);
    }
    static updateAdd(fromID, streakID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, streakID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, streakID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, streakID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, streakID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, streakID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static delete(fromID, streakID, successHandler, failureHandler) {
        return Lambda.delete(fromID, streakID, itemType, successHandler, failureHandler);
    }
}

export default StreakFunctions;

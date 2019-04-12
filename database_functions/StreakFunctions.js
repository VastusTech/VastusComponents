import Lambda from "../api/Lambda";

const itemType = "Streak";

/**
 * Holds all the potential properly formatted Lambda functions for Streaks.
 */
class StreakFunctions {
    // ======================================================================================================
    // Streak High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param owner
     * @param about
     * @param streakType
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createStreak(fromID, owner, about, streakType, successHandler, failureHandler) {
        return this.create(fromID, owner, about, streakType, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param owner
     * @param about
     * @param streakType
     * @param updateType
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createStreakOptional(fromID, owner, about, streakType, updateType, successHandler, failureHandler) {
        return this.create(fromID, owner, about, streakType, updateType, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    // ======================================================================================================
    // Streak Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param fromID
     * @param owner
     * @param about
     * @param streakType
     * @param updateType
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
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

    /**
     * TODO
     *
     * @param fromID
     * @param streakID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static delete(fromID, streakID, successHandler, failureHandler) {
        return Lambda.delete(fromID, streakID, itemType, successHandler, failureHandler);
    }
}

export default StreakFunctions;

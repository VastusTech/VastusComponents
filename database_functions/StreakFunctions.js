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
     * @param {string} fromID The User invoking the Lambda request.
     * @param owner
     * @param about
     * @param streakType
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createStreak(fromID, owner, about, streakType, successHandler, failureHandler) {
        return this.create(fromID, owner, about, streakType, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param owner
     * @param about
     * @param streakType
     * @param updateType
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
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
     * @param {string} fromID The User invoking the Lambda request.
     * @param owner
     * @param about
     * @param streakType
     * @param updateType
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
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
     * @param {string} fromID The User invoking the Lambda request.
     * @param streakID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, streakID, successHandler, failureHandler) {
        return Lambda.delete(fromID, streakID, itemType, successHandler, failureHandler);
    }
}

export default StreakFunctions;

import Lambda from "../api/Lambda";

const itemType = "Streak";

// TODO Revisit for another kind of Streak...

/**
 * Holds all the potential properly formatted Lambda functions for Streaks.
 */
class StreakFunctions {
  // ======================================================================================================
  // Streak High-Level Functions ~
  // ======================================================================================================

  // Create Functions ============================================================

  // TODO Revisit
  // static createStreak(fromID, owner, about, streakType, successHandler, failureHandler) {
  //     return this.create(fromID, owner, about, streakType, null, successHandler, failureHandler);
  // }
  // static createStreakOptional(fromID, owner, about, streakType, updateType, successHandler, failureHandler) {
  //     return this.create(fromID, owner, about, streakType, updateType, successHandler, failureHandler);
  // }

  // Update Functions ============================================================

  /**
   * Updates a Streak in the database
   *
   * @param fromID
   * @param streakID
   * @param successHandler
   * @param failureHandler
   */
  // static addStreakN(fromID, streakID, successHandler, failureHandler) {
  //     this.updateAdd(fromID, streakID, "N", "N", successHandler, failureHandler);
  // }

  // ======================================================================================================
  // Streak Low-Level Functions ~
  // ======================================================================================================

  // TODO Revisit
  // static create(fromID, owner, about, streakType, updateType, successHandler, failureHandler) {
  //     return Lambda.create(fromID, itemType, {
  //         owner,
  //         about,
  //         streakType,
  //         updateType
  //     }, successHandler, failureHandler);
  // }

  // static updateAdd(fromID, streakID, attributeName, attributeValue, successHandler, failureHandler) {
  //     return Lambda.updateAddToAttribute(fromID, streakID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  // }
  // static updateRemove(fromID, streakID, attributeName, attributeValue, successHandler, failureHandler) {
  //     return Lambda.updateRemoveFromAttribute(fromID, streakID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  // }
  // static updateSet(fromID, streakID, attributeName, attributeValue, successHandler, failureHandler) {
  //     return Lambda.updateSetAttribute(fromID, streakID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  // }

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
  // static delete(fromID, streakID, successHandler, failureHandler) {
  //     return Lambda.delete(fromID, streakID, itemType, successHandler, failureHandler);
  // }
}

export default StreakFunctions;

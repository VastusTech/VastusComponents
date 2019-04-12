import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";

const itemType = "Gym";

// TODO Revisit once we re-implement this potentially

/**
 * Holds all the potential properly formatted Lambda functions for Gyms.
 */
class GymFunctions extends UserFunctions {
    // ======================================================================================================
    // Gym High-Level Functions ~
    // ======================================================================================================

    // =============================================================================
    // Create Functions ============================================================

    // Update Functions ============================================================



    // ======================================================================================================
    // Gym Low-Level Functions ~
    // ======================================================================================================
    static create(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return super.create(fromID, itemType, name, gender, birthday, email, username, bio, successHandler, failureHandler);
    }
    static updateAdd(fromID, gymID, attributeName, attributeValue, successHandler, failureHandler) {
        return super.updateAdd(fromID, itemType, gymID, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, gymID, attributeName, attributeValue, successHandler, failureHandler) {
        return super.updateRemove(fromID, itemType, gymID, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, gymID, attributeName, attributeValue, successHandler, failureHandler) {
        return super.updateSet(fromID, itemType, gymID, attributeName, attributeValue, successHandler, failureHandler);
    }
    static delete(fromID, gymID, successHandler, failureHandler) {
        return super.delete(fromID, itemType, gymID, successHandler, failureHandler);
    }
}

export default GymFunctions;

import Lambda from "../api/Lambda";

const itemType = "Workout";

// TODO Revisit once we re-implement this potentially

/**
 * Holds all the potential properly formatted Lambda functions for Workouts.
 */
class WorkoutFunctions {
    // ======================================================================================================
    // Workout High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    // Update Functions ============================================================


    // ======================================================================================================
    // Workout Low-Level Functions ~
    // ======================================================================================================

    static create() {
        // TODO Implement
        console.log("Not implemented...");
        alert("Not implemented...");
    }
    static updateAdd(fromID, workoutID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, workoutID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, workoutID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, workoutID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, workoutID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, workoutID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static delete(fromID, workoutID, successHandler, failureHandler) {
        return Lambda.delete(fromID, workoutID, itemType, successHandler, failureHandler);
    }
}

export default WorkoutFunctions;

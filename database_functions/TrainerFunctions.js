import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";

const itemType = "Trainer";

class TrainerFunctions extends UserFunctions {
    // TODO THESE ARE THE HIGH-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    // Create Functions ============================================================
    static createTrainer(fromID, name, username, email, successHandler, failureHandler) {
        return this.create(fromID, name, null,null, username, email, null, successHandler, failureHandler);
    }
    static createTrainerOptional(fromID, name, gender, birthday, username, email, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, username, email, bio, successHandler, failureHandler);
    }

    // Update Functions ============================================================


    // TODO THESE ARE THE LOW-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    static create(fromID, name, gender, birthday, username, email, bio, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            name,
            gender,
            birthday,
            username,
            email,
            bio
        }, successHandler, failureHandler);
    }
    static updateAdd(fromID, trainerID, attributeName, attributeValue, successHandler, failureHandler) {
        return super.updateAdd(fromID, itemType, trainerID, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, trainerID, attributeName, attributeValue, successHandler, failureHandler) {
        return super.updateRemove(fromID, itemType, trainerID, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, trainerID, attributeName, attributeValue, successHandler, failureHandler) {
        return super.updateSet(fromID, itemType, trainerID, attributeName, attributeValue, successHandler, failureHandler);
    }
    static delete(fromID, trainerID, successHandler, failureHandler) {
        return super.delete(fromID, itemType, trainerID, successHandler, failureHandler);
    }
}

export default TrainerFunctions;

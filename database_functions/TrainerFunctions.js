import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";

const itemType = "Trainer";

/**
 * Holds all the potential properly formatted Lambda functions for Trainers.
 */
class TrainerFunctions extends UserFunctions {
    // ======================================================================================================
    // Trainer High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param name
     * @param email
     * @param username
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createTrainer(fromID, name, email, username, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, username, email, null, null, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param name
     * @param gender
     * @param birthday
     * @param email
     * @param username
     * @param bio
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createTrainerOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, email, username, null, null, bio, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param name
     * @param email
     * @param username
     * @param federatedID
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createFederatedTrainer(fromID, name, email, username, federatedID, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, federatedID, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param name
     * @param gender
     * @param birthday
     * @param email
     * @param username
     * @param federatedID
     * @param bio
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createFederatedTrainerOptional(fromID, name, gender, birthday, email, username, federatedID, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, email, username, null, federatedID, bio, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    // ======================================================================================================
    // Trainer Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param fromID
     * @param name
     * @param gender
     * @param birthday
     * @param email
     * @param username
     * @param stripeID
     * @param federatedID
     * @param bio
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static create(fromID, name, gender, birthday, email, username, stripeID, federatedID, bio, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            name,
            gender,
            birthday,
            username,
            email,
            bio,
            stripeID,
            federatedID
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

    /**
     * TODO
     *
     * @param fromID
     * @param trainerID
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static delete(fromID, trainerID, successHandler, failureHandler) {
        return super.delete(fromID, itemType, trainerID, successHandler, failureHandler);
    }
}

export default TrainerFunctions;

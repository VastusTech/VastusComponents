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
     * @param {string} fromID The User invoking the Lambda request.
     * @param name
     * @param email
     * @param username
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createTrainer(fromID, name, email, username, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, username, email, null, null, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param name
     * @param gender
     * @param birthday
     * @param email
     * @param username
     * @param bio
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createTrainerOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, email, username, null, null, bio, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param name
     * @param email
     * @param username
     * @param federatedID
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createFederatedTrainer(fromID, name, email, username, federatedID, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, federatedID, null, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param name
     * @param gender
     * @param birthday
     * @param email
     * @param username
     * @param federatedID
     * @param bio
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
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
     * @param {string} fromID The User invoking the Lambda request.
     * @param name
     * @param gender
     * @param birthday
     * @param email
     * @param username
     * @param stripeID
     * @param federatedID
     * @param bio
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
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
     * @param {string} fromID The User invoking the Lambda request.
     * @param trainerID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, trainerID, successHandler, failureHandler) {
        return super.delete(fromID, itemType, trainerID, successHandler, failureHandler);
    }
}

export default TrainerFunctions;

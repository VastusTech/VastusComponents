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
     * Creates a Trainer in the database using as little info as allowed.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Trainer to place into the database.
     * @param {string} email The email address of the Trainer.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createTrainer(fromID, name, email, username, successHandler, failureHandler) {
        return TrainerFunctions.create(fromID, name, null, null, email, username, null, null, null, successHandler, failureHandler);
    }

    /**
     * Creates a Trainer in the database using all the optional info that can be used for a normal Trainer.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Trainer to place into the database.
     * @param {string} gender The gender of the Trainer.
     * @param {string} birthday The ISO string of the date of birth for the Trainer.
     * @param {string} email The email address of the Trainer.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param {string} bio The biographical information description for the Trainer.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createTrainerOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return TrainerFunctions.create(fromID, name, gender, birthday, email, username, null, null, bio, successHandler, failureHandler);
    }

    /**
     * Creates a Trainer with as little info as possible from a federated identity (Google, Facebook, ...).
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Trainer to place into the database.
     * @param {string} email The email address of the Trainer.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param {string} federatedID The unique federated ID from the federated identity.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createFederatedTrainer(fromID, name, email, username, federatedID, successHandler, failureHandler) {
        return TrainerFunctions.create(fromID, name, null, null, email, username, null, federatedID, null, successHandler, failureHandler);
    }

    /**
     * Creates a Trainer in the database using all the optional info that can be used from a federated identity (Google,
     * Facebook, ...).
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Trainer to place into the database.
     * @param {string} gender The gender of the Trainer.
     * @param {string} birthday The ISO string of the date of birth for the Trainer.
     * @param {string} email The email address of the Trainer.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param {string} federatedID The unique federated ID from the federated identity.
     * @param {string} bio The biographical information description for the Trainer.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createFederatedTrainerOptional(fromID, name, gender, birthday, email, username, federatedID, bio, successHandler, failureHandler) {
        return TrainerFunctions.create(fromID, name, gender, birthday, email, username, null, federatedID, bio, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    // ======================================================================================================
    // Trainer Low-Level Functions ~
    // ======================================================================================================

    /**
     * Places a Trainer inside of the database using the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Trainer to place into the database.
     * @param {string} gender The gender of the Trainer.
     * @param {string} birthday The ISO string of the date of birth for the Trainer.
     * @param {string} email The email address of the Trainer.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param {string} stripeID The Stripe ID for the Trainer.
     * @param {string} federatedID The unique federated ID from the federated identity.
     * @param {string} bio The biographical information description for the Trainer.
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
        return Lambda.updateAddToAttribute(fromID, trainerID, itemType, attributeName, attributeValue, successHandler,
            failureHandler);
    }
    static updateRemove(fromID, trainerID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, trainerID, itemType, attributeName, attributeValue,
            successHandler, failureHandler);
    }
    static updateSet(fromID, trainerID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, trainerID, itemType, attributeName, attributeValue, successHandler,
            failureHandler);
    }

    /**
     * Deletes a Trainer in the database and its dependencies.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} trainerID The ID of the Trainer to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, trainerID, successHandler, failureHandler) {
        return Lambda.delete(fromID, trainerID, itemType, successHandler, failureHandler);
    }
}

export default TrainerFunctions;

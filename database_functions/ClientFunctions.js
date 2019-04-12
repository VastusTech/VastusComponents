import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";

const itemType = "Client";

/**
 * Holds all the potential properly formatted Lambda functions for Clients.
 */
class ClientFunctions extends UserFunctions {
    // ======================================================================================================
    // Client High-Level Functions ~
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
    static createClient(fromID, name, email, username, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, null, null, successHandler, failureHandler);
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
    static createClientOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, email, username, bio, null, null, successHandler, failureHandler);
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
    static createFederatedClient(fromID, name, email, username, federatedID, successHandler, failureHandler) {
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
    static createFederatedClientOptional(fromID, name, gender, birthday, email, username, federatedID, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, email, username, null, federatedID, bio, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    // ======================================================================================================
    // Client Low-Level Functions ~
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
            email,
            username,
            bio,
            stripeID,
            federatedID,
        }, successHandler, failureHandler);
    }
}

export default ClientFunctions;

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
     * Creates a Client in the database using as little info as allowed.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Client to place into the database.
     * @param {string} email The email address of the Client.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createClient(fromID, name, email, username, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, null, null, successHandler, failureHandler);
    }

    /**
     * Creates a Client in the database using all the optional info that can be used for a normal Client.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Client to place into the database.
     * @param {string} gender The gender of the Client.
     * @param {string} birthday The ISO string of the date of birth for the Client.
     * @param {string} email The email address of the Client.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param {string} bio The biographical information description for the Client.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createClientOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, email, username, bio, null, null, successHandler, failureHandler);
    }

    /**
     * Creates a Client with as little info as possible from a federated identity (Google, Facebook, ...).
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Client to place into the database.
     * @param {string} email The email address of the Client.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param {string} federatedID The unique federated ID from the federated identity.
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createFederatedClient(fromID, name, email, username, federatedID, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, federatedID, null, successHandler, failureHandler);
    }

    /**
     * Creates a Client in the database using all the optional info that can be used from a federated identity (Google,
     * Facebook, ...).
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Client to place into the database.
     * @param {string} gender The gender of the Client.
     * @param {string} birthday The ISO string of the date of birth for the Client.
     * @param {string} email The email address of the Client.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param {string} federatedID The unique federated ID from the federated identity.
     * @param {string} bio The biographical information description for the Client.
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
     * Places a Client inside of the database using the given information.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} name The display name of the Client to place into the database.
     * @param {string} gender The gender of the Client.
     * @param {string} birthday The ISO string of the date of birth for the Client.
     * @param {string} email The email address of the Client.
     * @param {string} username The Cognito User Pool Username of the User.
     * @param stripeID
     * @param federatedID
     * @param {string} bio The biographical information description for the Client.
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

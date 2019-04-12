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
     * @param fromID
     * @param name
     * @param email
     * @param username
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createClient(fromID, name, email, username, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, null, null, successHandler, failureHandler);
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
    static createClientOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, email, username, bio, null, null, successHandler, failureHandler);
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
    static createFederatedClient(fromID, name, email, username, federatedID, successHandler, failureHandler) {
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
            email,
            username,
            bio,
            stripeID,
            federatedID,
        }, successHandler, failureHandler);
    }
}

export default ClientFunctions;

import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";

const itemType = "Sponsor";

// TODO Revisit once we re-implement this potentially

/**
 * Holds all the potential properly formatted Lambda functions for Sponsors.
 */
class SponsorFunctions extends UserFunctions {
    // ======================================================================================================
    // Sponsor High-Level Functions ~
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
    static createSponsor(fromID, name, email, username, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, successHandler, failureHandler);
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
    static createSponsorOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    // ======================================================================================================
    // Sponsor Low-Level Functions ~
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
     * @param bio
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            name,
            gender,
            birthday,
            email,
            username,
            bio
        }, successHandler, failureHandler);
    }
}

export default SponsorFunctions;

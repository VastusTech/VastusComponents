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
     * @param fromID
     * @param name
     * @param email
     * @param username
     * @param successHandler
     * @param failureHandler
     * @return {fromID}
     */
    static createSponsor(fromID, name, email, username, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, successHandler, failureHandler);
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

import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";

const itemType = "Client";

class ClientFunctions extends UserFunctions {
    // TODO THESE ARE THE HIGH-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
    // Create Functions ============================================================
    static createClient(fromID, name, email, username, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, null, null, successHandler, failureHandler);
    }
    static createClientOptional(fromID, name, gender, birthday, email, username, bio, successHandler, failureHandler) {
        return this.create(fromID, name, gender, birthday, email, username, bio, null, null, successHandler, failureHandler);
    }
    static createFederatedClient(fromID, name, email, username, federatedID, successHandler, failureHandler) {
        return this.create(fromID, name, null, null, email, username, null, federatedID, null, successHandler, failureHandler);
    }
    static createFederatedClientOptional(fromID, name, gender, birthday, email, username, federatedID, bio, successHandler, failureHander) {
        return this.create(fromID, name, gender, birthday, email, username, null, federatedID, bio, successHandler, failureHander);
    }

    // Update Functions ============================================================

    // TODO THESE ARE THE LOW-LEVEL DATABASE ACTION FUNCTIONS
    // =============================================================================
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

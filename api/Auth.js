import {Auth} from "aws-amplify";
import {err, log} from "../../Constants";
import TestHelper from "../testing/TestHelper";
import jwt_decode from "jwt-decode";

/**
 * This class wraps all the logic for the Authentication module of Amplify so that we can use it for testing and it
 * automatically handles all TestHelper logic. Does everything for Cognito.
 */
class AuthAPI {
    /**
     * Updates the Auth status of the current user if the browser has already stored the authentication tokens for the
     * user so they will automatically sign in when they enter the page.
     *
     * @param {function(*)} successHandler Handles the received cognito user.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static getCurrentUser(successHandler, failureHandler) {
        // TODO This could totally be overkill lol
        TestHelper.ifTesting || Auth.currentCredentials();
        // Auth.currentSession();
        // Auth.currentUserCredentials();
        // Auth.currentUserInfo();
        // Auth.currentUserPoolUser();
        TestHelper.ifTesting || Auth.currentAuthenticatedUser().then((user) => {
            log&&console.log("AUTH: Succeeded update user");
            successHandler && successHandler(user);
        }).catch(error => {
            err&&console.error("!!!AUTH: Failed to get current user!!!");
            err&&console.error(error);
            failureHandler && failureHandler(error);
        });
        if (TestHelper.ifTesting) {
            successHandler && successHandler({});
            return {};
        }
    }

    /**
     * Starts the sign up flow and creates a user in Cognito with the given information.
     *
     * @param {string} username The chosen username for the user.
     * @param {string} password The chosen password for the user.
     * @param {string} name The chosen name for the user.
     * @param {string} email The chosen email for the user.
     * @param {function(*)} successHandler Handles the data for signing up.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static signUp(username, password, name, email, successHandler, failureHandler) {
        TestHelper.ifTesting || Auth.signUp({
            username,
            password,
            attributes: { name, email, gender: "unspecified", birthdate: "~undefined" }
        }).then(data => {
            log&&console.log("AUTH: Succeeded sign up");
            successHandler && successHandler(data);
        }).catch(error => {
            err&&console.error("!!!AUTH: Failed to sign up!!!");
            err&&console.error(error);
            failureHandler && failureHandler(error);
        });
        if (TestHelper.ifTesting) {
            successHandler && successHandler({});
            return { username, password, name, email };
        }
    }

    /**
     * Finishes the sign up flow and confirms the user to be allowed to access the application.
     *
     * @param {string} username The username of the user to confirm.
     * @param {string} code The received code from the user's email.
     * @param {function(*)} successHandler Handles the received cognito user.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static confirmSignUp(username, code, successHandler, failureHandler) {
        TestHelper.ifTesting || Auth.confirmSignUp(username, code).then(authUser => {
            log&&console.log("AUTH: Succeeded confirm sign up");
            successHandler && successHandler(authUser);
        }).catch(error => {
            err&&console.error("!!!AUTH: Failed to confirm sign up!!!");
            err&&console.error(error);
            failureHandler && failureHandler(error);
        });
        if (TestHelper.ifTesting) {
            successHandler && successHandler({});
            return { username, code };
        }
    }

    /**
     * Starts the forgot password flow and sends a confirmation code to the email of the user that has the given
     * username. Eventually allows the user to switch their password.
     *
     * @param {string} username The username of the user to change the password of.
     * @param {function(*)} successHandler Handles the received authentication data.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static forgotPassword(username, successHandler, failureHandler) {
        TestHelper.ifTesting || Auth.forgotPassword(username).then(data => {
            log&&console.log("AUTH: Succeeded forgot password");
            successHandler && successHandler(data);
        }).catch(error => {
            err&&console.error("!!!AUTH: Failed forgot password!!!");
            err&&console.error(error);
            failureHandler && failureHandler(error);
        });
        if (TestHelper.ifTesting) {
            successHandler && successHandler({});
            return { username };
        }
    }

    /**
     * Confirms the forgot password flow and changes the user's password to the one given.
     *
     * @param {string} username The username for the user to change the password of.
     * @param {string} code The received confirmation code from the user's email.
     * @param {string} newPassword The new password to set the user to.
     * @param {function(*)} successHandler Handles the received authentication data.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static confirmForgotPassword(username, code, newPassword, successHandler, failureHandler) {
        TestHelper.ifTesting || Auth.forgotPasswordSubmit(username, code, newPassword).then(data => {
            log&&console.log("AUTH: Succeeded confirm forgot password");
            successHandler && successHandler(data);
        }).catch(error => {
            err&&console.error("!!!AUTH: Failed to confirm forgot password!!!");
            err&&console.error(error);
            failureHandler && failureHandler(error);
        });
        if (TestHelper.ifTesting) {
            successHandler && successHandler({});
            return { username, code, newPassword };
        }
    }

    /**
     * Signs in the user for the Auth module using their credentials.
     *
     * @param {string} username The username for the user.
     * @param {string} password The password for the user.
     * @param {function(*)} successHandler Handles the received authenticated cognito user.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static signIn(username, password, successHandler, failureHandler) {
        TestHelper.ifTesting || Auth.signIn(username, password).then(user => {
            log&&console.log("AUTH: Succeeded sign in");
            successHandler && successHandler(user);
        }).catch(error => {
            err&&console.error("!!!AUTH: Failed sign in!!!");
            err&&console.error(error);
            failureHandler && failureHandler(error);
        });
        if (TestHelper.ifTesting) {
            successHandler && successHandler({});
            return { username, password };
        }
    }

    /**
     * Signs into the Google federated identity through their own auth flow.
     *
     * @param {{getAuthResponse: Function, getBasicProfile: Function}} googleUser
     * @param {function(*, {})} successHandler Handles the received authentication credentials and user.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static googleSignIn(googleUser, successHandler, failureHandler) {
        // Get all the information from the google user
        const { id_token, expires_at } = googleUser.getAuthResponse();
        const profile = googleUser.getBasicProfile();
        return AuthAPI.federatedSignIn("google", id_token, expires_at, profile.getEmail(), profile.getName(),
            "~undefined", "unspecified", jwt_decode(id_token).sub, successHandler, failureHandler);
    }

    /**
     * Signs into the Facebook federated identity through their own auth flow.
     *
     * TODO Implement when adding the functionality in...
     *
     * @param token
     * @param expires_at
     * @param {function(*)} successHandler Handles the received authenticated cognito user.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static facebookSignIn(token, expires_at, successHandler, failureHandler) {
        alert("TODO");
    }

    /**
     * Signs into a federated identity, managed by another company. Allows us to do one-click sign in using Google or
     * Facebook.
     *
     * @param {string} federation The name of the federation to handle the sign in.
     * @param {string} token The token received from the federation for the sign in.
     * @param {string} expires_at The expiration time stamp for the token.
     * @param {string} email The email of the user received from the federation.
     * @param {string} name The name of the user received from the federation.
     * @param {string} birthdate The date of birth of the user received from the federation.
     * @param {string} gender The gender of the user received from the federation.
     * @param {string} sub The unique sub string from the federated identity.
     * @param {function(*, {})} successHandler Handles the received authentication credentials and user.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static federatedSignIn(federation, token, expires_at, email, name, birthdate, gender, sub,
                           successHandler, failureHandler) {
        const federatedUser = { email, name, birthdate, gender, sub };
        TestHelper.ifTesting || Auth.federatedSignIn('google', { token, expires_at }, federatedUser).then(user => {
            log&&console.log("AUTH: Succeeded federated sign in");
            successHandler && successHandler(user, federatedUser);
        }).catch(error => {
            err&&console.error("!!!AUTH: Failed federated sign in!!!");
            err&&console.error(error);
            failureHandler && failureHandler(error);
        });
        if (TestHelper.ifTesting) {
            successHandler && successHandler({}, federatedUser);
            return { federation, token, expires_at, email, name, birthdate, gender, sub };
        }
    }

    /**
     * Signs out of the Authentication completely, removing all user data from the Auth module.
     *
     * @param {function(*)} successHandler Handles the received authentication data.
     * @param {function(error)} failureHandler Handles any authentication errors if necessary.
     * @return {*} Debugging info for the Auth operation.
     */
    static signOut(successHandler, failureHandler) {
        TestHelper.ifTesting || Auth.signOut({global: true}).then(data => {
            log&&console.log("AUTH: Succeeded sign in");
            successHandler && successHandler(data);
        }).catch(error => {
            err&&console.error("!!!AUTH: Failed sign in!!!");
            err&&console.error(error);
            failureHandler && failureHandler(error);
        });
        if (TestHelper.ifTesting) {
            successHandler && successHandler({});
            return {};
        }
    }
}

export default AuthAPI;
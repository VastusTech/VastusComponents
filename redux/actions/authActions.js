import Auth from "../../api/Auth";
import {setAppIsNotLoading, setError, setIsLoading, setIsNotLoading} from "./infoActions";
import {setUser, forceSetUser, subscribeFetchUserAttributes} from "./userActions";
import {removeAllHandlers} from "./ablyActions";
import QL from "../../api/GraphQL";
import {appUserItemType, err, log} from "../../../Constants";
import UserFunctions from "../../database_functions/UserFunctions";

// =========================================================================================================
// ~ High-Level Auth Actions
// =========================================================================================================

/**
 * Updates the authentication status of the application. Used for when the user opens up the app again and the cookies
 * still have their credentials, so we can automatically log them in.
 *
 * @return {function(function(*))} The given function to dispatch a new action in the redux system.
 */
export function updateAuth() {
    return (dispatch) => {
        // TODO This could totally be overkill lol
        // Auth.currentCredentials();
        // Auth.currentSession();
        // Auth.currentUserCredentials();
        // Auth.currentUserInfo();
        // Auth.currentUserPoolUser();
        // Auth.currentAuthenticatedUser().then((user) => {
        Auth.getCurrentUser(user => {
            log&&console.log("UPDATING AUTH WITH USER:");
            log&&console.log(JSON.stringify(user));
            if (user.username) {
                // Regular sign in
                QL.getItemByUsername(appUserItemType, user.username, ["id", "username"], (user) => {
                    if (user) {
                        log && console.log("REDUX: Successfully updated the authentication credentials");
                        dispatch(setUser(user));
                        // dispatch(addHandlerToNotifications((message) => {
                        //     console.log("Received ABLY notification!!!!!\n" + JSON.stringify(message));
                        // }));
                        dispatch(subscribeFetchUserAttributes(["name", "username", "birthday", "profileImagePath",
                            "profileImagePaths", "challengesWon", "friends", "scheduledEvents", "ownedEvents", "completedEvents",
                            "challenges", "ownedChallenges", "completedChallenges", "groups", "ownedGroups", "receivedInvites",
                            "invitedChallenges", "messageBoards", "streaks"], () => {
                            dispatch(authLogIn());
                            dispatch(setIsNotLoading());
                            dispatch(setAppIsNotLoading());
                        }));
                    }
                    else {
                        console.log("REDUX: Could not fetch the client");
                        dispatch(setError(Error("User not found in the database")));
                        dispatch(setIsNotLoading());
                        dispatch(setAppIsNotLoading());
                    }
                }, (error) => {
                    console.error("REDUX: Could not fetch the user, not logged in");
                    err&&console.error(error);
                    // dispatch(setError(error));
                    dispatch(setIsNotLoading());
                    dispatch(setAppIsNotLoading());
                });
            }
            else if (user.sub) {
                // Federated Identities sign in
                QL.getItemByFederatedID(appUserItemType, user.sub, ["id", "username", "federatedID"], (user) => {
                    log&&console.log("REDUX: Successfully updated the authentication credentials for federated identity");
                    if (user) {
                        dispatch(setUser(user));
                        dispatch(subscribeFetchUserAttributes(["name", "username", "birthday", "profileImagePath",
                            "profileImagePaths", "challengesWon", "friends", "scheduledEvents", "ownedEvents", "completedEvents",
                            "challenges", "ownedChallenges", "completedChallenges", "groups", "ownedGroups", "receivedInvites",
                            "invitedChallenges", "messageBoards", "streaks"], () => {
                            dispatch(authLogIn());
                            dispatch(setIsNotLoading());
                            dispatch(setAppIsNotLoading());
                        }));
                        // dispatch(addHandlerToNotifications((message) => {
                        //     console.log("Received ABLY notification!!!!!\n" + JSON.stringify(message));
                        // }));
                    }
                    else {
                        console.error("REDUX: Could not find the federated identity user");
                        dispatch(setError(Error("Could not find the federated identity user")));
                        dispatch(setIsNotLoading());
                        dispatch(setAppIsNotLoading());
                    }
                }, (error) => {
                    console.error("REDUX: Could not fetch the federated identity user");
                    dispatch(setError(error));
                    dispatch(setIsNotLoading());
                    dispatch(setAppIsNotLoading());
                });
            }
        }, (error) => {
            err&&console.error(error);
            // dispatch(setError(error));
            dispatch(setIsNotLoading());
            dispatch(setAppIsNotLoading());
        });
    }
}

/**
 * Logs into the application using the username and password fields.
 *
 * @param {string} username The username inputted for the login.
 * @param {string} password The password inputted for the login.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function logIn(username, password) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        // Auth.signIn(username, password).then(() => {
        Auth.signIn(username, password, () => {
            QL.getItemByUsername(appUserItemType, username, ["id", "username"], (user) => {
                if (user) {
                    console.log("REDUX: Successfully logged in!");
                    if (getStore().user.id !== user.id) {
                        dispatch(forceSetUser(user));
                    } else {
                        dispatch(setUser(user));
                    }
                    dispatch(subscribeFetchUserAttributes(["name", "username", "birthday", "profileImagePath",
                        "profileImagePaths", "challengesWon", "friends", "scheduledEvents", "ownedEvents", "completedEvents",
                        "challenges", "ownedChallenges", "completedChallenges", "groups", "ownedGroups", "receivedInvites",
                        "invitedChallenges", "messageBoards", "streaks"], () => {
                        dispatch(authLogIn());
                        dispatch(setIsNotLoading());
                        dispatch(setAppIsNotLoading());
                    }));
                }
                else {
                    console.log("REDUX: Could not fetch the client");
                    dispatch(setError(Error("User not found in the database")));
                    dispatch(setIsNotLoading());
                }
            }, (error) => {
                console.log("REDUX: Could not fetch the client");
                dispatch(setError(error));
                dispatch(setIsNotLoading());
            });
        }, (error: {code: string}) => {
            // console.log(JSON.stringify(error));
            // console.log(error.code);
            if (error.code === "UserNotConfirmedException") {
                // This means that the user has not been confirmed yet!
                dispatch(authSignUp());
                dispatch(openSignUpModal());
                dispatch(setIsNotLoading());
            // }
            // else if (error.code === 'PasswordResetRequiredException'){
            //     // Reset Password Required
            // } else if (error.code === 'NotAuthorizedException'){
            //     // Not Authorized (Incorrect Password)
            // } else if (error.code === 'ResourceNotFoundException'){
                // User Not found
            } else {
                // Unknown
                log&&console.log("REDUX: Failed log in...");
                console.error(error);
                dispatch(setError(error));
                dispatch(setIsNotLoading());
            }
        });
    };
}

/**
 * Logs out of the application and cleans up the app from the user.
 *
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function logOut() {
    return (dispatch) => {
        dispatch(setIsLoading());
        // const userID = getStore().user.id;
        // Auth.signOut({global: true}).then((data) => {
        Auth.signOut(() => {
            log&&console.log("REDUX: Successfully logged out!");
            dispatch(authLogOut());
            dispatch(removeAllHandlers());
            dispatch(setIsNotLoading());
        }, (error) => {
            err&&console.error("REDUX: Failed log out...");
            dispatch(setError(error));
            dispatch(setIsNotLoading());
        });
    }
}

/**
 * Signs into the application using the Google Sign in Auth Flow. If the user is just first joining in, then it creates
 * a new User object for the person using the application.
 *
 * @param {{getAuthFunction: Function(), getBasicProfile: Function()}} googleUser The Google User API object from the Authenticated response.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function googleSignIn(googleUser) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        Auth.googleSignIn(googleUser, (credentials, user) => {
            // The ID token you need to pass to your backend and the expires_at token:
            const sub = user.sub;
            const name = user.name;
            const email = user.email;
            log&&console.log("Successfully federated sign in!");
            QL.getItemByFederatedID(appUserItemType, sub, ["id", "username", "federatedID"], (user) => {
                if (user) {
                    // Then this user has already signed up
                    log&&console.log("REDUX: Successfully logged in!");
                    dispatch(federatedAuthLogIn());
                    if (getStore().user.id !== user.id) {
                        dispatch(forceSetUser(user));
                    }
                    else {
                        dispatch(setUser(user));
                    }
                    // dispatch(addHandlerToNotifications((message) => {
                    //     console.log("Received ABLY notification!!!!!\n" + JSON.stringify(message));
                    // }));
                    dispatch(setIsNotLoading());
                }
                else {
                    // This user has not yet signed up!
                    log&&console.log("User hasn't signed up yet! Generating a new account!");
                    // Generate a google username using their name without any spaces
                    generateGoogleUsername(name.replace(/\s+/g, ''), (username) => {
                        UserFunctions.createFederatedUser(null, appUserItemType, name, email, username, sub, (data) => {
                            // Then this user has already signed up
                            const id = data.data;
                            user = {
                                id,
                                username,
                                name,
                                email,
                            };
                            log&&console.log("REDUX: Successfully signed up!");
                            dispatch(federatedAuthLogIn());
                            if (getStore().user.id !== user.id) {
                                dispatch(forceSetUser(user));
                            }
                            else {
                                dispatch(setUser(user));
                            }
                            // dispatch(addHandlerToNotifications((message) => {
                            //     console.log("Received ABLY notification!!!!!\n" + JSON.stringify(message));
                            // }));
                            dispatch(setIsNotLoading());
                        }, (error) => {
                            console.error("REDUX: Could not create the federated client!");
                            console.error(error);
                            dispatch(setError(error));
                            dispatch(setIsNotLoading());
                            Auth.signOut();
                        });
                    }, (error) => {
                        console.error("REDUX: Could not generate the client username!");
                        console.error(error);
                        dispatch(setError(error));
                        dispatch(setIsNotLoading());
                        Auth.signOut();
                    });
                }
            }, (error) => {
                console.error("REDUX: Could not fetch the client by federated ID!");
                console.error(error);
                dispatch(setError(error));
                dispatch(setIsNotLoading());
                Auth.signOut();
            });
        }, (error) => {
            console.error("Error while federation sign in!");
            console.error(error);
            dispatch(setError(error));
            dispatch(setIsNotLoading());
        });
    };
}

/**
 * Generates a new username from the Google User's information and checks that it actually is a unique username in the
 * database before attempting to sign up with it.
 *
 * @param {string} name The name of the Google User.
 * @param {function(string)} usernameHandler The function that handles the finished prepared username.
 * @param {function(error)} failureHandler The function that handles any potential errors.
 * @param {number} depth The recursion depth of the function. Initialized at 0.
 */
function generateGoogleUsername(name, usernameHandler, failureHandler, depth=0) {
    const randomInt = Math.floor((Math.random() * 10000000) + 1);
    // Remove white space from the name before creating the random google username
    const randomGoogleUsername = name.replace(/\s+/g, '') + randomInt;
    QL.getItemByUsername(appUserItemType, randomGoogleUsername, ["username"], (user) => {
        if (user) {
            // That means there's a conflict
            log&&console.log("Conflicting username = " + randomGoogleUsername);
            if (depth > 20) {
                failureHandler(new Error("Too many tried usernames... Try again!"));
            }
            else {
                generateGoogleUsername(name, usernameHandler, failureHandler, depth + 1);
            }
        }
        else {
            // That means that there is no username
            log&&console.log("Username free! Username = " + randomGoogleUsername);
            usernameHandler(randomGoogleUsername);
        }
    }, (error) => {
        console.error("Error querying for username while getting Federated username! Error: " + JSON.stringify(error));
        failureHandler(error);
    });
}

/**
 * Signs up to the Vastus Application using the given fields in the sign up flow.
 *
 * @param {string} username The given (unique) username for the User to identify with.
 * @param {string} password The password for the User to log in with.
 * @param {string} name The display name for the User to show.
 * @param {string} email The User's email address.
 * @param {string} enterpriseID The potential enterprise ID given for a User for their enterprise account.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function signUp(username, password, name, email, enterpriseID) {
    return (dispatch) => {
        dispatch(setIsLoading());
        // TODO Check the enterprise ID and then use it in the Creation!
        UserFunctions.createUser(null, appUserItemType, name, email, username, (data) => {
            Auth.signUp(username, password, name, email, () => {
                dispatch(authSignUp());
                dispatch(setIsNotLoading());
            }, (error) => {
                dispatch(setError(error));
                dispatch(setIsNotLoading());
                // Delete the User after operation fails...
                UserFunctions.deleteUser(data.data, appUserItemType, data.data);
            });
        }, (error) => {
            console.error("REDUX: Creating new client failed...");
            dispatch(setError(error));
            dispatch(setIsNotLoading());
        });
    }
}

/**
 * Confirms the Sign up from the verification code sent to the User's email.
 *
 * @param {string} username The username of the User.
 * @param {string} confirmationCode The confirmation code for the user to input.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function confirmSignUp(username, confirmationCode) {
    return (dispatch) => {
        dispatch(setIsLoading());
        // Auth.confirmSignUp(username, confirmationCode).then((authUser) => {
        Auth.confirmSignUp(username, confirmationCode, () => {
            dispatch(closeSignUpModal());
            dispatch(authConfirmSignUp());
            dispatch(setIsNotLoading());
        }, (error) => {
            dispatch(setError(error));
            dispatch(setIsNotLoading());
        });
    }
}

/**
 * Triggers the forgot password flow, allowing the user to have a reset password token sent to their email.
 *
 * @param {string} username The username of the User.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function forgotPassword(username) {
    return (dispatch) => {
        dispatch(setIsLoading());
        // Auth.forgotPassword(username).then(() => {
        Auth.forgotPassword(username, () => {
            dispatch(authForgotPassword());
            dispatch(setIsNotLoading());
        }, (error) => {
            dispatch(setError(error));
            dispatch(setIsNotLoading());
        });
    };
}

/**
 * Resets the User's password after receiving the forgot password confirmation code.
 *
 * @param {string} username The User's identifying username.
 * @param {string} confirmationCode The confirmation code that the User received from the email.
 * @param {string} newPassword The new password the want to give to their account.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function confirmForgotPassword(username, confirmationCode, newPassword) {
    return (dispatch) => {
        dispatch(setIsLoading());
        // Auth.forgotPasswordSubmit(username, confirmationCode, newPassword).then(() => {
        Auth.confirmForgotPassword(username, confirmationCode, newPassword, () => {
            log&&console.log("REDUX: Successfully submitted forgot password!");
            dispatch(authConfirmForgotPassword());
            // dispatch(closeForgotPasswordModal());
            dispatch(setIsNotLoading());
        }, (error) => {
            console.error("REDUX: Failed submitting forgot password...");
            dispatch(setError(error));
            dispatch(setIsNotLoading());
        });
    }
}

// =========================================================================================================
// ~ Low-Level Auth Actions
// =========================================================================================================

export function openSignUpModal() {
    return {
        type: 'OPEN_SIGN_UP_MODAL'
    };
}
export function closeSignUpModal() {
    return {
        type: 'CLOSE_SIGN_UP_MODAL'
    };
}
export function openForgotPasswordModal() {
    return {
        type: 'OPEN_FORGOT_PASSWORD_MODAL'
    };
}
export function closeForgotPasswordModal() {
    return {
        type: 'CLOSE_FORGOT_PASSWORD_MODAL'
    };
}

function authLogIn() {
    return {
        type: 'LOG_IN'
    };
}
function federatedAuthLogIn() {
    return {
        type: 'FEDERATED_LOG_IN'
    }
}
function authLogOut() {
    return {
        type: 'LOG_OUT'
    };
}
function authSignUp() {
    return {
        type: 'SIGN_UP'
    };
}
function authConfirmSignUp() {
    return {
        type: 'CONFIRM_SIGN_UP'
    };
}
function authForgotPassword() {
    return {
        type: 'FORGOT_PASSWORD'
    };
}
function authConfirmForgotPassword() {
    return {
        type: 'CONFIRM_FORGOT_PASSWORD'
    };
}

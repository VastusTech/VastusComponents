import "../../../testing/SetTesting";
import auth, {LOG_IN, FEDERATED_LOG_IN, CLOSE_FORGOT_PASSWORD_MODAL, OPEN_FORGOT_PASSWORD_MODAL, OPEN_SIGN_UP_MODAL,
    CLOSE_SIGN_UP_MODAL, CONFIRM_FORGOT_PASSWORD, FORGOT_PASSWORD, CONFIRM_SIGNUP, SIGN_UP, LOG_OUT
} from "../authReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(auth({}, {type: "__NOT_A_REAL_ACTION__", payload: null})).to.eql({});
});

// export const LOG_IN = 'LOG_IN';
describe(LOG_IN, function () {
    it("Logs in correctly", function () {
        expect(auth(undefined, {type: LOG_IN})).to.eql({
            loggedIn: true,
            confirmingSignUp: false,
            confirmingForgotPassword: false,
            signUpModalOpen: false,
            forgotPasswordModalOpen: false,
            ifFederatedSignIn: false
        });
    });

});

// export const FEDERATED_LOG_IN = 'FEDERATED_LOG_IN';
describe(FEDERATED_LOG_IN, function () {
    it("Logs into federated account correctly", function () {
        expect(auth(undefined, {type: FEDERATED_LOG_IN})).to.eql({
            loggedIn: true,
            confirmingSignUp: false,
            confirmingForgotPassword: false,
            signUpModalOpen: false,
            forgotPasswordModalOpen: false,
            ifFederatedSignIn: true
        });
    });
});

// export const LOG_OUT = 'LOG_OUT';
describe(LOG_OUT, function () {
    it("Logs out correctly", function () {
        expect(auth(undefined, {type: LOG_OUT})).to.eql({
            loggedIn: false,
            confirmingSignUp: false,
            confirmingForgotPassword: false,
            signUpModalOpen: false,
            forgotPasswordModalOpen: false,
            ifFederatedSignIn: false
        });
    });
});

// export const SIGN_UP = 'SIGN_UP';
describe(SIGN_UP, function () {
    it("Signs up correctly", function () {
        expect(auth(undefined, {type: SIGN_UP})).to.eql({
            loggedIn: false,
            confirmingSignUp: true,
            confirmingForgotPassword: false,
            signUpModalOpen: true,
            forgotPasswordModalOpen: false,
            ifFederatedSignIn: false
        });
    });
});

// export const CONFIRM_SIGNUP = 'CONFIRM_SIGNUP';
describe(CONFIRM_SIGNUP, function () {
    it("Confirms sign up correctly", function () {
        expect(auth(undefined, {type: CONFIRM_SIGNUP})).to.eql({
            loggedIn: false,
            confirmingSignUp: false,
            confirmingForgotPassword: false,
            signUpModalOpen: false,
            forgotPasswordModalOpen: false,
            ifFederatedSignIn: false
        });
    });
});

// export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
describe(FORGOT_PASSWORD, function () {
    it("Forgets Password Correctly", function () {
        expect(auth(undefined, {type: FORGOT_PASSWORD})).to.eql({
            loggedIn: false,
            confirmingSignUp: false,
            confirmingForgotPassword: true,
            signUpModalOpen: false,
            forgotPasswordModalOpen: true,
            ifFederatedSignIn: false
        });
    });
});

// export const CONFIRM_FORGOT_PASSWORD = 'CONFIRM_FORGOT_PASSWORD';
describe(CONFIRM_FORGOT_PASSWORD, function () {
    it("Forgets Password Correctly", function () {
        expect(auth(undefined, {type: CONFIRM_FORGOT_PASSWORD})).to.eql({
            loggedIn: false,
            confirmingSignUp: false,
            confirmingForgotPassword: false,
            signUpModalOpen: false,
            forgotPasswordModalOpen: false,
            ifFederatedSignIn: false
        });
    });
});

// export const OPEN_SIGN_UP_MODAL = 'OPEN_SIGN_UP_MODAL';
describe(OPEN_SIGN_UP_MODAL, function () {
    it("Opens Sign Up Modal Correctly", function () {
        expect(auth(undefined, {type: OPEN_SIGN_UP_MODAL})).to.eql({
            loggedIn: false,
            confirmingSignUp: false,
            confirmingForgotPassword: false,
            signUpModalOpen: true,
            forgotPasswordModalOpen: false,
            ifFederatedSignIn: false
        });
    });
});

// export const CLOSE_SIGN_UP_MODAL = 'CLOSE_SIGN_UP_MODAL';
describe(CLOSE_SIGN_UP_MODAL, function () {
    it("Closes Sign Up Modal Correctly", function () {
        expect(auth(undefined, {type: CLOSE_SIGN_UP_MODAL})).to.eql({
            loggedIn: false,
            confirmingSignUp: false,
            confirmingForgotPassword: false,
            signUpModalOpen: false,
            forgotPasswordModalOpen: false,
            ifFederatedSignIn: false
        });
    });
});

// export const OPEN_FORGOT_PASSWORD_MODAL = 'OPEN_FORGOT_PASSWORD_MODAL';
describe(OPEN_FORGOT_PASSWORD_MODAL, function () {
    it("Opens Forgot Password Modal Correctly", function () {
        expect(auth(undefined, {type: OPEN_FORGOT_PASSWORD_MODAL})).to.eql({
            loggedIn: false,
            confirmingSignUp: false,
            confirmingForgotPassword: false,
            signUpModalOpen: false,
            forgotPasswordModalOpen: true,
            ifFederatedSignIn: false
        });
    });
});

// export const CLOSE_FORGOT_PASSWORD_MODAL = 'CLOSE_FORGOT_PASSWORD_MODAL';
describe(CLOSE_FORGOT_PASSWORD_MODAL, function () {
    it("Closes Forgot Password Modal Correctly", function () {
        expect(auth(undefined, {type: CLOSE_FORGOT_PASSWORD_MODAL})).to.eql({
            loggedIn: false,
            confirmingSignUp: false,
            confirmingForgotPassword: false,
            signUpModalOpen: false,
            forgotPasswordModalOpen: false,
            ifFederatedSignIn: false
        });
    });
});

it("Gets the initial state properly", function () {
    expect(auth(undefined, {type: "__INIT__", payload: null})).to.eql({
        loggedIn: false,
        confirmingSignUp: false,
        confirmingForgotPassword: false,
        signUpModalOpen: false,
        forgotPasswordModalOpen: false,
        ifFederatedSignIn: false
    });
});

import "../../../testing/SetTesting";
import { expect } from "chai";
import {getInitialReduxStore, store} from "../../../testing/TestHelper";
import {confirmForgotPassword, forgotPassword, openSignUpModal, googleSignIn, closeForgotPasswordModal,
    closeSignUpModal, openForgotPasswordModal, confirmSignUp, signUp, logIn, updateAuth, logOut} from "../authActions";
import {SET_IS_LOADING} from "../../reducers/infoReducer";
import {
    CLOSE_FORGOT_PASSWORD_MODAL,
    CLOSE_SIGN_UP_MODAL,
    OPEN_FORGOT_PASSWORD_MODAL,
    OPEN_SIGN_UP_MODAL
} from "../../reducers/authReducer";

describe("Auth Actions", function () {
    let reduxStore;
    beforeEach(() => {
        reduxStore = store(getInitialReduxStore(['auth', 'user']));
    });

    describe("Update Auth", () => {
        it("Updates auth", (done) => {
            reduxStore.dispatch(updateAuth()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([]);
                done();
            });
        });
    });
    describe("Sign In", () => {
        it("Signs into the app", (done) => {
            reduxStore.dispatch(logIn("USERNAME", "PASSWORD")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { payload: {}, type: 'FORCE_SET_USER' },
                    { type: 'LOG_IN' },
                    { type: 'SET_IS_NOT_LOADING' },
                    { type: 'SET_APP_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Google Sign in", () => {
        // TODO IS THIS RIGHT?
        it("Signs into the app with google", (done) => {
            reduxStore.dispatch(googleSignIn({
                getAuthResponse: () => ({
                    id_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTVUIifQ.6qRpscs_2odUceTxziwC6PmE6bmTH4LTsq8KkBgePPc",
                    expires_at: "EXPIRATION"
                }),
                getBasicProfile: () => ({
                    getEmail: () => "EMAIL",
                    getName: () => "NAME"
                })
            })).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'FEDERATED_LOG_IN' },
                    { payload: {}, type: 'FORCE_SET_USER' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Sign Up", () => {
        it("Signs up for the app", (done) => {
            reduxStore.dispatch(signUp("USERNAME", "PASSWORD", "NAME", "EMAIL", "ENTERPRISEID")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'SIGN_UP' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Confirm Sign Up", () => {
        it("Confirms the sign up for the app", (done) => {
            reduxStore.dispatch(confirmSignUp("USERNAME", "CODE")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'CLOSE_SIGN_UP_MODAL' },
                    { type: 'CONFIRM_SIGN_UP' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Forgot Password", () => {
        it("Forgets the password for the app", (done) => {
            reduxStore.dispatch(forgotPassword("USERNAME")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'FORGOT_PASSWORD' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Confirm Forgot Password", () => {
        it("Confirms the forgotten password", (done) => {
            reduxStore.dispatch(confirmForgotPassword("USERNAME", "CODE", "PASSWORD")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'CONFIRM_FORGOT_PASSWORD' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Log Out", () => {
        it("Logs out of the app", (done) => {
            reduxStore.dispatch(logOut()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: 'SET_IS_LOADING' },
                    { type: 'LOG_OUT' },
                    { type: 'SET_IS_LOADING' },
                    { type: 'CLEAR_CHANNELS' },
                    { type: 'SET_IS_NOT_LOADING' },
                    { type: 'SET_IS_NOT_LOADING' }
                ]);
                done();
            });
        });
    });
    describe("Open Sign Up Modal", () => {
        it("Opens the sign up modal", (done) => {
            reduxStore.dispatch(openSignUpModal()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: OPEN_SIGN_UP_MODAL }
                ]);
                done();
            });
        });
    });
    describe("Close Sign Up Modal", () => {
        it("Closes the sign up modal", (done) => {
            reduxStore.dispatch(closeSignUpModal()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: CLOSE_SIGN_UP_MODAL }
                ]);
                done();
            });
        });
    });
    describe("Open Forgot Password Modal", () => {
        it("Opens the forgotten password modal", (done) => {
            reduxStore.dispatch(openForgotPasswordModal()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: OPEN_FORGOT_PASSWORD_MODAL }
                ]);
                done();
            });
        });
    });
    describe("Close Forgot Password Modal", () => {
        it("Closes the forgotten password modal", (done) => {
            reduxStore.dispatch(closeForgotPasswordModal()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([
                    { type: CLOSE_FORGOT_PASSWORD_MODAL }
                ]);
                done();
            });
        });
    });
});

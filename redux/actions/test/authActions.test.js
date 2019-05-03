import "../../../testing/SetTesting";
import { expect } from "chai";
import {getInitialReduxStore, store} from "../../../testing/TestHelper";
import {confirmForgotPassword, forgotPassword, openSignUpModal, googleSignIn, closeForgotPasswordModal,
    closeSignUpModal, openForgotPasswordModal, confirmSignUp, signUp, logIn, updateAuth, logOut} from "../authActions";

describe("Auth Actions", function () {
    let reduxStore;
    beforeEach(() => {
        reduxStore = store(getInitialReduxStore(['auth']));
    });

    describe("Update Auth", () => {
        it("Updates auth", (done) => {
            reduxStore.dispatch(updateAuth()).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([

                ]);
                done();
            });
        });
    });
    describe("Sign In", () => {
        it("Signs into the app", (done) => {
            reduxStore.dispatch(logIn("USERNAME", "PASSWORD")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([

                ]);
                done();
            });
        });
    });
    describe("Google Sign in", (done) => {
        it("Signs into the app with google", (done) => {
            reduxStore.dispatch(googleSignIn("USERNAME", "PASSWORD")).then(() => {
                expect(reduxStore.getActions()).excludingEvery('asyncDispatch').to.eql([

                ]);
                done();
            });
        });
    });
    describe("Sign Up");
    describe("Confirm Sign Up");
    describe("Forgot Password");
    describe("Confirm Forgot Password");
    describe("Log Out");
    describe("Open Sign Up Modal");
    describe("Close Sign Up Modal");
    describe("Open Forgot Password Modal");
    describe("Close Forgot Password Modal");
});

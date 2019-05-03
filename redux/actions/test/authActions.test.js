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
        it("Updates auth while logged in");
        it("Updates auth while not logged in");
    });
    describe("Sign In", () => {
        it("Signs in while ")
    });
    describe("Google Sign in");
    describe("Sign Up");
    describe("Confirm Sign Up");
    describe("Forgot Password");
    describe("Confirm Forgot Password");
    describe("Log Out");
    describe("Open Sign Up Modal");
    describe("Close Sign Up Modal");
    describe("Open Forgot Password Modal");
    describe("Close Forgot Password Modal");

    it("", () => {
        expect(true);
    })
});

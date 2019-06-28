import "../../testing/SetTesting";
import Auth from "../Auth";
import {expect} from "chai";

describe("high level methods", () => {
  // static getCurrentUser(successHandler, failureHandler) {
  it("Should get current user correctly", () => {
    expect(Auth.getCurrentUser()).to.eql({});
  });
  // static signUp(username, password, name, email, successHandler, failureHandler) {
  it("Should sign up correctly", () => {
    expect(Auth.signUp(
      "USERNAME", "PASSWORD", "NAME", "EMAIL"
    )).to.eql({
      username: "USERNAME",
      password: "PASSWORD",
      name: "NAME",
      email: "EMAIL"
    });
  });
  // static confirmSignUp(username, code, successHandler, failureHandler) {
  it("Should confirm sign up correctly", () => {
    expect(Auth.confirmSignUp(
      "USERNAME", "CODE"
    )).to.eql({
      username: "USERNAME",
      code: "CODE"
    });
  });
  // static forgotPassword(username, successHandler, failureHandler) {
  it("Should forget password correctly", () => {
    expect(Auth.forgotPassword(
      "USERNAME"
    )).to.eql({
      username: "USERNAME"
    });
  });
  // static confirmForgotPassword(username, code, newPassword, successHandler, failureHandler) {
  it("Should confirm forgot password correctly", () => {
    expect(Auth.confirmForgotPassword(
      "USERNAME", "CODE", "NEWPASSWORD"
    )).to.eql({
      username: "USERNAME",
      code: "CODE",
      newPassword: "NEWPASSWORD"
    });
  });
  // static signIn(username, password, successHandler, failureHandler) {
  it("Should sign in correctly", () => {
    expect(Auth.signIn(
      "USERNAME", "PASSWORD"
    )).to.eql({
      username: "USERNAME",
      password: "PASSWORD"
    });
  });
  // static googleSignIn(token, expires_at, user, successHandler, failureHandler) {
  it("Should google federated sign in correctly", () => {
    expect(Auth.googleSignIn({
      getAuthResponse: () => ({
        id_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTVUIifQ.6qRpscs_2odUceTxziwC6PmE6bmTH4LTsq8KkBgePPc",
        expires_at: "EXPIRATION"
      }),
      getBasicProfile: () => ({
        getEmail: () => "EMAIL",
        getName: () => "NAME"
      })
    })).to.eql({
      federation: "google",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTVUIifQ.6qRpscs_2odUceTxziwC6PmE6bmTH4LTsq8KkBgePPc",
      expires_at: "EXPIRATION",
      email: "EMAIL",
      name: "NAME",
      birthdate: "~undefined",
      gender: "unspecified",
      sub: "SUB"
    });
  });
  // static facebookSignIn(token, expires_at, user, successHandler, failureHandler) {
  it("Should facebook federated sign in correctly", () => {
    // TODO WHEN IMPLMENETED
    expect(true);
  });
  // static federatedSignIn(federation, token, expires_at, federatedUser, successHandler, failureHandler) {
  it("Should federated sign in correctly", () => {
    expect(Auth.federatedSignIn(
      "FEDERATION", "TOKEN", "EXPIRATION", "EMAIL", "NAME", "BIRTHDATE", "GENDER", "SUB"
    )).to.eql({
      federation: "FEDERATION",
      token: "TOKEN",
      expires_at: "EXPIRATION",
      email: "EMAIL",
      name: "NAME",
      birthdate: "BIRTHDATE",
      gender: "GENDER",
      sub: "SUB"
    });
  });
  // static signOut(successHandler, failureHandler) {
  it("Should sign out correctly", () => {
    expect(Auth.signOut()).to.eql({});
  });
});
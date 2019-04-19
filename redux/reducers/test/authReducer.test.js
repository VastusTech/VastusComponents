import auth from "../authReducer";
import {expect} from "chai";

describe("authReducer.js", function () {
    it("Ignores other actions correctly", () => {
        const state = {};
        expect(auth(state, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql(state));
    });
});

// export const LOG_IN = 'LOG_IN';
// export const FEDERATED_LOG_IN = 'FEDERATED_LOG_IN';
// export const LOG_OUT = 'LOG_OUT';
// export const SIGN_UP = 'SIGN_UP';
// export const CONFIRM_SIGNUP = 'CONFIRM_SIGNUP';
// export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
// export const CONFIRM_FORGOT_PASSWORD = 'CONFIRM_FORGOT_PASSWORD';
// export const OPEN_SIGN_UP_MODAL = 'OPEN_SIGN_UP_MODAL';
// export const CLOSE_SIGN_UP_MODAL = 'CLOSE_SIGN_UP_MODAL';
// export const OPEN_FORGOT_PASSWORD_MODAL = 'OPEN_FORGOT_PASSWORD_MODAL';
// export const CLOSE_FORGOT_PASSWORD_MODAL = 'CLOSE_FORGOT_PASSWORD_MODAL';

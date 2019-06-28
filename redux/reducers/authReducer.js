export const LOG_IN = 'LOG_IN';
export const FEDERATED_LOG_IN = 'FEDERATED_LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';
export const CONFIRM_SIGNUP = 'CONFIRM_SIGNUP';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const CONFIRM_FORGOT_PASSWORD = 'CONFIRM_FORGOT_PASSWORD';
export const OPEN_SIGN_UP_MODAL = 'OPEN_SIGN_UP_MODAL';
export const CLOSE_SIGN_UP_MODAL = 'CLOSE_SIGN_UP_MODAL';
export const OPEN_FORGOT_PASSWORD_MODAL = 'OPEN_FORGOT_PASSWORD_MODAL';
export const CLOSE_FORGOT_PASSWORD_MODAL = 'CLOSE_FORGOT_PASSWORD_MODAL';

type AuthReducer = {
  loggedIn: boolean,
  confirmingSignUp: boolean,
  confirmingForgotPassword: boolean,
  signUpModalOpen: boolean,
  forgotPasswordModalOpen: boolean,
  ifFederatedSignIn: boolean
};

/**
 * The initial state for the Auth reducer.
 *
 * @type {AuthReducer}
 */
const initialState = {
  loggedIn: false,
  confirmingSignUp: false,
  confirmingForgotPassword: false,
  signUpModalOpen: false,
  forgotPasswordModalOpen: false,
  ifFederatedSignIn: false
};

/**
 * Auth Reducer:
 *
 * Used to maintain the authentication flow of the application. Keeps track of which modals are open and if they are
 * signed in or not.
 *
 * @param {AuthReducer} state The current state of the auth reducer.
 * @param {{type: string, payload: *}} action The action to specify how to update the reducer.
 * @return {AuthReducer} The next state for the reducer.
 */
export default (state: AuthReducer = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      state = {
        loggedIn: true,
        confirmingSignUp: false,
        confirmingForgotPassword: false,
        signUpModalOpen: false,
        forgotPasswordModalOpen: false,
        ifFederatedSignIn: false,
      };
      break;
    case FEDERATED_LOG_IN:
      state = {
        loggedIn: true,
        confirmingSignUp: false,
        confirmingForgotPassword: false,
        signUpModalOpen: false,
        forgotPasswordModalOpen: false,
        ifFederatedSignIn: true,
      };
      break;
    case LOG_OUT:
      state = {
        loggedIn: false,
        confirmingSignUp: false,
        confirmingForgotPassword: false,
        signUpModalOpen: false,
        forgotPasswordModalOpen: false,
        ifFederatedSignIn: false
      };
      break;
    case SIGN_UP:
      state = {
        loggedIn: false,
        confirmingSignUp: true,
        confirmingForgotPassword: false,
        signUpModalOpen: true,
        forgotPasswordModalOpen: false,
        ifFederatedSignIn: false
      };
      break;
    case CONFIRM_SIGNUP:
      state = {
        loggedIn: false,
        confirmingSignUp: false,
        confirmingForgotPassword: false,
        signUpModalOpen: false,
        forgotPasswordModalOpen: false,
        ifFederatedSignIn: false
      };
      break;
    case FORGOT_PASSWORD:
      state = {
        loggedIn: false,
        confirmingSignUp: false,
        confirmingForgotPassword: true,
        signUpModalOpen: false,
        forgotPasswordModalOpen: true,
        ifFederatedSignIn: false
      };
      break;
    case CONFIRM_FORGOT_PASSWORD:
      state = {
        loggedIn: false,
        confirmingSignUp: false,
        confirmingForgotPassword: false,
        signUpModalOpen: false,
        forgotPasswordModalOpen: false,
        ifFederatedSignIn: false
      };
      break;
    case OPEN_SIGN_UP_MODAL:
      state = {
        ...state,
        signUpModalOpen: true
      };
      break;
    case CLOSE_SIGN_UP_MODAL:
      state = {
        ...state,
        signUpModalOpen: false
      };
      break;
    case OPEN_FORGOT_PASSWORD_MODAL:
      state = {
        ...state,
        forgotPasswordModalOpen: true
      };
      break;
    case CLOSE_FORGOT_PASSWORD_MODAL:
      state = {
        ...state,
        forgotPasswordModalOpen: false
      };
      break;
    default:
      break;
  }
  return state;
}

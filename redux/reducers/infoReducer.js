import {err} from "../../../Constants";

export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_NOT_LOADING = 'SET_IS_NOT_LOADING';
export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';

type InfoReducer = {
    isLoading: boolean,
    error: Error
};

/**
 * The Initial State for the Info Reducer
 *
 * @type {InfoReducer}
 */
const initialState = {
    isLoading: false,
    error: null
};

/**
 * Info Reducer:
 *
 * This reducer handles all the global states of the application. This includes global errors and global loading states.
 * This might be more helpful later when we have a more integrated system.
 *
 * @param {InfoReducer} state The current state of the info reducer.
 * @param {{type: string, payload: *}} action The action to specify how to update the reducer.
 * @return {InfoReducer} The next state for the reducer.
 */
export default (state: InfoReducer = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            err&&console.error("Error inside a redux action/reducer! (Leo wrote this) " + action.payload);
            state = {
                ...state,
                error: action.payload
            };
            break;
        case CLEAR_ERROR:
            state = {
                ...state,
                error: null
            };
            break;
        case SET_IS_LOADING:
            state = {
                ...state,
                isLoading: true
            };
            break;
        case SET_IS_NOT_LOADING:
            state = {
                ...state,
                isLoading: false
            };
            break;
        case TOGGLE_IS_LOADING:
            state = {
                ...state,
                isLoading: !state.isLoading
            };
            break;
        default:
            break;
    }
    // console.log("INFO: Did " + action.type + " and now state is = " + JSON.stringify(state));
    return state;
}


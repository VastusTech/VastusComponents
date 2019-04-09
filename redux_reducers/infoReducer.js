import {err} from "../../Constants";

export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_NOT_LOADING = 'SET_IS_NOT_LOADING';
export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';

const initialState = {
    isLoading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            err&&console.error("Error inside a redux action/reducer! (Leo wrote this) Error = " + JSON.stringify(action.payload));
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
                isLoading: !state.info.isLoading
            };
            break;
        default:
            state = {
                ...state
            };
            break;
    }
    // console.log("INFO: Did " + action.type + " and now state is = " + JSON.stringify(state));
    return state;
}


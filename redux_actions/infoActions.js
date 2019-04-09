import {SET_ERROR, TOGGLE_IS_LOADING, SET_IS_NOT_LOADING, SET_IS_LOADING, CLEAR_ERROR} from "../redux_reducers/infoReducer";

export function setError(error) {
    return {
        type: SET_ERROR,
        payload: error
    };
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
}

export function setIsLoading() {
    return {
        type: SET_IS_LOADING
    }
}

export function setIsNotLoading() {
    return {
        type: SET_IS_NOT_LOADING
    }
}

export function toggleIsLoading() {
    return {
        type: TOGGLE_IS_LOADING
    }
}


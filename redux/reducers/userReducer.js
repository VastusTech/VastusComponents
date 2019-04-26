export const SET_USER = 'SET_USER';
export const FORCE_SET_USER = 'FORCE_SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

const initialState = {
    id: null,
};

/**
 * User Reducer:
 *
 * The reducer to essentially store the current user's information directly. Essentially updates using the cache reducer
 * and keeps the state consistent. Convenience mostly and for maintaining who the user is.
 *
 * @param {{}} state The current state of the user reducer.
 * @param {{type: string, payload: *}} action The action to specify how to update the reducer.
 * @return {{}} The next state for the reducer.
 */
export default (state = initialState, action) => {
    switch (action.type) {
        // For the user, we want to be able to store all the pertinent information
        case SET_USER:
            // console.log("REDUX SET USER, INIT STATE = " + JSON.stringify(state) + ", ACTION PAYLOAD = " + JSON.stringify(action.payload));
            state = {
                ...state,
                ...action.payload
            };
            // console.log("STATE AFTER SET USER = " + JSON.stringify(state));
            break;
        case FORCE_SET_USER:
            state = {
                ...initialState,
                ...action.payload
            };
            break;
        case CLEAR_USER:
            state = {
                ...initialState
            };
            break;
        default:
            break;
    }
    // console.log("USER: Did " + action.type + " and now state is = " + JSON.stringify(state));
    return state;
};

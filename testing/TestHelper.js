import configureStore from 'redux-mock-store';

/**
 * Class used for testing certain parts of the code that may try to connect to AWS in order to complete. Run this when
 * we are automatically running a test.
 */
export default class TestHelper {
    static ifTesting = false;
    static setTest() { TestHelper.ifTesting = true; }
    static unsetTest() { TestHelper.ifTesting = false; }
}

export function store(initialState) {
    if (initialState) {
        return configureStore()(initialState);
    }
    else {
        return configureStore()({});
    }
}


/**
 * Gets the entire redux store components given for initializing a mock store. Allows you to only initialize what you
 * need to for the test.
 *
 * TODO Edit if we use more reducers.
 *
 * @param {[string]} storeTypes The strings for the types of the redux store to initialize.
 * @return {{ably: *, auth: *, cache: *, info: *, message: *, user: *, search: *}}
 */
export const getInitalReduxStore = (storeTypes) => {
    const ably = require("../redux/reducers/ablyReducer");
    const auth = require("../redux/reducers/authReducer");
    const cache = require("../redux/reducers/cacheReducer");
    const info = require("../redux/reducers/infoReducer");
    const message = require("../redux/reducers/messageReducer");
    const search = require("../redux/reducers/searchReducer");
    const user = require("../redux/reducers/userReducer");
    return {
        ably: !storeTypes || storeTypes.includes("ably") ? ably(undefined, {type: "__NOT_A_REAL_ACTION__"}) : null,
        auth: !storeTypes || storeTypes.includes("auth") ? auth(undefined, {type: "__NOT_A_REAL_ACTION__"}) : null,
        cache: !storeTypes || storeTypes.includes("cache") ? cache(undefined, {type: "__NOT_A_REAL_ACTION__"}) : null,
        info: !storeTypes || storeTypes.includes("info") ? info(undefined, {type: "__NOT_A_REAL_ACTION__"}) : null,
        message: !storeTypes || storeTypes.includes("message") ? message(undefined, {type: "__NOT_A_REAL_ACTION__"}) : null,
        user: !storeTypes || storeTypes.includes("user") ? user(undefined, {type: "__NOT_A_REAL_ACTION__"}) : null,
        search: !storeTypes || storeTypes.includes("search") ? search(undefined, {type: "__NOT_A_REAL_ACTION__"}) : null,
    }
};
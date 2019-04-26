export const ENABLE_TYPE = 'ENABLE_TYPE';
export const DISABLE_TYPE = 'DISABLE_TYPE';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_TYPE_FILTER = 'SET_TYPE_FILTER';
export const SET_TYPE_NEXT_TOKEN = 'SET_TYPE_NEXT_TOKEN';
export const ADD_TYPE_RESULTS = 'ADD_TYPE_RESULTS';
export const RESET_TYPE_QUERY = 'RESET_TYPE_QUERY';
export const RESET_QUERY = 'RESET_QUERY';
export const ENABLE_SEARCH_BAR = 'ENABLE_SEARCH_BAR';
export const DISABLE_SEARCH_BAR = 'DISABLE_SEARCH_BAR';
// const CLEAR_TYPE_RESULTS = 'CLEAR_TYPE_RESULTS';
// const CLEAR_ALL_RESULTS = 'CLEAR_ALL_RESULTS';

// At most how many objects should be grabbed from a query at one time
const queryLimit = 100;

// TODO This will determine the ratios of which objects to get out of the
// const typeRatios = {
//     Client: 2, Trainer: 3, Gym: 5, Workout: 1, Review: 1, Event: 5, Challenge: 10, Invite: 1, Post: 15
// };

/**
 * The Search Type State for the Search Reducer.
 *
 * @property {boolean} enabled Whether or not the type state is enabled.
 * @property {[string]} variableList The variable list to query for in the type.
 * @property {Object} filterJSON The JSON object to filter the type query with.
 * @property {Map<string, string>} filterParameters The parameters to filter the search with.
 * @property {string|null} nextToken The previous next token given from a query.
 * @property {boolean} ifFirst If the type state has not been queried yet.
 * @property {number} limit The limit of items to retrieve from the database.
 * @property {[Object]} results The results received from the database for this type.
 */
type SearchTypeState = {
    enabled: boolean,
    variableList: [string],
    filterJSON: Object,
    filterParameters: Map<string, string>,
    nextToken: string|null,
    ifFirst: boolean,
    limit: number,
    results: [Object],
};

/**
 * The initial state for a type in the search.
 *
 * @type {SearchTypeState}
 */
const initialTypeState = {
    enabled: false,
    variableList: [],
    filterJSON: {},
    filterParameters: {},
    nextToken: null,
    ifFirst: true,
    limit: queryLimit,
    results: [],
};

/**
 * Deeply copies the type state in order to edit the state.
 *
 * @param {SearchTypeState} typeState The state to copy.
 * @return {SearchTypeState} The copied state to update.
 */
const copyTypeState = (typeState) => {
    typeState = { ...typeState };
    typeState.filterParameters = { ...typeState.filterParameters };
    typeState.results = [ ...typeState.results ];
    return typeState;
};

// Initial states of each kind of search
/**
 * The initial state for the Client search.
 *
 * @type {SearchTypeState}
 */
const initialClientState = {
    ...copyTypeState(initialTypeState),
    enabled: true,
    variableList: ["id", "item_type", "username", "gender", "birthday", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath", /*"profilePicture"*/ "friendRequests"],
    filterJSON: {
        or: [{
            username: {
                contains: "$searchQuery"
            }
        },{
            name: {
                contains: "$searchQuery"
            }
        },{
            email: {
                contains: "$searchQuery"
            }
        }]
    },
    limit: queryLimit,
};

/**
 * The initial state for the Trainer search.
 *
 * @type {SearchTypeState}
 */
const initialTrainerState = {
    ...copyTypeState(initialTypeState),
    enabled: true,
    variableList: ["id", "name", "username", "item_type", "gender", "birthday", "profileImagePath", /*"profilePicture", */"profileImagePaths", "subscribers", "friendlinessRating", "" +
    "effectivenessRating", "posts"],
    filterJSON: {
        or: [{
            username: {
                contains: "$searchQuery"
            }
        },{
            name: {
                contains: "$searchQuery"
            }
        },{
            email: {
                contains: "$searchQuery"
            }
        }]
    },
    limit: queryLimit,
};

/**
 * The initial state for the Gym search.
 *
 * @type {SearchTypeState}
 */
const initialGymState = {
    ...copyTypeState(initialTypeState),
    enabled: false,
    variableList: [],
    filterJSON: {
        or: [{
            username: {
                contains: "$searchQuery"
            }
        },{
            name: {
                contains: "$searchQuery"
            }
        },{
            email: {
                contains: "$searchQuery"
            }
        }]
    },
    limit: queryLimit,
};

/**
 * The initial state for the Workout search.
 *
 * @type {SearchTypeState}
 */
const initialWorkoutState = {
    ...copyTypeState(initialTypeState),
    enabled: false,
};

/**
 * The initial state for the Review search.
 *
 * @type {SearchTypeState}
 */
const initialReviewState = {
    ...copyTypeState(initialTypeState),
    enabled: false,
};

/**
 * The initial state for the Event search.
 *
 * @type {SearchTypeState}
 */
const initialEventState = {
    ...copyTypeState(initialTypeState),
    enabled: false,
    variableList: [],
    filterJSON: {
        and: [{
            or: [{
                title: {
                    contains: "$searchQuery"
                }
            },{
                description: {
                    contains: "$searchQuery"
                }
            }]
        },{
            access: {
                eq: "$access"
            }
        }]
    },
    filterParameters: {
        access: "public",
    },
    limit: queryLimit,
};

/**
 * The initial state for the Challenge search.
 *
 * @type {SearchTypeState}
 */
const initialChallengeState = {
    ...copyTypeState(initialTypeState),
    enabled: true,
    variableList: ["id", "item_type", "title", "endTime", "time_created", "owner", "ifCompleted", "members", "capacity", "goal", "access", "description", "restriction", "tags", "prize", "submissions"],
    filterJSON: {
        and: [{
            or: [{
                title: {
                    contains: "$searchQuery"
                }
            },{
                description: {
                    contains: "$searchQuery"
                }
            }]
        },{
            access: {
                eq: "$access"
            }
        }]
    },
    filterParameters: {
        access: "public",
    },
    limit: queryLimit,
};

/**
 * The initial state for the Invite search.
 *
 * @type {SearchTypeState}
 */
const initialInviteState = {
    ...copyTypeState(initialTypeState),
    enabled: false,
};

/**
 * The initial state for the Post search.
 *
 * @type {SearchTypeState}
 */
const initialPostState = {
    ...copyTypeState(initialTypeState),
    enabled: false,
};

/**
 * The state for the Search Reducer at any given moment.
 *
 * @property {string} searchQuery The string to search for using the search bar.
 * @property {[Object]} results The total results for the given search query.
 * @property {number} limit The limit of objects to receive from the database in a query.
 * @property {number} numTypesEnabled The number of types that are currently enabled for searching.
 * @property {boolean} ifFinished If the search query has no more results to get with the search configuration.
 * @property {boolean} searchBarEnabled If the search bar is currently enabled for searching.
 * @property {Map<string, SearchTypeState>} typeQueries The individual Type settings for searching.
 */
type SearchReducer = {
    searchQuery: string,
    results: [Object],
    limit: number,
    numTypesEnabled: number,
    ifFinished: boolean,
    searchBarEnabled: boolean,
    typeQueries: {
        Client: SearchTypeState,
        Trainer: SearchTypeState,
        Gym: SearchTypeState,
        Workout: SearchTypeState,
        Review: SearchTypeState,
        Event: SearchTypeState,
        Challenge: SearchTypeState,
        Invite: SearchTypeState,
        Post: SearchTypeState
    }
};

/**
 * The initial state for the Search Reducer.
 *
 * @type {SearchReducer}
 */
const initialState = {
    searchQuery: "",
    results: [],
    limit: 100, // This should be computed dynamically, based on how many types we're querying to maintain a certain number
    numTypesEnabled: 3,
    ifFinished: false,
    searchBarEnabled: true,
    typeQueries: {
        Client: initialClientState,
        Trainer: initialTrainerState,
        Gym: initialGymState,
        Workout: initialWorkoutState,
        Review: initialReviewState,
        Event: initialEventState,
        Challenge: initialChallengeState,
        Invite: initialInviteState,
        Post: initialPostState
    }
};

/**
 * Search Reducer:
 *
 * Handles the search of the application, potentially searching through all the items in the database. Allows to update
 * the kind of search that will happen through certain actions. Also handles the query, in order to search more than
 * once (as in loading a new page of results).
 *
 * @param {SearchReducer} state The current state of the search reducer.
 * @param {{type: string, payload: *}} action The action to specify how to update the reducer.
 * @return {SearchReducer} The next state for the reducer.
 */
export default (state: SearchReducer = initialState, action) => {
    switch (action.type) {
        // TODO Update the retrieval limits based on what is enabled and not
        case ENABLE_TYPE:
            state = {
                ...state,
                typeQueries: {
                    ...state.typeQueries,
                    [action.payload]: {
                        ...state.typeQueries[action.payload],
                        enabled: true
                    }
                },
            };
            state.numTypesEnabled = getNumTypesEnabled(state);
            break;
        case DISABLE_TYPE:
            state = {
                ...state,
                typeQueries: {
                    ...state.typeQueries,
                    [action.payload]: {
                        ...state.typeQueries[action.payload],
                        enabled: false
                    }
                },
            };
            state.numTypesEnabled = getNumTypesEnabled(state);
            break;
        case SET_SEARCH_QUERY:
            state = {
                ...state,
                searchQuery: action.payload
            };
            break;
        case SET_TYPE_FILTER:
            state = {
                ...state,
                typeQueries: {
                    ...state.typeQueries,
                    [action.payload.type]: {
                        ...state.typeQueries[action.payload.type],
                        filterJSON: action.payload.filterJSON,
                        filterParameters: action.payload.filterParameters
                    }
                },
            };
            break;
        case SET_TYPE_NEXT_TOKEN:
            state = {
                ...state,
                typeQueries: {
                    ...state.typeQueries,
                    [action.payload.type]: {
                        ...state.typeQueries[action.payload.type],
                        nextToken: action.payload.nextToken,
                        ifFirst: false
                    }
                },
            };
            state.ifFinished = getIfFinished(state);
            break;
        case ADD_TYPE_RESULTS:
            const results = action.payload.results ? action.payload.results : [];
            // console.log(action.payload.type + "\n" + JSON.stringify(results) + "\n" + JSON.stringify(state.typeQueries[action.payload.type].results));
            // TODO InSERT SORT THESE INTO THE RESULTS?
            state = {
                ...state,
                results: [...state.results, ...results],
                typeQueries: {
                    ...state.typeQueries,
                    [action.payload.type]: {
                        ...state.typeQueries[action.payload.type],
                        results: [
                            ...state.typeQueries[action.payload.type].results,
                            ...results
                        ]
                    }
                }
            };
            state.ifFinished = getIfFinished(state);
            break;
        case RESET_QUERY:
            state = {
                ...state,
                results: [],
                ifFinished: false
            };
            for (const type in state.typeQueries) {
                if (state.typeQueries.hasOwnProperty(type)) {
                    state.typeQueries[type].results = [];
                    state.typeQueries[type].nextToken = null;
                    state.typeQueries[type].ifFirst = true;
                }
            }
            break;
        case RESET_TYPE_QUERY:
            state = {
                ...state,
                typeQueries: {
                    ...state.typeQueries,
                    [action.payload]: {
                        ...state.typeQueries[action.payload],
                        results: [],
                        nextToken: null,
                        ifFirst: true,
                    }
                }
            };
            break;
        case ENABLE_SEARCH_BAR:
            state = {
                ...state,
                searchBarEnabled: true
            };
            break;
        case DISABLE_SEARCH_BAR:
            state = {
                ...state,
                searchBarEnabled: false
            };
            break;
        default:
            break;
    }
    // console.log("INFO: Did " + action.type + " and now state is = " + JSON.stringify(state));
    return state;
}

/**
 * Gets the current number of types that are enabled for search within the reducer.
 *
 * @param {SearchReducer} state The current state of the search reducer.
 * @return {number} The number of types enabled for search.
 */
function getNumTypesEnabled(state) {
    let numTypesEnabled = 0;
    for (const key in state.typeQueries) {
        if (state.typeQueries.hasOwnProperty(key)) {
            if (state.typeQueries[key].enabled === true) {
                numTypesEnabled++;
            }
        }
    }
    return numTypesEnabled;
}

/**
 * Gets if the entire query is finished. Based on if all the types that are enabled are not at the first query and do
 * not have a next token.
 *
 * @param {SearchReducer} state The current state of the search reducer.
 * @return {boolean}
 */
function getIfFinished(state) {
    for (const key in state.typeQueries) {
        if (state.typeQueries.hasOwnProperty(key)) {
            const query = state.typeQueries[key];
            // A query is finished if it's not first and and the nextToken is null
            if (query.enabled && (query.ifFirst === true || query.nextToken !== null)) {
                return false;
            }
        }
    }
    return true;
}

import "../../../testing/SetTesting";
import search, {SET_TYPE_FILTER, DISABLE_TYPE, ADD_TYPE_RESULTS, SET_SEARCH_QUERY, SET_TYPE_NEXT_TOKEN,
    RESET_TYPE_QUERY, RESET_QUERY, ENABLE_SEARCH_BAR, DISABLE_SEARCH_BAR, ENABLE_TYPE} from "../searchReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(search({}, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql({}));
});

// export const ENABLE_TYPE = 'ENABLE_TYPE';
describe(ENABLE_TYPE, function () {

});

// export const DISABLE_TYPE = 'DISABLE_TYPE';
describe(DISABLE_TYPE, function () {

});

// export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
describe(SET_SEARCH_QUERY, function () {

});

// export const SET_TYPE_FILTER = 'SET_TYPE_FILTER';
describe(SET_TYPE_FILTER, function () {

});

// export const SET_TYPE_NEXT_TOKEN = 'SET_TYPE_NEXT_TOKEN';
describe(SET_TYPE_NEXT_TOKEN, function () {

});

// export const ADD_TYPE_RESULTS = 'ADD_TYPE_RESULTS';
describe(ADD_TYPE_RESULTS, function () {

});

// export const RESET_TYPE_QUERY = 'RESET_TYPE_QUERY';
describe(RESET_TYPE_QUERY, function () {

});

// export const RESET_QUERY = 'RESET_QUERY';
describe(RESET_QUERY, function () {

});

// export const ENABLE_SEARCH_BAR = 'ENABLE_SEARCH_BAR';
describe(ENABLE_SEARCH_BAR, function () {

});

// export const DISABLE_SEARCH_BAR = 'DISABLE_SEARCH_BAR';
describe(DISABLE_SEARCH_BAR, function () {

});

it("Gets the initial state properly", function () {
    expect(search(undefined, {type: "__INIT__", payload: null})).to.eql({
        searchQuery: "",
        results: [],
        limit: 100, // This should be computed dynamically, based on how many types we're querying to maintain a certain number
        numTypesEnabled: 3,
        ifFinished: false,
        searchBarEnabled: true,
        typeQueries: {
            Client: {
                enabled: false,
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
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: [],
            },
            Trainer: {
                enabled: false,
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
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: [],
            },
            Gym: {
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
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: [],
            },
            Workout: {
                enabled: false,
                variableList: [],
                filterJSON: {},
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: [],
            },
            Review: {
                enabled: false,
                variableList: [],
                filterJSON: {},
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: [],
            },
            Event: {
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
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: [],
            },
            Challenge: {
                enabled: false,
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
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: [],
            },
            Invite: {
                enabled: false,
                variableList: [],
                filterJSON: {},
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: [],
            },
            Post: {
                enabled: false,
                variableList: [],
                filterJSON: {},
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: [],
            }
        }
    });
});

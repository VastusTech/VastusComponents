import "../../../testing/SetTesting";
import search, {SET_TYPE_FILTER, DISABLE_TYPE, ADD_TYPE_RESULTS, SET_SEARCH_QUERY, SET_TYPE_NEXT_TOKEN,
    RESET_TYPE_QUERY, RESET_QUERY, ENABLE_SEARCH_BAR, DISABLE_SEARCH_BAR, ENABLE_TYPE} from "../searchReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(search({}, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql({}));
});

// export const ENABLE_TYPE = 'ENABLE_TYPE';
describe(ENABLE_TYPE, function () {
    it("Should enable a first type and adds to the number enabled of types");
    it("Should enable a second type and adds to the number enabled of types");
    it("Should enable an already enabled first type and does not add to the number of enabled types");
    it("Should enable an already enabled second type and does not add to the number of enabled types");
});

// export const DISABLE_TYPE = 'DISABLE_TYPE';
describe(DISABLE_TYPE, function () {
    it("Should disable a first type and subtract from the number enabled of types");
    it("Should disable a second type and subtract from the number enabled of types");
    it("Should disable an already disabled first type and does not subtract from the number of enabled types");
    it("Should disable an already disabled second type and does not subtract from the number of enabled types");
});

// export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
describe(SET_SEARCH_QUERY, function () {
    it("Should set the first search query from null");
    it("Should set the search query from existing");
});

// export const SET_TYPE_FILTER = 'SET_TYPE_FILTER';
describe(SET_TYPE_FILTER, function () {
    it("Should set a type filter that is enabled");
    it("Should set a type filter that is disabled");
});

// export const SET_TYPE_NEXT_TOKEN = 'SET_TYPE_NEXT_TOKEN';
describe(SET_TYPE_NEXT_TOKEN, function () {
    it("Should set the next token for a null next token");
    it("Should set the next token for a non-null next token");
});

// export const ADD_TYPE_RESULTS = 'ADD_TYPE_RESULTS';
describe(ADD_TYPE_RESULTS, function () {
    it("Should add type results for an empty search total and in type");
    it("Should add type results for an empty search type, not total");
    it("Should add type results for an non-empty search type and total");

});

// export const RESET_TYPE_QUERY = 'RESET_TYPE_QUERY';
describe(RESET_TYPE_QUERY, function () {
    it("Should reset type query for empty type");
    it("Should reset type query for non-empty type");
});

// export const RESET_QUERY = 'RESET_QUERY';
describe(RESET_QUERY, function () {
    it("Should rest query for empty query");
    it("Should reset query for non-empty");
});

// export const ENABLE_SEARCH_BAR = 'ENABLE_SEARCH_BAR';
describe(ENABLE_SEARCH_BAR, function () {
    it("Should enable a disabled search bar");
    it("Should enable an enabled search bar");
});

// export const DISABLE_SEARCH_BAR = 'DISABLE_SEARCH_BAR';
describe(DISABLE_SEARCH_BAR, function () {
    it("Should disable an enabled search bar");
    it("Should disable a disabled search bar");
});

it("Gets the initial state properly", function () {
    expect(search(undefined, {type: "__INIT__", payload: null})).to.eql({
        searchQuery: '',
        results: [],
        limit: 100,
        numTypesEnabled: 3,
        ifFinished: false,
        searchBarEnabled: true,
        typeQueries: {
            Client: {
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
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: []
            },
            Trainer: {
                enabled: true,
                variableList: ["id", "name", "username", "item_type", "gender", "birthday", "profileImagePath", "profileImagePaths", "subscribers", "friendlinessRating", "effectivenessRating", "posts"],
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
                results: []
            },
            Gym: {
                enabled: false,
                variableList: [],
                filterJSON: {
                    or: [{
                        username: {
                            contains: "$searchQuery"
                        }
                    }, {
                        name: {
                            contains: "$searchQuery"
                        }
                    }, {
                        email: {
                            contains: "$searchQuery"
                        }
                    }]
                },
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: []
            },
            Workout: {
                enabled: false,
                variableList: [],
                filterJSON: {},
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: []
            },
            Review: {
                enabled: false,
                variableList: [],
                filterJSON: {},
                filterParameters: {},
                nextToken: null,
                    ifFirst: true,
                limit: 100,
                results: []
            }, Event: {
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
                results: []
            },
            Challenge: {
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
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: []
            },
            Invite: {
                enabled: false,
                variableList: [],
                filterJSON: {},
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: []
            },
            Post: {
                enabled: false,
                variableList: [],
                filterJSON: {},
                filterParameters: {},
                nextToken: null,
                ifFirst: true,
                limit: 100,
                results: []
            }
        }
    });
});

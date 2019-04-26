import "../../../testing/SetTesting";
import cache, {CLEAR_ITEM_CACHE, CLEAR_NORMALIZED_ITEM_QUERY, PUT_ITEM_QUERY, PUT_ITEM, REMOVE_ITEM, 
    REMOVE_ITEM_ATTRIBUTE_INDEX, REMOVE_ITEM_ATTRIBUTES, ADD_ITEM_ATTRIBUTES, SET_ITEM_ATTRIBUTE_INDEX, 
    getObjectChannelName} from "../cacheReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(cache({}, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql({}));
});

describe("Cache Reducer", function () {
    let cacheState;

    beforeEach(() => {
        cacheState = cache(undefined, {type: "__INIT__", payload: null});
    });

// export const PUT_ITEM =                    "PUT_ITEM";
    describe(PUT_ITEM, function () {
        it("Should Put item ", function () {

        });
    });
// export const SET_ITEM_ATTRIBUTE_INDEX =    "SET_ITEM_ATTRIBUTE_INDEX";
    describe(SET_ITEM_ATTRIBUTE_INDEX, function () {
        it("Sets", function () {

        });
    });
// export const ADD_ITEM_ATTRIBUTES =         "ADD_ITEM_ATTRIBUTES";
    describe(ADD_ITEM_ATTRIBUTES, function () {

    });
// export const REMOVE_ITEM_ATTRIBUTES =      "REMOVE_ITEM_ATTRIBUTES";
    describe(REMOVE_ITEM_ATTRIBUTES, function () {

    });
// export const REMOVE_ITEM_ATTRIBUTE_INDEX = "REMOVE_ITEM_ATTRIBUTE_INDEX";
    describe(REMOVE_ITEM_ATTRIBUTE_INDEX, function () {

    });
// export const REMOVE_ITEM =                 "REMOVE_ITEM";
    describe(REMOVE_ITEM, function () {

    });
// export const PUT_ITEM_QUERY =              "PUT_ITEM_QUERY";
    describe(PUT_ITEM_QUERY, function () {

    });
// export const CLEAR_NORMALIZED_ITEM_QUERY = "CLEAR_NORMALIZED_ITEM_QUERY";
    describe(CLEAR_NORMALIZED_ITEM_QUERY, function () {

    });
// export const CLEAR_ITEM_CACHE =            "CLEAR_ITEM_CACHE";
    describe(CLEAR_ITEM_CACHE, function () {

    });
    describe("Channel Name Getter", function () {
        it("Should get an object update channel name correctly", function () {

        });
    });
});

it("Gets the initial state properly", function () {
    expect(cache(undefined, {type: "__INIT__", payload: null})).to.eql({
        clients: {},
        trainers: {},
        gyms: {},
        workouts: {},
        reviews: {},
        events: {},
        challenges: {},
        invites: {},
        posts: {},
        submissions: {},
        groups: {},
        comments: {},
        sponsors: {},
        streaks: {},
        clientLRUHandler: [],
        trainerLRUHandler: [],
        gymLRUHandler: [],
        workoutLRUHandler: [],
        reviewLRUHandler: [],
        eventLRUHandler: [],
        challengeLRUHandler: [],
        inviteLRUHandler: [],
        postLRUHandler: [],
        submissionLRUHandler: [],
        groupLRUHandler: [],
        commentLRUHandler: [],
        sponsorLRUHandler: [],
        streakLRUHandler: [],
        clientQueries: {},
        trainerQueries: {},
        gymQueries: {},
        workoutQueries: {},
        reviewQueries: {},
        eventQueries: {},
        challengeQueries: {},
        inviteQueries: {},
        postQueries: {},
        submissionQueries: {},
        groupQueries: {},
        commentQueries: {},
        sponsorQueries: {},
        streakQueries: {},
        clientQueryLRUHandler: [],
        trainerQueryLRUHandler: [],
        gymQueryLRUHandler: [],
        workoutQueryLRUHandler: [],
        reviewQueryLRUHandler: [],
        eventQueryLRUHandler: [],
        challengeQueryLRUHandler: [],
        inviteQueryLRUHandler: [],
        postQueryLRUHandler: [],
        submissionQueryLRUHandler: [],
        groupQueryLRUHandler: [],
        commentQueryLRUHandler: [],
        sponsorQueryLRUHandler: [],
        streakQueryLRUHandler: [],
    });
});

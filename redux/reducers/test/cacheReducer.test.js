import "../../../testing/SetTesting";
import cache, {CLEAR_ITEM_CACHE, CLEAR_NORMALIZED_ITEM_QUERY, PUT_ITEM_QUERY, PUT_ITEM, REMOVE_ITEM, 
    REMOVE_ITEM_ATTRIBUTE_INDEX, REMOVE_FROM_ITEM_ATTRIBUTES, ADD_TO_ITEM_ATTRIBUTES, SET_ITEM_ATTRIBUTE_INDEX,
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
        it("Should put new item in successfully", function () {
            expect(cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: "attributeValue"
                    }
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: "attributeValue"
                }
            })
        });
        it("Should update existing item successfully");
        it("Should overwrite existing attributes in existing item");
    });
// export const SET_ITEM_ATTRIBUTE_INDEX =    "SET_ITEM_ATTRIBUTE_INDEX";
    describe(SET_ITEM_ATTRIBUTE_INDEX, function () {
        it("Should set the first item attribute index");
        it("Should set a middle item attribute index");
        it("Should set the last item attribute index");
        it("Should not set anything for a non-existent attribute");
        it("Should not set anything for a non-array attribute");
    });
// export const ADD_TO_ITEM_ATTRIBUTES =         "ADD_TO_ITEM_ATTRIBUTES";
    describe(ADD_TO_ITEM_ATTRIBUTES, function () {
        it("Should add items to an existing attribute");
        it("Should add zero items to an existing attribute");
        it("Should not add anything for a non-existent attribute");
        it("Should not add anything for a non-array attribute");
    });

// export const REMOVE_FROM_ITEM_ATTRIBUTES =      "REMOVE_FROM_ITEM_ATTRIBUTES";
    describe(REMOVE_FROM_ITEM_ATTRIBUTES, function () {
        it("Should remove items from an existing attribute");
        it("Should remove items from an existing attribute even if not in the attribute");
        it("Should remove zero items from an existing attribute");
        it("Should not remove anything for a non-existent attribute");
        it("Should not remove anything for a non-array attribute");
    });

// export const REMOVE_ITEM_ATTRIBUTE_INDEX = "REMOVE_ITEM_ATTRIBUTE_INDEX";
    describe(REMOVE_ITEM_ATTRIBUTE_INDEX, function () {
        it("Should remove the first item attribute index");
        it("Should remove a middle item attribute index");
        it("Should remove the last item attribute index");
        it("Should not remove anything for a non-existent attribute");
        it("Should not remove anything for a non-array attribute");
    });

// export const REMOVE_ITEM =                 "REMOVE_ITEM";
    describe(REMOVE_ITEM, function () {
        it("Should remove an existing item");
        it("Should remove a non-existing item");
        it("")
    });

// export const PUT_ITEM_QUERY =              "PUT_ITEM_QUERY";
    describe(PUT_ITEM_QUERY, function () {
        it("Should put a item query");
        it("Should overwrite an existing item query");
    });

// export const CLEAR_NORMALIZED_ITEM_QUERY = "CLEAR_NORMALIZED_ITEM_QUERY";
    describe(CLEAR_NORMALIZED_ITEM_QUERY, function () {
        it("Should delete a non-existing query");
        it("Should delete an existing query");
    });

// export const CLEAR_ITEM_CACHE =            "CLEAR_ITEM_CACHE";
    describe(CLEAR_ITEM_CACHE, function () {
        it("Should clear an empty cache");
        it("Should clear a non-empty cache");
    });

    describe("Channel Name Getter", function () {
        it("Should get an object update channel name correctly", function () {
            expect(getObjectChannelName("CH0001")).to.be.equal("CH0001-Updates");
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

import {err} from "../../../Constants";
import {removeChannelSubscription} from "../actions/ablyActions";
import {addUniqueToArray, subtractArray} from "../../logic/ArrayHelper";

/**
 * Gets the object channel Ably name from the given id.
 *
 * @param id The id of the object to get the channel of.
 * @return {string} The name of the channel.
 */
export function getObjectChannelName(id) {
    return id + "-Updates";
}

// This is where we will store all the retrieved database items and use a LRU cache to rid them if necessary
export const FETCH_CLIENT = 'FETCH_CLIENT';
export const FETCH_TRAINER = 'FETCH_TRAINER';
export const FETCH_GYM = 'FETCH_GYM';
export const FETCH_WORKOUT = 'FETCH_WORKOUT';
export const FETCH_REVIEW = 'FETCH_REVIEW';
export const FETCH_EVENT = 'FETCH_EVENT';
export const FETCH_CHALLENGE = 'FETCH_CHALLENGE';
export const FETCH_INVITE = 'FETCH_INVITE';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_SUBMISSION = 'FETCH_SUBMISSION';
export const FETCH_GROUP = 'FETCH_GROUP';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_SPONSOR = 'FETCH_SPONSOR';
export const FETCH_STREAK = 'FETCH_STREAK';

export const SET_CLIENT_ATTRIBUTE_INDEX = 'SET_CLIENT_ATTRIBUTE_INDEX';
export const SET_TRAINER_ATTRIBUTE_INDEX = 'SET_TRAINER_ATTRIBUTE_INDEX';
export const SET_GYM_ATTRIBUTE_INDEX = 'SET_GYM_ATTRIBUTE_INDEX';
export const SET_WORKOUT_ATTRIBUTE_INDEX = 'SET_WORKOUT_ATTRIBUTE_INDEX';
export const SET_REVIEW_ATTRIBUTE_INDEX = 'SET_REVIEW_ATTRIBUTE_INDEX';
export const SET_EVENT_ATTRIBUTE_INDEX = 'SET_EVENT_ATTRIBUTE_INDEX';
export const SET_CHALLENGE_ATTRIBUTE_INDEX = 'SET_CHALLENGE_ATTRIBUTE_INDEX';
export const SET_INVITE_ATTRIBUTE_INDEX = 'SET_INVITE_ATTRIBUTE_INDEX';
export const SET_POST_ATTRIBUTE_INDEX = 'SET_POST_ATTRIBUTE_INDEX';
export const SET_SUBMISSION_ATTRIBUTE_INDEX = 'SET_SUBMISSION_ATTRIBUTE_INDEX';
export const SET_GROUP_ATTRIBUTE_INDEX = 'SET_GROUP_ATTRIBUTE_INDEX';
export const SET_COMMENT_ATTRIBUTE_INDEX = 'SET_COMMENT_ATTRIBUTE_INDEX';
export const SET_SPONSOR_ATTRIBUTE_INDEX = 'SET_SPONSOR_ATTRIBUTE_INDEX';
export const SET_STREAK_ATTRIBUTE_INDEX = 'SET_STREAK_ATTRIBUTE_INDEX';
export const SET_ENTERPRISE_ATTRIBUTE_INDEX = 'SET_ENTERPRISE_ATTRIBUTE_INDEX';

export const ADD_CLIENT_ATTRIBUTES = 'ADD_CLIENT_ATTRIBUTES';
export const ADD_TRAINER_ATTRIBUTES = 'ADD_TRAINER_ATTRIBUTES';
export const ADD_GYM_ATTRIBUTES = 'ADD_GYM_ATTRIBUTES';
export const ADD_WORKOUT_ATTRIBUTES = 'ADD_WORKOUT_ATTRIBUTES';
export const ADD_REVIEW_ATTRIBUTES = 'ADD_REVIEW_ATTRIBUTES';
export const ADD_EVENT_ATTRIBUTES = 'ADD_EVENT_ATTRIBUTES';
export const ADD_CHALLENGE_ATTRIBUTES = 'ADD_CHALLENGE_ATTRIBUTES';
export const ADD_INVITE_ATTRIBUTES = 'ADD_INVITE_ATTRIBUTES';
export const ADD_POST_ATTRIBUTES = 'ADD_POST_ATTRIBUTES';
export const ADD_SUBMISSION_ATTRIBUTES = 'ADD_SUBMISSION_ATTRIBUTES';
export const ADD_GROUP_ATTRIBUTES = 'ADD_GROUP_ATTRIBUTES';
export const ADD_COMMENT_ATTRIBUTES = 'ADD_COMMENT_ATTRIBUTES';
export const ADD_SPONSOR_ATTRIBUTES = 'ADD_SPONSOR_ATTRIBUTES';
export const ADD_STREAK_ATTRIBUTES = 'ADD_STREAK_ATTRIBUTES';

export const REMOVE_CLIENT_ATTRIBUTES = 'REMOVE_CLIENT_ATTRIBUTES';
export const REMOVE_TRAINER_ATTRIBUTES = 'REMOVE_TRAINER_ATTRIBUTES';
export const REMOVE_GYM_ATTRIBUTES = 'REMOVE_GYM_ATTRIBUTES';
export const REMOVE_WORKOUT_ATTRIBUTES = 'REMOVE_WORKOUT_ATTRIBUTES';
export const REMOVE_REVIEW_ATTRIBUTES = 'REMOVE_REVIEW_ATTRIBUTES';
export const REMOVE_EVENT_ATTRIBUTES = 'REMOVE_EVENT_ATTRIBUTES';
export const REMOVE_CHALLENGE_ATTRIBUTES = 'REMOVE_CHALLENGE_ATTRIBUTES';
export const REMOVE_INVITE_ATTRIBUTES = 'REMOVE_INVITE_ATTRIBUTES';
export const REMOVE_POST_ATTRIBUTES = 'REMOVE_POST_ATTRIBUTES';
export const REMOVE_SUBMISSION_ATTRIBUTES = 'REMOVE_SUBMISSION_ATTRIBUTES';
export const REMOVE_GROUP_ATTRIBUTES = 'REMOVE_GROUP_ATTRIBUTES';
export const REMOVE_COMMENT_ATTRIBUTES = 'REMOVE_COMMENT_ATTRIBUTES';
export const REMOVE_SPONSOR_ATTRIBUTES = 'REMOVE_SPONSOR_ATTRIBUTES';
export const REMOVE_STREAK_ATTRIBUTES = 'REMOVE_STREAK_ATTRIBUTES';

export const REMOVE_CLIENT_ATTRIBUTE_INDEX = 'REMOVE_CLIENT_ATTRIBUTE_INDEX';
export const REMOVE_TRAINER_ATTRIBUTE_INDEX = 'REMOVE_TRAINER_ATTRIBUTE_INDEX';
export const REMOVE_GYM_ATTRIBUTE_INDEX = 'REMOVE_GYM_ATTRIBUTE_INDEX';
export const REMOVE_WORKOUT_ATTRIBUTE_INDEX = 'REMOVE_WORKOUT_ATTRIBUTE_INDEX';
export const REMOVE_REVIEW_ATTRIBUTE_INDEX = 'REMOVE_REVIEW_ATTRIBUTE_INDEX';
export const REMOVE_EVENT_ATTRIBUTE_INDEX = 'REMOVE_EVENT_ATTRIBUTE_INDEX';
export const REMOVE_CHALLENGE_ATTRIBUTE_INDEX = 'REMOVE_CHALLENGE_ATTRIBUTE_INDEX';
export const REMOVE_INVITE_ATTRIBUTE_INDEX = 'REMOVE_INVITE_ATTRIBUTE_INDEX';
export const REMOVE_POST_ATTRIBUTE_INDEX = 'REMOVE_POST_ATTRIBUTE_INDEX';
export const REMOVE_SUBMISSION_ATTRIBUTE_INDEX = 'REMOVE_SUBMISSION_ATTRIBUTE_INDEX';
export const REMOVE_GROUP_ATTRIBUTE_INDEX = 'REMOVE_GROUP_ATTRIBUTE_INDEX';
export const REMOVE_COMMENT_ATTRIBUTE_INDEX = 'REMOVE_COMMENT_ATTRIBUTE_INDEX';
export const REMOVE_SPONSOR_ATTRIBUTE_INDEX = 'REMOVE_SPONSOR_ATTRIBUTE_INDEX';
export const REMOVE_STREAK_ATTRIBUTE_INDEX = 'REMOVE_STREAK_ATTRIBUTE_INDEX';

export const REMOVE_CLIENT =    'REMOVE_CLIENT';
export const REMOVE_TRAINER =   'REMOVE_TRAINER';
export const REMOVE_GYM =       'REMOVE_GYM';
export const REMOVE_WORKOUT =   'REMOVE_WORKOUT';
export const REMOVE_REVIEW =    'REMOVE_REVIEW';
export const REMOVE_EVENT =     'REMOVE_EVENT';
export const REMOVE_CHALLENGE = 'REMOVE_CHALLENGE';
export const REMOVE_INVITE =    'REMOVE_INVITE';
export const REMOVE_POST =      'REMOVE_POST';
export const REMOVE_SUBMISSION ='REMOVE_SUBMISSION';
export const REMOVE_GROUP =     'REMOVE_GROUP';
export const REMOVE_COMMENT =   'REMOVE_COMMENT';
export const REMOVE_SPONSOR =   'REMOVE_SPONSOR';
export const REMOVE_STREAK =    'REMOVE_STREAK';

export const FETCH_CLIENT_QUERY = 'FETCH_CLIENT_QUERY';
export const FETCH_TRAINER_QUERY = 'FETCH_TRAINER_QUERY';
export const FETCH_GYM_QUERY = 'FETCH_GYM_QUERY';
export const FETCH_WORKOUT_QUERY = 'FETCH_WORKOUT_QUERY';
export const FETCH_REVIEW_QUERY = 'FETCH_REVIEW_QUERY';
export const FETCH_EVENT_QUERY = 'FETCH_EVENT_QUERY';
export const FETCH_CHALLENGE_QUERY = 'FETCH_CHALLENGE_QUERY';
export const FETCH_INVITE_QUERY = 'FETCH_INVITE_QUERY';
export const FETCH_POST_QUERY = 'FETCH_POST_QUERY';
export const FETCH_SUBMISSION_QUERY = 'FETCH_SUBMISSION_QUERY';
export const FETCH_GROUP_QUERY = 'FETCH_GROUP_QUERY';
export const FETCH_COMMENT_QUERY = 'FETCH_COMMENT_QUERY';
export const FETCH_SPONSOR_QUERY = 'FETCH_SPONSOR_QUERY';
export const FETCH_STREAK_QUERY = 'FETCH_STREAK_QUERY';

export const CLEAR_NORMALIZED_CLIENT_QUERY =    'CLEAR_NORMALIZED_CLIENT_QUERY';
export const CLEAR_NORMALIZED_TRAINER_QUERY =   'CLEAR_NORMALIZED_TRAINER_QUERY';
export const CLEAR_NORMALIZED_GYM_QUERY =       'CLEAR_NORMALIZED_GYM_QUERY';
export const CLEAR_NORMALIZED_WORKOUT_QUERY =   'CLEAR_NORMALIZED_WORKOUT_QUERY';
export const CLEAR_NORMALIZED_REVIEW_QUERY =    'CLEAR_NORMALIZED_REVIEW_QUERY';
export const CLEAR_NORMALIZED_EVENT_QUERY =     'CLEAR_NORMALIZED_EVENT_QUERY';
export const CLEAR_NORMALIZED_CHALLENGE_QUERY = 'CLEAR_NORMALIZED_CHALLENGE_QUERY';
export const CLEAR_NORMALIZED_INVITE_QUERY =    'CLEAR_NORMALIZED_INVITE_QUERY';
export const CLEAR_NORMALIZED_POST_QUERY =      'CLEAR_NORMALIZED_POST_QUERY';
export const CLEAR_NORMALIZED_SUBMISSION_QUERY ='CLEAR_NORMALIZED_SUBMISSION_QUERY';
export const CLEAR_NORMALIZED_GROUP_QUERY =     'CLEAR_NORMALIZED_GROUP_QUERY';
export const CLEAR_NORMALIZED_COMMENT_QUERY =   'CLEAR_NORMALIZED_COMMENT_QUERY';
export const CLEAR_NORMALIZED_SPONSOR_QUERY =   'CLEAR_NORMALIZED_SPONSOR_QUERY';
export const CLEAR_NORMALIZED_STREAK_QUERY =    'CLEAR_NORMALIZED_STREAK_QUERY';

export const CLEAR_CLIENT_QUERY = 'CLEAR_CLIENT_QUERY';
export const CLEAR_TRAINER_QUERY = 'CLEAR_TRAINER_QUERY';
export const CLEAR_GYM_QUERY = 'CLEAR_GYM_QUERY';
export const CLEAR_WORKOUT_QUERY = 'CLEAR_WORKOUT_QUERY';
export const CLEAR_REVIEW_QUERY = 'CLEAR_REVIEW_QUERY';
export const CLEAR_EVENT_QUERY = 'CLEAR_EVENT_QUERY';
export const CLEAR_CHALLENGE_QUERY = 'CLEAR_CHALLENGE_QUERY';
export const CLEAR_INVITE_QUERY = 'CLEAR_INVITE_QUERY';
export const CLEAR_POST_QUERY = 'CLEAR_POST_QUERY';
export const CLEAR_SUBMISSION_QUERY = 'CLEAR_SUBMISSION_QUERY';
export const CLEAR_GROUP_QUERY = 'CLEAR_GROUP_QUERY';
export const CLEAR_COMMENT_QUERY = 'CLEAR_COMMENT_QUERY';
export const CLEAR_SPONSOR_QUERY = 'CLEAR_SPONSOR_QUERY';
export const CLEAR_STREAK_QUERY = 'CLEAR_STREAK_QUERY';

// TODO Play around with these values maybe? How do we decide this?
const clientCacheSize = 100;
const trainerCacheSize = 100;
const gymCacheSize = 100;
const workoutCacheSize = 100;
const reviewCacheSize = 100;
const eventCacheSize = 2000;
const challengeCacheSize = 2000;
const inviteCacheSize = 100;
const postCacheSize = 2000;
const submissionCacheSize = 1000;
const groupCacheSize = 100;
const commentCacheSize = 1000;
const sponsorCacheSize = 100;
const streakCacheSize = 100;

// TODO The query cache sizes might be important if the user is searching for a lot
const clientQueryCacheSize = 5;
const trainerQueryCacheSize = 5;
const gymQueryCacheSize = 5;
const workoutQueryCacheSize = 5;
const reviewQueryCacheSize = 5;
const eventQueryCacheSize = 10;
const challengeQueryCacheSize = 5;
const inviteQueryCacheSize = 5;
const postQueryCacheSize = 5;
const submissionQueryCacheSize = 5;
const groupQueryCacheSize = 5;
const commentQueryCacheSize = 5;
const sponsorQueryCacheSize = 5;
const streakQueryCacheSize = 10;

const initialState = {
    // ID --> DatabaseObject
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

    // List of IDs in order of least recently used
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

    // Cached queries.
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
};

/**
 * Cache Reducer:
 *
 * This reducer handles all the cache-ing of data and updating of all database data shown within the application.
 * Handles all object permanence, LRU cache eviction, and query handling. Also can update the database manually using
 * specific functions.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {{type: string, payload: *}} action The action to specify how to update the reducer.
 * @return {*} The next state for the reducer.
 */
export default (state = initialState, action) => {
    switch (action.type) {
        // TODO Also make sure that the item to get also has all the attributes we desire?
        case FETCH_CLIENT:
            state = addObjectToCache(state, "clients", clientCacheSize, "clientLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_TRAINER:
            state = addObjectToCache(state, "trainers", trainerCacheSize, "trainerLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_GYM:
            state = addObjectToCache(state, "gyms", gymCacheSize, "gymLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_WORKOUT:
            state = addObjectToCache(state, "workouts", workoutCacheSize, "workoutLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_REVIEW:
            state = addObjectToCache(state, "reviews", reviewCacheSize, "reviewLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_EVENT:
            state = addObjectToCache(state, "events", eventCacheSize, "eventLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_CHALLENGE:
            state = addObjectToCache(state, "challenges", challengeCacheSize, "challengeLRUHandler",
                action.payload.object, action.asyncDispatch);
            break;
        case FETCH_INVITE:
            state = addObjectToCache(state, "invites", inviteCacheSize, "inviteLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_POST:
            state = addObjectToCache(state, "posts", postCacheSize, "postLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_SUBMISSION:
            state = addObjectToCache(state, "submissions", submissionCacheSize, "submissionLRUHandler",
                action.payload.object, action.asyncDispatch);
            break;
        case FETCH_GROUP:
            state = addObjectToCache(state, "groups", groupCacheSize, "groupLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_COMMENT:
            state = addObjectToCache(state, "comments", commentCacheSize, "commentLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_SPONSOR:
            state = addObjectToCache(state, "sponsors", sponsorCacheSize, "sponsorLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case FETCH_STREAK:
            state = addObjectToCache(state, "streaks", streakCacheSize, "streakLRUHandler", action.payload.object,
                action.asyncDispatch);
            break;
        case SET_CLIENT_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                action.payload.attributeValue, "clients");
            break;
        case SET_TRAINER_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                action.payload.attributeValue, "trainers");
            break;
        case SET_GYM_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                action.payload.attributeValue, "gyms");
            break;
        case SET_WORKOUT_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                action.payload.attributeValue, "workouts");
            break;
        case SET_REVIEW_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "reviews");
            break;
        case SET_EVENT_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "events");
            break;
        case SET_CHALLENGE_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "challenges");
            break;
        case SET_INVITE_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "invites");
            break;
        case SET_POST_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "posts");
            break;
        case SET_SUBMISSION_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "submissions");
            break;
        case SET_GROUP_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "groups");
            break;
        case SET_COMMENT_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "comments");
            break;
        case SET_SPONSOR_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "sponsors");
            break;
        case SET_STREAK_ATTRIBUTE_INDEX:
            state = setAttributeIndex(state, action.payload.id, action.payload.attributeame, action.payload.index,
                action.payload.attributeValue, "streak");
            break;
        case ADD_CLIENT_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "clients");
            break;
        case ADD_TRAINER_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "trainers");
            break;
        case ADD_GYM_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "gyms");
            break;
        case ADD_WORKOUT_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "workouts");
            break;
        case ADD_REVIEW_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "reviews");
            break;
        case ADD_EVENT_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "events");
            break;
        case ADD_CHALLENGE_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "challenges");
            break;
        case ADD_INVITE_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "invites");
            break;
        case ADD_POST_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "posts");
            break;
        case ADD_SUBMISSION_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "submissions");
            break;
        case ADD_GROUP_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "groups");
            break;
        case ADD_COMMENT_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "comments");
            break;
        case ADD_SPONSOR_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "sponsors");
            break;
        case ADD_STREAK_ATTRIBUTES:
            state = addAttributes(state, action.payload.id, action.payload.attributes, "streaks");
            break;
        case REMOVE_CLIENT_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "clients");
            break;
        case REMOVE_TRAINER_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "trainers");
            break;
        case REMOVE_GYM_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "gyms");
            break;
        case REMOVE_WORKOUT_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "workouts");
            break;
        case REMOVE_REVIEW_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "reviews");
            break;
        case REMOVE_EVENT_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "events");
            break;
        case REMOVE_CHALLENGE_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "challenges");
            break;
        case REMOVE_INVITE_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "invites");
            break;
        case REMOVE_POST_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "posts");
            break;
        case REMOVE_SUBMISSION_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "submissions");
            break;
        case REMOVE_GROUP_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "groups");
            break;
        case REMOVE_COMMENT_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "comments");
            break;
        case REMOVE_SPONSOR_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "sponsors");
            break;
        case REMOVE_STREAK_ATTRIBUTES:
            state = removeAttributes(state, action.payload.id, action.payload.attributes, "streaks");
            break;
        case REMOVE_CLIENT_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "clients");
            break;
        case REMOVE_TRAINER_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "trainers");
            break;
        case REMOVE_GYM_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "gyms");
            break;
        case REMOVE_WORKOUT_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "workouts");
            break;
        case REMOVE_REVIEW_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "reviews");
            break;
        case REMOVE_EVENT_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "events");
            break;
        case REMOVE_CHALLENGE_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "challenges");
            break;
        case REMOVE_INVITE_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "invites");
            break;
        case REMOVE_POST_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "posts");
            break;
        case REMOVE_SUBMISSION_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "submissions");
            break;
        case REMOVE_GROUP_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "groups");
            break;
        case REMOVE_COMMENT_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "comments");
            break;
        case REMOVE_SPONSOR_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "sponsors");
            break;
        case REMOVE_STREAK_ATTRIBUTE_INDEX:
            state = removeAttributeIndex(state, action.payload.id, action.payload.attributeName, action.payload.index,
                "streaks");
            break;
        case REMOVE_CLIENT:
            state = removeItem(state, "clients", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_TRAINER:
            state = removeItem(state, "trainers", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_GYM:
            state = removeItem(state, "gyms", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_WORKOUT:
            state = removeItem(state, "workouts", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_REVIEW:
            state = removeItem(state, "reviews", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_EVENT:
            state = removeItem(state, "events", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_CHALLENGE:
            state = removeItem(state, "challenges", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_INVITE:
            state = removeItem(state, "invites", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_POST:
            state = removeItem(state, "posts", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_SUBMISSION:
            state = removeItem(state, "submissions", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_GROUP:
            state = removeItem(state, "groups", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_COMMENT:
            state = removeItem(state, "comments", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_SPONSOR:
            state = removeItem(state, "sponsors", action.payload.id, action.asyncDispatch);
            break;
        case REMOVE_STREAK:
            state = removeItem(state, "streaks", action.payload.id, action.asyncDispatch);
            break;
        case FETCH_CLIENT_QUERY:
            state = addQueryToCache(state, "clientQueries", clientQueryCacheSize, "clientQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_TRAINER_QUERY:
            state = addQueryToCache(state, "trainerQueries", trainerQueryCacheSize, "trainerQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_GYM_QUERY:
            state = addQueryToCache(state, "gymQueries", gymQueryCacheSize, "gymQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_WORKOUT_QUERY:
            state = addQueryToCache(state, "workoutQueries", workoutQueryCacheSize, "workoutQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_REVIEW_QUERY:
            state = addQueryToCache(state, "reviewQueries", reviewQueryCacheSize, "reviewQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_EVENT_QUERY:
            state = addQueryToCache(state, "eventQueries", eventQueryCacheSize, "eventQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_CHALLENGE_QUERY:
            state = addQueryToCache(state, "challengeQueries", challengeQueryCacheSize, "challengeQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_INVITE_QUERY:
            state = addQueryToCache(state, "inviteQueries", inviteQueryCacheSize, "inviteQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_POST_QUERY:
            state = addQueryToCache(state, "postQueries", postQueryCacheSize, "postQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_SUBMISSION_QUERY:
            state = addQueryToCache(state, "submissionQueries", submissionQueryCacheSize, "submissionQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_GROUP_QUERY:
            state = addQueryToCache(state, "groupQueries", groupQueryCacheSize, "groupQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_COMMENT_QUERY:
            state = addQueryToCache(state, "commentQueries", commentQueryCacheSize, "commentQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_SPONSOR_QUERY:
            state = addQueryToCache(state, "sponsorQueries", sponsorQueryCacheSize, "sponsorQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case FETCH_STREAK_QUERY:
            state = addQueryToCache(state, "streakQueries", streakQueryCacheSize, "streakQueryLRUHandler",
                action.payload.normalizedQueryString, action.payload.nextToken, action.payload.queryResult);
            break;
        case CLEAR_NORMALIZED_CLIENT_QUERY:
            state = clearNormalizedCache(state, "clientQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_TRAINER_QUERY:
            state = clearNormalizedCache(state, "trainerQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_GYM_QUERY:
            state = clearNormalizedCache(state, "gymQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_WORKOUT_QUERY:
            state = clearNormalizedCache(state, "workoutQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_REVIEW_QUERY:
            state = clearNormalizedCache(state, "reviewQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_EVENT_QUERY:
            state = clearNormalizedCache(state, "eventQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_CHALLENGE_QUERY:
            state = clearNormalizedCache(state, "challengeQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_INVITE_QUERY:
            state = clearNormalizedCache(state, "inviteQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_POST_QUERY:
            state = clearNormalizedCache(state, "postQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_SUBMISSION_QUERY:
            state = clearNormalizedCache(state, "submissionQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_GROUP_QUERY:
            state = clearNormalizedCache(state, "groupQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_COMMENT_QUERY:
            state = clearNormalizedCache(state, "commentQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_SPONSOR_QUERY:
            state = clearNormalizedCache(state, "sponsorQueries", action.payload);
            break;
        case CLEAR_NORMALIZED_STREAK_QUERY:
            state = clearNormalizedCache(state, "streakQueries", action.payload);
            break;
        case CLEAR_CLIENT_QUERY:
            state = clearCache(state, "clientQueries");
            break;
        case CLEAR_TRAINER_QUERY:
            state = clearCache(state, "trainerQueries");
            break;
        case CLEAR_GYM_QUERY:
            state = clearCache(state, "gymQueries");
            break;
        case CLEAR_WORKOUT_QUERY:
            state = clearCache(state, "workoutQueries");
            break;
        case CLEAR_REVIEW_QUERY:
            state = clearCache(state, "reviewQueries");
            break;
        case CLEAR_EVENT_QUERY:
            state = clearCache(state, "eventQueries");
            break;
        case CLEAR_CHALLENGE_QUERY:
            state = clearCache(state, "challengeQueries");
            break;
        case CLEAR_INVITE_QUERY:
            state = clearCache(state, "inviteQueries");
            break;
        case CLEAR_POST_QUERY:
            state = clearCache(state, "postQueries");
            break;
        case CLEAR_SUBMISSION_QUERY:
            state = clearCache(state, "submissionQueries");
            break;
        case CLEAR_GROUP_QUERY:
            state = clearCache(state, "groupQueries");
            break;
        case CLEAR_COMMENT_QUERY:
            state = clearCache(state, "commentQueries");
            break;
        case CLEAR_SPONSOR_QUERY:
            state = clearCache(state, "sponsorQueries");
            break;
        case CLEAR_STREAK_QUERY:
            state = clearCache(state, "streakQueries");
            break;
        default:
            state = {
                ...state
            };
            break;
    }
    return state;
};

/**
 * Adds an object to the cache, allowing its contents to be viewed inside of the entire application.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {string} cacheName The name of the exact cache that the object will lie in. It's determined by item type.
 * @param {number} maxCacheSize The max size of the cache for that item type.
 * @param {string} LRUHandlerName The LRU handler name for that item type.
 * @param {*} object The object to put in the cache. Must have the "id" attribute.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 * @return {*} The new state of the cache reducer after the addition.
 */
function addObjectToCache(state, cacheName, maxCacheSize, LRUHandlerName, object, dispatch) {
    // TODO Check to see that this is all well-formed?
    if (!object.id) {
        err&&console.error("Adding object to cache does not include the id!!!");
    }
    state = {
        ...state
    };
    if (!state[cacheName][object.id]) {
        const cache = state[cacheName];
        const LRUHandler = state[LRUHandlerName];
        LRUHandler.unshift(object.id);
        cache[object.id] = object.data;
        if (LRUHandler.length >= maxCacheSize) {
            // Then we have to pop something out
            const deleteObjectID = LRUHandler.pop();
            delete cache[deleteObjectID];
            dispatch(removeChannelSubscription(getObjectChannelName(deleteObjectID)));
        }
        return state;
    }
    else {
        // Update the object
        let LRUHandler = state[LRUHandlerName];
        let index = LRUHandler.indexOf(object.id);
        if (index > -1) {
            LRUHandler.splice(index, 1);
        }
        LRUHandler.unshift(object.id);
        // Then we update the object with the additional fields that it may have (if this came from the other function)
        state[cacheName][object.id] = {
            ...state[cacheName][object.id],
            ...object.data
        };
        return state;
    }
}

/**
 * Adds an object to the cache, allowing its contents to be viewed and referenced in the same query again.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {string} cacheName The name of the exact cache that the query will lie in. It's determined by item type.
 * @param {number} maxCacheSize The max size of the cache for that item type.
 * @param {string} LRUHandlerName The LRU handler name for that item type.
 * @param {string} normalizedQueryString The normalized query string to input, without the next token variable.
 * @param {string} nextToken The next token string to determine which section of the query to retrieve.
 * @param {[object]} queryResult The result of the query, the list of items returned.
 * @return {*} The new state of the cache reducer after the addition.
 */
function addQueryToCache(state, cacheName, maxCacheSize, LRUHandlerName, normalizedQueryString, nextToken, queryResult) {
    state = {
        ...state
    };
    if (!state[cacheName][normalizedQueryString]) {
        state[cacheName][normalizedQueryString] = {};
    }
    if (!state[cacheName][normalizedQueryString][nextToken]) {
        // It's not in the cache yet
        const cache = state[cacheName][normalizedQueryString];
        const LRUHandler = state[LRUHandlerName];
        LRUHandler.unshift({normalizedQueryString, nextToken});
        cache[nextToken] = queryResult;
        if (LRUHandler.length >= maxCacheSize) {
            // Then we have to pop something out
            const entry = LRUHandler.pop();
            delete state[cacheName][entry.normalizedQueryString][entry.nextToken];
        }
        return state;
    }
    else {
        // Update the object
        let LRUHandler = state[LRUHandlerName];
        let addingEntry = {normalizedQueryString, nextToken};
        let index = -1;
        for (let i = 0; i < LRUHandler.length; i++) {
            const entry = LRUHandler[i];
            if (entry.normalizedQueryString === normalizedQueryString && entry.nextToken === nextToken) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            LRUHandler.splice(index, 1);
        }
        LRUHandler.unshift(addingEntry);
        // Then we update the object with the additional fields that it may have (if this came from the other function)
        state[cacheName][normalizedQueryString][nextToken] = queryResult;
        return state;
    }
}

/**
 * Sets the attribute index of a certain attribute list in an object inside the cache to a different value.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {string} id The id of the object to update.
 * @param {string} attributeName The name
 * @param {number} index The index of the list to set.
 * @param {*} attributeValue The value to set the list index to.
 * @param {string} cacheName The name of the specific cache in the reducer that holds the object.
 * @return {*} The new state of the cache reducer after the addition.
 */
function setAttributeIndex(state, id, attributeName, index, attributeValue, cacheName) {
    state = {
        ...state,
    };
    state[cacheName][id] = {
        ...state[cacheName][id],
    };
    state[cacheName][id][attributeName][index] = attributeValue;
    return state;
}

/**
 * Adds attributes to a attribute list in an object in cache already.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {string} id The id of the object to update.
 * @param {[*]} attributes The attribute values to add to the object's attribute list.
 * @param {string} cacheName The name of the cache that holds the object.
 * @return {*} The new state of the cache reducer after the addition.
 */
function addAttributes(state, id, attributes, cacheName) {
    state = {
        ...state,
    };
    state[cacheName][id] = {
        ...state[cacheName][id],
    };
    for (const attributeName in attributes) {
        if (attributes.hasOwnProperty(attributeName)) {
            const attribute = state[cacheName][id][attributeName];
            const addAttribute = attributes[attributeName];
            if (!attribute) {
                state[cacheName][id][attributeName] = addAttribute;
            } else if (!Array.isArray(state[cacheName][id][attributeName])) {
                err&&console.error("TRYING TO ADD ATTRIBUTES TO A NOT ARRAY!!!! PROBLEM. AttributeName: " + attributeName);
            }
            else {
                state[cacheName][id][attributeName] = addUniqueToArray([...state[cacheName][id][attributeName]], addAttribute);
            }
        }
    }
    return state;
}

/**
 * Removes an index from a object list attribute. Shortens the list by exactly one if valid.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {string} id The id of the object to update.
 * @param {string} attributeName The name of the attribute in the object containing the list.
 * @param {number} index The index of the list to remove the element from.
 * @param {string} cacheName The name of the cache containing the object.
 * @return {*} The new state of the cache reducer after the addition.
 */
function removeAttributeIndex(state, id, attributeName, index, cacheName) {
    state = {
        ...state,
    };
    state[cacheName][id] = {
        ...state[cacheName][id],
    };
    state[cacheName][id][attributeName].splice(index, 1);
    return state;
}

/**
 * Removes one or more attributes from an object list attribute, using the value of the object inside the list.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {string} id The id of the object to update.
 * @param {{}} attributes The map of attribute names of lists to attribute values to remove from them.
 * @param {string} cacheName The name of the cache containing the object.
 * @return {*} The new state of the cache reducer after the addition.
 */
function removeAttributes(state, id, attributes, cacheName) {
    state = {
        ...state,
    };
    state[cacheName][id] = {
        ...state[cacheName][id],
    };
    for (const attributeName in attributes) {
        if (attributes.hasOwnProperty(attributeName)) {
            const attribute = state[cacheName][id][attributeName];
            const removeAttribute = attributes[attributeName];
            if (!attribute) {
                // Nothing to remove
            } else if (!Array.isArray(state[cacheName][id][attributeName])) {
                err&&console.error("TRYING TO REMOVE ATTRIBUTES FROM A NOT ARRAY!!!! PROBLEM. AttributeName: " + attributeName);
            }
            else {
                state[cacheName][id][attributeName] = subtractArray([...state[cacheName][id][attributeName]], removeAttribute);
            }
        }
    }
    return state;
}

/**
 * Removes an object from the cache and removes the potential channel unsubscription associated.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {string} cacheName The name of the cache that contains the object.
 * @param {string} id The id of the object to remove.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 * @return {*} The new state of the cache reducer after the addition.
 */
function removeItem(state, cacheName, id, dispatch) {
    // Once you remove an object, simply unsubscribe
    dispatch(removeChannelSubscription(getObjectChannelName(id)));
    return {
        ...state,
        [cacheName]: {
            ...state[cacheName],
            [id]: null
        }
    };
}

/**
 * Clears a cache entirely of all objects inside of it.
 *
 * TODO if we actually need to use this function, update it to unsubscribe.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {string} cacheName The name of the cache to clear.
 * @return {*} The new state of the cache reducer after the addition.
 */
function clearCache(state, cacheName) {
    console.log("don't use this!");
    alert("don't use this!");
    return {
        ...state,
        [cacheName]: {}
    }
}

/**
 * Clears a query cache of the specific normalized query within it.
 *
 * @param {*} state The current state of the cache reducer.
 * @param {string} cacheName The name of the cache that holds the normalized query.
 * @param {string} normalizedQuery The query string of the query to clear.
 * @return {*} The new state of the cache reducer after the addition.
 */
function clearNormalizedCache(state, cacheName, normalizedQuery) {
    return {
        ...state,
        [cacheName]: {
            ...state[cacheName],
            [normalizedQuery]: {}
        }
    }
}

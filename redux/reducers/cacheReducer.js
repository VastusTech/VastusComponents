import {err} from "../../../Constants";
import {removeChannelSubscription} from "../actions/ablyActions";
import {subtractedArray, withUniqueAdded} from "../../logic/ArrayHelper";
import {switchReturnItemType} from "../../logic/ItemType";
import type Client from "../../types/Client";
import type Trainer from "../../types/Trainer";
import type Gym from "../../types/Gym";
import type Workout from "../../types/Workout";
import type Review from "../../types/Review";
import type Event from "../../types/Event";
import type Challenge from "../../types/Challenge";
import type Invite from "../../types/Invite";
import type Post from "../../types/Post";
import type Submission from "../../types/Submission";
import type Group from "../../types/Group";
import type Comment from "../../types/Comment";
import type Sponsor from "../../types/Sponsor";
import type Streak from "../../types/Streak";
import type Deal from "../../types/Deal";
import type Product from "../../types/Product";
import type Admin from "../../types/Admin";

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
export const PUT_ITEM = "PUT_ITEM";
export const SET_ITEM_ATTRIBUTE_INDEX = "SET_ITEM_ATTRIBUTE_INDEX";
export const ADD_TO_ITEM_ATTRIBUTES = "ADD_TO_ITEM_ATTRIBUTES";
export const REMOVE_FROM_ITEM_ATTRIBUTES = "REMOVE_FROM_ITEM_ATTRIBUTES";
export const REMOVE_ITEM_ATTRIBUTE_INDEX = "REMOVE_ITEM_ATTRIBUTE_INDEX";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const PUT_ITEM_QUERY = "PUT_ITEM_QUERY";
export const CLEAR_NORMALIZED_ITEM_QUERY = "CLEAR_NORMALIZED_ITEM_QUERY";
export const CLEAR_ITEM_CACHE = "CLEAR_ITEM_CACHE";
export const CLEAR_ITEM_QUERY_CACHE = "CLEAR_ITEM_QUERY_CACHE";


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
const dealCacheSize = 100;
const productCacheSize = 100;
const adminCacheSize = 100;

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
const dealQueryCacheSize = 10;
const productQueryCacheSize = 10;
const adminQueryCacheSize = 10;

const getItemCacheSize = (itemType) => {
  return switchReturnItemType(itemType, clientCacheSize, trainerCacheSize, gymCacheSize, workoutCacheSize,
    reviewCacheSize, eventCacheSize, challengeCacheSize, inviteCacheSize, postCacheSize, submissionCacheSize,
    groupCacheSize, commentCacheSize, sponsorCacheSize, null, streakCacheSize, dealCacheSize,
    productCacheSize, adminCacheSize, "GET ITEM CACHE SIZE CACHE REDUCER");
};

const getItemQueryCacheSize = (itemType) => {
  return switchReturnItemType(itemType, clientQueryCacheSize, trainerQueryCacheSize, gymQueryCacheSize,
    workoutQueryCacheSize, reviewQueryCacheSize, eventQueryCacheSize, challengeQueryCacheSize, inviteQueryCacheSize,
    postQueryCacheSize, submissionQueryCacheSize, groupQueryCacheSize, commentQueryCacheSize, sponsorQueryCacheSize,
    null, streakQueryCacheSize, dealQueryCacheSize, productQueryCacheSize, adminQueryCacheSize,
    "GET ITEM QUERY CACHE SIZE");
};

type CacheReducer = {
  clients: Object<string, Client>,
  trainers: Object<string, Trainer>,
  gyms: Object<string, Gym>,
  workouts: Object<string, Workout>,
  reviews: Object<string, Review>,
  events: Object<string, Event>,
  challenges: Object<string, Challenge>,
  invites: Object<string, Invite>,
  posts: Object<string, Post>,
  submissions: Object<string, Submission>,
  groups: Object<string, Group>,
  comments: Object<string, Comment>,
  sponsors: Object<string, Sponsor>,
  streaks: Object<string, Streak>,
  deals: Object<string, Deal>,
  products: Object<string, Product>,
  admins: Object<String, Admin>
  clientLRUHandler: [string],
  trainerLRUHandler: [string],
  gymLRUHandler: [string],
  workoutLRUHandler: [string],
  reviewLRUHandler: [string],
  eventLRUHandler: [string],
  challengeLRUHandler: [string],
  inviteLRUHandler: [string],
  postLRUHandler: [string],
  submissionLRUHandler: [string],
  groupLRUHandler: [string],
  commentLRUHandler: [string],
  sponsorLRUHandler: [string],
  streakLRUHandler: [string],
  dealLRUHandler: [string],
  productLRUHandler: [string],
  adminLRUHandler: [string],
  clientQueries: Object<string, string>,
  trainerQueries: Object<string, string>,
  gymQueries: Object<string, string>,
  workoutQueries: Object<string, string>,
  reviewQueries: Object<string, string>,
  eventQueries: Object<string, string>,
  challengeQueries: Object<string, string>,
  inviteQueries: Object<string, string>,
  postQueries: Object<string, string>,
  submissionQueries: Object<string, string>,
  groupQueries: Object<string, string>,
  commentQueries: Object<string, string>,
  sponsorQueries: Object<string, string>,
  streakQueries: Object<string, string>,
  dealQueries: Object<string, string>,
  productQueries: Object<string, string>,
  adminQueries: Object<string, string>,
  clientQueryLRUHandler: [string],
  trainerQueryLRUHandler: [string],
  gymQueryLRUHandler: [string],
  workoutQueryLRUHandler: [string],
  reviewQueryLRUHandler: [string],
  eventQueryLRUHandler: [string],
  challengeQueryLRUHandler: [string],
  inviteQueryLRUHandler: [string],
  postQueryLRUHandler: [string],
  submissionQueryLRUHandler: [string],
  groupQueryLRUHandler: [string],
  commentQueryLRUHandler: [string],
  sponsorQueryLRUHandler: [string],
  streakQueryLRUHandler: [string],
  dealQueryLRUHandler: [string],
  productQueryLRUHandler: [string],
  adminQueryLRUHandler: [string],
}

/**
 * The initial state of the cache reducer.
 *
 * @type {CacheReducer}
 */
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
  deals: {},
  products: {},
  admins: {},

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
  dealLRUHandler: [],
  productLRUHandler: [],
  adminLRUHandler: [],

  // TODO Consider changing this to be more like the message board queries where they just hold a list of results and
  // TODO there are other objects that hold next tokens / ifFinished's ...
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
  dealQueries: {},
  productQueries: {},
  adminQueries: {},

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
  dealQueryLRUHandler: [],
  productQueryLRUHandler: [],
  adminQueryLRUHandler: [],
};

/**
 * Deeply copies the redux state to be edited for the next action.
 *
 * TODO How bad is this performance-wise?
 *
 * @param {CacheReducer} state The cache state to be copied.
 * @return {CacheReducer} The deeply copied state to update.
 */
const copyState = (state) => {
  return {
    clients: {...state.clients},
    trainers: {...state.trainers},
    gyms: {...state.gyms},
    workouts: {...state.workouts},
    reviews: {...state.reviews},
    events: {...state.events},
    challenges: {...state.challenges},
    invites: {...state.invites},
    posts: {...state.posts},
    submissions: {...state.submissions},
    groups: {...state.groups},
    comments: {...state.comments},
    sponsors: {...state.sponsors},
    streaks: {...state.streaks},
    deals: {...state.deals},
    products: {...state.products},
    admins: {...state.admins},
    clientLRUHandler: [...state.clientLRUHandler],
    trainerLRUHandler: [...state.trainerLRUHandler],
    gymLRUHandler: [...state.gymLRUHandler],
    workoutLRUHandler: [...state.workoutLRUHandler],
    reviewLRUHandler: [...state.reviewLRUHandler],
    eventLRUHandler: [...state.eventLRUHandler],
    challengeLRUHandler: [...state.challengeLRUHandler],
    inviteLRUHandler: [...state.inviteLRUHandler],
    postLRUHandler: [...state.postLRUHandler],
    submissionLRUHandler: [...state.submissionLRUHandler],
    groupLRUHandler: [...state.groupLRUHandler],
    commentLRUHandler: [...state.commentLRUHandler],
    sponsorLRUHandler: [...state.sponsorLRUHandler],
    streakLRUHandler: [...state.streakLRUHandler],
    dealLRUHandler: [...state.dealLRUHandler],
    productLRUHandler: [...state.productLRUHandler],
    adminLRUHandler: [...state.adminLRUHandler],
    clientQueries: {...state.clientQueries},
    trainerQueries: {...state.trainerQueries},
    gymQueries: {...state.gymQueries},
    workoutQueries: {...state.workoutQueries},
    reviewQueries: {...state.reviewQueries},
    eventQueries: {...state.eventQueries},
    challengeQueries: {...state.challengeQueries},
    inviteQueries: {...state.inviteQueries},
    postQueries: {...state.postQueries},
    submissionQueries: {...state.submissionQueries},
    groupQueries: {...state.groupQueries},
    commentQueries: {...state.commentQueries},
    sponsorQueries: {...state.sponsorQueries},
    streakQueries: {...state.streakQueries},
    dealQueries: {...state.dealQueries},
    productQueries: {...state.productQueries},
    adminQueries: {...state.adminQueries},
    clientQueryLRUHandler: [...state.clientQueryLRUHandler],
    trainerQueryLRUHandler: [...state.trainerQueryLRUHandler],
    gymQueryLRUHandler: [...state.gymQueryLRUHandler],
    workoutQueryLRUHandler: [...state.workoutQueryLRUHandler],
    reviewQueryLRUHandler: [...state.reviewQueryLRUHandler],
    eventQueryLRUHandler: [...state.eventQueryLRUHandler],
    challengeQueryLRUHandler: [...state.challengeQueryLRUHandler],
    inviteQueryLRUHandler: [...state.inviteQueryLRUHandler],
    postQueryLRUHandler: [...state.postQueryLRUHandler],
    submissionQueryLRUHandler: [...state.submissionQueryLRUHandler],
    groupQueryLRUHandler: [...state.groupQueryLRUHandler],
    commentQueryLRUHandler: [...state.commentQueryLRUHandler],
    sponsorQueryLRUHandler: [...state.sponsorQueryLRUHandler],
    streakQueryLRUHandler: [...state.streakQueryLRUHandler],
    dealQueryLRUHandler: [...state.dealQueryLRUHandler],
    productQueryLRUHandler: [...state.productQueryLRUHandler],
    adminQueryLRUHandler: [...state.adminQueryLRUHandler],
  };
};

/**
 * Gets the item cache for the specified item type.
 *
 * @param {CacheReducer} state The state of the cache reducer.
 * @param {string} itemType The type of item to receive the cache for.
 * @return {Object<string, Object>} Returns the item cache for the item type.
 */
const getItemCache = (state, itemType) => {
  return switchReturnItemType(itemType, state.clients, state.trainers, state.gyms, state.workouts, state.reviews,
    state.events, state.challenges, state.invites, state.posts, state.submissions, state.groups, state.comments,
    state.sponsors, null, state.streaks, state.deals, state.products, state.admins,
    "GET ITEM CACHE CACHE REDUCER");
};

/**
 * Gets the item LRU Handler for the specified item type.
 *
 * @param {CacheReducer} state The state of the cache reducer.
 * @param {string} itemType The type of item to receive the cache for.
 * @return {[string]} Returns the item LRU handler for the item type.
 */
const getItemLRUHandler = (state, itemType) => {
  return switchReturnItemType(itemType, state.clientLRUHandler, state.trainerLRUHandler, state.gymLRUHandler,
    state.workoutLRUHandler, state.reviewLRUHandler, state.eventLRUHandler, state.challengeLRUHandler,
    state.inviteLRUHandler, state.postLRUHandler, state.submissionLRUHandler, state.groupLRUHandler,
    state.commentLRUHandler, state.sponsorLRUHandler, null, state.streakLRUHandler, state.dealLRUHandler,
    state.productLRUHandler, state.adminLRUHandler, "GET ITEM LRU HANDLER");
};

/**
 * Gets the item query cache for the specified item type.
 *
 * @param {CacheReducer} state The state of the cache reducer.
 * @param {string} itemType The type of item to receive the cache for.
 * @return {Object<string, Object>} Returns the item query cache for the item type.
 */
const getItemQueryCache = (state, itemType) => {
  return switchReturnItemType(itemType, state.clientQueries, state.trainerQueries, state.gymQueries,
    state.workoutQueries, state.reviewQueries, state.eventQueries, state.challengeQueries, state.inviteQueries,
    state.postQueries, state.submissionQueries, state.groupQueries, state.commentQueries, state.sponsorQueries,
    null, state.streakQueries, state.dealQueries, state.productQueries, state.adminQueries,
    "GET ITEM QUERY CACHE CACHE REDUCER");
};

/**
 * Gets the item query cache name for the specified item type.
 *
 * @param {CacheReducer} state The state of the cache reducer.
 * @param {string} itemType The type of item to receive the cache for.
 * @return {string} Returns the item query cache name for the item type.
 */
const getItemQueryCacheName = (state, itemType) => {
  return switchReturnItemType(itemType, "clientQueries", "trainerQueries", "gymQueries",
    "workoutQueries", "reviewQueries", "eventQueries", "challengeQueries",
    "inviteQueries", "postQueries", "submissionQueries", "groupQueries",
    "commentQueries", "sponsorQueries", null, "streakQueries",
    "dealQueries", "productQueries", "adminQueries",
    "GET ITEM QUERY CACHE CACHE REDUCER");
};

/**
 * Gets the item query LRU Handler for the specified item type.
 *
 * @param {CacheReducer} state The state of the cache reducer.
 * @param {string} itemType The type of item to receive the cache for.
 * @return {[string]} Returns the item query LRU handler for the item type.
 */
const getItemQueryLRUHandler = (state, itemType) => {
  return switchReturnItemType(itemType, state.clientQueryLRUHandler, state.trainerQueryLRUHandler,
    state.gymQueryLRUHandler, state.workoutQueryLRUHandler, state.reviewQueryLRUHandler, state.eventQueryLRUHandler,
    state.challengeQueryLRUHandler, state.inviteQueryLRUHandler, state.postQueryLRUHandler,
    state.submissionQueryLRUHandler, state.groupQueryLRUHandler, state.commentQueryLRUHandler,
    state.sponsorQueryLRUHandler, null, state.streakQueryLRUHandler, state.dealQueryLRUHandler,
    state.productQueryLRUHandler, state.adminQueryLRUHandler, "GET ITEM QUERY LRU HANDLER CACHE REDUCER");
};

/**
 * Gets the item query LRU Handler name for the specified item type.
 *
 * @param {CacheReducer} state The state of the cache reducer.
 * @param {string} itemType The type of item to receive the cache for.
 * @return {string} Returns the item query LRU handler name for the item type.
 */
const getItemQueryLRUHandlerName = (state, itemType) => {
  return switchReturnItemType(itemType, "clientQueryLRUHandler", "trainerQueryLRUHandler",
    "gymQueryLRUHandler", "workoutQueryLRUHandler", "reviewQueryLRUHandler",
    "eventQueryLRUHandler", "challengeQueryLRUHandler", "inviteQueryLRUHandler",
    "postQueryLRUHandler", "submissionQueryLRUHandler", "groupQueryLRUHandler",
    "commentQueryLRUHandler", "sponsorQueryLRUHandler", null,
    "streakQueryLRUHandler", "dealQueryLRUHandler", "productQueryLRUHandler",
    "adminQueryLRUHandler", "GET ITEM QUERY LRU HANDLER CACHE REDUCER");
};

/**
 * Cache Reducer:
 *
 * This reducer handles all the cache-ing of data and updating of all database data shown within the application.
 * Handles all object permanence, LRU cache eviction, and query handling. Also can update the database manually using
 * specific functions.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {{type: string, payload: *, asyncDispatch: Function}} action The action to specify how to update the reducer.
 * @return {CacheReducer} The next state for the reducer.
 */
export default (state: CacheReducer = initialState, action) => {
  switch (action.type) {
    case PUT_ITEM:
      state = copyState(state);
      addItemToCache(state, action.payload.id, action.payload.itemType, action.payload.item, action.asyncDispatch);
      break;
    case SET_ITEM_ATTRIBUTE_INDEX:
      state = copyState(state);
      setAttributeIndex(state, action.payload.id, action.payload.itemType, action.payload.attributeName,
        action.payload.index, action.payload.attributeValue);
      break;
    case ADD_TO_ITEM_ATTRIBUTES:
      state = copyState(state);
      addToAttributes(state, action.payload.id, action.payload.itemType, action.payload.attributes);
      break;
    case REMOVE_FROM_ITEM_ATTRIBUTES:
      state = copyState(state);
      removeFromAttributes(state, action.payload.id, action.payload.itemType, action.payload.attributes);
      break;
    case REMOVE_ITEM_ATTRIBUTE_INDEX:
      state = copyState(state);
      removeAttributeIndex(state, action.payload.id, action.payload.itemType, action.payload.attributeName,
        action.payload.index);
      break;
    case REMOVE_ITEM:
      state = copyState(state);
      removeItem(state, action.payload.id, action.payload.itemType, action.asyncDispatch);
      break;
    case PUT_ITEM_QUERY:
      state = copyState(state);
      addQueryToCache(state, action.payload.itemType, action.payload.normalizedQueryString,
        action.payload.nextToken, action.payload.queryResult);
      break;
    case CLEAR_NORMALIZED_ITEM_QUERY:
      state = copyState(state);
      clearNormalizedCache(state, action.payload.itemType, action.payload.normalizedQueryString);
      break;
    case CLEAR_ITEM_CACHE:
      state = copyState(state);
      clearCache(state, action.payload.itemType, action.asyncDispatch);
      break;
    case CLEAR_ITEM_QUERY_CACHE:
      state = copyState(state);
      clearQueryCache(state, action.payload.itemType);
      break;
    default:
      break;
  }
  return state;
};

/**
 * Adds an item to the cache, making it accessible to the whole app, and evicts items if necessary.
 *
 * @param {CacheReducer} state The state of the cache reducer.
 * @param {string} id The id of the item to add to the cache.
 * @param {string} itemType The type of the item to add to the cache.
 * @param {*} item The item to add into the cache.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 */
const addItemToCache = (state, id, itemType, item, dispatch) => {
  if (!id || !itemType) {
    err && console.error("Adding item to cache does not include the id and/or itemType!!!");
  }
  const itemCache = getItemCache(state, itemType);
  const LRUHandler = getItemLRUHandler(state, itemType);
  if (!itemCache[id]) {
    // Add the object
    LRUHandler.unshift(id);
    itemCache[id] = item;
    if (LRUHandler.length >= getItemCacheSize(itemType)) {
      // Then we have to pop something out
      const deleteObjectID = LRUHandler.pop();
      delete [deleteObjectID];
      dispatch(removeChannelSubscription(getObjectChannelName(deleteObjectID)));
    }
  } else {
    // Update the object
    let index = LRUHandler.indexOf(id);
    if (index > -1) {
      LRUHandler.splice(index, 1);
    }
    LRUHandler.unshift(id);
    // Then we update the object with the additional fields that it may have (if this came from the other function)
    itemCache[id] = {
      ...itemCache[id],
      ...item
    };
  }
};

/**
 * Adds an object to the cache, allowing its contents to be viewed and referenced in the same query again.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {string} itemType The type of the item query cache to put the query into.
 * @param {string} normalizedQueryString The normalized query string to input, without the next token variable.
 * @param {string} nextToken The next token string to determine which section of the query to retrieve.
 * @param {[object]} queryResult The result of the query, the list of items returned.
 * @return {CacheReducer} The new state of the cache reducer after the addition.
 */
const addQueryToCache = (state, itemType, normalizedQueryString, nextToken, queryResult) => {
  const queryCache = getItemQueryCache(state, itemType);
  const queryLRUHandler = getItemQueryLRUHandler(state, itemType);
  if (!queryCache[normalizedQueryString]) {
    queryCache[normalizedQueryString] = {};
  }
  const queryResults = queryCache[normalizedQueryString];
  if (!queryCache[normalizedQueryString][nextToken]) {
    // It's not in the cache yet
    queryLRUHandler.unshift({normalizedQueryString, nextToken});
    queryResults[nextToken] = queryResult;
    if (queryLRUHandler.length >= getItemQueryCacheSize(itemType)) {
      // Then we have to pop something out
      const entry = queryLRUHandler.pop();
      delete queryCache[entry.normalizedQueryString][entry.nextToken];
    }
  } else {
    // Update the object
    let addingEntry = {normalizedQueryString, nextToken};
    let index = -1;
    for (let i = 0; i < queryLRUHandler.length; i++) {
      const entry = queryLRUHandler[i];
      if (entry.normalizedQueryString === normalizedQueryString && entry.nextToken === nextToken) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      queryLRUHandler.splice(index, 1);
    }
    queryLRUHandler.unshift(addingEntry);
    // Then we update the object with the additional fields that it may have (if this came from the other function)
    queryCache[normalizedQueryString][nextToken] = queryResult;
  }
};

/**
 * Sets the attribute index of a certain attribute list in an object inside the cache to a different value.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {string} id The id of the item to update.
 * @param {string} itemType The type of the item to update.
 * @param {string} attributeName The name of the attribute to update.
 * @param {number} index The index of the list to set.
 * @param {*} attributeValue The value to set the list index to.
 * @return {CacheReducer} The new state of the cache reducer after the addition.
 */
function setAttributeIndex(state, id, itemType, attributeName, index, attributeValue) {
  const itemCache = getItemCache(state, itemType);
  if (!itemCache[id]) {
    err && console.error("Cannot update an item not yet in the database!");
    return;
  }
  const attribute = itemCache[id][attributeName];
  if (!attribute) {
    err && console.error("The item does not have the attribute to update yet!");
    return;
  }
  if (!Array.isArray(attribute)) {
    err && console.error("TRYING TO SET ATTRIBUTE OF A NOT ARRAY!!!! PROBLEM. AttributeName: " + attributeName);
    return;
  }
  const newAttribute = [...attribute];
  newAttribute[index] = attributeValue;
  itemCache[id][attributeName] = newAttribute;
}

/**
 * Adds attributes to a attribute list in an item in cache already.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {string} id The id of the item to update.
 * @param {string} itemType The type of the item to update.
 * @param {Object<string, [*]>} attributes The attribute values to add to the object's attribute list.
 * @return {CacheReducer} The new state of the cache reducer after the addition.
 */
function addToAttributes(state, id, itemType, attributes) {
  const itemCache = getItemCache(state, itemType);
  if (!itemCache[id]) {
    err && console.error("Cannot update an item not yet in the database!");
    return;
  }
  for (const attributeName in attributes) {
    if (attributes.hasOwnProperty(attributeName)) {
      const attribute = itemCache[id][attributeName];
      const addAttribute = attributes[attributeName];
      if (!attribute) {
        itemCache[id][attributeName] = addAttribute;
      } else if (!Array.isArray(attribute)) {
        err && console.error("TRYING TO ADD ATTRIBUTES TO A NOT ARRAY!!!! PROBLEM. AttributeName: " + attributeName);
      } else {
        itemCache[id][attributeName] = withUniqueAdded(attribute, addAttribute);
      }
    }
  }
}

/**
 * Removes an index from a object list attribute. Shortens the list by exactly one if valid.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {string} id The id of the item to update.
 * @param {string} itemType The type of the item to update.
 * @param {string} attributeName The name of the attribute in the object containing the list.
 * @param {number} index The index of the list to remove the element from.
 * @return {CacheReducer} The new state of the cache reducer after the removal.
 */
function removeAttributeIndex(state, id, itemType, attributeName, index) {
  const itemCache = getItemCache(state, itemType);
  if (!itemCache[id]) {
    err && console.error("Cannot update an item not yet in the database!");
    return;
  }
  const attribute = itemCache[id][attributeName];
  if (!attribute) {
    err && console.error("The item does not have the attribute to update yet!");
    return;
  }
  if (!Array.isArray(attribute)) {
    err && console.error("TRYING TO REMOVE ATTRIBUTES TO A NOT ARRAY!!!! PROBLEM. AttributeName: " + attributeName);
    return;
  }
  const newAttribute = [...attribute];
  newAttribute.splice(index, 1);
  itemCache[id][attributeName] = newAttribute;
}

/**
 * Removes one or more attributes from an object list attribute, using the value of the object inside the list.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {string} id The id of the object to update.
 * @param {string} itemType The type of the item to update.
 * @param {Object<string, [*]>} attributes The map of attribute names of lists to attribute values to remove from them.
 */
const removeFromAttributes = (state, id, itemType, attributes) => {
  const itemCache = getItemCache(state, itemType);
  if (!itemCache[id]) {
    err && console.error("Cannot update an item not yet in the database!");
    return;
  }
  for (const attributeName in attributes) {
    if (attributes.hasOwnProperty(attributeName)) {
      const attribute = itemCache[id][attributeName];
      const removeAttribute = attributes[attributeName];
      if (!attribute) {
        // Nothing to remove
        err && console.error("Attribute not recognized in item, cannot remove from it.");
      } else if (!Array.isArray(attribute)) {
        err && console.error("TRYING TO REMOVE ATTRIBUTES FROM A NOT ARRAY!!!! PROBLEM. AttributeName: " + attributeName);
      } else {
        itemCache[id][attributeName] = subtractedArray(attribute, removeAttribute);
      }
    }
  }
};

/**
 * Removes an object from the cache and removes the potential channel unsubscription associated.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {string} id The id of the object to remove.
 * @param {string} itemType The item type of the item to remove.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 */
const removeItem = (state, id, itemType, dispatch) => {
  // Once you remove an object, simply unsubscribe
  dispatch(removeChannelSubscription(getObjectChannelName(id)));
  const LRUHandler = getItemLRUHandler(state, itemType);
  const index = LRUHandler.indexOf(id);
  if (index !== -1) {
    LRUHandler.splice(index, 1);
  }
  delete getItemCache(state, itemType)[id];
};

/**
 * Clears a cache entirely of all objects inside of it.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {string} itemType The type of the cache to clear.
 * @param {function({})} dispatch The asynchronous dispatch function for redux.
 */
function clearCache(state, itemType, dispatch) {
  const itemCache = getItemCache(state, itemType);
  for (const id in itemCache) {
    if (itemCache.hasOwnProperty(id)) {
      removeItem(state, id, itemType, dispatch)
    }
  }
}

/**
 * Clear the entire query cache for a item type so that all queries for that type need to be re-queried.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {string} itemType The item type of the query cache to clear.
 */
function clearQueryCache(state, itemType) {
  state[getItemQueryCacheName(state, itemType)] = {};
  state[getItemQueryLRUHandlerName(state, itemType)] = [];
}

/**
 * Clears a query cache of the specific normalized query within it.
 *
 * @param {CacheReducer} state The current state of the cache reducer.
 * @param {string} itemType The type of the cache that holds the normalized query.
 * @param {string} normalizedQuery The query string of the query to clear.
 */
function clearNormalizedCache(state, itemType, normalizedQuery) {
  const queryLRUHandler = getItemQueryLRUHandler(state, itemType);
  const queryResults = getItemQueryCache(state, itemType)[normalizedQuery];
  for (const nextToken in queryResults) {
    if (queryResults.hasOwnProperty(nextToken)) {
      let index = -1;
      for (let i = 0; i < queryLRUHandler.length; i++) {
        const entry = queryLRUHandler[i];
        if (entry.normalizedQueryString === normalizedQuery && entry.nextToken === nextToken) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        queryLRUHandler.splice(index, 1);
      }
    }
  }
  delete getItemQueryCache(state, itemType)[normalizedQuery];
}

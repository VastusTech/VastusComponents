import {
  addToItemAttribute,
  fetchItem,
  forceFetchItem, getCache, removeFromItemAttribute, removeFromItemAttributeAtIndex,
  setItemAttribute, setItemAttributeIndex,
  subscribeFetchItem
} from "./cacheActions";
import {appUserItemType} from "../../../Constants";
import {CLEAR_USER, FORCE_SET_USER, SET_USER} from "../reducers/userReducer";

// =========================================================================================================
// ~ High-Level User Actions
// =========================================================================================================

/**
 * Fetches the user from the database, making sure that it hasn't already fetched the attributes in the list before.
 *
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched user with.
 * @param {function(error)} failureHandler The function to handle any potential errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function fetchUserAttributes(variableList, dataHandler, failureHandler) {
  return (dispatch, getStore) => {
    const userID = getStore().user.id;
    if (userID) {
      dispatch(fetchItem(userID, appUserItemType, variableList, dataHandler, failureHandler));
      // dispatch(fetchItem(userID, appUserItemType, variableList, (client) => {
      //     dispatch(setUser(client));
      //     dispatch(setIsNotLoading());
      //     if (dataHandler) { dataHandler(getStore().user); }
      // }));
    }
  }
}

/**
 * Fetches the user from the database, but always gets every attribute from the variables list. Used primarily for
 * updating any stale data in the object there may be.
 *
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched user with.
 * @param {function(error)} failureHandler The function to handle any potential errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function forceFetchUserAttributes(variableList, dataHandler, failureHandler) {
  return (dispatch, getStore) => {
    // Just overwrite all the user attributes because we want to process them again
    const userID = getStore().user.id;
    if (userID) {
      dispatch(forceFetchItem(userID, appUserItemType, variableList, dataHandler, failureHandler));
      // forceFetchItem(appUserItemType, userID, variableList, (user) => {
      //     dispatch(setUser(user));
      //     dispatch(setIsNotLoading());
      //     if (dataHandler) { dataHandler(getStore().user);}
      // })(dispatch, getStore);
    }
  }
}


/**
 * Fetches the user from the database and subscribes to it so that it receives all the automatic updates it receives.
 *
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched user with.
 * @param {function(error)} failureHandler The function to handle any potential errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function subscribeFetchUserAttributes(variableList, dataHandler, failureHandler) {
  return (dispatch, getStore) => {
    const userID = getStore().user.id;
    if (userID) {
      dispatch(subscribeFetchItem(userID, appUserItemType, variableList, dataHandler, failureHandler));
      // dispatch(subscribeFetchItem(userID, appUserItemType, variableList, (client) => {
      //     dispatch(setUser(client));
      //     dispatch(setIsNotLoading());
      //     if (dataHandler) { dataHandler(getStore().user); }
      // }));
    } else {
      dataHandler({});
    }
  }
}

/**
 * Sets a user attribute to a specific value manually.
 *
 * @param {string} attributeName The name of the attribute to update.
 * @param {*} attributeValue The value to set to the attribute.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function setUserAttribute(attributeName, attributeValue) {
  return (dispatch, getStore) => {
    const userID = getStore().user.id;
    if (userID) {
      dispatch(setItemAttribute(userID, attributeName, attributeValue));
      // dispatch(updateUserFromCache());
    }
  }
}

/**
 * Sets a value at an index of a list in the user attributes manually.
 *
 * @param {string} attributeName The name of the list attribute to update.
 * @param {number} index The index of the list to set to the value.
 * @param {*} attributeValue The value to set the list index to.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function setUserAttributeAtIndex(attributeName, index, attributeValue) {
  return (dispatch, getStore) => {
    const userID = getStore().user.id;
    if (userID) {
      dispatch(setItemAttributeIndex(userID, attributeName, index, attributeValue));
      // dispatch(updateUserFromCache());
    }
  }
}

/**
 * Adds a value to a list in the user manually.
 *
 * @param {string} attributeName The name of the list attribute to update.
 * @param {*} attributeValue The value to add to the item's list.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function addToUserAttribute(attributeName, attributeValue) {
  return (dispatch, getStore) => {
    const userID = getStore().user.id;
    if (userID) {
      dispatch(addToItemAttribute(userID, attributeName, attributeValue));
      // dispatch(updateUserFromCache());
    }
  }
}

/**
 * Removes a specific value from a list in the user manually.
 *
 * @param {string} attributeName The name of the list attribute to update.
 * @param {string} attributeValue The value to remove from the item's list.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function removeFromUserAttribute(attributeName, attributeValue) {
  return (dispatch, getStore) => {
    const userID = getStore().user.id;
    if (userID) {
      dispatch(removeFromItemAttribute(userID, attributeName, attributeValue));
      // dispatch(updateUserFromCache());
    }
  }
}

/**
 * Removes an index from a list in the user manually.
 *
 * @param {string} attributeName The name of the list attribute to update.
 * @param {number} index The index of the list to remove.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function removeFromUserAttributeAtIndex(attributeName, index) {
  return (dispatch, getStore) => {
    const userID = getStore().user.id;
    if (userID) {
      dispatch(removeFromItemAttributeAtIndex(userID, attributeName, index));
    }
  }
}

/**
 * Updates the user reducer using the values inside the cache corresponding to the user ID.
 *
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function updateUserFromCache() {
  return (dispatch, getStore) => {
    const userID = getStore().user.id;
    if (userID) {
      dispatch(setUser(getCache(appUserItemType, getStore)[userID]));
    }
  }
}

// =========================================================================================================
// ~ Low-Level Message Actions
// =========================================================================================================

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function forceSetUser(user) {
  return {
    type: FORCE_SET_USER,
    payload: user
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER
  }
}
import {getCacheName} from "../redux/actions/cacheActions";
import {getItemTypeFromID} from "./ItemType";

// This file helps access the cache reducer properly, getting attributes within objects with ease.

export function getClientAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "clients", cacheReducer);
}

export function getTrainerAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "trainers", cacheReducer);
}

export function getGymAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "gyms", cacheReducer);
}

export function getWorkoutAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "workouts", cacheReducer);
}

export function getReviewAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "reviews", cacheReducer);
}

export function getEventAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "events", cacheReducer);
}

export function getChallengeAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "challenges", cacheReducer);
}

export function getInviteAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "invites", cacheReducer);
}

export function getPostAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "posts", cacheReducer);
}

export function getSubmissionAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "submissions", cacheReducer);
}

export function getGroupAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "groups", cacheReducer);
}

export function getCommentAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "comments", cacheReducer);
}

export function getSponsorAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "sponsors", cacheReducer);
}

export function getStreakAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeFromCache(id, attributeName, "streaks", cacheReducer);
}

/**
 * Assumes the item type from the ID and calls {@link getObjectAttributeWithItemType}.
 *
 * @param {string} id The ID of the object.
 * @param {string} attributeName The name of the attribute to get.
 * @param {{}} cacheReducer The entire cache reducer.
 * @return {*} The attribute from the object.
 */
export function getObjectAttribute(id, attributeName, cacheReducer) {
  return getObjectAttributeWithItemType(id, getItemTypeFromID(id), attributeName, cacheReducer);
}

/**
 * Gets an object from the entire cache reducer given the item type and the name of the attribute. Also allows to
 * get the length of a list by adding "Length" to the end of an attribute. ("messagesLength").
 *
 * @param {string} id The ID of the object.
 * @param {string} itemType The item type of the object.
 * @param {string} attributeName The name of the attribute to get.
 * @param {{}} cacheReducer The entire cache reducer.
 * @return {*} The attribute or the length of the attribute list.
 */
export function getObjectAttributeWithItemType(id, itemType, attributeName, cacheReducer) {
  if (itemType) {
    return getObjectAttributeFromCache(id, attributeName, getCacheName(itemType), cacheReducer);
  }
  return null;
}

/**
 * Gets an object attribute from an object within the cache.
 *
 * @param {string} id The id of the object to get.
 * @param {string} attributeName The name of the attribute within the object to get.
 * @param {string} subCacheName The sub-cache within the cache that holds the object's item type.
 * @param {{}} cacheReducer The current cache reducer within redux.
 * @return {string|number} Either the attribute or the length of the array attribute
 */
function getObjectAttributeFromCache(id, attributeName, subCacheName, cacheReducer) {
  if (id && attributeName && cacheReducer && subCacheName) {
    const object = cacheReducer[subCacheName][id];
    if (object) {
      return getAttributeFromObject(object, attributeName);
    }
    // else {
    //     err&&console.error("Object (id: " + id + ") not fetched yet!!");
    // }
  }
  // else {
  //     err&&console.error("No cache from Redux received!!!!");
  // }
  return null;
}

/**
 * Gets an object from the cache using the ID.
 *
 * @param {string} id The id of the object to get.
 * @param {{}} cacheReducer The current cache reducer for redux.
 * @return {{}} The object from the cache.
 */
export function getObjectFromCache(id, cacheReducer) {
  if (id && cacheReducer) {
    return cacheReducer[getCacheName(getItemTypeFromID(id))][id];
  }
  return null;
}

/**
 * Gets an attribute from an object, using my "Length" trick to get lengths of arrays. No checking for a real object here.
 *
 * @param {{}} object The object from the database in the redux cache.
 * @param {string} attributeName The name of the attribute in the object to retrieve.
 * @return {string|number} Either the attribute or the length of the array attribute
 */
export function getAttributeFromObject(object, attributeName) {
  if (object && attributeName) {
    if (attributeName.substr(attributeName.length - 6) === "Length") {
      attributeName = attributeName.substr(0, attributeName.length - 6);
      if (object[attributeName] && object[attributeName].length) {
        return object[attributeName].length;
      } else {
        return 0;
      }
    }
    return object[attributeName];
  }
  return null;
}

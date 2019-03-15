import {err} from "../../Constants";
import {getCacheName} from "../redux_actions/cacheActions";
import {getItemTypeFromID} from "./ItemType";
/**
 * This helps access the redux actions properly, like getting cache object attributes
 */
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
export function getObjectAttribute(id, attributeName, cacheReducer) {
    return getObjectAttributeWithItemType(id, getItemTypeFromID(id), attributeName, cacheReducer);
}
export function getObjectAttributeWithItemType(id, itemType, attributeName, cacheReducer) {
    return getObjectAttributeFromCache(id, attributeName, getCacheName(itemType), cacheReducer);
}
function getObjectAttributeFromCache(id, attributeName, subCacheName, cacheReducer) {
    if (cacheReducer) {
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
 * Gets an attribute from an object, using my "Length" trick to get lengths of arrays. No checking for a real object here.
 *
 * @param object The object from the database in the redux cache.
 * @param attributeName The name of the attribute in the object to retrieve.
 * @return {*} Either the attribute or the length of the array attribute
 */
function getAttributeFromObject(object, attributeName) {
    if (object) {
        if (attributeName.substr(attributeName.length - 6) === "Length") {
            attributeName = attributeName.substr(0, attributeName.length - 6);
            if (object[attributeName] && object[attributeName].length) {
                return object[attributeName].length;
            }
            else {
                return 0;
            }
        }
        return object[attributeName];
    }
    return null;
}

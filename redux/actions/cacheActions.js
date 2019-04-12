import { setIsNotLoading, setError, setIsLoading } from "./infoActions";
import { addHandlerAndUnsubscription } from "./ablyActions";
import QL from "../../api/GraphQL";
import S3 from "../../api/S3Storage";
import defaultProfilePicture from "../../img/roundProfile.png";
import notFoundPicture from "../../img/not_found.png";
import {getItemTypeFromID, switchReturnItemType} from "../../logic/ItemType";
import {
    getObjectChannelName,
    FETCH_CLIENT, FETCH_TRAINER, FETCH_GYM, FETCH_WORKOUT, FETCH_REVIEW, FETCH_EVENT, FETCH_CHALLENGE, FETCH_INVITE,
    FETCH_POST, FETCH_SUBMISSION, FETCH_GROUP, FETCH_COMMENT, FETCH_SPONSOR, FETCH_STREAK, FETCH_CLIENT_QUERY,
    FETCH_TRAINER_QUERY, FETCH_GYM_QUERY, FETCH_WORKOUT_QUERY, FETCH_REVIEW_QUERY, FETCH_EVENT_QUERY,
    FETCH_CHALLENGE_QUERY, FETCH_INVITE_QUERY, FETCH_POST_QUERY, FETCH_SUBMISSION_QUERY, FETCH_GROUP_QUERY,
    FETCH_COMMENT_QUERY, FETCH_SPONSOR_QUERY, FETCH_STREAK_QUERY, SET_CLIENT_ATTRIBUTE_INDEX, SET_TRAINER_ATTRIBUTE_INDEX,
    SET_GYM_ATTRIBUTE_INDEX, SET_WORKOUT_ATTRIBUTE_INDEX, SET_REVIEW_ATTRIBUTE_INDEX, SET_EVENT_ATTRIBUTE_INDEX,
    SET_CHALLENGE_ATTRIBUTE_INDEX, SET_INVITE_ATTRIBUTE_INDEX, SET_POST_ATTRIBUTE_INDEX, SET_SUBMISSION_ATTRIBUTE_INDEX,
    SET_STREAK_ATTRIBUTE_INDEX, SET_SPONSOR_ATTRIBUTE_INDEX, SET_GROUP_ATTRIBUTE_INDEX, SET_COMMENT_ATTRIBUTE_INDEX,
    ADD_CLIENT_ATTRIBUTES, ADD_TRAINER_ATTRIBUTES, ADD_GYM_ATTRIBUTES, ADD_INVITE_ATTRIBUTES, ADD_CHALLENGE_ATTRIBUTES,
    ADD_EVENT_ATTRIBUTES, ADD_REVIEW_ATTRIBUTES, ADD_WORKOUT_ATTRIBUTES, ADD_POST_ATTRIBUTES, ADD_SUBMISSION_ATTRIBUTES,
    ADD_GROUP_ATTRIBUTES, ADD_COMMENT_ATTRIBUTES, ADD_SPONSOR_ATTRIBUTES, ADD_STREAK_ATTRIBUTES, REMOVE_CLIENT_ATTRIBUTES,
    REMOVE_TRAINER_ATTRIBUTES, REMOVE_GYM_ATTRIBUTES, REMOVE_INVITE_ATTRIBUTES, REMOVE_CHALLENGE_ATTRIBUTES,
    REMOVE_EVENT_ATTRIBUTES, REMOVE_REVIEW_ATTRIBUTES, REMOVE_WORKOUT_ATTRIBUTES, REMOVE_POST_ATTRIBUTES,
    REMOVE_SUBMISSION_ATTRIBUTES, REMOVE_GROUP_ATTRIBUTES, REMOVE_COMMENT_ATTRIBUTES, REMOVE_SPONSOR_ATTRIBUTES,
    REMOVE_STREAK_ATTRIBUTES, REMOVE_CLIENT_ATTRIBUTE_INDEX, REMOVE_TRAINER_ATTRIBUTE_INDEX, REMOVE_EVENT_ATTRIBUTE_INDEX,
    REMOVE_REVIEW_ATTRIBUTE_INDEX, REMOVE_WORKOUT_ATTRIBUTE_INDEX, REMOVE_GYM_ATTRIBUTE_INDEX,
    REMOVE_CHALLENGE_ATTRIBUTE_INDEX, REMOVE_INVITE_ATTRIBUTE_INDEX, REMOVE_POST_ATTRIBUTE_INDEX,
    REMOVE_SUBMISSION_ATTRIBUTE_INDEX, REMOVE_STREAK_ATTRIBUTE_INDEX, REMOVE_SPONSOR_ATTRIBUTE_INDEX,
    REMOVE_COMMENT_ATTRIBUTE_INDEX, REMOVE_GROUP_ATTRIBUTE_INDEX, REMOVE_CLIENT, REMOVE_TRAINER, REMOVE_GYM,
    REMOVE_WORKOUT, REMOVE_REVIEW, REMOVE_EVENT, REMOVE_STREAK, REMOVE_SPONSOR, REMOVE_COMMENT,
    REMOVE_GROUP, REMOVE_SUBMISSION, REMOVE_POST, REMOVE_INVITE, REMOVE_CHALLENGE
} from "../reducers/cacheReducer";
import {err, log} from "../../../Constants";
import {addMessageFromNotification} from "./messageActions";
import {updateUserFromCache} from "./userActions";

// ======================================================================================================
// Fetching S3 Data ~
// ======================================================================================================

// TODO =================================================================================================
// TODO =                         USE THE HAS_KEY METHOD IN S3 FETCHES                                  =
// TODO =================================================================================================

/**
 * Adds any S3 images to the collected data. The S3 images are specified by ending in either "Path" or "Paths" for a
 * single picture and an array of pictures respectively. The new images will be put into the same key but minus the
 * "Path". (Ex. "profileImagePath" -> "profileImage"). "Paths" the "s" just gets put onto the end. I don't give a flying
 * fuck if that makes it an incorrect spelling, that's how I'm doing it.
 * (Ex. "profileImageWigglyPaths" -> "profileImageWigglys")
 *
 * @param {{}} data The data of the object to add S3 images/videos into.
 * @param {function({})} callback The callback for the newly updated data.
 */
function addS3MediaToData(data, callback) {
    function addDefaultImage(mediaKey, data) {
        if (mediaKey === "profileImage" || mediaKey === "profileImages") {
            data[mediaKey] = defaultProfilePicture;
        }
        else {
            data[mediaKey] = [notFoundPicture];
        }
    }
    let asyncWaiting = 0;
    let asyncReturned = 0;
    let isWaiting = false;
    // This will be if any async function finishes and has properly updated the object
    const finishUpdatingObject = () => {
        asyncReturned++;
        if (asyncReturned >= asyncWaiting && isWaiting) {
            callback(data);
        }
    };
    // Define an arrow function for getting a single URL from a path and adding it to the object
    const getSingleMedia = (path, mediaKey) => {
        if (path) {
            // Get from S3 and add a waiting
            S3.get(path, (url) => {
                data[mediaKey] = url;
                finishUpdatingObject();
            }, (error) => {
                addDefaultImage(mediaKey, data);
                finishUpdatingObject();
            });
        } else {
            // No image
            addDefaultImage(mediaKey, data);
        }
    };
    // Define an arrow function for getting multiple URLs from a path and adding it to the object's array
    const getMultipleMedia = (paths, mediaKey) => {
        if (paths && paths.length) {
            data[mediaKey] = [];
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                S3.get(path, (url) => {
                    data[mediaKey][i] = url;
                    // data[mediaKey].push(url);
                    finishUpdatingObject();
                }, (error) => {
                    // Just don't put it in if it fails
                    finishUpdatingObject();
                });
            }
        }
        else {
            // Empty list of urls
            data[mediaKey] = [];
        }
    };
    // First set the async waiting
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const keyLen = key.length;
            // This is 0 or a single Media grab
            if (key.substr(keyLen - 4, 4) === "Path") {
                // Get the media
                if (data[key]) {
                    asyncWaiting++;
                }
            }
            // This is 0 or more media grabs
            else if (key.substr(keyLen - 5, 5) === "Paths") {
                // Get the multiple media
                if (data[key] && data[key].length > 0) {
                    asyncWaiting += data[key].length;
                    // TODO Sort it with something other than by string sort?
                    data[key].sort();
                }
            }
        }
    }
    // Then start the getting process
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const keyLen = key.length;
            // This is 0 or a single Media grab
            if (key.substr(keyLen - 4, 4) === "Path") {
                // Get the media
                getSingleMedia(data[key], key.substr(0, keyLen - 4));
            }
            // This is 0 or more media grabs
            else if (key.substr(keyLen - 5, 5) === "Paths") {
                // Get the multiple media
                getMultipleMedia(data[key], key.substr(0, keyLen - 5) + "s");
            }
        }
    }
    // Check to see if async was super fast
    if (asyncWaiting <= asyncReturned) {
        callback(data);
    }
    else {
        // Else we let the async callbacks handle it
        isWaiting = true;
    }
}

// ======================================================================================================
// Single-Fetch Low-Level Functions ~
// ======================================================================================================

/**
 * Fetches an object from the database, making sure that it hasn't already fetched the attributes in the list before.
 *
 * @param {string} id The id of the object to fetch.
 * @param {string} itemType The item type of the object to fetch.
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched object with.
 * @param {function(error)} failureHandler The function to handle any errors that occur with.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
function fetch(id, itemType, variableList, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        const cacheName = getCacheName(itemType);
        const currentObject = getStore().cache[cacheName][id];
        if (currentObject) {
            const objectKeyList = Object.keys(currentObject);
            variableList = variableList.filter((v) => { return !objectKeyList.includes(v) });
            // log&&console.log("Final filtered list is = " + JSON.stringify(variableList));
        }
        overwriteFetch(id, itemType, variableList, dataHandler, failureHandler, dispatch, getStore);
    };
}

/**
 * Fetches an object from the database, but always gets every attribute from the variables list. Used primarily for
 * updating any stale data in the object there may be.
 *
 * @param {string} id The id of the object to fetch.
 * @param {string} itemType The item type of the object to fetch.
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched object with.
 * @param {function(error)} failureHandler The function to handle any errors that occur with.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
function forceFetch(id, itemType, variableList, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        overwriteFetch(id, itemType, variableList, dataHandler, failureHandler, dispatch, getStore);
    };
}

/**
 * Fetches an object from the database and subscribes to it so that it receives all the automatic updates it receives.
 *
 * @param {string} id The id of the object to fetch.
 * @param {string} itemType The item type of the object to fetch.
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched object with.
 * @param {function(error)} failureHandler The function to handle any errors that occur with.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
function subscribeFetch(id, itemType, variableList, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        // If we are doing a special subscribe fetch, then we must first check to see if
        const item = getStore().cache[getCacheName(itemType)][id];
        if (!item || item.__stale__ !== false) {
            // Then it is stale
            // Subscribe (potentially again?)
            dispatch(subscribeCacheUpdatesToObject(id, itemType));
            // Update the stale value for the object to false
            dispatch(putItem({id, __stale__: false}, itemType));
            // Then we force fetch everything!
            dispatch(forceFetch(id, itemType, variableList, dataHandler, failureHandler));
        }
        else {
            // Then it is not stale, and we need not subscribe again
            dispatch(fetch(id, itemType, variableList, dataHandler, failureHandler));
        }
    };
}

/**
 * Subscribes to the update channel in Ably for this object and adds handlers so that it will update in real time in
 * accordance to the changes.
 *
 * @param {string} id The id of the object to subscribe to.
 * @param {string} itemType The item type of the object to subscribe to.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
function subscribeCacheUpdatesToObject(id, itemType) {
    return (dispatch, getStore) => {
        dispatch(addHandlerAndUnsubscription(getObjectChannelName(id), (message) => {
            const payload = message.data;
            const createJSON = payload.CREATE;
            const setJSON = payload.SET;
            const addJSON = payload.ADD;
            const removeJSON = payload.REMOVE;
            const ifDelete = payload.DELETE;
            if (ifDelete) {
                // If we delete, then we're done, nothing else to do! This also handles unsubscribing!
                dispatch(removeItem(itemType, id, dispatch));
            }
            else {
                if (createJSON) {
                    // This is any object that was created and added, put it into the cache
                    if (createJSON.id && createJSON.item_type) {
                        if (createJSON.item_type === "Message") {
                            if (getStore().message.boardIfSubscribed[createJSON.board] !== true) {
                                // alert("Adding message to board: " + createJSON.board + ", with message: " + JSON.stringify(createJSON));
                                dispatch(addMessageFromNotification(createJSON.board, createJSON));
                            }
                        }
                        else {
                            // dispatch(getPutItemFunction(createJSON.item_type)(createJSON, dispatch));
                            dispatch(putItem(createJSON, createJSON.item_type));
                        }
                    }
                }
                if (setJSON) {
                    // You simply put the item into the cache (overwriting existing attributes)
                    setJSON.id = id;
                    // dispatch(getPutItemFunction(itemType)(setJSON));
                    dispatch(putItem(setJSON, itemType));
                }
                if (addJSON) {
                    // Adds the attributes to the object, which should already be in there!
                    dispatch(addItemAttributes(itemType, id, addJSON));
                }
                if (removeJSON) {
                    // Removes the attributes from the object, which should already be in there!
                    dispatch(removeItemAttributes(itemType, id, removeJSON));
                }
            }
        }, (asyncDispatch) => {
            // When the object is automatically unsubscribed, just add on the __stale__ variable
            asyncDispatch(putItem({id, __stale__: true}, itemType, dispatch));
        }));
    };
}

/**
 * Fetches an object from the database, overwriting any changes already in the database with the data it receives.
 *
 * @param {string} id The id of the object to fetch.
 * @param {string} itemType The item type of the object to fetch.
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched object with.
 * @param {function(error)} failureHandler The function to handle any errors that occur with.
 * @param {function(*)} dispatch The dispatch handler function to call a new redux action with.
 * @param {function()} getStore The get function for redux that receives the current store.
 */
function overwriteFetch(id, itemType, variableList, dataHandler, failureHandler, dispatch, getStore) {
    if (variableList.length > 0) {
        if (!variableList.includes("id")) {
            variableList = [...variableList, "id"];
        }
        if (!variableList.includes("item_type")) {
            variableList = [...variableList, "item_type"];
        }
        if (dataHandler) { log&&console.log("S H = " + dataHandler.toString()); }
        else { log&&console.log("No data handler...");}
        if (failureHandler) { log&&console.log("F H = " + failureHandler.toString()); }
        else { log&&console.log("No failure handler...");}
        QL.getItem(itemType, id, variableList, (data) => {
            // log&&console.log("Successfully retrieved the QL info");
            if (data) {
                addS3MediaToData(data, (updatedData) => {
                    // TODO __stale__
                    dispatch(putItem(updatedData, itemType));
                    if (getStore().user.id === id) { dispatch(updateUserFromCache()); }
                    dispatch(setIsNotLoading());
                    if (dataHandler) {
                        dataHandler(getCache(itemType, getStore)[id]);
                    }
                });
            } else {
                // TODO If it came up with nothing, put null into the cache so that we can do a === null check as well
                // Then the fetch came up with nothing!
                // const error = Error("Couldn't find an object in the database with ID = " + id);
                log&&console.log("Couldn't find ID = " + id + " for item type = " + itemType);
                dispatch(setIsNotLoading());
                if (dataHandler) {
                    log&&console.log("D H " + dataHandler.toString());
                    dataHandler(null);
                }
            }
        }, (error) => {
            err&&console.error("Error in retrieval");
            err&&console.error(error);
            dispatch(setError(error));
            dispatch(setIsNotLoading());
            if (failureHandler) {
                log&&console.log("F H " + failureHandler.toString());
                failureHandler(error);
            }
        });
    }
    else {
        dispatch(putItem({id}, itemType));
        dispatch(setIsNotLoading());
        if (dataHandler) { dataHandler(getCache(itemType, getStore)[id]); }
    }
}

// ======================================================================================================
// Batch-Fetch Low-Level Functions ~
// ======================================================================================================

/**
 * Fetches a list of items from the database that all have the same item type. This also makes sure that we are not
 * fetching more than we have to by checking all of the items already in the database.
 *
 * @param {[string]} ids The list of ids to fetch from the database.
 * @param {string} itemType The item type of the objects to fetch.
 * @param {[string]} variableList The list of variables to fetch for the objects.
 * @param {number} startIndex The index to start with in the list of ids. (Kinda like a next token).
 * @param {number} maxFetch The max number of items to fetch from the database.
 * @param {function([{}])} dataHandler The function to handle the list of objects that are received.
 * @param {function(error)} failureHandler The function to handle any errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
function batchFetch(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        let filteredVariablesList = [];
        const filterFunction = (objectKeyList) => (v) => (objectKeyList.includes(v) || filteredVariablesList.includes(v));
        for (let i = startIndex; i < Math.min(ids.length, startIndex + maxFetch); i++) {
            const id = ids[i];
            const cacheSet = getCache(itemType, getStore);
            const currentObject = cacheSet[id];
            if (currentObject) {
                // TODO TEST IF THIS works?
                filteredVariablesList = variableList.filter(filterFunction(Object.keys(currentObject)));
                // variableList = variableList.filter((v) => { return !objectKeyList.includes(v) });
            }
            else {
                filteredVariablesList = variableList;
                break;
            }
        }
        batchOverwriteFetch(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler, dispatch, getStore);
    };
}

/**
 * Fetches a list of items from the database that all have the same item type. This does no checking for the variables
 * to receive, so will overwrite all data. This is primarily for updating an item.
 *
 * @param {[string]} ids The list of ids to fetch from the database.
 * @param {string} itemType The item type of the objects to fetch.
 * @param {[string]} variableList The list of variables to fetch for the objects.
 * @param {number} startIndex The index to start with in the list of ids. (Kinda like a next token).
 * @param {number} maxFetch The max number of items to fetch from the database.
 * @param {function([{}])} dataHandler The function to handle the list of objects that are received.
 * @param {function(error)} failureHandler The function to handle any errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
function batchForceFetch(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        batchOverwriteFetch(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler, dispatch, getStore);
    };
}

/**
 * Fetches a list of items from the database that all have the same item type. Overwrites any objects in the database.
 *
 * @param {[string]} ids The list of ids to fetch from the database.
 * @param {string} itemType The item type of the objects to fetch.
 * @param {[string]} variableList The list of variables to fetch for the objects.
 * @param {number} startIndex The index to start with in the list of ids. (Kinda like a next token).
 * @param {number} maxFetch The max number of items to fetch from the database.
 * @param {function([{}])} dataHandler The function to handle the list of objects that are received.
 * @param {function(error)} failureHandler The function to handle any errors that may occur.
 * @param {function(*)} dispatch The dispatch handler function to call a new redux action with.
 * @param {function()} getStore The get function for redux that receives the current store.
 */
function batchOverwriteFetch(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler, dispatch, getStore) {
    if (variableList.length > 0) {
        // TODO Check the start index?
        if (!variableList.includes("id")) {
            variableList = [...variableList, "id"];
        }
        if (!variableList.includes("item_type")) {
            variableList = [...variableList, "item_type"];
        }
        const retrievedItems = [];
        let numFetched = 0;
        // You have a number of ids to fetch
        const fetchIDs = ids.slice(startIndex, Math.min(startIndex + maxFetch, ids.length));
        let totalFetch = fetchIDs.length;
        let firstFetchIDs = [...fetchIDs];
        let restFetchIDs = [];
        // Don't send a request for anything that will definitely be sent back
        if (firstFetchIDs.length > QL.batchLimit) {
            restFetchIDs = firstFetchIDs.slice(QL.batchLimit);
            firstFetchIDs = firstFetchIDs.slice(0, QL.batchLimit);
        }
        const finishProcessItem = (item) => {
            dispatch(putItem(item, itemType));
            retrievedItems.push(getStore().cache[getCacheName(itemType)][item.id]);
            numFetched++;
            if (numFetched >= totalFetch) {
                dispatch(setIsNotLoading());
                if (dataHandler) {dataHandler(retrievedItems);}
            }
        };
        const batchGetFailHandler = (error) => {
            err&&console.error("Error in retrieval");
            dispatch(setError(error));
            dispatch(setIsNotLoading());
            if (failureHandler) { failureHandler(error);}
        };
        const batchGetDataHandler = (data, restFetch) => {
            if (data.hasOwnProperty("unretrievedItems") && data.unretrievedItems && data.unretrievedItems.length > 0) {
                // TODO Try to fetch again? Or just drop them?
                for (let i = 0; i < data.unretrievedItems.length; i++) {
                    totalFetch--;
                    if (numFetched >= totalFetch) {
                        dispatch(setIsNotLoading());
                        if (dataHandler) {
                            dataHandler(retrievedItems);
                        }
                    }
                }
            }
            if (restFetch && restFetch.length > 0) {
                let fetch = restFetch;
                if (fetch.length > QL.batchLimit) {
                    fetch = restFetch.slice(0, QL.batchLimit);
                    restFetch = restFetch.slice(QL.batchLimit);
                }
                QL.getItems(itemType, fetch, variableList, (data) => batchGetDataHandler(data, restFetch), batchGetFailHandler);
            }
            if (data.hasOwnProperty("items") && data.items && data.items.length) {
                for (let i = 0; i < data.items.length; i++) {
                    if (data.items[i]) {
                        addS3MediaToData(data.items[i], finishProcessItem);
                    }
                    else {
                        totalFetch--;
                        if (numFetched >= totalFetch) {
                            dispatch(setIsNotLoading());
                            if (dataHandler) {
                                dataHandler(retrievedItems);
                            }
                        }
                    }
                }
            }
        };
        QL.getItems(itemType, firstFetchIDs, variableList, (data) => batchGetDataHandler(data, restFetchIDs), batchGetFailHandler);
    }
    else {
        const items = [];
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            dispatch(putItem({id}, itemType));
            items.push(getStore().cache[getCacheName(itemType)][id]);
        }
        dispatch(setIsNotLoading());
        if (dataHandler) { dataHandler(items);}
    }
}

// ======================================================================================================
// Query-Fetch Low-Level Functions ~
// ======================================================================================================

/**
 * Fetches a new query from the database, using the parameters to specify the exact query. Allows flexibility for
 * how to filter, the limit of items to fetch, and which next token to use.
 *
 * @param {string} itemType The item types of the items to receive in the query.
 * @param {[string]} variableList The list of variables to fetch for the objects.
 * @param {{}} filter The {@link QL} filter to dictate how the query filters the objects.
 * @param {number} limit The limit of items for the query to SEARCH. Items length <= limit.
 * @param {string} nextToken The next token string that dictates which part of the query to fetch.
 * @param {function({nextToken: string, items: [{}]})} dataHandler The function to handle the fetched items.
 * @param {function(error)} failureHandler The function to handle any potential errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function fetchQuery(itemType, variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        if (!variableList.includes("id")) {
            variableList.push("id");
        }
        if (!variableList.includes("item_type")) {
            variableList.push("item_type");
        }
        // TODO Make this sort alphabetically, so that it's deterministic
        // variableList = variableList.sort();
        // const fetchQueryDispatchType = getFetchQueryType(itemType);
        let queryString = QL.constructItemQuery(itemType, variableList, filter, limit, nextToken);
        // let queryString = QL.getConstructQueryFunction(itemType)(variableList, filter, limit, nextToken);
        const nextTokenString = QL.getNextTokenString(nextToken);
        const normalizedQueryString = JSON.stringify(QL.getNormalizedQuery(queryString));
        // if (nextTokenString === "null") { console.log("N Q S = " + JSON.stringify(normalizedQueryString))}
        let queryCache = getQueryCache(itemType, getStore);
        // if (nextTokenString === "null") { console.log(itemType + " Cache = " + JSON.stringify(Object.keys(getStore().cache))); }
        // if (nextTokenString === "null") { console.log("THE Post Query cache = " + JSON.stringify(getStore().cache.postQueries)); }
        // if (nextTokenString === "null") { console.log(itemType + " Query cache = " + JSON.stringify(queryCache)); }
        let queryResult = queryCache[normalizedQueryString];
        // if (nextTokenString === "null") { console.log("Normalized query cache = " + JSON.stringify(queryResult)); }
        if (queryResult) {
            queryResult = queryResult[nextTokenString];
            // if (nextTokenString === "null") { console.log("GOt! Query Result = " + JSON.stringify(queryResult))}
        }
        if (queryResult) {
            dispatch({
                type: getFetchQueryType(itemType),
                payload: {
                    normalizedQueryString,
                    nextToken: nextTokenString,
                    queryResult
                }
            });
            dataHandler(QL.getQueryResultFromCompressed(queryResult, getCache(itemType, getStore)));
        }
        else {
            overwriteFetchQuery(itemType, queryString, nextToken, dataHandler, failureHandler, dispatch);
        }
    };
}

/**
 * Fetches a new query from the database, using the parameters to specify the exact query. Allows flexibility for
 * how to filter, the limit of items to fetch, and which next token to use. Does not check the cache for the query
 * already fetched.
 *
 * @param {string} itemType The item types of the items to receive in the query.
 * @param {[string]} variableList The list of variables to fetch for the objects.
 * @param {{}} filter The {@link QL} filter to dictate how the query filters the objects.
 * @param {number} limit The limit of items for the query to SEARCH. Items length <= limit.
 * @param {string} nextToken The next token string that dictates which part of the query to fetch.
 * @param {function({nextToken: string, items: [{}]})} dataHandler The function to handle the fetched items.
 * @param {function(error)} failureHandler The function to handle any potential errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function forceFetchQuery(itemType, variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return (dispatch) => {
        dispatch(setIsLoading());
        if (!variableList.includes("id")) {
            variableList.push("id");
        }
        if (!variableList.includes("item_type")) {
            variableList.push("item_type");
        }

        // TODO Make this sort alphabetically, so that it's deterministic
        // variableList = variableList.sort();

        // let queryString = QL.getConstructQueryFunction(itemType)(variableList, filter, limit, nextToken);
        let queryString = QL.constructItemQuery(itemType, variableList, filter, limit, nextToken);
        // const queryString = QL[QLFunctionName](variableList, filter, limit, nextToken);
        overwriteFetchQuery(itemType, queryString, nextToken, dataHandler, failureHandler, dispatch);
    };
}

/**
 * Fetches a new query from the database, using the parameters to specify the exact query. Allows flexibility for
 * how to filter, the limit of items to fetch, and which next token to use. Overwrites any query data already in the
 * cache.
 *
 * @param {string} itemType The item types of the items to receive in the query.
 * @param {string} queryString The normalized query string for this specific query.
 * @param {string} nextToken The next token string that dictates which part of the query to fetch.
 * @param {function({nextToken: string, items: [{}]})} dataHandler The function to handle the fetched items.
 * @param {function(error)} failureHandler The function to handle any potential errors that may occur.
 * @param dispatch
 */
export function overwriteFetchQuery(itemType, queryString, nextToken, dataHandler, failureHandler, dispatch) {
    QL.queryItems(itemType, queryString, (data) => {
        if (data && data.items && data.items.length) {
            for (let i = 0; i < data.items.length; i++) {
                // TODO Handle the profile image path retrieval
                const item = data.items[i];
                const id = item.id;
                addS3MediaToData(item, (updatedData) => {
                    dispatch({
                        type: getFetchType(itemType),
                        payload: {
                            object: {
                                id,
                                data: updatedData
                            },
                            dispatch
                        }
                    });
                });
            }
        }
        dispatch({
            type: getFetchQueryType(itemType),
            payload: {
                normalizedQueryString: JSON.stringify(QL.getNormalizedQuery(queryString)),
                nextToken: QL.getNextTokenString(nextToken),
                queryResult: QL.getCompressedFromQueryResult(data)
            }
        });
        if (dataHandler) { dataHandler(data);}
    }, (error) => {
        err&&console.error("Error in QUERY retrieval. ItemType = " + itemType + ", query string = " + JSON.stringify(queryString));
        err&&console.error(JSON.stringify(error));
        dispatch(setError(error));
        dispatch(setIsNotLoading());
        if (failureHandler) { failureHandler(error);}
    });
}

// ======================================================================================================
// Update Database Item High-Level Functions ~
// ======================================================================================================

/**
 * Sets an item attribute in the cache to a specific value manually.
 *
 * @param {string} id The id of the object to update.
 * @param {string} attributeName The name of the attribute to update.
 * @param {*} attributeValue The value to set to the attribute.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function setItemAttribute(id, attributeName, attributeValue) {
    return (dispatch, getStore) => {
        dispatch(putItem({id, [attributeName]: attributeValue}, getItemTypeFromID(id)));
        if (id === getStore().user.id) {
            dispatch(updateUserFromCache());
        }
    }
}

/**
 * Sets a value at an index of an item's list attribute manually.
 *
 * @param {string} id The id of the object to update.
 * @param {string} attributeName The name of the list attribute to update.
 * @param {number} index The index of the list to set to the value.
 * @param {*} attributeValue The value to set the list index to.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function setItemAttributeIndex(id, attributeName, index, attributeValue) {
    return (dispatch, getStore) => {
        dispatch(setItemAttributeAtIndex(getItemTypeFromID(id), id, attributeName, index, attributeValue));
        if (id === getStore().user.id) {
            dispatch(updateUserFromCache());
        }
    };
}

/**
 * Adds a value to a list in an item manually.
 *
 * @param {string} id The id of the object to update.
 * @param {string} attributeName The name of the list attribute to update.
 * @param {*} attributeValue The value to add to the item's list.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function addToItemAttribute(id, attributeName, attributeValue) {
    return (dispatch, getStore) => {
        if (attributeValue.length) {
            dispatch(addItemAttributes(getItemTypeFromID(id), id, {
                [attributeName]: attributeValue
            }));
            if (id === getStore().user.id) {
                dispatch(updateUserFromCache());
            }
        }
        else {
            err&&console.error("Attribute value must be an array to add to item attribute");
        }
    }
}

/**
 * Removes a specific value from an item's list manually.
 *
 * @param {string} id The id of the object to update.
 * @param {string} attributeName The name of the list attribute to update.
 * @param {string} attributeValue The value to remove from the item's list.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function removeFromItemAttribute(id, attributeName, attributeValue) {
    return (dispatch, getStore) => {
        if (attributeValue.length) {
            dispatch(removeItemAttributes(getItemTypeFromID(id), id, {
                [attributeName]: attributeValue
            }));
            if (id === getStore().user.id) {
                dispatch(updateUserFromCache());
            }
        }
        else {
            err&&console.error("Attribute value must be an array to remove from item attribute");
        }
    }
}

/**
 * Removes an index from an item's list manually.
 *
 * @param {string} id The id of the object to update.
 * @param {string} attributeName The name of the list attribute to update.
 * @param {number} index The index of the list to remove.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function removeFromItemAttributeAtIndex(id, attributeName, index) {
    return (dispatch, getStore) => {
        dispatch(removeItemAttributeIndex(getItemTypeFromID(id), id, attributeName, index));
        if (id === getStore().user.id) {
            dispatch(updateUserFromCache());
        }
    }
}

// ======================================================================================================
// Fetch Database Item High-Level Functions ~
// ======================================================================================================

/**
 * Fetches an object from the database, making sure that it hasn't already fetched the attributes in the list before.
 *
 * @param {string} id The id of the object to fetch.
 * @param {string} itemType The item type of the object to fetch.
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched object with.
 * @param {function(error)} failureHandler The function to handle any errors that occur with.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function fetchItem(id, itemType, variableList, dataHandler, failureHandler) {
    return fetch(id, itemType, variableList, dataHandler, failureHandler)
}

/**
 * Fetches an object from the database, but always gets every attribute from the variables list. Used primarily for
 * updating any stale data in the object there may be.
 *
 * @param {string} id The id of the object to fetch.
 * @param {string} itemType The item type of the object to fetch.
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched object with.
 * @param {function(error)} failureHandler The function to handle any errors that occur with.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function forceFetchItem(id, itemType, variableList, dataHandler, failureHandler) {
    return forceFetch(id, itemType, variableList, dataHandler, failureHandler);
}

/**
 * Fetches an object from the database and subscribes to it so that it receives all the automatic updates it receives.
 *
 * @param {string} id The id of the object to fetch.
 * @param {string} itemType The item type of the object to fetch.
 * @param {[string]} variableList The list of variables to fetch for the object.
 * @param {function({})} dataHandler The function to handle the newly fetched object with.
 * @param {function(error)} failureHandler The function to handle any errors that occur with.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function subscribeFetchItem(id, itemType, variableList, dataHandler, failureHandler) {
    return subscribeFetch(id, itemType, variableList, dataHandler, failureHandler);
}

/**
 * Fetches a list of items from the database that all have the same item type. This also makes sure that we are not
 * fetching more than we have to by checking all of the items already in the database.
 *
 * @param {[string]} ids The list of ids to fetch from the database.
 * @param {string} itemType The item type of the objects to fetch.
 * @param {[string]} variableList The list of variables to fetch for the objects.
 * @param {number} startIndex The index to start with in the list of ids. (Kinda like a next token).
 * @param {number} maxFetch The max number of items to fetch from the database.
 * @param {function([{}])} dataHandler The function to handle the list of objects that are received.
 * @param {function(error)} failureHandler The function to handle any errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function fetchItems(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return batchFetch(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler);
}

/**
 * Fetches a list of items from the database that all have the same item type. This does no checking for the variables
 * to receive, so will overwrite all data. This is primarily for updating an item.
 *
 * @param {[string]} ids The list of ids to fetch from the database.
 * @param {string} itemType The item type of the objects to fetch.
 * @param {[string]} variableList The list of variables to fetch for the objects.
 * @param {number} startIndex The index to start with in the list of ids. (Kinda like a next token).
 * @param {number} maxFetch The max number of items to fetch from the database.
 * @param {function([{}])} dataHandler The function to handle the list of objects that are received.
 * @param {function(error)} failureHandler The function to handle any errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function forceFetchItems(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return batchForceFetch(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler);
}

/**
 * Fetches a new query from the database, using the parameters to specify the exact query. Allows flexibility for
 * how to filter, the limit of items to fetch, and which next token to use.
 *
 * @param {string} itemType The item types of the items to receive in the query.
 * @param {[string]} variableList The list of variables to fetch for the objects.
 * @param {{}} filter The {@link QL} filter to dictate how the query filters the objects.
 * @param {number} limit The limit of items for the query to SEARCH. Items length <= limit.
 * @param {string} nextToken The next token string that dictates which part of the query to fetch.
 * @param {function({nextToken: string, items: [{}]})} dataHandler The function to handle the fetched items.
 * @param {function(error)} failureHandler The function to handle any potential errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function fetchItemQuery(itemType, variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery(itemType, variableList, filter, limit, nextToken, dataHandler, failureHandler);
}

/**
 * Fetches a new query from the database, using the parameters to specify the exact query. Allows flexibility for
 * how to filter, the limit of items to fetch, and which next token to use. Does not check the cache for the query
 * already fetched.
 *
 * @param {string} itemType The item types of the items to receive in the query.
 * @param {[string]} variableList The list of variables to fetch for the objects.
 * @param {{}} filter The {@link QL} filter to dictate how the query filters the objects.
 * @param {number} limit The limit of items for the query to SEARCH. Items length <= limit.
 * @param {string} nextToken The next token string that dictates which part of the query to fetch.
 * @param {function({nextToken: string, items: [{}]})} dataHandler The function to handle the fetched items.
 * @param {function(error)} failureHandler The function to handle any potential errors that may occur.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function forceFetchItemQuery(itemType, variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery(itemType, variableList, filter, limit, nextToken, dataHandler, failureHandler);
}

// ======================================================================================================
// Mutate Database Low-Level Functions ~
// ======================================================================================================

export function putItemQuery(itemType, queryString, queryResult) {
    return (dispatch) => {
        dispatch(putQuery(queryString, queryResult, getFetchQueryType(itemType)));
    }
}
function putQuery(queryString, queryResult, actionType) {
    return {
        type: actionType,
        payload: {
            queryString,
            queryResult
        }
    };
}
function setItemAttributeAtIndex(itemType, id, attributeName, index, attributeValue) {
    const setItemIndexType = switchReturnItemType(itemType, SET_CLIENT_ATTRIBUTE_INDEX, SET_TRAINER_ATTRIBUTE_INDEX,
        SET_GYM_ATTRIBUTE_INDEX, SET_WORKOUT_ATTRIBUTE_INDEX, SET_REVIEW_ATTRIBUTE_INDEX, SET_EVENT_ATTRIBUTE_INDEX,
        SET_CHALLENGE_ATTRIBUTE_INDEX, SET_INVITE_ATTRIBUTE_INDEX, SET_POST_ATTRIBUTE_INDEX, SET_SUBMISSION_ATTRIBUTE_INDEX,
        SET_GROUP_ATTRIBUTE_INDEX, SET_COMMENT_ATTRIBUTE_INDEX, SET_SPONSOR_ATTRIBUTE_INDEX, null, SET_STREAK_ATTRIBUTE_INDEX,
        "Receive set item attribute index item type not implemented for type!");
    return {
        type: setItemIndexType,
        payload: {
            id,
            attributeName,
            index,
            attributeValue
        }
    }
}
function addItemAttributes(itemType, id, attributes) {
    const addAttributesType = switchReturnItemType(itemType, ADD_CLIENT_ATTRIBUTES, ADD_TRAINER_ATTRIBUTES, ADD_GYM_ATTRIBUTES,
        ADD_WORKOUT_ATTRIBUTES, ADD_REVIEW_ATTRIBUTES, ADD_EVENT_ATTRIBUTES, ADD_CHALLENGE_ATTRIBUTES, ADD_INVITE_ATTRIBUTES,
        ADD_POST_ATTRIBUTES, ADD_SUBMISSION_ATTRIBUTES, ADD_GROUP_ATTRIBUTES, ADD_COMMENT_ATTRIBUTES, ADD_SPONSOR_ATTRIBUTES,
        null, ADD_STREAK_ATTRIBUTES,
        "Receive add item attributes item type not implemented for type!");
    return {
        type: addAttributesType,
        payload: {
            id,
            attributes
        }
    }
}
function removeItemAttributes(itemType, id, attributes) {
    const removeAttributesType = switchReturnItemType(itemType, REMOVE_CLIENT_ATTRIBUTES, REMOVE_TRAINER_ATTRIBUTES, REMOVE_GYM_ATTRIBUTES,
        REMOVE_WORKOUT_ATTRIBUTES, REMOVE_REVIEW_ATTRIBUTES, REMOVE_EVENT_ATTRIBUTES, REMOVE_CHALLENGE_ATTRIBUTES, REMOVE_INVITE_ATTRIBUTES,
        REMOVE_POST_ATTRIBUTES, REMOVE_SUBMISSION_ATTRIBUTES, REMOVE_GROUP_ATTRIBUTES, REMOVE_COMMENT_ATTRIBUTES, REMOVE_SPONSOR_ATTRIBUTES, null, REMOVE_STREAK_ATTRIBUTES,
        "Receive remove item attributes item type not implemented for type!");
    return {
        type: removeAttributesType,
        payload: {
            id,
            attributes
        }
    }
}
function removeItemAttributeIndex(itemType, id, attributeName, index) {
    const removeAttributesType = switchReturnItemType(itemType, REMOVE_CLIENT_ATTRIBUTE_INDEX, REMOVE_TRAINER_ATTRIBUTE_INDEX,
        REMOVE_GYM_ATTRIBUTE_INDEX, REMOVE_WORKOUT_ATTRIBUTE_INDEX, REMOVE_REVIEW_ATTRIBUTE_INDEX, REMOVE_EVENT_ATTRIBUTE_INDEX,
        REMOVE_CHALLENGE_ATTRIBUTE_INDEX, REMOVE_INVITE_ATTRIBUTE_INDEX, REMOVE_POST_ATTRIBUTE_INDEX, REMOVE_SUBMISSION_ATTRIBUTE_INDEX,
        REMOVE_GROUP_ATTRIBUTE_INDEX, REMOVE_COMMENT_ATTRIBUTE_INDEX, REMOVE_SPONSOR_ATTRIBUTE_INDEX, null, REMOVE_STREAK_ATTRIBUTE_INDEX,
        "Receive remove item attribute index item type not implemented for type!");
    return {
        type: removeAttributesType,
        payload: {
            id,
            attributeName,
            index
        }
    }
}
export function removeItem(itemType, id, dispatch) {
    const removeType = switchReturnItemType(itemType, REMOVE_CLIENT, REMOVE_TRAINER, REMOVE_GYM, REMOVE_WORKOUT, REMOVE_REVIEW, REMOVE_EVENT,
        REMOVE_CHALLENGE, REMOVE_INVITE, REMOVE_POST, REMOVE_SUBMISSION, REMOVE_GROUP, REMOVE_COMMENT, REMOVE_SPONSOR, null, REMOVE_STREAK,
        "Receive remove item type not implemented for type!");
    return {
        type: removeType,
        payload: {
            id,
            dispatch
        }
    }
}
export function putItem(item, itemType) {
    if (item && item.id) {
        return {
            type: getFetchType(itemType),
            payload: {
                object: {
                    id: item.id,
                    data: item
                }
            }
        }
    }
    return {type: ""}
}

// ======================================================================================================
// Cache Reducer Getter Functions ~
// ======================================================================================================

export function getCache(itemType, getStore) {
    const cache = getStore().cache;
    return switchReturnItemType(itemType, cache.clients, cache.trainers, cache.gyms, cache.workouts, cache.reviews,
        cache.events, cache.challenges, cache.invites, cache.posts, cache.submissions, cache.groups, cache.comments,
        cache.sponsors, null, cache.streaks, "Retrieve cache not implemented");
}
export function getCacheName(itemType) {
    return switchReturnItemType(itemType, "clients", "trainers", "gyms", "workouts", "reviews", "events", "challenges",
        "invites", "posts", "submissions", "groups", "comments", "sponsors", null, "streaks",
        "Retrieve cache not implemented");
}
export function getQueryCache(itemType, getStore) {
    const cache = getStore().cache;
    return switchReturnItemType(itemType, cache.clientQueries, cache.trainerQueries, cache.gymQueries,
        cache.workoutQueries, cache.reviewQueries, cache.eventQueries, cache.challengeQueries, cache.inviteQueries,
        cache.postQueries, cache.submissionQueries, cache.groupQueries, cache.commentQueries, cache.sponsorQueries,
        null, cache.streakQueries, "Retrieve query cache not implemented");
}
export function getFetchType(itemType) {
    return switchReturnItemType(itemType, FETCH_CLIENT, FETCH_TRAINER, FETCH_GYM, FETCH_WORKOUT, FETCH_REVIEW,
        FETCH_EVENT, FETCH_CHALLENGE, FETCH_INVITE, FETCH_POST, FETCH_SUBMISSION, FETCH_GROUP, FETCH_COMMENT,
        FETCH_SPONSOR, null, FETCH_STREAK, "Retrieve fetch type not implemented for type.")
}
export function getFetchQueryType(itemType) {
    return switchReturnItemType(itemType, FETCH_CLIENT_QUERY, FETCH_TRAINER_QUERY, FETCH_GYM_QUERY, FETCH_WORKOUT_QUERY,
        FETCH_REVIEW_QUERY, FETCH_EVENT_QUERY, FETCH_CHALLENGE_QUERY, FETCH_INVITE_QUERY, FETCH_POST_QUERY,
        FETCH_SUBMISSION_QUERY, FETCH_GROUP_QUERY, FETCH_COMMENT_QUERY, FETCH_SPONSOR_QUERY, null, FETCH_STREAK_QUERY,
        "Retrieve fetch query type not implemented for type");
}

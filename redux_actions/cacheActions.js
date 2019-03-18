import { setIsNotLoading, setError, setIsLoading } from "./infoActions";
import { addHandlerAndUnsubscription } from "./ablyActions";
import QL from "../api/GraphQL";
import S3 from "../api/S3Storage";
import defaultProfilePicture from "../img/roundProfile.png";
import notFoundPicture from "../img/not_found.png";
import {switchReturnItemType} from "../logic/ItemType";
import {getObjectChannelName} from "../redux_reducers/cacheReducer";
import {err, log} from "../../Constants";
import {addMessageFromNotification} from "./messageActions";

const FETCH_CLIENT = 'FETCH_CLIENT';
const FETCH_TRAINER = 'FETCH_TRAINER';
const FETCH_GYM = 'FETCH_GYM';
const FETCH_WORKOUT = 'FETCH_WORKOUT';
const FETCH_REVIEW = 'FETCH_REVIEW';
const FETCH_EVENT = 'FETCH_EVENT';
const FETCH_CHALLENGE = 'FETCH_CHALLENGE';
const FETCH_INVITE = 'FETCH_INVITE';
const FETCH_POST = 'FETCH_POST';
const FETCH_GROUP = 'FETCH_GROUP';
const FETCH_COMMENT = 'FETCH_COMMENT';
const FETCH_SPONSOR = 'FETCH_SPONSOR';
const FETCH_STREAK = 'FETCH_STREAK';

const ADD_CLIENT_ATTRIBUTES = 'ADD_CLIENT_ATTRIBUTES';
const ADD_TRAINER_ATTRIBUTES = 'ADD_TRAINER_ATTRIBUTES';
const ADD_GYM_ATTRIBUTES = 'ADD_GYM_ATTRIBUTES';
const ADD_WORKOUT_ATTRIBUTES = 'ADD_WORKOUT_ATTRIBUTES';
const ADD_REVIEW_ATTRIBUTES = 'ADD_REVIEW_ATTRIBUTES';
const ADD_EVENT_ATTRIBUTES = 'ADD_EVENT_ATTRIBUTES';
const ADD_CHALLENGE_ATTRIBUTES = 'ADD_CHALLENGE_ATTRIBUTES';
const ADD_INVITE_ATTRIBUTES = 'ADD_INVITE_ATTRIBUTES';
const ADD_POST_ATTRIBUTES = 'ADD_POST_ATTRIBUTES';
const ADD_GROUP_ATTRIBUTES = 'ADD_GROUP_ATTRIBUTES';
const ADD_COMMENT_ATTRIBUTES = 'ADD_COMMENT_ATTRIBUTES';
const ADD_SPONSOR_ATTRIBUTES = 'ADD_SPONSOR_ATTRIBUTES';
const ADD_STREAK_ATTRIBUTES = 'ADD_STREAK_ATTRIBUTES';

const REMOVE_CLIENT_ATTRIBUTES = 'REMOVE_CLIENT_ATTRIBUTES';
const REMOVE_TRAINER_ATTRIBUTES = 'REMOVE_TRAINER_ATTRIBUTES';
const REMOVE_GYM_ATTRIBUTES = 'REMOVE_GYM_ATTRIBUTES';
const REMOVE_WORKOUT_ATTRIBUTES = 'REMOVE_WORKOUT_ATTRIBUTES';
const REMOVE_REVIEW_ATTRIBUTES = 'REMOVE_REVIEW_ATTRIBUTES';
const REMOVE_EVENT_ATTRIBUTES = 'REMOVE_EVENT_ATTRIBUTES';
const REMOVE_CHALLENGE_ATTRIBUTES = 'REMOVE_CHALLENGE_ATTRIBUTES';
const REMOVE_INVITE_ATTRIBUTES = 'REMOVE_INVITE_ATTRIBUTES';
const REMOVE_POST_ATTRIBUTES = 'REMOVE_POST_ATTRIBUTES';
const REMOVE_GROUP_ATTRIBUTES = 'REMOVE_GROUP_ATTRIBUTES';
const REMOVE_COMMENT_ATTRIBUTES = 'REMOVE_COMMENT_ATTRIBUTES';
const REMOVE_SPONSOR_ATTRIBUTES = 'REMOVE_SPONSOR_ATTRIBUTES';
const REMOVE_STREAK_ATTRIBUTES = 'REMOVE_STREAK_ATTRIBUTES';

const REMOVE_CLIENT =    'REMOVE_CLIENT';
const REMOVE_TRAINER =   'REMOVE_TRAINER';
const REMOVE_GYM =       'REMOVE_GYM';
const REMOVE_WORKOUT =   'REMOVE_WORKOUT';
const REMOVE_REVIEW =    'REMOVE_REVIEW';
const REMOVE_EVENT =     'REMOVE_EVENT';
const REMOVE_CHALLENGE = 'REMOVE_CHALLENGE';
const REMOVE_INVITE =    'REMOVE_INVITE';
const REMOVE_POST =      'REMOVE_POST';
const REMOVE_GROUP =     'REMOVE_GROUP';
const REMOVE_COMMENT =   'REMOVE_COMMENT';
const REMOVE_SPONSOR =   'REMOVE_SPONSOR';
const REMOVE_STREAK =    'REMOVE_STREAK';

const FETCH_CLIENT_QUERY = 'FETCH_CLIENT_QUERY';
const FETCH_TRAINER_QUERY = 'FETCH_TRAINER_QUERY';
const FETCH_GYM_QUERY = 'FETCH_GYM_QUERY';
const FETCH_WORKOUT_QUERY = 'FETCH_WORKOUT_QUERY';
const FETCH_REVIEW_QUERY = 'FETCH_REVIEW_QUERY';
const FETCH_EVENT_QUERY = 'FETCH_EVENT_QUERY';
const FETCH_CHALLENGE_QUERY = 'FETCH_CHALLENGE_QUERY';
const FETCH_INVITE_QUERY = 'FETCH_INVITE_QUERY';
const FETCH_POST_QUERY = 'FETCH_POST_QUERY';
const FETCH_GROUP_QUERY = 'FETCH_GROUP_QUERY';
const FETCH_COMMENT_QUERY = 'FETCH_COMMENT_QUERY';
const FETCH_SPONSOR_QUERY = 'FETCH_SPONSOR_QUERY';
const FETCH_STREAK_QUERY = 'FETCH_STREAK_QUERY';

const CLEAR_CLIENT_QUERY = 'CLEAR_CLIENT_QUERY';
const CLEAR_TRAINER_QUERY = 'CLEAR_TRAINER_QUERY';
const CLEAR_GYM_QUERY = 'CLEAR_GYM_QUERY';
const CLEAR_WORKOUT_QUERY = 'CLEAR_WORKOUT_QUERY';
const CLEAR_REVIEW_QUERY = 'CLEAR_REVIEW_QUERY';
const CLEAR_EVENT_QUERY = 'CLEAR_EVENT_QUERY';
const CLEAR_CHALLENGE_QUERY = 'CLEAR_CHALLENGE_QUERY';
const CLEAR_INVITE_QUERY = 'CLEAR_INVITE_QUERY';
const CLEAR_POST_QUERY = 'CLEAR_POST_QUERY';
const CLEAR_GROUP_QUERY = 'CLEAR_GROUP_QUERY';
const CLEAR_COMMENT_QUERY = 'CLEAR_COMMENT_QUERY';
const CLEAR_SPONSOR_QUERY = 'CLEAR_SPONSOR_QUERY';
const CLEAR_STREAK_QUERY = 'CLEAR_STREAK_QUERY';

/**
 * Adds any S3 images to the collected data. The S3 images are specified by ending in either "Path" or "Paths" for a
 * single picture and an array of pictures respectively. The new images will be put into the same key but minus the
 * "Path". (Ex. "profileImagePath" -> "profileImage"). "Paths" the "s" just gets put onto the end. I don't give a flying
 * fuck if that makes it an incorrect spelling, that's how I'm doing it.
 * (Ex. "profileImageWigglyPaths" -> "profileImageWigglys")
 *
 * @param data The data of the object to add S3 images/videos into.
 * @param callback The callback for the newly updated data.
 */
function addS3MediaToData(data, callback) {
    function addDefaultImage(mediaKey, data) {
        if (mediaKey === "profileImage" || mediaKey === "profileImages") {
            data[mediaKey] = defaultProfilePicture;
        }
        else {
            data[mediaKey] = notFoundPicture;
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
            asyncWaiting++;
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
                    data[mediaKey].push(url);
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
function fetch(id, itemType, variablesList, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        const cacheName = getCacheName(itemType);
        const currentObject = getStore().cache[cacheName][id];
        if (currentObject) {
            const objectKeyList = Object.keys(currentObject);
            variablesList = variablesList.filter((v) => { return !objectKeyList.includes(v) });
            // log&&console.log("Final filtered list is = " + JSON.stringify(variablesList));
        }
        overwriteFetch(id, variablesList, cacheName, QL.getGetByIDFunction(itemType), getFetchType(itemType), dataHandler, failureHandler, dispatch, getStore);
    };
}
function forceFetch(id, itemType, variablesList, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        overwriteFetch(id, variablesList, getCacheName(itemType), QL.getGetByIDFunction(itemType), getFetchType(itemType), dataHandler, failureHandler, dispatch, getStore);
    };
}
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
            dispatch(getPutItemFunction(itemType)({id, __stale__: false}, dispatch));
            // Then we force fetch everything!
            dispatch(forceFetch(id, itemType, variableList, dataHandler, failureHandler));
        }
        else {
            // Then it is not stale, and we need not subscribe again
            dispatch(fetch(id, itemType, variableList, dataHandler, failureHandler));
        }
    };
}
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
                            dispatch(getPutItemFunction(createJSON.item_type)(createJSON, dispatch));
                        }
                    }
                }
                if (setJSON) {
                    // You simply put the item into the cache (overwriting existing attributes)
                    setJSON.id = id;
                    dispatch(getPutItemFunction(itemType)(setJSON));
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
function overwriteFetch(id, variablesList, cacheSet, QLFunction, fetchDispatchType, dataHandler, failureHandler, dispatch, getStore) {
    if (variablesList.length > 0) {
        if (!variablesList.includes("id")) {
            variablesList = [...variablesList, "id"];
        }
        if (!variablesList.includes("item_type")) {
            variablesList = [...variablesList, "item_type"];
        }
        if (dataHandler) { log&&console.log("S H = " + dataHandler.toString()); }
        else { log&&console.log("No data handler...");}
        if (failureHandler) { log&&console.log("F H = " + failureHandler.toString()); }
        else { log&&console.log("No failure handler...");}
        QLFunction(id, variablesList, (data) => {
            // log&&console.log("Successfully retrieved the QL info");
            if (data) {
                addS3MediaToData(data, (updatedData) => {
                    // TODO __stale__
                    dispatch({
                        type: fetchDispatchType,
                        payload: {
                            object: {
                                id,
                                data: updatedData
                            },
                            dispatch
                        }
                    });
                    dispatch(setIsNotLoading());
                    if (dataHandler) {
                        dataHandler(getStore().cache[cacheSet][id]);
                    }
                });
            } else {
                // Then the fetch came up with nothing!
                // const error = Error("Couldn't find an object in the database with ID = " + id);
                log&&console.log("Couldn't find ID = " + id + " with action = " + JSON.stringify(QLFunction));
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
        dispatch({
            type: fetchDispatchType,
            payload: {
                object: {
                    id,
                    data: null
                },
                dispatch
            }
        });
        dispatch(setIsNotLoading());
        if (dataHandler) { dataHandler(getStore().cache[cacheSet][id]);}
    }
}
// TODO THIS'LL BEE SUPER COOL TO DO IN THE FUTURE
// TODO DON'T OPTIMIZE UNLESS THERE'S AN ACTUAL PROBLEM YOU GOBLIN
function batchFetch(ids, variablesList, cacheSet, QLFunctionName, fetchDispatchType, dataHandler, unretrievedDataHandler, failureHandler) {
    // TODO Check to see if this has already been fulfilled
    // TODO Check to see if we have already called the same batch fetch query (add a set in the cache?)
    // TODO Maybe also try to remove variables based on that
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        let filteredVariablesList = [];
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const currentObject = getStore().cache[cacheSet][id];
            if (currentObject) {
                const objectKeyList = Object.keys(currentObject);
                filteredVariablesList = variablesList.filter((v) => {return (objectKeyList.contains(v) || filteredVariablesList.contains(v)) });
                // variablesList = variablesList.filter((v) => { return !objectKeyList.includes(v) });
                // log&&console.log("Final filtered list is = " + JSON.stringify(variablesList));
            }
        }
        batchOverwriteFetch(ids, variablesList, cacheSet, QLFunctionName, fetchDispatchType, dataHandler, unretrievedDataHandler, failureHandler, dispatch, getStore);
    };
}
function batchForceFetch(ids, variablesList, cacheSet, QLFunctionName, fetchDispatchType, dataHandler, unretrievedDataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        batchOverwriteFetch(ids, variablesList, cacheSet, QLFunctionName, fetchDispatchType, dataHandler, unretrievedDataHandler, failureHandler, dispatch, getStore);
    };
}
function batchOverwriteFetch(ids, variablesList, cacheSet, QLFunctionName, fetchDispatchType, dataHandler, unretrievedDataHandler, failureHandler, dispatch, getStore) {
    if (variablesList.length > 0) {
        if (!variablesList.includes("id")) {
            variablesList = [...variablesList, "id"];
        }
        if (!variablesList.includes("item_type")) {
            variablesList = [...variablesList, "item_type"];
        }
        QL[QLFunctionName](ids, variablesList, (data) => {
            // log&&console.log("Successfully retrieved the QL info");
            if (data.hasOwnProperty("items") && data.items && data.items.length) {
                const items = data.items;
                const itemsLength = items.length;
                let retrievedItems = [];
                for (let i = 0; i < itemsLength; i++) {
                    const data = items[i];
                    const id = data.id;
                    addS3MediaToData(data, (updatedData) => {
                        // log&&console.log("Dispatching the profile image + data");
                        dispatch({
                            type: fetchDispatchType,
                            payload: {
                                object: {
                                    id,
                                    data: updatedData
                                },
                                dispatch
                            }
                        });
                        retrievedItems.push(getStore().cache[cacheSet][id]);
                        dispatch(setIsNotLoading());
                        if (dataHandler) {dataHandler(retrievedItems);}
                    });
                }
            }
            if (data.hasOwnProperty("unretrievedItems") && data.unretrievedItems && data.unretrievedItems.length && unretrievedDataHandler) {
                unretrievedDataHandler(data.unretrievedItems);
            }
        }, (error) => {
            err&&console.error("Error in retrieval");
            dispatch(setError(error));
            dispatch(setIsNotLoading());
            if (failureHandler) { failureHandler(error);}
        });
    }
    else {
        const items = [];
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            dispatch({
                type: fetchDispatchType,
                payload: {
                    object: {
                        id,
                        data: null
                    },
                    dispatch
                }
            });
            items.push(getStore().cache[cacheSet][id]);
        }
        dispatch(setIsNotLoading());
        if (dataHandler) { dataHandler(items);}
    }
}
export function fetchQuery(itemType, variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        if (!variablesList.includes("id")) {
            variablesList.push("id");
        }
        if (!variablesList.includes("item_type")) {
            variablesList.push("item_type");
        }

        // TODO Make this sort alphabetically, so that it's deterministic
        // variablesList = variablesList.sort();

        // const fetchQueryDispatchType = getFetchQueryType(itemType);
        let queryString = QL.getConstructQueryFunction(itemType)(variablesList, filter, limit, nextToken);
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
export function forceFetchQuery(itemType, variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return (dispatch) => {
        dispatch(setIsLoading());
        if (!variablesList.includes("id")) {
            variablesList.push("id");
        }
        if (!variablesList.includes("item_type")) {
            variablesList.push("item_type");
        }

        // TODO Make this sort alphabetically, so that it's deterministic
        // variablesList = variablesList.sort();

        let queryString = QL.getConstructQueryFunction(itemType)(variablesList, filter, limit, nextToken);
        // const queryString = QL[QLFunctionName](variablesList, filter, limit, nextToken);
        overwriteFetchQuery(itemType, queryString, nextToken, dataHandler, failureHandler, dispatch);
    };
}
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
export function fetchItem(itemType, id, variableList, dataHandler, failureHandler) {
    // return getFetchItemFunction(itemType)(id, variableList, dataHandler, failureHandler);
    return fetch(id, itemType, variableList, dataHandler, failureHandler)
}
export function fetchClient(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Client", variablesList, dataHandler, failureHandler);
}
export function fetchTrainer(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Trainer", variablesList, dataHandler, failureHandler);
}
export function fetchGym(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Gym", variablesList, dataHandler, failureHandler);
}
export function fetchWorkout(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Workout", variablesList, dataHandler, failureHandler);
}
export function fetchReview(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Review", variablesList, dataHandler, failureHandler);
}
export function fetchEvent(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Event", variablesList, dataHandler, failureHandler);
}
export function fetchChallenge(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Challenge", variablesList, dataHandler, failureHandler);
}
export function fetchPost(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Post", variablesList, dataHandler, failureHandler);
}
export function fetchInvite(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Invite", variablesList, dataHandler, failureHandler);
}
export function fetchGroup(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Group", variablesList, dataHandler, failureHandler);
}
export function fetchComment(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Comment", variablesList, dataHandler, failureHandler);
}
export function fetchSponsor(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Sponsor", variablesList, dataHandler, failureHandler);
}
export function fetchStreak(id, variablesList, dataHandler, failureHandler) {
    return fetch(id, "Streak", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchItem(itemType, id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, itemType, variablesList, dataHandler, failureHandler);
}
export function subscribeFetchClient(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Client", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchTrainer(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Trainer", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchGym(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Gym", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchWorkout(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Workout", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchReview(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Review", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchEvent(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Event", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchChallenge(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Challenge", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchPost(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Post", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchInvite(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Invite", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchGroup(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Group", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchComment(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Comment", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchSponsor(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Sponsor", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchStreak(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetch(id, "Streak", variablesList, dataHandler, failureHandler);
}
export function forceFetchItem(itemType, id, variablesList, dataHandler, failureHandler) {
    return getForceFetchItemFunction(itemType)(id, variablesList, dataHandler, failureHandler);
}
export function forceFetchClient(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Client", variablesList, dataHandler, failureHandler);
}
export function forceFetchTrainer(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Trainer", variablesList, dataHandler, failureHandler);
}
export function forceFetchGym(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Gym", variablesList, dataHandler, failureHandler);
}
export function forceFetchWorkout(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Workout", variablesList, dataHandler, failureHandler);
}
export function forceFetchReview(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Review", variablesList, dataHandler, failureHandler);
}
export function forceFetchEvent(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Event", variablesList, dataHandler, failureHandler);
}
export function forceFetchChallenge(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Challenge", variablesList, dataHandler, failureHandler);
}
export function forceFetchInvite(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Invite", variablesList, dataHandler, failureHandler);
}
export function forceFetchPost(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Post", variablesList, dataHandler, failureHandler);
}
export function forceFetchGroup(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Group", variablesList, dataHandler, failureHandler);
}
export function forceFetchComment(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Comment", variablesList, dataHandler, failureHandler);
}
export function forceFetchSponsor(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Sponsor", variablesList, dataHandler, failureHandler);
}
export function forceFetchStreak(id, variablesList, dataHandler, failureHandler) {
    return forceFetch(id, "Streak", variablesList, dataHandler, failureHandler);
}
export function fetchClients(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "clients", "getClients", "FETCH_CLIENT", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchTrainers(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "trainers", "getTrainers", "FETCH_TRAINER", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchGyms(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "gyms", "getGyms", "FETCH_GYM", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchWorkouts(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "workouts", "getWorkouts", "FETCH_WORKOUT", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchReviews(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "reviews", "getReviews", "FETCH_REVIEW", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchEvents(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "events", "getEvents", "FETCH_EVENT", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchChallenges(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "challenges", "getChallenges", "FETCH_CHALLENGE", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchInvites(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "invites", "getInvites", "FETCH_INVITE", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchPosts(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "posts", "getPosts", "FETCH_POST", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchGroups(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "groups", "getGroups", "FETCH_GROUP", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchComments(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "comments", "getComments", "FETCH_COMMENT", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchSponsors(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "sponsors", "getSponsors", "FETCH_SPONSOR", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchStreaks(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchFetch(ids, variablesList, "streaks", "getStreaks", "FETCH_STREAK", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchClients(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "clients", "getClients", "FETCH_CLIENT", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchTrainers(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "trainers", "getTrainers", "FETCH_TRAINER", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchGyms(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "gyms", "getGyms", "FETCH_GYM", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchWorkouts(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "workouts", "getWorkouts", "FETCH_WORKOUT", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchReviews(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "reviews", "getReviews", "FETCH_REVIEW", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchEvents(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "events", "getEvents", "FETCH_EVENT", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchChallenges(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "challenges", "getChallenges", "FETCH_CHALLENGE", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchInvites(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "invites", "getInvites", "FETCH_INVITE", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchPosts(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "posts", "getPosts", "FETCH_POST", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchGroups(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "groups", "getGroups", "FETCH_GROUP", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchComments(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "comments", "getComments", "FETCH_COMMENT", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchSponsors(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "sponsors", "getSponsors", "FETCH_SPONSOR", dataHandler, unretrievedDataHandler, failureHandler);
}
export function forceFetchStreaks(ids, variablesList, dataHandler, unretrievedDataHandler, failureHandler) {
    return batchForceFetch(ids, variablesList, "streaks", "getStreaks", "FETCH_STREAK", dataHandler, unretrievedDataHandler, failureHandler);
}
export function fetchClientQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    // console.log("fetching clients");
    return fetchQuery("Client", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchTrainerQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Trainer", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchGymQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Gym", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchWorkoutQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Workout", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchReviewQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Review", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchEventQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Event", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchChallengeQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Challenge", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchPostQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Post", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchInviteQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Invite", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchGroupQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Group", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchCommentQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Comment", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchSponsorQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Sponsor", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchStreakQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchQuery("Streak", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchClientQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Client", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchTrainerQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Trainer", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchGymQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Gym", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchWorkoutQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Workout", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchReviewQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Review", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchEventQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Event", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchChallengeQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Challenge", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchPostQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Post", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchInviteQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Invite", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchGroupQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Group", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchCommentQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Comment", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchSponsorQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Sponsor", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchStreakQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchQuery("Streak", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
// TODO Consider how this might scale? Another LRU Cache here?
export function putClientQuery(queryString, queryResult) {
    return (dispatch) => {
        dispatch(putQuery(queryString, queryResult, "FETCH_CLIENT_QUERY"));
        // dispatch(setIsLoading());
        // TODO Should we take the time to put all the query clients into the cache as well? Is our cache hurting our performance?
    };
}
export function putTrainerQuery(queryString, queryResult) {
    return {
        type: "FETCH_TRAINER_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putGymQuery(queryString, queryResult) {
    return {
        type: "FETCH_GYM_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putWorkoutQuery(queryString, queryResult) {
    return {
        type: "FETCH_WORKOUT_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putReviewQuery(queryString, queryResult) {
    return {
        type: "FETCH_REVIEW_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putEventQuery(queryString, queryResult) {
    return {
        type: "FETCH_EVENT_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putChallengeQuery(queryString, queryResult) {
    return {
        type: "FETCH_CHALLENGE_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putInviteQuery(queryString, queryResult) {
    return {
        type: "FETCH_INVITE_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putPostQuery(queryString, queryResult) {
    return {
        type: "FETCH_POST_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putGroupQuery(queryString, queryResult) {
    return {
        type: "FETCH_GROUP_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putCommentQuery(queryString, queryResult) {
    return {
        type: "FETCH_COMMENT_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putSponsorQuery(queryString, queryResult) {
    return {
        type: "FETCH_SPONSOR_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function putStreakQuery(queryString, queryResult) {
    return {
        type: "FETCH_STREAK_QUERY",
        payload: {
            queryString,
            queryResult
        }
    };
}
export function clearClientQuery() {
    return {
        type: "CLEAR_CLIENT_QUERY",
    };
}
export function clearTrainerQuery() {
    return {
        type: "CLEAR_TRAINER_QUERY",
    };
}
export function clearGymQuery() {
    return {
        type: "CLEAR_GYM_QUERY",
    };
}
export function clearWorkoutQuery() {
    return {
        type: "CLEAR_WORKOUT_QUERY",
    };
}
export function clearReviewQuery() {
    return {
        type: "CLEAR_REVIEW_QUERY",
    };
}
export function clearEventQuery() {
    return {
        type: "CLEAR_EVENT_QUERY",
    };
}
export function clearChallengeQuery() {
    return {
        type: "CLEAR_CHALLENGE_QUERY",
    };
}
export function clearInviteQuery() {
    return {
        type: "CLEAR_INVITE_QUERY",
    };
}
export function clearPostQuery() {
    return {
        type: "CLEAR_POST_QUERY",
    };
}
export function clearGroupQuery() {
    return {
        type: "CLEAR_GROUP_QUERY",
    };
}
export function clearCommentQuery() {
    return {
        type: "CLEAR_COMMENT_QUERY",
    };
}
export function clearSponsorQuery() {
    return {
        type: "CLEAR_SPONSOR_QUERY",
    };
}
export function clearStreakQuery() {
    return {
        type: "CLEAR_STREAK_QUERY",
    };
}
function addItemAttributes(itemType, id, attributes) {
    const addAttributesType = switchReturnItemType(itemType, ADD_CLIENT_ATTRIBUTES, ADD_TRAINER_ATTRIBUTES, ADD_GYM_ATTRIBUTES,
        ADD_WORKOUT_ATTRIBUTES, ADD_REVIEW_ATTRIBUTES, ADD_EVENT_ATTRIBUTES, ADD_CHALLENGE_ATTRIBUTES, ADD_INVITE_ATTRIBUTES,
        ADD_POST_ATTRIBUTES, ADD_GROUP_ATTRIBUTES, ADD_COMMENT_ATTRIBUTES, ADD_SPONSOR_ATTRIBUTES, null, ADD_STREAK_ATTRIBUTES,
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
        REMOVE_POST_ATTRIBUTES, REMOVE_GROUP_ATTRIBUTES, REMOVE_COMMENT_ATTRIBUTES, REMOVE_SPONSOR_ATTRIBUTES, null, REMOVE_STREAK_ATTRIBUTES,
        "Receive remove item attributes item type not implemented for type!");
    return {
        type: removeAttributesType,
        payload: {
            id,
            attributes
        }
    }
}
export function removeItem(itemType, id, dispatch) {
    const removeType = switchReturnItemType(itemType, REMOVE_CLIENT, REMOVE_TRAINER, REMOVE_GYM, REMOVE_WORKOUT, REMOVE_REVIEW, REMOVE_EVENT,
        REMOVE_CHALLENGE, REMOVE_INVITE, REMOVE_POST, REMOVE_GROUP, REMOVE_COMMENT, REMOVE_SPONSOR, null, REMOVE_STREAK,
        "Receive remove item type not implemented for type!");
    return {
        type: removeType,
        payload: {
            id,
            dispatch
        }
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
export function putItem(item, itemType, dispatch) {
    return getPutItemFunction(itemType)(item, dispatch);
}
export function putClient(client, dispatch) {
    if (client && client.id) {
        return {
            type: "FETCH_CLIENT",
            payload: {
                object: {
                    id: client.id,
                    data: client
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putTrainer(trainer, dispatch) {
    if (trainer && trainer.id) {
        return {
            type: "FETCH_TRAINER",
            payload: {
                object: {
                    id: trainer.id,
                    data: trainer
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putGym(gym, dispatch) {
    if (gym && gym.id) {
        return {
            type: "FETCH_GYM",
            payload: {
                object: {
                    id: gym.id,
                    data: gym
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putWorkout(workout, dispatch) {
    if (workout && workout.id) {
        return {
            type: "FETCH_WORKOUT",
            payload: {
                object: {
                    id: workout.id,
                    data: workout
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putReview(review, dispatch) {
    if (review && review.id) {
        return {
            type: "FETCH_REVIEW",
            payload: {
                object: {
                    id: review.id,
                    data: review
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putEvent(event, dispatch) {
    if (event && event.id) {
        return {
            type: "FETCH_EVENT",
            payload: {
                object: {
                    id: event.id,
                    data: event
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putChallenge(challenge, dispatch) {
    if (challenge && challenge.id) {
        return {
            type: "FETCH_CHALLENGE",
            payload: {
                object: {
                    id: challenge.id,
                    data: challenge
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putInvite(invite, dispatch) {
    if (invite && invite.id) {
        return {
            type: "FETCH_INVITE",
            payload: {
                object: {
                    id: invite.id,
                    data: invite
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putPost(post, dispatch) {
    if (post && post.id) {
        return {
            type: "FETCH_POST",
            payload: {
                object: {
                    id: post.id,
                    data: post
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putGroup(group, dispatch) {
    if (group && group.id) {
        return {
            type: "FETCH_GROUP",
            payload: {
                object: {
                    id: group.id,
                    data: group
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putComment(comment, dispatch) {
    if (comment && comment.id) {
        return {
            type: "FETCH_COMMENT",
            payload: {
                object: {
                    id: comment.id,
                    data: comment
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function putSponsor(sponsor, dispatch) {
    if (sponsor && sponsor.id) {
        return {
            type: "FETCH_SPONSOR",
            payload: {
                object: {
                    id: sponsor.id,
                    data: sponsor,
                },
                dispatch
            }

        };
    }
    return {type: ""};
}
export function putStreak(streak, dispatch) {
    if (streak && streak.id) {
        return {
            type: "FETCH_SPONSOR",
            payload: {
                object: {
                    id: streak.id,
                    data: streak
                },
                dispatch
            }
        };
    }
    return {type: ""};
}
export function getFetchType(itemType) {
    return switchReturnItemType(itemType, FETCH_CLIENT, FETCH_TRAINER, FETCH_GYM, FETCH_WORKOUT, FETCH_REVIEW,
        FETCH_EVENT, FETCH_CHALLENGE, FETCH_INVITE, FETCH_POST, FETCH_GROUP, FETCH_COMMENT, FETCH_SPONSOR,
        null, FETCH_STREAK, "Retrieve fetch type not implemented for type.")
}
export function getFetchQueryType(itemType) {
    return switchReturnItemType(itemType, FETCH_CLIENT_QUERY, FETCH_TRAINER_QUERY, FETCH_GYM_QUERY, FETCH_WORKOUT_QUERY,
        FETCH_REVIEW_QUERY, FETCH_EVENT_QUERY, FETCH_CHALLENGE_QUERY, FETCH_INVITE_QUERY, FETCH_POST_QUERY, FETCH_GROUP_QUERY,
        FETCH_COMMENT_QUERY, FETCH_SPONSOR_QUERY, null, FETCH_STREAK_QUERY, "Retrieve fetch query type not implemented for type");
}
export function getCache(itemType, getStore) {
    const cache = getStore().cache;
    return switchReturnItemType(itemType, cache.clients, cache.trainers, cache.gyms, cache.workouts, cache.reviews,
        cache.events, cache.challenges, cache.invites, cache.posts, cache.groups, cache.comments, cache.sponsors,
        null, cache.streaks, "Retrieve cache not implemented");
}
export function getCacheName(itemType) {
    return switchReturnItemType(itemType, "clients", "trainers", "gyms", "workouts", "reviews",
        "events", "challenges", "invites", "posts", "groups", "comments", "sponsors",
        null, "streaks", "Retrieve cache not implemented");
}
export function getQueryCache(itemType, getStore) {
    const cache = getStore().cache;
    return switchReturnItemType(itemType, cache.clientQueries, cache.trainerQueries, cache.gymQueries, cache.workoutQueries,
        cache.reviewQueries, cache.eventQueries, cache.challengeQueries, cache.inviteQueries, cache.postQueries, cache.groupQueries,
        cache.commentQueries, cache.sponsorQueries, null, cache.streakQueries, "Retrieve query cache not implemented");
}
function getQueryCacheName(itemType)  {
    return switchReturnItemType(itemType, "clientQueries", "trainerQueries", "gymQueries", "workoutQueries",
        "reviewQueries", "eventQueries", "challengeQueries", "inviteQueries", "postQueries", "groupQueries",
        "commentQueries", "sponsorQueries", null, "streakQueries", "Retrieve query cache not implemented");
}
export function getPutItemFunction(itemType) {
    return switchReturnItemType(itemType, putClient, putTrainer, putGym, putWorkout, putReview, putEvent, putChallenge, putInvite,
        putPost, putGroup, putComment, putSponsor, null, putStreak, "Retrieve put item function item type not implemented");
}
function getFetchItemFunction(itemType) {
    return switchReturnItemType(itemType, fetchClient, fetchTrainer, fetchGym, fetchWorkout, fetchReview, fetchEvent,
        fetchChallenge, fetchInvite, fetchPost, fetchGroup, fetchComment, fetchSponsor, null, fetchStreak, "Retrieve fetch item function not implemented");
}
function getForceFetchItemFunction(itemType) {
    return switchReturnItemType(itemType, forceFetchClient, forceFetchTrainer, forceFetchGym, forceFetchWorkout, forceFetchReview,
        forceFetchEvent, forceFetchChallenge, forceFetchInvite, forceFetchPost, forceFetchGroup, forceFetchComment, forceFetchSponsor,
        null, forceFetchStreak, "Retrieve force fetch item function not implemented for item type");
}
function getSubscribeFetchItemFunction(itemType) {
    return switchReturnItemType(itemType, subscribeFetchClient, subscribeFetchTrainer, subscribeFetchGym, subscribeFetchWorkout, subscribeFetchReview,
        subscribeFetchEvent, subscribeFetchChallenge, subscribeFetchInvite, subscribeFetchPost, subscribeFetchGroup, subscribeFetchComment, subscribeFetchSponsor,
        null, subscribeFetchStreak, "Retrieve subscribe fetch item function not implemented for item type");
}
export function getFetchQueryFunction(itemType) {
    return switchReturnItemType(itemType, fetchClientQuery, fetchTrainerQuery, fetchGymQuery, fetchWorkoutQuery,
        fetchReviewQuery, fetchEventQuery, fetchChallengeQuery, fetchInviteQuery, fetchPostQuery, fetchGroupQuery,
        fetchCommentQuery, fetchSponsorQuery, null, fetchStreakQuery, "Retrieve fetch query function item type not implemented");
}
export function getPutQueryFunction(itemType) {
    return switchReturnItemType(itemType, putClientQuery, putTrainerQuery, putGymQuery, putWorkoutQuery, putReviewQuery,
        putEventQuery, putChallengeQuery, putInviteQuery, putPostQuery, putGroupQuery, putCommentQuery, putSponsorQuery,
        null, putStreakQuery, "Retrieve Put Query Function not implemented");
}
export function getClearQueryFunction(itemType) {
    return switchReturnItemType(itemType, clearClientQuery, clearTrainerQuery, clearGymQuery, clearWorkoutQuery, clearReviewQuery,
        clearEventQuery, clearChallengeQuery, clearInviteQuery, clearPostQuery, clearGroupQuery, clearCommentQuery, clearSponsorQuery,
        null, clearStreakQuery, "Retrieve Clear Query Function not implemented");
}
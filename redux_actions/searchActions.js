import {setIsLoading, setIsNotLoading} from "./infoActions";
import QL from "../api/GraphQL";
import {getPutItemFunction, getFetchQueryFunction} from "./cacheActions";
import {err, log} from "../../Constants";

const ENABLE_TYPE = 'ENABLE_TYPE';
const DISABLE_TYPE = 'DISABLE_TYPE';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_TYPE_FILTER = 'SET_TYPE_FILTER';
const SET_TYPE_NEXT_TOKEN = 'SET_TYPE_NEXT_TOKEN';
const ADD_TYPE_RESULTS = 'ADD_TYPE_RESULTS';
const RESET_TYPE_QUERY = 'RESET_TYPE_QUERY';
const RESET_QUERY = 'RESET_QUERY';
const ENABLE_SEARCH_BAR = 'ENABLE_SEARCH_BAR';
const DISABLE_SEARCH_BAR = 'DISABLE_SEARCH_BAR';

export function newSearch(queryString, minResults, dataHandler) {
    return (dispatch) => {
        dispatch(setIsLoading());
        dispatch(resetQuery());
        // Use the current store settings to actually do the search
        if (queryString && queryString.length > 0) {
            dispatch(setSearchQuery(queryString));
            dispatch(loadMoreResults(queryString, minResults, (data) => {
                dispatch(setIsNotLoading());
                dataHandler(data);
            }));
        }
        else {
            log&&console.log("I refuse to search for an empty string");
            dataHandler([]);
            dispatch(setIsNotLoading());
        }
    };
}
function loadMoreResults(searchQuery, minResults, dataHandler) {
    return (dispatch, getStore) => {
        if (getStore().search.searchQuery === searchQuery && getStore().search.results.length < minResults &&
                !getStore().search.ifFinished) {
            alert("Current results = " + JSON.stringify(getStore().search.results));
            alert("Still need " + (parseInt(minResults) - parseInt(getStore().search.results.length)) + " more results!");
            performAllQueries(searchQuery, dispatch, getStore, () => {
                dispatch(loadMoreResults(searchQuery, minResults, dataHandler));
            });
        }
        else {
            dataHandler(getStore().search.results);
        }
    };
}
export function performAllQueries(searchQuery, dispatch, getStore, dataHandler) {
    if (searchQuery && searchQuery.length > 0) {
        let numResults = 0;
        let results = [];
        const numTypesEnabled = getStore().search.numTypesEnabled;
        const typeQueries = getStore().search.typeQueries;
        const getData = (type, data) => {
            if (data.hasOwnProperty("items") && data.hasOwnProperty("nextToken")) {
                dispatch(addTypeResults(type, data.items));
                dispatch(setTypeNextToken(type, data.nextToken));
                results.push(...data.items);
            }
            else {
                err&&console.error("Received a weird value from query in the newSearch search redux function. Value = " + JSON.stringify(data));
            }
            numResults++;
            if (numTypesEnabled <= numResults) {
                dataHandler(results);
            }
        };
        const failData = () => {
            numResults++;
            if (numTypesEnabled <= numResults) {
                dataHandler(results);
            }
        };
        for (const type in typeQueries) {
            if (typeQueries.hasOwnProperty(type)) {
                // const typeQuery = getStore().search.typeQueries[type];
                // if (typeQuery.enabled && (typeQuery.nextToken || typeQuery.ifFirst)) {
                performQuery(type, dispatch, getStore, getData, failData);
            }
        }
    }
    else {
        // TODO What to do if we trying to do this? Set is not loading?
    }
}
function performQuery(itemType, dispatch, getStore, successHandler, failureHandler) {
    const searchQuery = getStore().search.searchQuery;
    const typeQuery = getStore().search.typeQueries[itemType];
    if (typeQuery.enabled) {
        const variableList = typeQuery.variableList;
        const filterJSON = typeQuery.filterJSON;
        const filterParameters = {
            ...typeQuery.filterParameters,
            searchQuery,
        };
        const limit = typeQuery.limit;
        const nextToken = typeQuery.nextToken;
        const ifFirst = typeQuery.ifFirst;
        log&&console.log("nextToken = " + nextToken);
        if (nextToken || ifFirst) {
            const putItemFunction = getPutItemFunction(itemType);
            const fetchQueryFunction = getFetchQueryFunction(itemType);
            // console.log(JSON.stringify(getFetchQueryFunction));
            // if (!fetchQueryFunction) { console.log("problem"); }
            // else { console.log(JSON.stringify(fetchQueryFunction)); }
            fetchQueryFunction(variableList, QL.generateFilter(filterJSON, filterParameters), limit, nextToken, (data) => {
                // console.log("Ay lmao it came back");
                if (data) {
                    dispatch(setTypeNextToken(itemType, data.nextToken));
                    successHandler(itemType, data);
                    if (data && data.items) {
                        for (let i = 0; i < data.items.length; i++) {
                            dispatch(putItemFunction(data.items[i]));
                        }
                    }
                }
                else {
                    err&&console.error("Query function returned null?");
                }
            }, (error) => {
                if (failureHandler) { failureHandler(error); }
            })(dispatch, getStore);
        }
        else {
            successHandler(itemType, {items: [], nextToken: null});
        }
    }
}
export function enableType(type) {
    return {
        type: ENABLE_TYPE,
        payload: type
    };
}
export function disableType(type) {
    return {
        type: DISABLE_TYPE,
        payload: type
    };
}
export function setSearchQuery(searchQuery) {
    return {
        type: SET_SEARCH_QUERY,
        payload: searchQuery
    }
}
export function addTypeResults(type, results) {
    return {
        type: ADD_TYPE_RESULTS,
        payload: {
            type,
            results
        }
    };
}
export function setTypeFilter(type, filterJSON, filterParameters) {
    return {
        type: SET_TYPE_FILTER,
        payload: {
            type,
            filterJSON,
            filterParameters
        }
    };
}
export function setTypeNextToken(type, nextToken) {
    return {
        type: SET_TYPE_NEXT_TOKEN,
        payload: {
            type,
            nextToken
        }
    }
}
export function resetTypeQuery(type) {
    return {
        type: RESET_TYPE_QUERY,
        payload: type
    };
}
export function resetQuery() {
    return {
        type: RESET_QUERY
    };
}
export function enableSearchBar() {
    return {
        type: ENABLE_SEARCH_BAR
    }
}
export function disableSearchBar() {
    return {
        type: DISABLE_SEARCH_BAR
    }
}

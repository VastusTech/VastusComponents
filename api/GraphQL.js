import { API, graphqlOperation } from 'aws-amplify';
import {log, err} from "../../Constants";
import _ from 'lodash';
import {switchReturnItemType} from "../logic/ItemType";
import TestHelper from "../testing/TestHelper";
import {debugAlert} from "../logic/DebuggingHelper";
import type User from "../types/User";


/**
 * This class handles all of the GraphQL Query Library logic, like sending queries and fetch requests to our AWS AppSync
 * GraphQL endpoint.
 */
class GraphQL {
    // Represents the amount of items that can be fetched before a batch fetch operation will definitely send items back
    static batchLimit = 100;

    // =================================================================================================================
    // ~ Public GraphQL Using Methods
    // =================================================================================================================

    /**
     * Gets a single item from the database using its name and calls on the GraphQL endpoint.
     *
     * @param {string} itemType The item type for the item to retrieve.
     * @param {string} id The id of the item to get.
     * @param {[string]} variableList The list of attributes to receive as the item data.
     * @param {function({})} successHandler The function to handle the successfully received item.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging information from the GraphQL query.
     */
    static getItem(itemType, id, variableList, successHandler, failureHandler) {
        if (!itemType) throw Error("Item type cannot be null");
        if (!id) throw Error("ID cannot be null");
        if (!variableList || !(variableList.length > 0)) throw Error("Variable list must have at least one variable");
        for (let i = 0; i < variableList.length; i++) {
            if (!variableList[i]) throw Error("No variables can be null");
        }
        const func = switchReturnItemType(itemType, GraphQL.getClient, GraphQL.getTrainer, GraphQL.getGym, GraphQL.getWorkout, GraphQL.getReview,
            GraphQL.getEvent, GraphQL.getChallenge, GraphQL.getInvite, GraphQL.getPost, GraphQL.getSubmission,
            GraphQL.getGroup, GraphQL.getComment, GraphQL.getSponsor, GraphQL.getMessage, GraphQL.getStreak,
            "GraphQL get Fetch function function not implemented");
        if (func) { return func(id, variableList, successHandler, failureHandler); }
        else { throw Error("Unrecognized item type"); }
    }

    /**
     * Gets an item from the database using its username and calls on the GraphQl endpoint. Should only work for users.
     *
     * @param {string} itemType The item type for the item to retrieve.
     * @param {string} username The username of the item to retrieve.
     * @param {[string]} variableList The list of attributes to receive as the item data.
     * @param {function(DatabaseObject)} successHandler The function to handle the successfully received item.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging information from the GraphQL query.
     */
    static getItemByUsername(itemType, username, variableList, successHandler, failureHandler) {
        if (!itemType) throw Error("Item type cannot be null");
        if (!username) throw Error("Username cannot be null");
        if (!variableList || !(variableList.length > 0)) throw Error("Variable list must have at least one variable");
        for (let i = 0; i < variableList.length; i++) {
            if (!variableList[i]) throw Error("No variables can be null");
        }
        const func = switchReturnItemType(itemType, GraphQL.getClientByUsername, GraphQL.getTrainerByUsername, GraphQL.getGymByUsername,
            null, null, null, null, null, null, null, null, GraphQL.getSponsorByUsername, "GraphQL get Fetch Username function function not implemented");
        if (func) { return func(username, variableList, successHandler, failureHandler); }
        else { throw Error("Unrecognized item type"); }
    }

    /**
     * Gets an item from the database using its federated ID (Google or Facebook) and calls on the GraphQL endpoint.
     * Should only work for users.
     *
     * @param {string} itemType The item type for the item to retrieve.
     * @param {string} federatedID The federated identities ID of the item to retrieve.
     * @param {[string]} variableList The list of attributes to receive as the item data.
     * @param {function({})} successHandler The function to handle the successfully received item.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging information from the GraphQL query.
     */
    static getItemByFederatedID(itemType, federatedID, variableList, successHandler, failureHandler) {
        if (!itemType) throw Error("Item type cannot be null");
        if (!federatedID) throw Error("Federated ID cannot be null");
        if (!variableList || !(variableList.length > 0)) throw Error("Variable list must have at least one variable");
        for (let i = 0; i < variableList.length; i++) {
            if (!variableList[i]) throw Error("No variables can be null");
        }
        const func = switchReturnItemType(itemType, GraphQL.getClientByFederatedID, GraphQL.getTrainerByFederatedID, GraphQL.getGymByFederatedID,
            null, null, null, null, null, null, null, null, GraphQL.getSponsorByFederatedID, "GraphQL get Fetch Username function function not implemented");
        if (func) { return func(federatedID, variableList, successHandler, failureHandler); }
        else { throw Error("Unrecognized item type"); }
    }

    /**
     * Batch fetches a list of items from the database using their IDs and calls on the GraphQL endpoint.
     *
     * @param {string} itemType The item type for the item to retrieve.
     * @param {[string]} ids The list of ids to retrieve the items for.
     * @param {[string]} variableList The list of attributes to receive as the item data.
     * @param {function({items: [{}], unretrievedItems: [string]})} successHandler The function to handle the
     * successfully received items and return the unretrieved items as a string.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging information from the GraphQL query.
     */
    static getItems(itemType, ids, variableList, successHandler, failureHandler) {
        if (!itemType) throw Error("Item type cannot be null");
        if (!ids || !(ids.length > 0)) throw Error("ID list must have at least one ID");
        for (let i = 0; i < ids.length; i++) {
            if (!ids[i]) throw Error("No IDs can be null");
        }
        if (!variableList || !(variableList.length > 0)) throw Error("Variable list must have at least one variable");
        for (let i = 0; i < variableList.length; i++) {
            if (!variableList[i]) throw Error("No variables can be null");
        }
        const func = switchReturnItemType(itemType, GraphQL.getClients, GraphQL.getTrainers, GraphQL.getGyms, GraphQL.getWorkouts,
            GraphQL.getReviews, GraphQL.getEvents, GraphQL.getChallenges, GraphQL.getInvites, GraphQL.getPosts,
            GraphQL.getSubmissions, GraphQL.getGroups, GraphQL.getComments, GraphQL.getSponsors, GraphQL.getMessages, GraphQL.getStreaks,
            "GraphQL get Batch Fetch function function not implemented");
        if (TestHelper.ifTesting && successHandler) {
            const items = [];
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const obj = {id, item_type: itemType,};
                for (let j = 0; j < variableList.length; j++) {
                    const varName = variableList[j];
                    if (varName !== "id" && varName !== "item_type") {
                        obj[variableList[j]] = "TEST_VALUE";
                    }
                }
                items.push(obj);
            }
            successHandler({items, unretrievedItems: []});
        }
        if (func) { return func(ids, variableList, successHandler, failureHandler); }
        else { throw Error("Unrecognized item type"); }
    }

    /**
     * Constructs a query object using the given parameters that define the query.
     *
     * @param {string} itemType The item type to construct the query for.
     * @param {[string]} variableList The list of attributes to receive as the item data.
     * @param {{}} filter The {@link generateFilter} filter to dictate how the query filters the objects.
     * @param {number} limit The maximum number of items to SEARCH for in the query. Items length <= limit.
     * @param {string} nextToken The next token for the query, so that it can be separated into multiple queries.
     * @return {{query: string, variables: {}}} The item query to use in the {@link queryItems} method.
     */
    static constructItemQuery(itemType, variableList, filter, limit, nextToken) {
        if (!itemType) throw Error("Item type cannot be null");
        if (!variableList || !(variableList.length > 0)) throw Error("Variable list must have at least one variable");
        for (let i = 0; i < variableList.length; i++) {
            if (!variableList[i]) throw Error("No variables can be null");
        }
        if (limit <= 0) throw Error("Limit must be greater than 0");
        const func = switchReturnItemType(itemType, GraphQL.constructClientQuery, GraphQL.constructTrainerQuery, GraphQL.constructGymQuery,
            GraphQL.constructWorkoutQuery, GraphQL.constructReviewQuery, GraphQL.constructEventQuery, GraphQL.constructChallengeQuery,
            GraphQL.constructInviteQuery, GraphQL.constructPostQuery, GraphQL.constructSubmissionQuery, GraphQL.constructGroupQuery,
            GraphQL.constructCommentQuery, GraphQL.constructSponsorQuery, GraphQL.constructMessageQuery, GraphQL.constructStreakQuery,
            "GraphQL get construct Query function not implemented");
        if (func) { return func(variableList, filter, limit, nextToken); }
        else { throw Error("Unrecognized item type"); }
    }

    /**
     * Fetches a list of items that fit a query based on the inputs of that query.
     *
     * @param {string} itemType The item type to perform the query on.
     * @param {{query: string, variables: {}}} query The query payload to send through the query function.
     * @param {function({nextToken: string, items: [DatabaseObject]})} successHandler The function to handle the successfully
     * received items.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging information from the GraphQL query.
     */
    static queryItems(itemType, query, successHandler, failureHandler) {
        if (!itemType) throw Error("Item type cannot be null");
        const func = switchReturnItemType(itemType, GraphQL.queryClients, GraphQL.queryTrainers, GraphQL.queryGyms, GraphQL.queryWorkouts,
            GraphQL.queryReviews, GraphQL.queryEvents, GraphQL.queryChallenges, GraphQL.queryInvites, GraphQL.queryPosts,
            GraphQL.querySubmissions, GraphQL.queryGroups, GraphQL.queryComments, GraphQL.querySponsors, GraphQL.queryMessages,
            GraphQL.queryStreaks, "GraphQL get Query function function not implemented for type");
        if (func) { return func(query, successHandler, failureHandler); }
        else { throw Error("Unrecognized item type"); }
    }

    // =================================================================================================================
    // ~ GraphQL Specific Item Type Functions
    // =================================================================================================================

    // ~ Single Fetch Functions
    static getClient(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetClient", "getClient", {id}, variableList),
            "getClient", successHandler, failureHandler);
    }
    static getClientByUsername(username, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetClientByUsername", "getClientByUsername", {username}, variableList),
            "getClientByUsername", successHandler, failureHandler);
    }
    static getClientByFederatedID(federatedID, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetClientByFederatedID", "getClientByFederatedID", {federatedID}, variableList),
            "getClientByFederatedID", successHandler, failureHandler);
    }
    static getTrainer(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetTrainer", "getTrainer", {id}, variableList),
            "getTrainer", successHandler, failureHandler);
    }
    static getTrainerByUsername(username, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetTrainerByUsername", "getTrainerByUsername", {username}, variableList),
            "getTrainerByUsername", successHandler, failureHandler);
    }
    static getTrainerByFederatedID(federatedID, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetTrainerByFederatedID", "getTrainerByFederatedID", {federatedID}, variableList),
            "getTrainerByFederatedID", successHandler, failureHandler);
    }
    static getGym(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetGym", "getGym", {id}, variableList),
            "getGym", successHandler, failureHandler);
    }
    static getGymByUsername(username, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetGymByUsername", "getGymByUsername", {username}, variableList),
            "getGymByUsername", successHandler, failureHandler);
    }
    static getGymByFederatedID(federatedID, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetGymByFederatedID", "getGymByFederatedID", {federatedID}, variableList),
            "getGymByFederatedID", successHandler, failureHandler);
    }
    static getWorkout(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetWorkout", "getWorkout", {id}, variableList),
            "getWorkout", successHandler, failureHandler);
    }
    static getReview(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetReview", "getReview", {id}, variableList),
            "getReview", successHandler, failureHandler);
    }
    static getEvent(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetEvent", "getEvent", {id}, variableList),
            "getEvent", successHandler, failureHandler);
    }
    static getChallenge(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetChallenge", "getChallenge", {id}, variableList),
            "getChallenge", successHandler, failureHandler);
    }
    static getInvite(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetInvite", "getInvite", {id}, variableList),
            "getInvite", successHandler, failureHandler);
    }
    static getPost(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetPost", "getPost", {id}, variableList),
            "getPost", successHandler, failureHandler);
    }
    static getSubmission(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetSubmission", "getSubmission", {id}, variableList),
            "getSubmission", successHandler, failureHandler);
    }
    static getGroup(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetGroup", "getGroup", {id}, variableList),
            "getGroup", successHandler, failureHandler);
    }
    static getComment(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetComment", "getComment", {id}, variableList),
            "getComment", successHandler, failureHandler);
    }
    static getSponsor(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetSponsor", "getSponsor", {id}, variableList),
            "getSponsor", successHandler, failureHandler);
    }
    static getSponsorByUsername(username, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetSponsorByUsername", "getSponsorByUsername", {username}, variableList),
            "getSponsorByUsername", successHandler, failureHandler);
    }
    static getSponsorByFederatedID(federatedID, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetSponsorByFederatedID", "getSponsorByFederatedID", {federatedID}, variableList),
            "getSponsorByFederatedID", successHandler, failureHandler);
    }
    static getMessage(board, id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetMessage", "getMessage", {board, id}, variableList),
            "getMessage", successHandler, failureHandler);
    }
    static getStreak(id, variableList, successHandler, failureHandler) {
        return GraphQL.execute(GraphQL.constructQuery("GetStreak", "getStreak", {id}, variableList),
            "getStreak", successHandler, failureHandler);
    }

    // ~ Batch Fetch Functions
    static getClients(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrieved Items list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetClients", "getClients", null, variableList, idList, true),
            "getClients", successHandler, failureHandler);
    }
    static getTrainers(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrieved Items list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetTrainers", "getTrainers", null, variableList, idList, true),
            "getTrainers", successHandler, failureHandler);
    }
    static getGyms(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrieved Items list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetGyms", "getGyms", null, variableList, idList, true),
            "getGyms", successHandler, failureHandler);
    }
    static getWorkouts(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrieved Items list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetWorkouts", "getWorkouts", null, variableList, idList, true),
            "getWorkouts", successHandler, failureHandler);
    }
    static getReviews(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetReviews", "getReviews", null, variableList, idList, true),
            "getReviews", successHandler, failureHandler);
    }
    static getEvents(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetEvents", "getEvents", null, variableList, idList, true),
            "getEvents", successHandler, failureHandler);
    }
    static getChallenges(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetChallenges", "getChallenges", null, variableList, idList, true),
            "getChallenges", successHandler, failureHandler);
    }
    static getInvites(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetInvites", "getInvites", null, variableList, idList, true),
            "getInvites", successHandler, failureHandler);
    }
    static getPosts(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetPosts", "getPosts", null, variableList, idList, true),
            "getPosts", successHandler, failureHandler);
    }
    static getSubmissions(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetSubmissions", "getSubmissions", null, variableList, idList, true),
            "getSubmissions", successHandler, failureHandler);
    }
    static getGroups(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetGroups", "getGroups", null, variableList, idList, true),
            "getGroups", successHandler, failureHandler);
    }
    static getComments(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetComments", "getComments", null, variableList, idList, true),
            "getComments", successHandler, failureHandler);
    }
    static getSponsors(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetSponsors", "getSponsors", null, variableList, idList, true),
            "getSponsors", successHandler, failureHandler);
    }
    static getMessages(board, ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetMessages", "getMessages", {board}, variableList, idList, true),
            "getMessages", successHandler, failureHandler);
    }
    static getStreaks(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        return GraphQL.execute(GraphQL.constructQuery("GetStreaks", "getStreaks", null, variableList, idList, true),
            "getStreaks", successHandler, failureHandler);
    }

    // ~ Construct Query Functions
    static constructClientQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryClients", "queryClients", inputVariables, variableList, filter, false, true);
    }
    static constructTrainerQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryTrainers", "queryTrainers", inputVariables, variableList, filter, false, true);
    }
    static constructGymQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryGyms", "queryGyms", inputVariables, variableList, filter, false, true);
    }
    static constructWorkoutQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryWorkouts", "queryWorkouts", inputVariables, variableList, filter, false, true);
    }
    static constructReviewQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryReviews", "queryReviews", inputVariables, variableList, filter, false, true);
    }
    static constructEventQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryEvents", "queryEvents", inputVariables, variableList, filter, false, true);
    }
    static constructChallengeQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryChallenges", "queryChallenges", inputVariables, variableList, filter, false, true);
    }
    static constructInviteQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryInvites", "queryInvites", inputVariables, variableList, filter, false, true);
    }
    static constructPostQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryPosts", "queryPosts", inputVariables, variableList, filter, false, true);
    }
    static constructSubmissionQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QuerySubmissions", "querySubmissions", inputVariables, variableList, filter, false, true);
    }
    static constructGroupQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryGroups", "queryGroups", inputVariables, variableList, filter, false, true);
    }
    static constructCommentQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryComments", "queryComments", inputVariables, variableList, filter, false, true);
    }
    static constructSponsorQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QuerySponsors", "querySponsors", inputVariables, variableList, filter, false, true);
    }
    static constructMessageQuery(board, variableList, filter, limit, nextToken) {
        const inputVariables = {board};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryMessages", "queryMessages", inputVariables, variableList, filter, false, true);
    }
    static constructStreakQuery(variableList, filter, limit, nextToken) {
        const inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryStreaks", "queryStreaks", inputVariables, variableList, filter, false, true);
    }

    // ~ Query Fetch Functions
    static queryClients(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryClients", successHandler, failureHandler);
    }
    static queryTrainers(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryTrainers", successHandler, failureHandler);
    }
    static queryGyms(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryGyms", successHandler, failureHandler);
    }
    static queryWorkouts(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryWorkouts", successHandler, failureHandler);
    }
    static queryReviews(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryReviews", successHandler, failureHandler);
    }
    static queryEvents(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryEvents", successHandler, failureHandler);
    }
    static queryChallenges(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryChallenges", successHandler, failureHandler);
    }
    static queryInvites(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryInvites", successHandler, failureHandler);
    }
    static queryPosts(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryPosts", successHandler, failureHandler);
    }
    static querySubmissions(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "querySubmissions", successHandler, failureHandler);
    }
    static queryGroups(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryGroups", successHandler, failureHandler);
    }
    static queryComments(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryComments", successHandler, failureHandler);
    }
    static querySponsors(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "querySponsors", successHandler, failureHandler);
    }
    static queryMessages(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryMessages", successHandler, failureHandler);
    }
    static queryStreaks(query, successHandler, failureHandler) {
        return GraphQL.execute(query, "queryStreaks", successHandler, failureHandler);
    }

    /**
     *
     * @param {{}} filterJSON The filter in JSON format using $ in front of variable names, and using and, or, and not
     * to consolidate.
     * @param {{}} variableValues The exact values for the variables in the JSON.
     * @return {{parameterString: string, parameters: {}}} The object to use in the actual usage of the filter.
     * @example
     *      const filter = generateFilter({
     *          and: [
     *              {
     *                  ifCompleted: {
     *                      eq: "$ifCompleted"
     *                  }
     *              },
     *              {
     *                  or: [
     *                      {
     *                          access: {
     *                              eq: "$access"
     *                          }
     *                      },
     *                      {
     *                          friends: {
     *                              contains: "$id"
     *                          }
     *                      }
     *                  ]
     *              }
     *          ]
     *      },{
     *          ifCompleted: "false",
     *          access: "public",
     *          id: GraphQL.props.user.id
     *      });
     */
    static generateFilter(filterJSON, variableValues) {
        return {
            // Add the parameter value and also take out all the quotation marks from the JSON
            parameterString: "filter: " + JSON.stringify(filterJSON).replace(/['"]+/g, ''),
            parameters: variableValues
        }
    }

    /**
     * Generates an ID List object that is usable by the query string generator in order to properly use the IDs in a
     * query.
     *
     * @param {[string]} ids The IDs to reference in the query.
     * @return {{parameterString: string, parameters: {}}} The properly formatted object for the query string generator
     * to use.
     */
    static generateIDList(ids) {
        let idListString = "ids: [";
        const parameters = {};
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const idName = "id" + i;
            parameters[idName] = id;
            idListString += ("$" + idName + ", ");
        }
        idListString += "]";
        return {
            parameterString: idListString,
            parameters
        }
    }
    // TODO GraphQL only supports input String! regular types. Reason to change?
    // TODO Make GraphQL more resilient to an empty filter?
    /**
     * Constructs a query object in order to be able to send through the payload of the request using the parameters to
     * specifically define the query expression.
     *
     * @param {string} queryName The name of this specific query to send.
     * @param {string} queryFunction The name of the query function to use in the GraphQL endpoint.
     * @param {Object<string, string>} inputVariables The names and values of all the input variables for the query.
     * @param {[string]} outputVariables The variables to receive from the GraphQL query.
     * @param {{parameterString: string, parameters: {}}} filter The defined filter to receive only wanted elements.
     * @param {boolean} ifBatch If this query is a batch fetch operation as opposed to a regular fetch.
     * @param {boolean} ifQuery If this query function is an actual query as opposed to a fetch.
     * @return {{query: string, variables: {}}} The properly formatted query object for executing the payload.
     */
    static constructQuery(queryName, queryFunction, inputVariables, outputVariables, filter = null, ifBatch = false, ifQuery = false) {
        let query = '';
        // Filter out the null'ed variables
        let finalInputVariables;
        if (filter) {
            finalInputVariables = {...inputVariables, ...filter.parameters};
        }
        else {
            finalInputVariables = inputVariables;
        }
        let ifFirst = true;
        query += 'query ' + queryName;
        if (!_.isEmpty(finalInputVariables)) {
            query += '(';
            for (let variable in finalInputVariables) {
                if (!ifFirst) {
                    query += ", ";
                }
                query += '$' + variable + ': ';
                if (variable === "limit") {
                    query += 'Int';
                }
                else if (variable === "ids") {
                    query += '[String]!';
                }
                else {
                    query += 'String!';
                }
                ifFirst = false;
            }
            query += ')';
        }
        query += ' {\n    ' + queryFunction;
        ifFirst = true;
        if (!_.isEmpty(inputVariables) || filter) {
            query += '(';
            if (filter) {
                query += filter.parameterString;
            }
            for (let variable in inputVariables) {
                if (!ifFirst || filter) {
                    query += ', ';
                }
                query += variable + ": $" + variable;
                ifFirst = false;
            }
            query += ')';
        }
        query += ' {\n';
        if (ifQuery || ifBatch) {
            query += '        items {\n';
        }
        for (let i in outputVariables) {
            if (outputVariables.hasOwnProperty(i)) {
                if (ifQuery || ifBatch) {
                    query += '    ';
                }
                query += '        ' + outputVariables[i] + '\n';
            }
        }
        if (ifQuery) {
            query += '        }\n        nextToken\n';
        }
        else if (ifBatch) {
            query += '        }\n        unretrievedItems {\n            id\n        }\n';
        }
        query += '    }\n}';

        return {
            query: query,
            variables: finalInputVariables
        };
    }

    /**
     * Gets the next token String from the next token object.
     *
     * TODO I don't remember what this does actually...
     *
     * @param {string} nextToken The next token received from the query.
     * @return {string} TODO The next token but never null?
     */
    static getNextTokenString(nextToken) { return nextToken ? nextToken : "null"; }

    /**
     * Gets a normalized query (which defines the entire query for the operation, making sure the next token simply
     * defines which part of the query to get instead of the whole query). This allows us to better organize the query
     * operations in the cache.
     *
     * @param {{query: string, variables: {}}} query The query object for the operation.
     * @return {{query: string, variables: {nextToken: string}}}
     */
    static getNormalizedQuery(query) {
        return {
            query: query.query,
            variables: {
                ...query.variables,
                nextToken: "not_defined"
            }
        };
    }

    /**
     * Gets the normalized query string given the normalized query object.
     *
     * @param {{variables: {nextToken: "not_defined"}}} normalizedQuery The normalized query object.
     * @return {string} The string which defines the key for this query.
     */
    static getNormalizedQueryString(normalizedQuery) {
        return JSON.stringify(normalizedQuery);
    }

    /**
     * Gets the actual properly formatted query from the normalized query and the next token to use.
     *
     * @param {{query: string, variables: {nextToken: "not_defined"}}} normalizedQuery The query minus the nextToken.
     * @param {string} nextToken The next token that defines the query.
     * @return {{query: string, variables: {nextToken: string|null}}}
     */
    static getQueryFromNormalizedQuery(normalizedQuery, nextToken) {
        return {
            query: normalizedQuery.query,
            variables: {
                ...normalizedQuery.variables,
                nextToken
            }
        };
    }

    /**
     * Compresses the query results by only including the ids of the objects, as opposed to the entire objects
     * themselves.
     *
     * @param {{items: [{}], nextToken: string}} queryResult The direct query result object from the query.
     * @return {{ids: [string], nextToken: string}} The compressed query results.
     */
    static getCompressedFromQueryResult(queryResult) {
        const items = queryResult.items;
        const ids = [];
        if (items) {
            for (let i = 0; i < items.length; i++) {
                ids.push(items[i].id);
            }
        }
        return {
            ids,
            nextToken: queryResult.nextToken
        };
    }

    /**
     * Gets the query results from the compressed query placed into the cache.
     *
     * @param {{ids: [string], nextToken: string}} compressedResult The compressed query result placed in the database.
     * @param itemTypeCache
     * @return {{items: Array, nextToken: *}}
     */
    static getQueryResultFromCompressed(compressedResult, itemTypeCache) {
        const ids = compressedResult.ids;
        const items = [];
        for (let i = 0; i < ids.length; i++) {
            const item = itemTypeCache[ids[i]];
            if (item) {
                items.push(item);
            }
        }
        return {
            items,
            nextToken: compressedResult.nextToken
        };
    }

    /**
     * Executes a given query using the payload given.
     *
     * @param {{query: string, variables: {}}} query
     * @param {string} queryFunctionName The name of the query function to execute within the GraphQL endpoint.
     * @param {function(*)} successHandler The function that handles the successful results of the query request.
     * @param {function(error)} failureHandler The function that handles any errors that may arise.
     * @return {*} Debugging information from the GraphQL query.
     */
    static execute(query, queryFunctionName, successHandler, failureHandler) {
        log&&console.log("Sending ql = " + query.query + "\nWith variables = " + JSON.stringify(query.variables));
        debugAlert("Sending ql = " + query.query + "\nWith variables = " + JSON.stringify(query.variables));
        TestHelper.ifTesting || API.graphql(graphqlOperation(query.query, query.variables)).then((data) => {
            log&&console.log("GraphQL operation succeeded!");
            if (!data.data || !data.data[queryFunctionName]) {
                log&&console.log("Object returned nothing!!! Something wrong?");
                if (successHandler) { successHandler(null); }
                return;
            }
            log&&console.log("Returned: " + JSON.stringify(data.data[queryFunctionName]));
            debugAlert("Returned: " + JSON.stringify(data.data[queryFunctionName]));
            if (successHandler) { successHandler(data.data[queryFunctionName]); }
        }).catch((error) => {
            err&&console.error("GraphQL operation failed...");
            err&&console.error(error);
            if (failureHandler) { failureHandler(error); }
        });
        if (TestHelper.ifTesting) {
            if (queryFunctionName.substring(0, 5) === "query") {
                successHandler && successHandler({nextToken: null, items: []});
            }
            else {
                successHandler && successHandler({});
            }
            return query;
        }
    }
}

export default GraphQL;

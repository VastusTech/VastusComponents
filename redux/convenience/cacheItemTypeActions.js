import {
    fetchItem, fetchItemQuery,
    fetchItems,
    forceFetchItem, forceFetchItemQuery,
    forceFetchItems,
    subscribeFetchItem
} from "../actions/cacheActions";
// import type Client from "../../types/Client";
// import type Trainer from "../../types/Trainer";

/**
 * Fetches a Client from the database, making sure that it hasn't already fetched the attributes in the list before.
 *
 * @param {string} id The id of the Client to fetch.
 * @param {[string]} variableList The list of variables to fetch for the Client.
 * @param {function(Client)} dataHandler The function to handle the newly fetched Client with.
 * @param {function(error)} failureHandler The function to handle any errors that occur with.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function fetchClient(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Client", variableList, dataHandler, failureHandler);
}
/**
 * Fetches a Trainer from the database, making sure that it hasn't already fetched the attributes in the list before.
 *
 * @param {string} id The id of the Trainer to fetch.
 * @param {[string]} variableList The list of variables to fetch for the Trainer.
 * @param {function(Trainer)} dataHandler The function to handle the newly fetched Trainer with.
 * @param {function(error)} failureHandler The function to handle any errors that occur with.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function fetchTrainer(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Trainer", variableList, dataHandler, failureHandler);
}
export function fetchGym(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Gym", variableList, dataHandler, failureHandler);
}
export function fetchWorkout(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Workout", variableList, dataHandler, failureHandler);
}
export function fetchReview(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Review", variableList, dataHandler, failureHandler);
}
export function fetchEvent(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Event", variableList, dataHandler, failureHandler);
}
export function fetchChallenge(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Challenge", variableList, dataHandler, failureHandler);
}
export function fetchInvite(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Invite", variableList, dataHandler, failureHandler);
}
export function fetchPost(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Post", variableList, dataHandler, failureHandler);
}
export function fetchSubmission(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Submission", variableList, dataHandler, failureHandler);
}
export function fetchGroup(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Group", variableList, dataHandler, failureHandler);
}
export function fetchComment(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Comment", variableList, dataHandler, failureHandler);
}
export function fetchSponsor(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Sponsor", variableList, dataHandler, failureHandler);
}
export function fetchStreak(id, variableList, dataHandler, failureHandler) {
    return fetchItem(id, "Streak", variableList, dataHandler, failureHandler);
}
export function subscribeFetchClient(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Client", variableList, dataHandler, failureHandler);
}
export function subscribeFetchTrainer(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Trainer", variableList, dataHandler, failureHandler);
}
export function subscribeFetchGym(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Gym", variableList, dataHandler, failureHandler);
}
export function subscribeFetchWorkout(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Workout", variableList, dataHandler, failureHandler);
}
export function subscribeFetchReview(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Review", variableList, dataHandler, failureHandler);
}
export function subscribeFetchEvent(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Event", variableList, dataHandler, failureHandler);
}
export function subscribeFetchChallenge(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Challenge", variableList, dataHandler, failureHandler);
}
export function subscribeFetchInvite(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Invite", variableList, dataHandler, failureHandler);
}
export function subscribeFetchPost(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Post", variableList, dataHandler, failureHandler);
}
export function subscribeFetchSubmission(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Submission", variableList, dataHandler, failureHandler);
}
export function subscribeFetchGroup(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Group", variableList, dataHandler, failureHandler);
}
export function subscribeFetchComment(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Comment", variableList, dataHandler, failureHandler);
}
export function subscribeFetchSponsor(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Sponsor", variableList, dataHandler, failureHandler);
}
export function subscribeFetchStreak(id, variableList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Streak", variableList, dataHandler, failureHandler);
}
export function forceFetchClient(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Client", variableList, dataHandler, failureHandler);
}
export function forceFetchTrainer(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Trainer", variableList, dataHandler, failureHandler);
}
export function forceFetchGym(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Gym", variableList, dataHandler, failureHandler);
}
export function forceFetchWorkout(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Workout", variableList, dataHandler, failureHandler);
}
export function forceFetchReview(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Review", variableList, dataHandler, failureHandler);
}
export function forceFetchEvent(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Event", variableList, dataHandler, failureHandler);
}
export function forceFetchChallenge(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Challenge", variableList, dataHandler, failureHandler);
}
export function forceFetchInvite(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Invite", variableList, dataHandler, failureHandler);
}
export function forceFetchPost(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Post", variableList, dataHandler, failureHandler);
}
export function forceFetchSubmission(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Submission", variableList, dataHandler, failureHandler);
}
export function forceFetchGroup(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Group", variableList, dataHandler, failureHandler);
}
export function forceFetchComment(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Comment", variableList, dataHandler, failureHandler);
}
export function forceFetchSponsor(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Sponsor", variableList, dataHandler, failureHandler);
}
export function forceFetchStreak(id, variableList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Streak", variableList, dataHandler, failureHandler);
}
export function fetchClients(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Client", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchTrainers(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Trainer", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchGyms(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Gym", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchWorkouts(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Workout", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchReviews(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Review", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchEvents(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Event", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchChallenges(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Challenge", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchInvites(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Invite", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchPosts(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Post", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchSubmissions(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Submission", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchGroups(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Group", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchComments(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Comment", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchSponsors(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Sponsor", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchStreaks(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Streak", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchClients(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Client", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchTrainers(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Trainer", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchGyms(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Gym", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchWorkouts(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Workout", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchReviews(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Review", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchEvents(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Event", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchChallenges(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Challenge", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchInvites(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Invite", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchPosts(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Post", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchSubmissions(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Submission", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchGroups(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Group", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchComments(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Comment", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchSponsors(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Sponsor", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchStreaks(ids, variableList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Streak", variableList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchClientQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    // console.log("fetching clients");
    return fetchItemQuery("Client", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchTrainerQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Trainer", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchGymQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Gym", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchWorkoutQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Workout", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchReviewQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Review", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchEventQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Event", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchChallengeQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Challenge", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchInviteQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Invite", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchPostQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Post", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchSubmissionQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Submission", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchGroupQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Group", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchCommentQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Comment", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchSponsorQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Sponsor", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchStreakQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Streak", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchClientQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Client", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchTrainerQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Trainer", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchGymQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Gym", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchWorkoutQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Workout", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchReviewQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Review", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchEventQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Event", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchChallengeQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Challenge", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchInviteQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Invite", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchPostQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Post", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchSubmissionQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Submission", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchGroupQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Group", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchCommentQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Comment", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchSponsorQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Sponsor", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchStreakQuery(variableList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Streak", variableList, filter, limit, nextToken, dataHandler, failureHandler);
}

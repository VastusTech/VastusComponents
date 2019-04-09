import {
    fetchItem, fetchItemQuery,
    fetchItems,
    forceFetchItem, forceFetchItemQuery,
    forceFetchItems, putItem, putItemQuery,
    subscribeFetchItem
} from "../redux_actions/cacheActions";

export function fetchClient(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Client", variablesList, dataHandler, failureHandler);
}
export function fetchTrainer(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Trainer", variablesList, dataHandler, failureHandler);
}
export function fetchGym(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Gym", variablesList, dataHandler, failureHandler);
}
export function fetchWorkout(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Workout", variablesList, dataHandler, failureHandler);
}
export function fetchReview(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Review", variablesList, dataHandler, failureHandler);
}
export function fetchEvent(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Event", variablesList, dataHandler, failureHandler);
}
export function fetchChallenge(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Challenge", variablesList, dataHandler, failureHandler);
}
export function fetchInvite(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Invite", variablesList, dataHandler, failureHandler);
}
export function fetchPost(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Post", variablesList, dataHandler, failureHandler);
}
export function fetchSubmission(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Submission", variablesList, dataHandler, failureHandler);
}
export function fetchGroup(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Group", variablesList, dataHandler, failureHandler);
}
export function fetchComment(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Comment", variablesList, dataHandler, failureHandler);
}
export function fetchSponsor(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Sponsor", variablesList, dataHandler, failureHandler);
}
export function fetchStreak(id, variablesList, dataHandler, failureHandler) {
    return fetchItem(id, "Streak", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchClient(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Client", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchTrainer(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Trainer", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchGym(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Gym", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchWorkout(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Workout", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchReview(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Review", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchEvent(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Event", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchChallenge(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Challenge", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchInvite(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Invite", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchPost(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Post", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchSubmission(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Submission", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchGroup(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Group", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchComment(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Comment", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchSponsor(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Sponsor", variablesList, dataHandler, failureHandler);
}
export function subscribeFetchStreak(id, variablesList, dataHandler, failureHandler) {
    return subscribeFetchItem(id, "Streak", variablesList, dataHandler, failureHandler);
}
export function forceFetchClient(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Client", variablesList, dataHandler, failureHandler);
}
export function forceFetchTrainer(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Trainer", variablesList, dataHandler, failureHandler);
}
export function forceFetchGym(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Gym", variablesList, dataHandler, failureHandler);
}
export function forceFetchWorkout(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Workout", variablesList, dataHandler, failureHandler);
}
export function forceFetchReview(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Review", variablesList, dataHandler, failureHandler);
}
export function forceFetchEvent(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Event", variablesList, dataHandler, failureHandler);
}
export function forceFetchChallenge(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Challenge", variablesList, dataHandler, failureHandler);
}
export function forceFetchInvite(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Invite", variablesList, dataHandler, failureHandler);
}
export function forceFetchPost(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Post", variablesList, dataHandler, failureHandler);
}
export function forceFetchSubmission(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Submission", variablesList, dataHandler, failureHandler);
}
export function forceFetchGroup(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Group", variablesList, dataHandler, failureHandler);
}
export function forceFetchComment(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Comment", variablesList, dataHandler, failureHandler);
}
export function forceFetchSponsor(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Sponsor", variablesList, dataHandler, failureHandler);
}
export function forceFetchStreak(id, variablesList, dataHandler, failureHandler) {
    return forceFetchItem(id, "Streak", variablesList, dataHandler, failureHandler);
}
export function fetchClients(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Client", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchTrainers(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Trainer", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchGyms(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Gym", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchWorkouts(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Workout", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchReviews(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Review", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchEvents(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Event", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchChallenges(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Challenge", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchInvites(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Invite", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchPosts(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Post", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchSubmissions(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Submission", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchGroups(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Group", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchComments(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Comment", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchSponsors(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Sponsor", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchStreaks(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return fetchItems(ids, "Streak", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchClients(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Client", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchTrainers(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Trainer", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchGyms(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Gym", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchWorkouts(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Workout", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchReviews(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Review", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchEvents(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Event", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchChallenges(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Challenge", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchInvites(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Invite", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchPosts(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Post", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchSubmissions(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Submission", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchGroups(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Group", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchComments(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Comment", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchSponsors(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Sponsor", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function forceFetchStreaks(ids, variablesList, startIndex, maxFetch, dataHandler, failureHandler) {
    return forceFetchItems(ids, "Streak", variablesList, startIndex, maxFetch, dataHandler, failureHandler);
}
export function fetchClientQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    // console.log("fetching clients");
    return fetchItemQuery("Client", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchTrainerQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Trainer", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchGymQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Gym", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchWorkoutQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Workout", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchReviewQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Review", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchEventQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Event", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchChallengeQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Challenge", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchInviteQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Invite", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchPostQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Post", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchSubmissionQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Submission", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchGroupQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Group", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchCommentQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Comment", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchSponsorQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Sponsor", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function fetchStreakQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return fetchItemQuery("Streak", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchClientQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Client", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchTrainerQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Trainer", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchGymQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Gym", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchWorkoutQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Workout", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchReviewQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Review", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchEventQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Event", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchChallengeQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Challenge", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchInviteQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Invite", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchPostQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Post", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchSubmissionQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Submission", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchGroupQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Group", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchCommentQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Comment", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchSponsorQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Sponsor", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function forceFetchStreakQuery(variablesList, filter, limit, nextToken, dataHandler, failureHandler) {
    return forceFetchItemQuery("Streak", variablesList, filter, limit, nextToken, dataHandler, failureHandler);
}
export function putClient(client) {
    return putItem(client, "Client");
}
export function putTrainer(trainer) {
    return putItem(trainer, "Trainer");
}
export function putGym(gym) {
    return putItem(gym, "Gym");
}
export function putWorkout(workout) {
    return putItem(workout, "Workout");
}
export function putReview(review) {
    return putItem(review, "Review");
}
export function putEvent(event) {
    return putItem(event, "Event");
}
export function putChallenge(challenge) {
    return putItem(challenge, "Challenge");
}
export function putInvite(invite) {
    return putItem(invite, "Invite");
}
export function putPost(post) {
    return putItem(post, "Post");
}
export function putSubmission(submission) {
    return putItem(submission, "Submission");
}
export function putGroup(group) {
    return putItem(group, "Group");
}
export function putComment(comment) {
    return putItem(comment, "Comment");
}
export function putSponsor(sponsor) {
    return putItem(sponsor, "Sponsor");
}
export function putStreak(streak) {
    return putItem(streak, "Streak");
}
// TODO Consider how this might scale? Another LRU Cache here?
export function putClientQuery(queryString, queryResult) {
    return putItemQuery("Client", queryString, queryResult);
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
export function putSubmissionQuery(queryString, queryResult) {
    return {
        type: "FETCH_SUBMISSION_QUERY",
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
export function clearSubmissionQuery() {
    return {
        type: "CLEAR_SUBMISSION_QUERY",
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
// function getQueryCacheName(itemType)  {
//     return switchReturnItemType(itemType, "clientQueries", "trainerQueries", "gymQueries", "workoutQueries",
//         "reviewQueries", "eventQueries", "challengeQueries", "inviteQueries", "postQueries", "submissionQueries",
//         "groupQueries", "commentQueries", "sponsorQueries", null, "streakQueries",
//         "Retrieve query cache not implemented");
// }
// export function getPutItemFunction(itemType) {
//     return switchReturnItemType(itemType, putClient, putTrainer, putGym, putWorkout, putReview, putEvent, putChallenge, putInvite,
//         putPost, putSubmission, putGroup, putComment, putSponsor, null, putStreak, "Retrieve put item function item type not implemented");
// }
// function getForceFetchItemFunction(itemType) {
//     return switchReturnItemType(itemType, forceFetchClient, forceFetchTrainer, forceFetchGym, forceFetchWorkout,
//         forceFetchReview, forceFetchEvent, forceFetchChallenge, forceFetchInvite, forceFetchPost, forceFetchSubmission,
//         forceFetchGroup, forceFetchComment, forceFetchSponsor, null, forceFetchStreak,
//         "Retrieve force fetch item function not implemented for item type");
// }
// function getSubscribeFetchItemFunction(itemType) {
//     return switchReturnItemType(itemType, subscribeFetchClient, subscribeFetchTrainer, subscribeFetchGym,
//         subscribeFetchWorkout, subscribeFetchReview, subscribeFetchEvent, subscribeFetchChallenge, subscribeFetchInvite,
//         subscribeFetchPost, subscribeFetchSubmission, subscribeFetchGroup, subscribeFetchComment, subscribeFetchSponsor,
//         null, subscribeFetchStreak, "Retrieve subscribe fetch item function not implemented for item type");
// }
// export function getFetchQueryFunction(itemType) {
//     return switchReturnItemType(itemType, fetchClientQuery, fetchTrainerQuery, fetchGymQuery, fetchWorkoutQuery,
//         fetchReviewQuery, fetchEventQuery, fetchChallengeQuery, fetchInviteQuery, fetchPostQuery, fetchSubmissionQuery,
//         fetchGroupQuery, fetchCommentQuery, fetchSponsorQuery, null, fetchStreakQuery,
//         "Retrieve fetch query function item type not implemented");
// }
// export function getPutQueryFunction(itemType) {
//     return switchReturnItemType(itemType, putClientQuery, putTrainerQuery, putGymQuery, putWorkoutQuery, putReviewQuery,
//         putEventQuery, putChallengeQuery, putInviteQuery, putPostQuery, putSubmissionQuery, putGroupQuery,
//         putCommentQuery, putSponsorQuery, null, putStreakQuery, "Retrieve Put Query Function not implemented");
// }
// export function getClearQueryFunction(itemType) {
//     return switchReturnItemType(itemType, clearClientQuery, clearTrainerQuery, clearGymQuery, clearWorkoutQuery,
//         clearReviewQuery, clearEventQuery, clearChallengeQuery, clearInviteQuery, clearPostQuery, clearSubmissionQuery,
//         clearGroupQuery, clearCommentQuery, clearSponsorQuery, null, clearStreakQuery,
//         "Retrieve Clear Query Function not implemented");
// }

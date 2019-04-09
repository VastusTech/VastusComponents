import {midnightsPassed, parseISOString} from "./TimeHelper";
import {err} from "../../Constants";

const numberOfUpdateSpansPassed = (lastUpdated, updateSpanType) => {
    const lastUpdatedDate = parseISOString(lastUpdated);
    if (updateSpanType === "daily") {
        return midnightsPassed(lastUpdatedDate);
    }
    return -1;
};

/**
 * TODO
 *
 * @param streak
 * @return {boolean}
 */
export const ifStreakExpired = (streak) => {
    if (streak.lastUpdated && streak.updateSpanType && streak.updateInterval) {
        const spansPassed = numberOfUpdateSpansPassed(streak.lastUpdated, streak.updateSpanType);
        if (spansPassed < 2 * streak.updateInterval) {
            return false;
        }
    }
    else {
        err&&console.error("Forgot to fetch streak lastUpdated, updateSpanType, and/or updateInterval...");
    }
    return true;
};
// TODO export const streakN = (streak) => {
export const streakUpdateInfo = (streakN, streakUpdateInterval, streakUpdateSpanType) => {
    let pluralSubmission = streakN === "1" || streakN === 1 ? "" : "s";
    let pluralInterval = streakUpdateInterval === "1" || streakUpdateInterval === 1 ? "" : "s";
    let interval;
    switch (streakUpdateSpanType) {
        case "hourly":
            interval = "hour";
            break;
        case "daily":
            interval = "day";
            break;
        case "weekly":
            interval = "week";
            break;
        case "monthly":
            interval = "month";
            break;
        case "yearly":
            interval = "year";
            break;
        default:
            err&&console.error("Unrecognized streak update interval = " + streakUpdateInterval);
            interval = "time";
    }
    streakUpdateInterval = streakUpdateInterval === "1" || streakUpdateInterval === 1 ? "" : streakUpdateInterval + " ";
    return "Complete " + streakN + " Submission" + pluralSubmission + " every " + streakUpdateInterval +
        interval + pluralInterval;
};

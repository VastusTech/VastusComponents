import {midnightsPassed, parseISOString} from "./TimeHelper";
import {err} from "../../Constants";

/**
 * Calculates the number of update spans that have passed since the "last updated" field in a Streak.
 *
 * @param {string} lastUpdated The ISO string for when the Streak was last updated.
 * @param {string} updateSpanType At what interval the Streak updates.
 * @return {number} The number of update spans that have passed thus far.
 */
const numberOfUpdateSpansPassed = (lastUpdated, updateSpanType) => {
    const lastUpdatedDate = parseISOString(lastUpdated);
    if (updateSpanType === "daily") {
        return midnightsPassed(lastUpdatedDate);
    }
    return -1;
};

/**
 * Calculates whether or not the Streak has expired based on the update types and when the Streak was last updated.
 *
 * @param {{lastUpdated: string, updateSpanType: string, updateInterval: string}} streak The Streak object in inquiry.
 * @return {boolean} If the Streak has expired.
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

/**
 * Returns a properly formatted string for what the Streak interval information is.
 *
 * @param {number} streakN How many submissions to do until one Streak N is counted.
 * @param {string} streakUpdateInterval How many update spans pass for a Streak update.
 * @param {string} streakUpdateSpanType The interval of the span. (i.e. "daily", "hourly", ...).
 * @return {string} The properly formed description of the meaning of the values.
 */
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

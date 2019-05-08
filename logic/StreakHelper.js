import {
    hourStartsPassed,
    midnightsPassed,
    mondaysPassed,
    parseISOString,
    startsOfMonthPassed,
    startsOfYearPassed
} from "./TimeHelper";
import {err} from "../../Constants";
import type Streak from "../types/Streak";

/**
 * Gets the Streak info for the given Streak object.
 *
 * @param {Streak} streak The streak object to get the info for.
 * @returns {"not_started" | "completed" | "still_completing" | "not_completed" | "broken"} The string to indicate
 * the status of the User's current Streak for the object.
 */
export const streakInfo = (streak: Streak) => {
    if (streak) {
        const spans = numberOfUpdateSpansPassed(streak.lastAttemptStarted, streak.updateSpanType);
        if (streak.currentN === "0" || streak.currentN === 0) {
            return "not_started";
        } else if (spans < parseInt(streak.updateInterval)) {
            if (streak.currentN >= streak.streakN) {
                return "completed";
            } else {
                return "still_completing_attempt";
            }
        } else if (spans < (2 * parseInt(streak.updateInterval))) {
            if (streak.currentN >= streak.streakN) {
                return "not_completed";
            } else {
                return "broken";
            }
        } else {
            return "broken";
        }
    }
    return null;
};

/**
 * Calculates the number of update spans that have passed since the "last updated" field in a Streak.
 *
 * @param {string} lastAttemptStarted The ISO string for when the Streak attempt was last started.
 * @param {string} updateSpanType At what interval the Streak updates.
 * @return {number} The number of update spans that have passed thus far.
 */
export const numberOfUpdateSpansPassed = (lastAttemptStarted, updateSpanType) => {
    const lastAttemptStartedDate = parseISOString(lastAttemptStarted);
    switch (updateSpanType) {
        case "hourly":
            return hourStartsPassed(lastAttemptStartedDate);
        case "daily":
            return midnightsPassed(lastAttemptStartedDate);
        case "weekly":
            return mondaysPassed(lastAttemptStartedDate);
        case "monthly":
            return startsOfMonthPassed(lastAttemptStartedDate);
        case "yearly":
            return startsOfYearPassed(lastAttemptStartedDate);
        default:
            err&&console.error("Unrecognized update span type = " + updateSpanType);
            return -1;
    }
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

import {midnightsPassed, parseISOString} from "./TimeHelper";
import {err} from "../../Constants";

const numberOfUpdateSpansPassed = (lastUpdated, updateSpanType) => {
    const lastUpdatedDate = parseISOString(lastUpdated);
    if (updateSpanType === "daily") {
        return midnightsPassed(lastUpdatedDate);
    }
    return -1;
};
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

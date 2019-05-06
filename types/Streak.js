import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Streak = {
    ...$Shape<DatabaseObject>,
    id: string,
    item_type: string,
    marker: number,
    time_created: string,
    owner: string,
    about: string,
    N: number,
    bestN: number,
    currentN: number,
    lastUpdated: string,
    lastAttemptStarted: string,
    streakType: string,
    updateSpanType: string,
    updateInterval: string,
    streakN: string,
}
export default Streak;
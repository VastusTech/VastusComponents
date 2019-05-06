import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Review = {
    ...$Shape<DatabaseObject>,
    id: string,
    item_type: string,
    marker: number,
    time_created: string,
    by: string,
    about: string,
    friendlinessRating: string,
    effectivenessRating: string,
    reliabilityRating: string,
    description: string,

}
export default Review;

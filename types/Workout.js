import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Workout = {
  ...$Shape<DatabaseObject>,
  id: string,
  item_type: string,
  marker: number,
  time_created: string,
  time: string,
  trainer: string,
  clients: [string],
  capacity: string,
  gym: string,
  sticker: string,
  intensity: string,
  missingReviews: [string],
  price: string,
  ifCompleted: string,
}
export default Workout;

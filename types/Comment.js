import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Comment = {
  ...$Shape<DatabaseObject>,
  id: string,
  item_type: string,
  marker: number,
  time_created: string,
  by: string,
  to: string,
  comment: string,
  liked: [string],
  comments: [string],

}
export default Comment;
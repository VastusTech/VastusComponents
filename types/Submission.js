import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Submission = {
  ...$Shape<DatabaseObject>,
  id: string,
  item_type: string,
  marker: number,
  time_created: string,
  by: string,
  about: string,
  description: string,
  picturePaths: [string],
  videoPaths: [string],
  likes: [string],
  comments: [string],
  approved: string,
}
export default Submission;

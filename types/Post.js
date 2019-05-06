import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Post = {
    ...$Shape<DatabaseObject>,
    id: string,
    item_type: string,
    marker: number,
    time_created: string,
    by: string,
    about: string,
    access: string,
    description: string,
    postType: string,
    picturePaths: [string],
    videoPaths: [string],
    likes: [string],
    comments: [string],
    group: string,
}
export default Post;

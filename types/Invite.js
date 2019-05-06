import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Invite = {
    ...$Shape<DatabaseObject>,
    id: string,
    item_type: string,
    marker: number,
    time_created: string,
    from: string,
    to: string,
    inviteType: string,
    about: string,
    description: string,
}
export default Invite;

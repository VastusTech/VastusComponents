/**
 * TODO
 */
import type DatabaseObject from "./DatabaseObject";

type Event = {
    ...$Shape<DatabaseObject>,
    id: string,
    item_type: string,
    marker: number,
    time_created: string,
    title: string,
    description: string,
    owner: string,
    time: string,
    address: string,
    members: [string],
    invitedMembers: [string],
    memberRequests: [string],
    receivedInvites: [string],
    capacity: string,
    ifCompleted: string,
    access: string,
    restriction: string,
    challenge: string,
    group: string,
    tags: [string],
}
export default Event;
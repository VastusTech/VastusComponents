import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Group = {
    ...$Shape<DatabaseObject>,
    id: string,
    item_type: string,
    marker: number,
    time_created: string,
    title: string,
    description: string,
    motto: string,
    groupImagePath: string,
    trainers: [string],
    owners: [string],
    members: [string],
    invitedMembers: [string],
    memberRequests: [string],
    receivedInvites: [string],
    access: string,
    restriction: string,
    groupPRs: [string],
    events: [string],
    completedEvents: [string],
    challenges: [string],
    completedChallenges: [string],
    posts: [string],
    tags: [string],
    streaks: [string],
}
export default Group;

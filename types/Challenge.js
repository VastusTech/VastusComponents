import type DatabaseObject from "./DatabaseObject";

/**
 * TODO
 */
type Challenge = {
  ...$Shape<DatabaseObject>,
  id: string,
  item_type: string,
  marker: number,
  time_created: string,
  title: string,
  description: string,
  owner: string,
  endTime: string,
  members: string,
  invitedMembers: [string],
  memberRequests: [string],
  receivedInvites: [string],
  capacity: string,
  ifCompleted: string,
  access: string,
  restriction: string,
  events: [string],
  completedEvents: [string],
  group: string,
  goal: string,
  challengeType: string,
  difficulty: string,
  winner: string,
  prize: string,
  tags: [string],
  submissions: [string],
  streaks: [string],
  streakUpdateSpanType: string,
  streakUpdateInterval: string,
  streakN: string,
}
export default Challenge;
/**
 * TODO
 */
type Message = {
  id: string,
  board: string,
  item_type: string,
  marker: number,
  time_created: string,
  from: string,
  type: string,
  name: string,
  profileImagePath: string,
  message: string,
  lastSeenFor: [string],
}
export default Message;

// Helper functions for dealing with messages.

/**
 * Gets the Message Board name from a list of ids that are associated with the Message Board.
 *
 * @param {[string]} ids The string list of ids to use to get the board name.
 * @return {string} The name of the Message Board for those IDs.
 */
export const getMessageBoardName = (ids) => {
  // TODO Do some checking?
  let board = "";
  // Sort the ids alphabetically
  ids.sort((a, b) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  });
  for (let i = 0; i < ids.length; i++) {
    if (i !== 0) {
      board += "_";
    }
    board += ids[i];
  }
  return board;
};
/**
 * Gets the IDs associated with a Message Board name.
 *
 * @param {string} board The Message Board name.
 * @return {[string]} The list of IDs associated with the board.
 */
export const getIDsFromMessageBoard = (board) => {
  return board.split("_");
};

/**
 * Finds if the message of a message was unread for a given user. Because of chronological nature of Messages, this does
 * not guarantee that the User definitely did NOT see this Message if this comes back false, but if it comes back true,
 * then that means that the user saw this and ALL earlier sent messages. This will find out the board's unread status if
 * you check the first message of the board.
 *
 * @param {string} userID The user to get the unread status for.
 * @param {{from: string, lastSeenFor: [string]}} message The message object to check the unread status of.
 * @return {boolean} Whether the message has been seen by the user last at any point.
 */
export const ifMessageUnreadFor = (userID, message) => {
  return message.from !== userID && (!message.lastSeenFor || !message.lastSeenFor.includes(userID));
};

import {err} from "../../Constants";

// Handles the item type logic for the application.

const ItemType = {
  Client: "Client",
  Trainer: "Trainer",
  Gym: "Gym",
  Workout: "Workout",
  Review: "Review",
  Event: "Event",
  Challenge: "Challenge",
  Invite: "Invite",
  Post: "Post",
  Submission: "Submission",
  Group: "Group",
  Comment: "Comment",
  Sponsor: "Sponsor",
  Message: "Message",
  Streak: "Streak",
  Deal: "Deal",
  Product: "Product",
};

const numPrefix = 2;
const prefixes = {};
for (const key in ItemType) {
  if (ItemType.hasOwnProperty(key)) {
    const type = ItemType[key];
    prefixes[type.substring(0, numPrefix).toUpperCase()] = type;
  }
}

/**
 * Gets the item type from the ID given the prefix of the ID.
 *
 * @param {string} id The object id in question.
 * @return {string|null} The name of the item type that corresponds to the ID or null if not found.
 */
export function getItemTypeFromID(id) {
  if (id) {
    const prefix = prefixes[id.substring(0, numPrefix)];
    return prefix ? prefix : null;
  }
  return null;
}

/**
 * Succinctly chooses action based on the potential values and the given item type. Returns which one the item type
 * corresponds to.
 *
 * @param {string} itemType The item type to switch.
 * @param {string} clientValue The _ value.
 * @param {string} trainerValue The Trainer value.
 * @param {string} gymValue The Gym value.
 * @param {string} workoutValue The Workout value.
 * @param {string} reviewValue The Review value.
 * @param {string} eventValue The Event value.
 * @param {string} challengeValue The Challenge value.
 * @param {string} inviteValue The Invite value.
 * @param {string} postValue The Post value.
 * @param {string} submissionValue The Submission value.
 * @param {string} groupValue The Group value.
 * @param {string} commentValue The Comment value.
 * @param {string} sponsorValue The Sponsor value.
 * @param {string} messageValue The Message value.
 * @param {string} streakValue The Streak value.
 * @param {string} dealValue The Deal value.
 * @param {string} productValue The Product value.
 * @param {string} errorMessage The error message to console if the item is unrecognized.
 * @return {*} The specific item type value.
 */
export function switchReturnItemType(itemType, clientValue, trainerValue, gymValue, workoutValue, reviewValue, eventValue,
                                     challengeValue, inviteValue, postValue, submissionValue, groupValue, commentValue,
                                     sponsorValue, messageValue, streakValue, dealValue, productValue, errorMessage) {
  let returnValue = null;
  switch (itemType) {
    case "Client":
      returnValue = clientValue;
      break;
    case "Trainer":
      returnValue = trainerValue;
      break;
    case "Gym":
      returnValue = gymValue;
      break;
    case "Workout":
      returnValue = workoutValue;
      break;
    case "Review":
      returnValue = reviewValue;
      break;
    case "Event":
      returnValue = eventValue;
      break;
    case "Challenge":
      returnValue = challengeValue;
      break;
    case "Invite":
      returnValue = inviteValue;
      break;
    case "Post":
      returnValue = postValue;
      break;
    case "Submission":
      returnValue = submissionValue;
      break;
    case "Group":
      returnValue = groupValue;
      break;
    case "Comment":
      returnValue = commentValue;
      break;
    case "Sponsor":
      returnValue = sponsorValue;
      break;
    case "Message":
      returnValue = messageValue;
      break;
    case "Streak":
      returnValue = streakValue;
      break;
    case "Deal":
      returnValue = dealValue;
      break;
    case "Product":
      returnValue = dealValue;
      break;
    default:
      returnValue = null;
      break;
  }
  if (returnValue) {
    return returnValue;
  } else {
    err && console.error(errorMessage + " ~ itemType = " + itemType + " not recognized...");
    return null;
  }
}

/**
 * Succinctly chooses action based on the potential values and the given item type. Handles with handler the item type
 * corresponds to.
 *
 * @param {string} itemType The item type to switch.
 * @param {string} clientHandler The Client value.
 * @param {string} trainerHandler The Trainer value.
 * @param {string} gymHandler The Gym value.
 * @param {string} workoutHandler The Workout value.
 * @param {string} reviewHandler The Review value.
 * @param {string} eventHandler The Event value.
 * @param {string} challengeHandler The Challenge value.
 * @param {string} inviteHandler The Invite value.
 * @param {string} postHandler The Post value.
 * @param {string} submissionHandler The Submission value.
 * @param {string} groupHandler The Group value.
 * @param {string} commentHandler The Comment value.
 * @param {string} sponsorHandler The Sponsor value.
 * @param {string} messageHandler The Message value.
 * @param {string} streakHandler The Streak value.
 * @param {string} dealHandler The Deal value.
 * @param {string} productHandler The Product value.
 * @param errorMessage The error message to console if the item type is unrecognized.
 */
export function switchHandleItemType(itemType, clientHandler, trainerHandler, gymHandler, workoutHandler, reviewHandler,
                                     eventHandler, challengeHandler, inviteHandler, postHandler, submissionHandler,
                                     groupHandler, commentHandler, sponsorHandler, messageHandler, streakHandler,
                                     dealHandler, productHandler, errorMessage) {
  let itemHandler = null;
  switch (itemType) {
    case "Client":
      itemHandler = clientHandler;
      break;
    case "Trainer":
      itemHandler = trainerHandler;
      break;
    case "Gym":
      itemHandler = gymHandler;
      break;
    case "Workout":
      itemHandler = workoutHandler;
      break;
    case "Review":
      itemHandler = reviewHandler;
      break;
    case "Event":
      itemHandler = eventHandler;
      break;
    case "Challenge":
      itemHandler = challengeHandler;
      break;
    case "Invite":
      itemHandler = inviteHandler;
      break;
    case "Post":
      itemHandler = postHandler;
      break;
    case "Submission":
      itemHandler = submissionHandler;
      break;
    case "Group":
      itemHandler = groupHandler;
      break;
    case "Comment":
      itemHandler = commentHandler;
      break;
    case "Sponsor":
      itemHandler = sponsorHandler;
      break;
    case "Message":
      itemHandler = messageHandler;
      break;
    case "Streak":
      itemHandler = streakHandler;
      break;
    case "Deal":
      itemHandler = dealHandler;
      break;
    case "Product":
      itemHandler = productHandler;
      break;
    default:
      itemHandler = null;
      break;
  }
  if (itemHandler) {
    return itemHandler();
  } else {
    err && console.error(errorMessage + " ~ itemType = " + itemType + " not recognized...");
  }
}

export default ItemType;
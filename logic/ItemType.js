import {err, log} from "../../Constants";

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
};

const numPrefix = 2;
const prefixes = {};
for (const key in ItemType) {
    if (ItemType.hasOwnProperty(key)) {
        const type = ItemType[key];
        prefixes[type.substring(0, numPrefix).toUpperCase()] = type;
    }
}

export function getItemTypeFromID(id) {
    return prefixes[id.substring(0, numPrefix)];
}

export function switchReturnItemType(itemType, clientValue, trainerValue, gymValue, workoutValue, reviewValue, eventValue, challengeValue, inviteValue, postValue, submissionValue, groupValue, commentValue, sponsorValue, messageValue, streakValue, errorMessage) {
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
        default:
            returnValue = null;
            break;
    }
    if (returnValue) {
        return returnValue;
    }
    else {
        err&&console.error(errorMessage + " ~ itemType = " + itemType + " not recognized...");
        return null;
    }
}
export function switchHandleItemType(itemType, clientHandler, trainerHandler, gymHandler, workoutHandler, reviewHandler, eventHandler, challengeHandler, inviteHandler, postHandler, submissionHandler, groupHandler, commentHandler, sponsorHandler, messageHandler, streakHandler, errorMessage) {
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
        default:
            itemHandler = null;
            break;
    }
    if (itemHandler) {
        itemHandler();
    }
    else {
        err&&console.error(errorMessage + " ~ itemType = " + itemType + " not recognized...");
    }
}

export default ItemType;
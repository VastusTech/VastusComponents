import {consoleLog} from "./DebuggingHelper";

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
    Group: "Group",
    Comment: "Comment",
    Sponsor: "Sponsor",
    Message: "Message",
    Streak: "Streak",
};

export function getItemTypeFromID(id) {
    const numPrefix = 2;
    const prefix = id.substring(0, numPrefix);
    const itemTypeKeys = Object.keys(ItemType);
    for (let i = 0; i < itemTypeKeys.length; i++) {
        const type = itemTypeKeys[i];
        if (prefix === (type.substring(0, numPrefix).toUpperCase())) {
            return type;
        }
    }
    return null;
}

export function switchReturnItemType(itemType, clientValue, trainerValue, gymValue, workoutValue, reviewValue, eventValue, challengeValue, inviteValue, postValue, groupValue, commentValue, sponsorValue, messageValue, streakValue, errorMessage) {
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
        consoleLog(errorMessage + " ~ itemType = " + itemType + " not recognized...");
        return null;
    }
}
export function switchHandleItemType(itemType, clientHandler, trainerHandler, gymHandler, workoutHandler, reviewHandler, eventHandler, challengeHandler, inviteHandler, postHandler, groupHandler, commentHandler, sponsorHandler, messageHandler, streakHandler, errorMessage) {
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
        consoleLog(errorMessage + " ~ itemType = " + itemType + " not recognized...");
    }
}

export default ItemType;
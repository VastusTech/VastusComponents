import {setIsLoading, setIsNotLoading} from "./infoActions";
import {log} from "../../../Constants";
import { ADD_HANDLER, REMOVE_CHANNEL, SET_PERMANENT_HANDLER, SET_HANDLER, CLEAR_CHANNELS } from "../reducers/ablyReducer";

// =========================================================================================================
// ~ High-Level Ably Actions
// =========================================================================================================

/**
 * Adds a handler and and unsubscription handler to a channel from the ably reducer.
 *
 * @param {string} channelName The name of the channel to add a handler to.
 * @param {function({})} handler The handler to call when the channel receives a message.
 * @param {function()} unsubscriptionHandler The handler to call when the channel is unsubscribed from.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function addHandlerAndUnsubscription(channelName, handler, unsubscriptionHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        dispatch(addHandler(channelName, handler, unsubscriptionHandler, getMessageHandler(channelName, getStore)));
        dispatch(setIsNotLoading());
    }
}

/**
 * Sets the handler and and unsubscription handler for a channel from the ably reducer. Maintains only a single handler
 * for a given channel.
 *
 * @param {string} channelName The name of the channel to set the handler for.
 * @param {function({})} handler The handler to call when the channel receives a message.
 * @param {function()} unsubscriptionHandler The handler to call when the channel is unsubscribed from.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function setHandlerAndUnsubscription(channelName, handler, unsubscriptionHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        dispatch(setHandler(channelName, handler, unsubscriptionHandler, getMessageHandler(channelName, getStore)));
        dispatch(setIsNotLoading());
    }
}

/**
 * Sets a permanent handler in the app that will never be unsubscribed from from a cache eviction.
 *
 * @param {string} channelName The name of the channel to set the permanent handler for.
 * @param {function({})} handler The handler to call when the channel receives a message.
 * @param {function()} unsubscriptionHandler The handler to call when the channel is unsubscribed from.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function setPermanentHandlerAndUnsubscription(channelName, handler, unsubscriptionHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        dispatch(setPermanentHandler(channelName, handler, unsubscriptionHandler, getMessageHandler(channelName, getStore)));
        dispatch(setIsNotLoading());
    }
}

/**
 * Removes the subscription from a specific channel.
 *
 * @param {string} channelName The name of the channel to remove the channel subscription from.
 * @return {function(function(*), function())} The given function to dispatch a new action in the redux system.
 */
export function removeChannelSubscription(channelName) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        if (getStore().ably.subscribedChannels[channelName]) {
            dispatch(removeChannel(channelName));
        }
        else {
            log&&console.log("No channel to remove!");
        }
        dispatch(setIsNotLoading());
    }
}
// export function addHandlerToNotifications(handler) {
//     return (dispatch, getStore) => {
//         dispatch(setIsLoading());
//         if (getStore().user.id) {
//             const channelName = getStore().user.id + "-Notifications";
//             // subscribeToChannelOnlyOnce(channelName, dispatch, getStore);
//             dispatch(addHandler(channelName, handler));
//         }
//         else {
//         }
//         dispatch(setIsNotLoading());
//     };
// }

/**
 * Removes all the handlers from all the channels, regardless of their permanent status.
 *
 * @return {function(function(*))} The given function to dispatch a new action in the redux system.
 */
export function removeAllHandlers() {
    return (dispatch) => {
        dispatch(setIsLoading());
        dispatch(clearChannels());
        dispatch(setIsNotLoading());
    };
}

/**
 * Gets the specific message handler for the channel. This handler receives all the notification handlers for the
 * channel from the current store and handles them using the message.
 *
 * @param {string} channelName The name of the channel to get the overall message handler of.
 * @param {function()} getStore The function to obtain the current state of the store.
 * @return {function({})} The message handler for the specific channel.
 */
function getMessageHandler(channelName, getStore) {
    return (message) => {
        log&&console.log("RECEIVED ABLY MESSAGE = " + JSON.stringify(message));
        const handlers = getStore().ably.notificationHandlers[channelName];
        if (handlers && handlers.length > 0) {
            for (let i = 0; i < handlers.length; i++) {
                handlers[i](message);
            }
        }
    }
}

// =========================================================================================================
// ~ Low-Level Ably Actions
// =========================================================================================================

function addHandler(channel, handler, unsubscriptionHandler, messageHandler) {
    return {
        type: ADD_HANDLER,
        payload: {
            channel,
            handler,
            unsubscriptionHandler,
            messageHandler
        }
    };
}
function setHandler(channel, handler, unsubscriptionHandler, messageHandler) {
    return {
        type: SET_HANDLER,
        payload: {
            channel,
            handler,
            unsubscriptionHandler,
            messageHandler
        }
    };
}
function setPermanentHandler(channel, handler, unsubscriptionHandler, messageHandler) {
    return {
        type: SET_PERMANENT_HANDLER,
        payload: {
            channel,
            handler,
            unsubscriptionHandler,
            messageHandler
        }
    };
}
function removeChannel(channel) {
    return {
        type: REMOVE_CHANNEL,
        payload: {
            channel
        }
    }
}
function clearChannels() {
    return {
        type: CLEAR_CHANNELS,
    }
}


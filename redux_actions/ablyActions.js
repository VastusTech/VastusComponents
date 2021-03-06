import {setIsLoading, setIsNotLoading} from "./infoActions";
import {log} from "../../Constants";
import { ADD_HANDLER, REMOVE_CHANNEL, SET_PERMANENT_HANDLER, SET_HANDLER, CLEAR_CHANNELS } from "../redux_reducers/ablyReducer";

// =========================================================================================================
// ~ High-Level Ably Actions
// =========================================================================================================

/**
 * TODO
 *
 * @param channelName
 * @param handler
 * @param unsubscriptionHandler
 * @return {Function}
 */
export function addHandlerAndUnsubscription(channelName, handler, unsubscriptionHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        dispatch(addHandler(channelName, handler, unsubscriptionHandler, getMessageHandler(channelName, getStore)));
        dispatch(setIsNotLoading());
    }
}

/**
 * TODO
 *
 * @param channelName
 * @param handler
 * @param unsubscriptionHandler
 * @return {Function}
 */
export function setHandlerAndUnsubscription(channelName, handler, unsubscriptionHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        dispatch(setHandler(channelName, handler, unsubscriptionHandler, getMessageHandler(channelName, getStore)));
        dispatch(setIsNotLoading());
    }
}

/**
 * TODO
 *
 * @param channelName
 * @param handler
 * @param unsubscriptionHandler
 * @return {Function}
 */
export function setPermanentHandlerAndUnsubscription(channelName, handler, unsubscriptionHandler) {
    return (dispatch, getStore) => {
        dispatch(setIsLoading());
        dispatch(setPermanentHandler(channelName, handler, unsubscriptionHandler, getMessageHandler(channelName, getStore)));
        dispatch(setIsNotLoading());
    }
}

/**
 * TODO
 *
 * @param channelName
 * @return {Function}
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
 * TODO
 *
 * @return {Function}
 */
export function removeAllHandlers() {
    return (dispatch) => {
        dispatch(setIsLoading());
        dispatch(clearChannels());
        dispatch(setIsNotLoading());
    };
}

/**
 * TODO
 *
 * @param channelName
 * @param getStore
 * @return {Function}
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
export function removeChannel(channel) {
    return {
        type: REMOVE_CHANNEL,
        payload: {
            channel
        }
    }
}
export function clearChannels() {
    return {
        type: CLEAR_CHANNELS,
    }
}


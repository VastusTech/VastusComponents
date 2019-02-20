import {err, log} from "../../Constants";

const ADD_HANDLER = 'ADD_HANDLER';
const SET_HANDLER = 'SET_HANDLER';
const SET_PERMANENT_HANDLER = 'ADD_PERMANENT_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
const CLEAR_CHANNELS = 'CLEAR_CHANNELS';

// The max number of channels we can be subscribed to at any given moment
const channelCacheSize = 10;

const initialState = {
    subscribedChannels: {},
    subscribedChannelLRUHandler: [],
    notificationHandlers: {},
    unsubscriptionHandlers: {},
    numPermanentHandlers: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_HANDLER:
            // TODO Will we need deep copying?
            state = { ...state };
            addHandler(
                state,
                action.payload.channel,
                action.payload.handler,
                action.payload.unsubscriptionHandler,
                action.payload.messageHandler
            );
            break;
        case SET_HANDLER:
            state = { ...state };
            setHandler(
                state,
                action.payload.channel,
                action.payload.handler,
                action.payload.unsubscriptionHandler,
                action.payload.messageHandler
            );
            break;
        case SET_PERMANENT_HANDLER:
            state = { ...state };
            setPermanentHandler(
                state,
                action.payload.channel,
                action.payload.handler,
                action.payload.unsubscriptionHandler,
                action.payload.messageHandler
            );
            break;
        case REMOVE_CHANNEL:
            state = { ...state };
            removeChannelAndHandlers(state, action.payload.channel);
            break;
        case CLEAR_CHANNELS:
            state = { ...state };
            clearAllChannels(state);
            break;
        default:
            state = {
                ...state
            };
            break;
    }
    return state;
}

/**
 * Updates the Redux state object to add a handler to an Ably channel. Will automatically subscribe if hasn't already
 * and will unsubscribe the Least-recently-used channel if the cache is at capacity.
 *
 * @param state The redux ably state.
 * @param channel The channel to add the handler to.
 * @param handler The handler to receive messages with.
 * @param unsubscriptionHandler The handler to call when the channel is unsubscribed from.
 * @param messageHandler The overall message handler passed from ablyActions.js, uses getStore to get all handlers.
 */
function addHandler(state, channel, handler, unsubscriptionHandler, messageHandler) {
    // Check to see if we have already subscribed to the channel
    if (!state.subscribedChannels[channel]) {
        // If we haven't subscribed to this yet, then we subscribe to the channel directly
        subscribeToChannel(channel, messageHandler);
        state.subscribedChannels[channel] = channel;
        // Then, we also add to the notification/unsubscription handlers
        state.notificationHandlers[channel] = [handler];
        state.unsubscriptionHandlers[channel] = [unsubscriptionHandler];
        addLRUChannel(state, channel);
    }
    else {
        // Otherwise, we just add to the notification/unsubscription handlers
        state.notificationHandlers[channel].push(handler);
        state.unsubscriptionHandlers[channel].push(unsubscriptionHandler);
        updateLRUChannel(state, channel);
    }
}

/**
 * Updates the ably redux state to set a single handler for a channel. Will overwrite any existing handlers and ensure
 * that there is only one handler (both message and unsubscribe) for the channel.
 *
 * @param state The redux ably state.
 * @param channel The channel to set the handler of.
 * @param handler The message handler for the channel.
 * @param unsubscriptionHandler The handler to call when the channel is unsubscribed from.
 * @param messageHandler The overall message handler passed from ablyActions.js, uses getStore to get all handlers.
 */
function setHandler(state, channel, handler, unsubscriptionHandler, messageHandler) {
    // Check to see if we have already subscribed to the channel
    if (!state.subscribedChannels[channel]) {
        // If we haven't subscribed to this yet, then we subscribe to the channel directly
        subscribeToChannel(channel, messageHandler);
        state.subscribedChannels[channel] = channel;
        // Then, we also add to the notification/unsubscription handlers
        state.notificationHandlers[channel] = [handler];
        state.unsubscriptionHandlers[channel] = [unsubscriptionHandler];
        addLRUChannel(state, channel);
    }
    else {
        // Otherwise, we just add to the notification/unsubscription handlers
        state.notificationHandlers[channel] = [handler];
        state.unsubscriptionHandlers[channel] = [unsubscriptionHandler];
        updateLRUChannel(state, channel);
    }
}

/**
 * Updates the ably redux state to set a single handler for a permanent channel. This channel will not be affected by
 * any logic in the LRU cache and will always stay in the app.
 *
 * @param state The redux ably state.
 * @param channel The channel to set the handler of.
 * @param handler The message handler for the channel.
 * @param unsubscriptionHandler The handler to call when the channel is unsubscribed from.
 * @param messageHandler The overall message handler passed from ablyActions.js, uses getStore to get all handlers.
 */
function setPermanentHandler(state, channel, handler, unsubscriptionHandler, messageHandler) {
    // Check to see if we have already subscribed to the channel
    if (!state.subscribedChannels[channel]) {
        // If we haven't subscribed to this yet, then we subscribe to the channel directly
        subscribeToChannel(channel, messageHandler);
        state.subscribedChannels[channel] = channel;
        // Then, we also add to the notification/unsubscription handlers
        state.notificationHandlers[channel] = [handler];
        state.unsubscriptionHandlers[channel] = [unsubscriptionHandler];
        // We keep track of how many permanent handlers we have
        state.numPermanentHandlers++;
    }
    else {
        // Otherwise, we just add to the notification/unsubscription handlers
        state.notificationHandlers[channel] = [handler];
        state.unsubscriptionHandlers[channel] = [unsubscriptionHandler];
    }
}

/**
 * Removes a single channel and its handlers and calls the unsubscription handlers as well.
 *
 * @param state The redux ably state.
 * @param channel The channel to remove and unsubscribe from.
 */
function removeChannelAndHandlers(state, channel) {
    removeChannel(state, channel);
    const index = state.subscribedChannelLRUHandler.indexOf(channel);
    if (index !== -1) {
        state.subscribedChannelLRUHandler.splice(index, 1);
    }
    else {
        err&&console.error("REMOVING CHANNEL THAT DOESN'T EXIST!");
    }
}

/**
 * Adds the channel to the LRU Cache and potentially throws away a channel and unsubscribes from it.
 *
 * @param state The ably redux state.
 * @param channel The channel to add to the LRU Cache.
 */
function addLRUChannel(state, channel) {
    const lru = state.subscribedChannelLRUHandler;
    if (lru.length >= (channelCacheSize - state.numPermanentHandlers)) {
        // Then we also have to remove the last channel from the lru and remove it from the redux state
        removeChannel(state, lru.pop());
    }
    // In either case, we add the channel.
    lru.unshift(channel);
}

/**
 * Updates the redux ably state to push the LRU channel to the front of the LRU Cache list.
 *
 * @param state The redux ably state.
 * @param channel The channel to update in the LRU cache.
 */
function updateLRUChannel(state, channel) {
    const lru = state.subscribedChannelLRUHandler;
    // We find the channel in the LRU and then put it to the front
    const index = lru.indexOf(channel);
    if (index !== -1) {
        lru.splice(index, 1);
        lru.unshift(channel);
    }
    else {
        err&&console.error("ABLY CHANNEL NOT FOUND IN LRU, PROBLEM WITH IMPL.");
    }
}

/**
 * Updates the redux state to remove the channel from the ably redux fields (except for LRU Handler).
 *
 * @param state The ably redux state.
 * @param channel The channel to remove from the state.
 */
function removeChannel(state, channel) {
    // Unsubscribe from the channel, then remove from the redux state
    const unsubscriptionHandlers = state.unsubscriptionHandlers[channel];
    unsubscribeFromChannel(channel, unsubscriptionHandlers);
    delete state.subscribedChannels[channel];
    delete state.notificationHandlers[channel];
    delete state.unsubscriptionHandlers[channel];
}

/**
 * Clears all the channels from the ably state. Ends up with a clean ably state. Handles unsubscription too.
 *
 * @param state The redux ably state.
 */
function clearAllChannels(state) {
    const channels = state.subscribedChannels;
    for (const channel in channels) {
        if (channels.hasOwnProperty(channel)) {
            removeChannel(state, channel);
        }
    }
    state.subscribedChannelLRUHandler = [];
    state.numPermanentHandlers = 0;
}

/**
 * Subscribes to an Ably channel and sets the main handler to the passed in messageHandler. This will be pulled from
 * ablyActions.js and most likely will contain "getStore"
 *
 * @param channel The name of the channel to subscribe to.
 * @param messageHandler The handler for each message that comes through the channel.
 */
function subscribeToChannel(channel, messageHandler) {
    /*global Ably*/
    Ably.channels.get(channel).subscribe(messageHandler, (error) => {
        if (error) {
            err&&console.error("Failed to subscribe to the channel " + channel + "!");
            err&&console.error(error);
        }
        else {
            log&&console.log("SUCCESSFULLY SUBSCRIBED TO CHANNEL = " + channel);
        }
    });
}

/**
 * Uses Ably to unsubscribe from the channel and calls the unsubscribe handlers. Does not change state!
 *
 * @param channel The channel name that is currently subscribed
 * @param unsubscriptionHandlers The unsubscription handlers to call after un-subscribing.
 */
function unsubscribeFromChannel(channel, unsubscriptionHandlers) {
    /* global Ably */
    Ably.channels.get(channel).unsubscribe((error) => {
        if (error) {
            err&&console.error("Ably could not unsubscribe from " + channel + "!");
            err&&console.error(error);
        }
        else {
            log&&console.log("Ably successfully unsubscribed from " + channel + "!");
        }
    });
    if (unsubscriptionHandlers) {
        for (let i = 0; i < unsubscriptionHandlers.length; i++) {
            // Handle the un-subscription
            unsubscriptionHandlers[i]();
        }
    }
    else {
        err&&console.error("Channel " + channel + " did not specify any unsubscribe handlers????");
    }
}
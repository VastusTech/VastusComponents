// import { Realtime } from 'ably/browser/static/ably-commonjs.js';
import {Realtime} from "ably";
import {err, log} from "../../Constants";
import TestHelper from "../testing/TestHelper";

/**
 * Class to handle all the Ably channel management and callback handling.
 */
class Ably {
  static ablyRef: Realtime = TestHelper.ifTesting ? null : new Realtime('RP1cGg.cc8qow:DdzJi7vkBxuLzK03');

  /**
   * Subscribes to an Ably channel and sets the main handler to the passed in messageHandler.
   *
   * @param {string} channel The name of the channel to subscribe to.
   * @param {function({})} messageHandler The handler for each message that comes through the channel.
   * @return {*} Debug info for the Ably operation.
   */
  static subscribeToChannel(channel, messageHandler) {
    TestHelper.ifTesting || Ably.ablyRef.channels.get(channel).subscribe(messageHandler, (error) => {
      if (error) {
        err && console.error("Failed to subscribe to the channel " + channel + "!");
        err && console.error(error);
      } else {
        log && console.log("SUCCESSFULLY SUBSCRIBED TO CHANNEL = " + channel);
        // log&&alert("SUCCESSFULLY SUBSCRIBED TO CHANNEL = " + channel);
      }
    });
    return channel;
  }

  /**
   * Unsubscribes from an Ably channel to longer receive messages on that channel.
   *
   * @param {string} channel The channel name that is currently subscribed.
   * @param {function()} successHandler The function to call once the channel has been successfully unsubscribed from.
   * @param {function()} failureHandler The function called if anything goes wrong with the unsubscribe.
   * @return {*} Debug info for the Ably operation.
   */
  static unsubscribeFromChannel(channel, successHandler, failureHandler) {
    TestHelper.ifTesting || Ably.ablyRef.channels.get(channel).unsubscribe((error) => {
      if (error) {
        err && console.error("Ably could not unsubscribe from " + channel + "!");
        err && console.error(error);
        if (failureHandler) {
          failureHandler();
        }
      } else {
        log && console.log("Ably successfully unsubscribed from " + channel + "!");
        if (successHandler) {
          successHandler();
        }
      }
    });
    return channel;
  }

  /**
   * Sends a message with a message name and a payload to an Ably channel directly.
   *
   * @param {string} channel The name of the channel.
   * @param {string} messageName The event name for the message to send to the channel.
   * @param {{}} payload The payload of the object to send through the channel.
   * @param {function()} successHandler The function to call once the message has been successfully published.
   * @param {function()} failureHandler The function called if anything goes wrong with the message.
   */
  static sendMessageToChannel(channel, messageName, payload, successHandler, failureHandler) {
    TestHelper.ifTesting || Ably.ablyRef.channels.get(channel).publish(messageName, payload, function (err) {
      if (err) {
        failureHandler && failureHandler();
      } else {
        successHandler && successHandler();
      }
    });
  }

  /**
   * Closes the connection to Ably.
   */
  static close() {
    TestHelper.ifTesting || Ably.ablyRef.close();
  }
}

export default Ably;
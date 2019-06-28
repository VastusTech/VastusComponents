import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";
import {getItemTypeFromID} from "../logic/ItemType";
import TestHelper from "../testing/TestHelper";
import {err} from "../../Constants";

/**
 * Holds all the potential properly formatted Lambda functions for Users.
 */
class UserFunctions {
  // ======================================================================================================
  // User High-Level Functions ~
  // ======================================================================================================

  // Create Functions ============================================================

  /**
   * Creates a User in the database using as little info as allowed for a given itemType.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} itemType The type of the User to create.
   * @param {string} name The display name of the Client to place into the database.
   * @param {string} email The email address of the Client.
   * @param {string} username The Cognito User Pool Username of the User.
   * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static createUser(fromID, itemType, name, email, username, successHandler, failureHandler) {
    switch (itemType) {
      case "Client":
        return UserFunctions.create(fromID, itemType, name, email, username, null, successHandler, failureHandler);
      case "Trainer":
        return UserFunctions.create(fromID, itemType, name, email, username, null, successHandler, failureHandler);
      default:
        throw Error("Create User not implemented for user type = " + itemType);
    }
  }

  /**
   * Creates a User with as little info as possible from a federated identity (Google, Facebook, ...) for a given item
   * type.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} itemType The type of the User to create.
   * @param {string} name The display name of the Client to place into the database.
   * @param {string} email The email address of the Client.
   * @param {string} username The Cognito User Pool Username of the User.
   * @param {string} federatedID The unique federated ID from the federated identity.
   * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static createFederatedUser(fromID, itemType, name, email, username, federatedID, successHandler, failureHandler) {
    switch (itemType) {
      case "Client":
        return UserFunctions.create(fromID, itemType, name, email, username, federatedID, successHandler, failureHandler);
      case "Trainer":
        return UserFunctions.create(fromID, itemType, name, email, username, federatedID, successHandler, failureHandler);
      default:
        throw Error("Create User not implemented for user type = " + itemType);
    }
  }

  // Update Functions ============================================================

  /**
   * Adds a profile image to a User's profile image gallery.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {*} image The image file to add to the User's profile images.
   * @param {string} profileImagePath The S3 path to put the profile image into.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static addProfileImage(fromID, userID, image, profileImagePath, successHandler, failureHandler, props) {
    S3.putImage(profileImagePath, image, () => {
      this.updateAdd(fromID, userID, "profileImagePaths", profileImagePath, (data) => {
        if (props) {
          if (props.addToUserAttribute && props.addToItemAttribute) {
            // TODO
            err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
          } else {
            err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
          }
        } else {
          err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
        }
        successHandler && successHandler(data);
      }, (error) => {
        // Try your best to fix S3, then give up...
        S3.delete(profileImagePath);
        if (failureHandler) {
          failureHandler(error);
        }
      });
    });
    if (TestHelper.ifTesting) {
      return this.updateAdd(fromID, userID, "profileImagePaths", profileImagePath);
    }
  }

  /**
   * Removes a profile image from a User's profile image gallery.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} profileImagePath The S3 path of the image to remove from the User.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static removeProfileImage(fromID, userID, profileImagePath, successHandler, failureHandler, props) {
    return this.updateRemove(fromID, userID, "profileImagePaths", profileImagePath, (data) => {
      S3.delete(profileImagePath, () => {
        if (props) {
          if (props.addToUserAttribute && props.addToItemAttribute) {
            // TODO
            err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
          } else {
            err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
          }
        } else {
          err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
        }
        successHandler && successHandler(data);
      }, failureHandler);
    }, failureHandler);
  }

  /**
   * Adds a friend to the User's buddy list and vice versa.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} friendID The ID of the User to add as a friend.
   * @param {string} inviteID The ID of the Invite that you are accepting for the friend.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static addFriend(fromID, userID, friendID, inviteID, successHandler, failureHandler, props) {
    return this.updateAdd(fromID, userID, "friends", friendID, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute && props.removeFromUserAttribute && props.removeItem) {
          props.addToUserAttribute("friends", friendID);
          props.addToItemAttribute(friendID, "friends", userID);
          props.removeFromUserAttribute("receivedInvites", inviteID);
          props.removeItem("Invite", inviteID);
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Removes a User from another User's buddy list and vice versa.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} friendID The ID of the User to remove as a friend.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static removeFriend(fromID, userID, friendID, successHandler, failureHandler, props) {
    return this.updateRemove(fromID, userID, "friends", friendID, (data) => {
      if (props) {
        if (props.removeFromUserAttribute && props.removeFromItemAttribute) {
          props.removeFromUserAttribute("friends", friendID);
          props.removeFromItemAttribute(friendID, "friends", userID);
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Adds the User to a Challenge and the Challenge to the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} challengeID The ID of the Challenge to add the User to.
   * @param {string} inviteID The ID of any potential invites this relates to.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static addChallenge(fromID, userID, challengeID, inviteID, successHandler, failureHandler, props) {
    return this.updateAdd(fromID, userID, "challenges", challengeID, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute && props.removeFromUserAttribute && props.removeItem) {
          props.addToUserAttribute("challenges", challengeID);
          props.addToItemAttribute(challengeID, "members", userID);
          if (inviteID) {
            props.removeFromUserAttribute("receivedInvites", inviteID);
            props.removeItem("Invite", inviteID);
          }
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Removes the User from a Challenge and the Challenge from the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} challengeID The ID of the Challenge to remove the User from.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static removeChallenge(fromID, userID, challengeID, successHandler, failureHandler, props) {
    return this.updateRemove(fromID, userID, "challenges", challengeID, (data) => {
      if (props) {
        if (props.removeFromUserAttribute && props.removeFromItemAttribute) {
          props.removeFromUserAttribute("challenges", challengeID);
          props.removeFromItemAttribute(challengeID, "members", userID);
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Adds the User to an Event and the Event to the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} eventID The ID of the Event to add the User to.
   * @param {string} inviteID The ID of any potential invites this relates to.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static addEvent(fromID, userID, eventID, inviteID, successHandler, failureHandler, props) {
    return this.updateAdd(fromID, userID, "scheduledEvents", eventID, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute && props.removeFromUserAttribute && props.removeItem) {
          props.addToUserAttribute("scheduledEvents", eventID);
          props.addToItemAttribute(eventID, "members", userID);
          if (inviteID) {
            props.removeFromUserAttribute("receivedInvites", inviteID);
            props.removeItem("Invite", inviteID);
          }
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Removes the User from an Event and the Event from the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} eventID The ID of the Event to add the User to.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static removeEvent(fromID, userID, eventID, successHandler, failureHandler, props) {
    return this.updateRemove(fromID, userID, "scheduledEvents", eventID, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute) {
          // TODO
          err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Adds the User to a Group and the Group to the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} groupID The ID of the Group to add the User to.
   * @param {string} inviteID The ID of any potential invites this relates to.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static addGroup(fromID, userID, groupID, inviteID, successHandler, failureHandler, props) {
    return this.updateAdd(fromID, userID, "groups", groupID, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute && props.removeFromUserAttribute && props.removeItem) {
          props.addToUserAttribute("groups", groupID);
          props.addToItemAttribute(groupID, "members", userID);
          if (inviteID) {
            props.removeFromUserAttribute("receivedInvites", inviteID);
            props.removeItem("Invite", inviteID);
          }
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Removes the User from a Group and the Group from the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} groupID The ID of the Group for the User to leave.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static removeGroup(fromID, userID, groupID, successHandler, failureHandler, props) {
    return this.updateRemove(fromID, userID, "groups", groupID, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute) {
          // TODO
          err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Adds a message board to a User's message board feed in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} messageBoard The message board to add to the User's message boards.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static addMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler, props) {
    return this.updateAdd(fromID, userID, "messageBoards", messageBoard, (data) => {
      if (props) {
        if (props.addToUserAttribute) {
          props.addToUserAttribute("messageBoards", messageBoard);
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Removes a message board from the User's message board feed in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} messageBoard The message board to remove from the User's message boards.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static removeMessageBoard(fromID, userID, messageBoard, successHandler, failureHandler, props) {
    return this.updateRemove(fromID, userID, "messageBoards", messageBoard, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute) {
          // TODO
          err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Updates the name of a User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} name The name to set for the User.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateName(fromID, userID, name, successHandler, failureHandler, props) {
    return this.updateSet(fromID, userID, "name", name, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute) {
          // TODO
          err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Updates the gender of the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} gender The gender of the User to set.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateGender(fromID, userID, gender, successHandler, failureHandler, props) {
    return this.updateSet(fromID, userID, "gender", gender, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute) {
          // TODO
          err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Updates the birthday of the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} birthday The ISO string of the birth date of the User.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateBirthday(fromID, userID, birthday, successHandler, failureHandler, props) {
    return this.updateSet(fromID, userID, "birthday", birthday, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute) {
          // TODO
          err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Updates the location of the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} location The general location of the User within the database.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateLocation(fromID, userID, location, successHandler, failureHandler, props) {
    return this.updateSet(fromID, userID, "location", location, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute) {
          // TODO
          err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Updates the biographical information of the User in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {string} bio The biographical description to set for the User.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateBio(fromID, userID, bio, successHandler, failureHandler, props) {
    return this.updateSet(fromID, userID, "bio", bio, (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute) {
          // TODO
          err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  /**
   * Updates the main profile image of the User and places the image into S3.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to update.
   * @param {*} profileImage The profile image to place into S3.
   * @param {string} profileImagePath The S3 path of where to place the file.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateProfileImage(fromID, userID, profileImage, profileImagePath, successHandler, failureHandler, props) {
    if (profileImage && profileImagePath) {
      S3.putImage(profileImagePath, profileImage, () => {
        this.updateSet(fromID, userID, "profileImagePath", profileImagePath, (data) => {
          if (props) {
            if (props.addToUserAttribute && props.addToItemAttribute) {
              // TODO
              err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
            } else {
              err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
            }
          } else {
            err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
          }
          successHandler && successHandler(data);
        }, (error) => {
          S3.delete(profileImagePath);
          failureHandler && failureHandler(error);
        });
      }, failureHandler);
      if (TestHelper.ifTesting) {
        return this.updateSet(fromID, userID, "profileImagePath", profileImagePath);
      }
    } else {
      // Delete it
      return this.updateSet(fromID, userID, "profileImagePath", null, (data) => {
        if (props) {
          if (props.addToUserAttribute && props.addToItemAttribute) {
            // TODO
            err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
          } else {
            err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
          }
        } else {
          err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
        }
        successHandler && successHandler(data);
      }, failureHandler);
    }
  }

  // Process Functions

  /**
   * Buys a Deal from the database using the User's internal credit system.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} userID The ID of the User to buy the Deal.
   * @param {string} dealID The ID of the Deal to buy.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static buyDeal(fromID, userID, dealID, successHandler, failureHandler, props) {
    return Lambda.process(fromID, userID, getItemTypeFromID(userID), dealID, "buy", (data) => {
      if (props) {
        if (props.addToUserAttribute && props.addToItemAttribute) {
          // TODO
          err && console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
        } else {
          err && console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
        }
      } else {
        err && console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
      }
      successHandler && successHandler(data);
    }, failureHandler);
  }

  // Delete Functions ============================================================

  /**
   * Deletes a User from the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} itemType The type of the User to delete from the database.
   * @param {string} userID The ID of the User to delete.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static deleteUser(fromID, itemType, userID, successHandler, failureHandler) {
    switch (itemType) {
      case "Client":
        return UserFunctions.delete(fromID, itemType, userID, successHandler, failureHandler);
      case "Trainer":
        return UserFunctions.delete(fromID, itemType, userID, successHandler, failureHandler);
      default:
        throw Error("Create User not implemented for user type = " + itemType);
    }
  }

  // ======================================================================================================
  // User Low-Level Functions ~
  // ======================================================================================================

  /**
   * Places a User in the database using the given information for the item type.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} itemType The type of the User to place in the database.
   * @param {string} name The display name of the Client to place into the database.
   * @param {string} email The email address of the Client.
   * @param {string} username The Cognito User Pool Username of the User.
   * @param {string} federatedID The unique federated ID from the federated identity.
   * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static create(fromID, itemType, name, email, username, federatedID, successHandler, failureHandler) {
    return Lambda.create(fromID, itemType, {
      name,
      username,
      email,
      federatedID
    }, successHandler, failureHandler);
  }

  static updateAdd(fromID, userID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateAddToAttribute(fromID, userID, getItemTypeFromID(userID), attributeName, attributeValue, successHandler, failureHandler);
  }

  static updateRemove(fromID, userID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateRemoveFromAttribute(fromID, userID, getItemTypeFromID(userID), attributeName, attributeValue, successHandler, failureHandler);
  }

  static updateSet(fromID, userID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateSetAttribute(fromID, userID, getItemTypeFromID(userID), attributeName, attributeValue, successHandler, failureHandler);
  }

  /**
   * Deletes a User from the database as well as all of its dependencies.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} itemType The type of the User to delete.
   * @param {string} userID The ID of the User to delete.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static delete(fromID, itemType, userID, successHandler, failureHandler) {
    // TODO Delete all the S3 Paths within the User?
    return Lambda.delete(fromID, userID, itemType, successHandler, failureHandler);
  }
}

export default UserFunctions;

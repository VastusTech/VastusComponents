import Lambda from "../api/Lambda";
import UserFunctions from "./UserFunctions";
import S3 from "../api/S3Storage";
import TestHelper from "../testing/TestHelper";
import {err} from "../../Constants";

const itemType = "Group";

/**
 * Holds all the potential properly formatted Lambda functions for Groups.
 */
class GroupFunctions {
  // ======================================================================================================
  // Group High-Level Functions ~
  // ======================================================================================================

  // Create Functions ============================================================

  /**
   * Creates a bare-bones Group in the database with as little information as possible.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} title The display title for the Group.
   * @param {string} description The detail description for the Group.
   * @param {string} access The access of who can see and access the Group. ("public" or "private").
   * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static createGroup(fromID, title, description, access, successHandler, failureHandler, props) {
    return GroupFunctions.create(fromID, title, description, null, null, null, null, null, access, null, (data) => {
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
   * Creates a Group in the database with optional information available for input.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} title The display title for the Group.
   * @param {string} description The detail description for the Group.
   * @param {string} motto The Group motto and overall purpose for the Group to begin with.
   * @param {*} groupImage The image file to display for the Group.
   * @param {[string]} owners The IDs of the Users who will own the Group.
   * @param {[string]} members The IDs of the Users who will be automatically signed up for the Group.
   * @param {[string]} tags The tags for the Group to indicate what kind of a Group it is.
   * @param {string} access The access of who can see and access the Group. ("public" or "private").
   * @param {string} restriction The restriction of if Users must request to join or not. ("invite" or null).
   * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static createGroupOptional(fromID, title, description, motto, groupImage, owners, members, tags, access, restriction, successHandler, failureHandler, props) {
    return GroupFunctions.create(fromID, title, description, motto, groupImage, owners, members, tags, access, restriction, (data) => {
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

  // Update Functions ============================================================

  /**
   * Updates the access of a Group to private in the database, so only certain Users allowed to see and access it.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateToPrivate(fromID, groupID, successHandler, failureHandler, props) {
    return GroupFunctions.updateSet(fromID, groupID, "access", "private", (data) => {
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
   * Updates the access of a Group to private in the database, making everyone allowed to see and access it.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateToPublic(fromID, groupID, successHandler, failureHandler, props) {
    return GroupFunctions.updateSet(fromID, groupID, "access", "public", (data) => {
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
   * Updates the restriction of a Group to Invite only, forcing Users to request to join instead of directly.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateToInviteOnly(fromID, groupID, successHandler, failureHandler, props) {
    return GroupFunctions.updateAdd(fromID, groupID, "restriction", "invite", (data) => {
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
   * Updates the restriction of a Group to unrestricted in the database, allowing Users to directly join the Group.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateToUnrestricted(fromID, groupID, successHandler, failureHandler, props) {
    return GroupFunctions.updateSet(fromID, groupID, "restriction", null, (data) => {
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
   * Adds a tag to the Group's tags in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {string} tag The tag to add to the Group's tags.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static addTag(fromID, groupID, tag, successHandler, failureHandler, props) {
    return GroupFunctions.updateAdd(fromID, groupID, "tags", tag, (data) => {
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
   * Removes a tag from the Group's tags in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {string} tag The tag to remove from the Group's tags.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static removeTag(fromID, groupID, tag, successHandler, failureHandler, props) {
    return GroupFunctions.updateRemove(fromID, groupID, "tags", tag, (data) => {
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
   * Adds a User to the Group and the Group to the member in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {string} userID The ID of the User to add to the Group.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static addMember(fromID, groupID, userID, successHandler, failureHandler, props) {
    return UserFunctions.addGroup(fromID, userID, groupID, null, successHandler, failureHandler, props);
  }

  /**
   * Removes a User from the Group and the Group from the member in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {string} userID The ID of the User to remove from the Group's members.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static removeMember(fromID, groupID, userID, successHandler, failureHandler, props) {
    return UserFunctions.removeGroup(fromID, userID, groupID, (data) => {
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
   * Updates the title of the Group in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {string} title The title to set for the Group.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateTitle(fromID, groupID, title, successHandler, failureHandler, props) {
    return GroupFunctions.updateSet(fromID, groupID, "title", title, (data) => {
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
   * Updates the Group's main motto phrase in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {string} motto The main motto to set for the Group.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateMotto(fromID, groupID, motto, successHandler, failureHandler, props) {
    return GroupFunctions.updateSet(fromID, groupID, "motto", motto, (data) => {
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
   * Updates the Groups' detail description in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {string} description The detail description to set for the Group.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateDescription(fromID, groupID, description, successHandler, failureHandler, props) {
    return GroupFunctions.updateSet(fromID, groupID, "description", description, (data) => {
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
   * Updates the Group's main profile image in the database and in S3.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to update.
   * @param {*} groupImage The image to update the Group image with.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateGroupImage(fromID, groupID, groupImage, successHandler, failureHandler, props) {
    return GroupFunctions.updateSet(fromID, groupID, "groupImagePath", groupImage ? "groupImage" : null, (data) => {
      if (groupImage) {
        S3.putImage("groupImage", groupImage, () => {
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
    }, failureHandler)
  }

  // ======================================================================================================
  // Group Low-Level Functions ~
  // ======================================================================================================

  /**
   * Creates a Group in the database and adds the group image in S3 using the information given.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} title The display title for the Group.
   * @param {string} description The detail description for the Group.
   * @param {string} motto The Group motto and overall purpose for the Group to begin with.
   * @param {*} groupImage The image file to display for the Group.
   * @param {[string]} owners The IDs of the Users who will own the Group.
   * @param {[string]} members The IDs of the Users who will be automatically signed up for the Group.
   * @param {[string]} tags The tags for the Group to indicate what kind of a Group it is.
   * @param {string} access The access of who can see and access the Group. ("public" or "private").
   * @param {string} restriction The restriction of if Users must request to join or not. ("invite" or null).
   * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static create(fromID, title, description, motto, groupImage, owners, members, tags, access, restriction, successHandler, failureHandler) {
    return Lambda.create(fromID, itemType, {
      title,
      description,
      motto,
      owners,
      members,
      tags,
      access,
      restriction,
      groupImagePath: (groupImage) ? "groupImage" : null,
    }, (data) => {
      if (!TestHelper.ifTesting) {
        if (groupImage) {
        }
        const id = data.data;
        // Put in the group image
        S3.putImage(id + "/groupImage", groupImage, successHandler, (error) => {
          // Best effort to delete!
          GroupFunctions.delete(fromID, id);
        });
      }
    }, failureHandler);
  }

  static updateAdd(fromID, groupID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateAddToAttribute(fromID, groupID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  }

  static updateRemove(fromID, groupID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateRemoveFromAttribute(fromID, groupID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  }

  static updateSet(fromID, groupID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateSetAttribute(fromID, groupID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  }

  /**
   * Deletes a Group and its dependencies from the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} groupID The ID of the Group to delete.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static delete(fromID, groupID, successHandler, failureHandler, props) {
    return Lambda.delete(fromID, groupID, itemType, (data) => {
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

export default GroupFunctions;

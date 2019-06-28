import Lambda from "../api/Lambda";
import {err} from "../../Constants";

const itemType = "Comment";

/**
 * Holds all the potential properly formatted Lambda functions for Comments.
 */
class CommentFunctions {
  // ======================================================================================================
  // Comment High-Level Functions ~
  // ======================================================================================================

  // Create Functions ============================================================

  /**
   * Places a Comment on something of interest. This can be either a Post, a Submission, or another Comment. A chain
   * can only be one Comment long, you can't comment on a Comment that already commented on another Comment.
   *
   * @param {string} fromID The ID of the User invoking the Lambda request.
   * @param {string} byID The ID of the User who authored the Comment.
   * @param {string} onID The ID of the object that this Comment is commenting on.
   * @param {string} comment The actual string description of the comment.
   * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static createComment(fromID, byID, onID, comment, successHandler, failureHandler, props) {
    return CommentFunctions.create(fromID, byID, onID, comment, (data) => {
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
   * Updates the comment string description of a Comment in the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} commentID The ID of the Comment to update.
   * @param {string} comment The string description to update the comment to.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @return {*} Debugging info about the Lambda operation.
   */
  static updateComment(fromID, commentID, comment, successHandler, failureHandler, props) {
    return CommentFunctions.updateSet(fromID, commentID, "comment", comment, (data) => {
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

  // ======================================================================================================
  // Comment Low-Level Functions ~
  // ======================================================================================================

  /**
   * Places a Comment object into the database using the given information.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} by The ID of the User who authored the Comment.
   * @param {string} on The ID of the object that this Comment is commenting on.
   * @param {string} comment The actual string description of the comment.
   * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static create(fromID, by, on, comment, successHandler, failureHandler) {
    return Lambda.create(fromID, itemType, {
      by,
      on,
      message: comment,
    }, successHandler, failureHandler)
  }

  static updateAdd(fromID, commentID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateAddToAttribute(fromID, commentID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  }

  static updateRemove(fromID, commentID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateRemoveFromAttribute(fromID, commentID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  }

  static updateSet(fromID, commentID, attributeName, attributeValue, successHandler, failureHandler) {
    return Lambda.updateSetAttribute(fromID, commentID, itemType, attributeName, attributeValue, successHandler, failureHandler);
  }

  /**
   * Deletes a Comment object from the database.
   *
   * @param {string} fromID The User invoking the Lambda request.
   * @param {string} commentID The ID of the Comment to delete from the database.
   * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
   * returned data from the invocation of the Lambda function.
   * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
   * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
   * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
   * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
   * @param {function(error)} failureHandler The function to handle any errors that may occur.
   * @return {*} Debugging info about the Lambda operation.
   */
  static delete(fromID, commentID, successHandler, failureHandler, props) {
    return Lambda.delete(fromID, commentID, itemType, (data) => {
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

export default CommentFunctions;

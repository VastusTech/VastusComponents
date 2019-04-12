import Lambda from "../api/Lambda";

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
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param byID
     * @param onID
     * @param comment
     * @param {function({secretKey: string, timestamp: string, data: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createComment(fromID, byID, onID, comment, successHandler, failureHandler) {
        return this.create(fromID, byID, onID, comment, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param commentID
     * @param comment
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateComment(fromID, commentID, comment, successHandler, failureHandler) {
        return this.updateSet(fromID, commentID, "comment", comment, successHandler, failureHandler);
    }

    // ======================================================================================================
    // Comment Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param by
     * @param on
     * @param comment
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
     * TODO
     * @param {string} fromID The User invoking the Lambda request.
     * @param commentID
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, commentID, successHandler, failureHandler) {
        return Lambda.delete(fromID, commentID, itemType, successHandler, failureHandler);
    }
}

export default CommentFunctions;

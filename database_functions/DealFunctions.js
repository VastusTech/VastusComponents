import Lambda from "../api/Lambda";
import {err} from "../../Constants";
import {getItemTypeFromID} from "../logic/ItemType";

const itemType = "Deal";

/**
 * Holds all the potential properly formatted Lambda functions for Comments.
 */
class DealFunctions {
    // ======================================================================================================
    // User High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param sponsor
     * @param productName
     * @param productCreditPrice
     * @param quantity
     * @param successHandler
     * @param failureHandler
     * @returns {fromID}
     */
    static createDeal(fromID, sponsor, productName, productCreditPrice, quantity, successHandler, failureHandler) {
        return this.create(fromID, sponsor, productName, productCreditPrice, quantity, null, null, null, null, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * TODO
     *
     * @param fromID
     * @param dealID
     * @param productName
     * @param successHandler
     * @param failureHandler
     * @param props
     * @returns {*}
     */
    static updateProductName(fromID, dealID, productName, successHandler, failureHandler, props) {
        return this.updateSet(fromID, dealID, "productName", productName, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler&&successHandler(data);
        });
    }
    static updateProductImagePath(fromID, dealID, productImagePath, successHandler, failureHandler, props) {
        // TODO S3 THIS FUNCTION
        return this.updateSet(fromID, dealID, "productImagePath", productImagePath, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler&&successHandler(data);
        });
    }
    static updateAddProductImagePath(fromID, dealID, productImagePath, successHandler, failureHandler, props) {
        // TODO S3 like you're supposed to. Look at how I do it in PostFunctions.js
    }
    static updateRemoveProductImagePath(fromID, dealID, productImagePath, successHandler, failureHandler, props) {
        // TODO S3 like you're supposed to. Look at how I do it in PostFunctions.js
    }

    /**
     * TODO
     *
     * @param fromID
     * @param dealID
     * @param productCreditPrice
     * @param successHandler
     * @param failureHandler
     * @param props
     * @returns {*}
     */
    static updateProductCreditPrice(fromID, dealID, productCreditPrice, successHandler, failureHandler, props) {
        return this.updateSet(fromID, dealID, "productCreditPrice", productCreditPrice, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler&&successHandler(data);
        });
    }

    /**
     * TODO
     *
     * @param fromID
     * @param dealID
     * @param productStoreLink
     * @param successHandler
     * @param failureHandler
     * @param props
     * @returns {*}
     */
    static updateProductStoreLink(fromID, dealID, productStoreLink, successHandler, failureHandler, props) {
        return this.updateSet(fromID, dealID, "productStoreLink", productStoreLink, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler&&successHandler(data);
        });
    }

    /**
     * TODO
     *
     * @param fromID
     * @param dealID
     * @param quantity
     * @param successHandler
     * @param failureHandler
     * @param props
     * @returns {*}
     */
    static updateSetQuantity(fromID, dealID, quantity, successHandler, failureHandler, props) {
        return this.updateSet(fromID, dealID, "quantity", quantity, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler&&successHandler(data);
        });
    }

    /**
     * TODO
     *
     * @param fromID
     * @param dealID
     * @param quantity
     * @param successHandler
     * @param failureHandler
     * @param props
     * @returns {*}
     */
    static updateAddQuantity(fromID, dealID, quantity, successHandler, failureHandler, props) {
        return this.updateAdd(fromID, dealID, "quantity", quantity, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler&&successHandler(data);
        });
    }

    /**
     * TODO
     *
     * @param fromID
     * @param dealID
     * @param quantity
     * @param successHandler
     * @param failureHandler
     * @param props
     * @returns {*}
     */
    static updateRemoveQuantity(fromID, dealID, quantity, successHandler, failureHandler, props) {
        return this.updateRemove(fromID, dealID, "quantity", quantity, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler&&successHandler(data);
        });
    }

    /**
     * TODO
     *
     * @param fromID
     * @param dealID
     * @param validTime
     * @param successHandler
     * @param failureHandler
     * @param props
     * @returns {*}
     */
    static updateValidTime(fromID, dealID, validTime, successHandler, failureHandler, props) {
        return this.updateSet(fromID, dealID, "validTime", validTime, (data) => {
            if (props) {
                if (props.addToUserAttribute && props.addToItemAttribute) {
                    // TODO
                    err&&console.error("UPDATE FUNCTIONS NOT PLACED IN YET FOR THIS FUNCTION!!!");
                }
                else {
                    err&&console.error("NEED TO ADD UPDATE FUNCTIONS TO MAPDISPATCHTOPROPS");
                }
            }
            else {
                err&&console.error("ADD PROPS TO DATABASE ACTION CALL IN ORDER TO AUTOMATICALLY UPDATE");
            }
            successHandler&&successHandler(data);
        });
    }

    // ======================================================================================================
    // Deal Low-Level Functions ~
    // ======================================================================================================

    /**
     * TODO
     *
     * @param fromID
     * @param sponsor
     * @param productName
     * @param productCreditPrice
     * @param quantity
     * @param productImagePath
     * @param productImagePaths
     * @param validTime
     * @param productStoreLink
     * @param successHandler
     * @param failureHandler
     * @returns {fromID}
     */
    static create(fromID, sponsor, productName, productCreditPrice, quantity, productImagePath,
                  productImagePaths, validTime, productStoreLink, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            sponsor,
            productName,
            productCreditPrice,
            quantity,
            productImagePath,
            productImagePaths,
            validTime,
            productStoreLink,
        }, successHandler, failureHandler)
    }

    static updateAdd(fromID, dealID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, dealID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, dealID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, dealID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, dealID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, dealID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * Deletes a Deal from the database as well as all of its dependencies.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, dealID, successHandler, failureHandler) {
        // TODO Delete all the S3 Paths within the User?
        return Lambda.delete(fromID, dealID, itemType, successHandler, failureHandler);
    }
}

export default DealFunctions;
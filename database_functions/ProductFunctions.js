import Lambda from "../api/Lambda";
import {err} from "../../Constants";

const itemType = "Product";

/**
 * Holds all the potential properly formatted Lambda functions for Deals.
 */
class ProductFunctions {
    // ======================================================================================================
    // Deal High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     *
     * @param fromID
     * @param owner
     * @param deal
     * @param successHandler
     * @param failureHandler
     * @param props
     */
    static createProduct(fromID, owner, deal, successHandler, failureHandler, props) {
        return ProductFunctions.createProductOptional(fromID, owner, deal, null, null, null, successHandler, failureHandler, props);
    }

    static createProductOptional(fromID, owner, deal, expirationDate, codes, links, successHandler, failureHandler, props) {
        return this.create(fromID, owner, deal, expirationDate, codes, links, (data) => {
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
        }, failureHandler);
    }

    // Delete Functions ============================================================

    // ======================================================================================================
    // Deal Low-Level Functions ~
    // ======================================================================================================

    /**
     * Creates a Product in the database using the given information.
     *
     * @param {string} fromID The ID of the User invoking the Lambda request.
     * @param {string} owner The ID of the User who will own the Product.
     * @param {string} deal The ID of the Deal that this Product is associated with.
     * @param {string} expirationDate The ISO string of the date when the product will expire if applicable.
     * @param {[string]} codes The string codes that may apply to the Product.
     * @param {[string]} links The URLs that may apply to the Product.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, owner, deal, expirationDate, codes, links, successHandler, failureHandler) {
        return Lambda.create(fromID, itemType, {
            owner,
            deal,
            expirationDate,
            codes,
            links,
        }, successHandler, failureHandler);
    }

    static updateAdd(fromID, productID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateAddToAttribute(fromID, productID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateRemove(fromID, productID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateRemoveFromAttribute(fromID, productID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }
    static updateSet(fromID, productID, attributeName, attributeValue, successHandler, failureHandler) {
        return Lambda.updateSetAttribute(fromID, productID, itemType, attributeName, attributeValue, successHandler, failureHandler);
    }

    /**
     * Deletes a Product from the database as well as all of its dependencies.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} productID The ID of the Product to delete.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static delete(fromID, productID, successHandler, failureHandler) {
        return Lambda.delete(fromID, productID, itemType, successHandler, failureHandler);
    }
}

export default ProductFunctions;

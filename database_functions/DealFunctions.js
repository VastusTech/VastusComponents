import Lambda from "../api/Lambda";
import S3 from "../api/S3Storage";
import {err} from "../../Constants";

const itemType = "Deal";

/**
 * Holds all the potential properly formatted Lambda functions for Deals.
 */
class DealFunctions {
    // ======================================================================================================
    // Deal High-Level Functions ~
    // ======================================================================================================

    // Create Functions ============================================================

    /**
     * Creates a bare minimum Deal in the database.
     *
     * @param {string} fromID The ID of the User invoking the Lambda request.
     * @param {string} sponsor The ID of the Sponsor who will own the new Deal.
     * @param {string} productName The name of the product the Deal will sell.
     * @param {string} productCreditPrice The price of the product in credits.
     * @param {string|null} quantity How many of these products are in stock and allowed to sell.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createDeal(fromID, sponsor, productName, productCreditPrice, quantity, successHandler, failureHandler) {
        return this.create(fromID, sponsor, productName, productCreditPrice, quantity, null, null, null, null, successHandler, failureHandler);
    }

    /**
     * Creates a Deal with optional extra parameters in the creation.
     *
     * @param {string} fromID The ID of the User invoking the Lambda request.
     * @param {string} sponsor The ID of the Sponsor who will own the new Deal.
     * @param {string} productName The name of the product the Deal will sell.
     * @param {string} productCreditPrice The price of the product in credits.
     * @param {string|null} quantity How many of these products are in stock and allowed to sell.
     * @param {*} productImage The main image to display as the product.
     * @param {string|null} productImagePath The S3 path of the image to display. Actual path will be altered with ID.
     * @param {Object<string, *>} productImages The map of product image paths to the actual product images.
     * @param {string|null} validTime The time interval ISO string indicating when the Deal will be valid for purchase.
     * @param {string|null} productStoreLink The string URL to the store page to buy it for full price.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static createDealOptional(fromID, sponsor, productName, productCreditPrice, quantity, productImage, productImagePath, productImages, validTime, productStoreLink, successHandler, failureHandler) {
        return this.create(fromID, sponsor, productName, productCreditPrice, quantity, productImage, productImagePath, productImages, validTime, productStoreLink, successHandler, failureHandler);
    }

    // Update Functions ============================================================

    /**
     * Updates the name of the product being sold for the Deal.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param {string} productName The name of the product the Deal will sell.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
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

    /**
     * Sets the main product image for the Deal selling the product.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param {*} productImage The image to update the main product image to.
     * @param {string|null} productImagePath The S3 path to put the product image in.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateProductImagePath(fromID, dealID, productImage, productImagePath, successHandler, failureHandler, props) {
        // TODO S3 THIS FUNCTION
        if (productImagePath && productImage) {
            S3.putImage(productImagePath, productImage, () => {
                return this.updateSet(fromID, dealID, "productImagePath", productImagePath, (data) => {
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
                    S3.delete(productImagePath);
                    failureHandler&&failureHandler(error);
                });
            }, failureHandler);
        }
        else { // delete it
            return this.updateSet(fromID, dealID, "productImagePath", null, (data) => {
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

    /**
     * Adds a product image to a Deal's product images.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param {*} productImage The product image to add to the
     * @param {string|null} productImagePath The S3 path to put the product image in.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateAddProductImagePath(fromID, dealID, productImage, productImagePath, successHandler, failureHandler, props) {
        if (productImagePath && productImage) {
            S3.putImage(productImagePath, productImage, () => {
                return this.updateAdd(fromID, dealID, "productImagePaths", productImagePath, (data) => {
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
                    S3.delete(productImagePath);
                    failureHandler&&failureHandler(error);
                });
            }, failureHandler);
        }
    }

    /**
     * Removes a product image from a Deal's product images.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param {string|null} productImagePath The S3 path to delete the product image from.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
     */
    static updateRemoveProductImagePath(fromID, dealID, productImagePath, successHandler, failureHandler, props) {
        if (productImagePath) {
            S3.delete(productImagePath, () => {
                return this.updateRemove(fromID, dealID, "productImagePaths", productImagePath, (data) => {
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
    }

    /**
     * Updates a Deal's price for trading credits for a single quantity of the product.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param productCreditPrice
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
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
     * Updates a Deal's store URL for the product.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param productStoreLink
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
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
     * Updates the quantity of the product for a Deal that is allowed to sell to the given value.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param {string|null} quantity How many of these products are in stock and allowed to sell.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
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
     * Adds a number of products that a Deal can sell.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param {string} quantity How many of these products to add to the quantity.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
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
     * Removes a number of products from the quantity the Deal can sell.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param {string} quantity How many of these products to remove from the quantity.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
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
     * Updates a Deal's valid time to sell in the database.
     *
     * @param {string} fromID The User invoking the Lambda request.
     * @param {string} dealID The ID of the Deal to update.
     * @param {string|null} validTime The time interval ISO string indicating when the Deal will be valid for purchase.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @param {{addToItemAttribute: function(string, string, string), addToUserAttribute: function(string, string),
     * removeFromItemAttribute: function(string, string, string), removeFromUserAttribute: function(string, string),
     * setItemAttribute: function(string, string, *), setUserAttribute(string, *), removeItem: function(string, string),
     * clearItemQueryCache: function(string)}} props The component props containing the redux automatic update functions.
     * @return {*} Debugging info about the Lambda operation.
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
     * Creates a Deal in the database using the given information.
     *
     * @param {string} fromID The ID of the User invoking the Lambda request.
     * @param {string} sponsor The ID of the Sponsor who will own the new Deal.
     * @param {string} productName The name of the product the Deal will sell.
     * @param {string} productCreditPrice The price of the product in credits.
     * @param {string|null} quantity How many of these products are in stock and allowed to sell.
     * @param {*} productImage The main image to display as the product.
     * @param {string|null} productImagePath The S3 path of the image to display. Actual path will be altered with ID.
     * @param {Object<string, *>} productImages The map of product image paths to the actual product images.
     * @param {string|null} validTime The time interval ISO string indicating when the Deal will be valid for purchase.
     * @param {string|null} productStoreLink The string URL to the store page to buy it for full price.
     * @param {function({secretKey: string, timestamp: string})} successHandler The function to handle the
     * returned data from the invocation of the Lambda function.
     * @param {function(error)} failureHandler The function to handle any errors that may occur.
     * @return {*} Debugging info about the Lambda operation.
     */
    static create(fromID, sponsor, productName, productCreditPrice, quantity, productImage, productImagePath,
                  productImages, validTime, productStoreLink, successHandler, failureHandler) {
        // TODO Handle S3 Path stuff
        let productImagePaths = null;
        if (productImages) {
            productImagePaths = Object.keys(productImages);
        }
        let numProductImages = 0;
        if (productImagePaths) { numProductImages = productImagePaths.length; }
        if (productImage && productImagePath) { numProductImages++; }
        return Lambda.create(fromID, itemType, {
            sponsor,
            productName,
            productCreditPrice,
            quantity,
            productImagePath,
            productImagePaths,
            validTime,
            productStoreLink,
        }, (data) => {
            if (data) {
                const id = data.data;
                if (numProductImages === 0) {
                    successHandler(data);
                }
                else {
                    let numFinished = 0;
                    const finish = () => {
                        numFinished++;
                        if (numFinished >= numProductImages) {
                            successHandler(data);
                        }
                    };
                    const error = (error) => {
                        // TODO Delete the object and abort!
                        DealFunctions.delete(fromID, id);
                        failureHandler(error);
                    };
                    if (productImage && productImagePath) {
                        S3.putImage(productImagePath, productImage, finish, error);
                    }
                    for (const key in productImages) {
                        if (productImages.hasOwnProperty(key) && productImages[key]) {
                            S3.putImage(id + "/" + key, productImages[key], finish, error);
                        }
                    }
                }
            }
        }, failureHandler)
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
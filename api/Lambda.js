import * as AWS from "aws-sdk";
import {err, ifDebug, log} from "../../Constants";
import TestHelper from "../logic/TestHelper";

/// Configure AWS SDK for JavaScript
AWS.config.update({region: 'us-east-1'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:d9a16b98-4393-4ff6-9e4b-5e738fef1222'});

// Prepare to call Lambda function
let lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

/**
 * This is the static class that allows us to invoke the AWS Lambda function using the predefined JSON structure.
 */
class Lambda {
    // All the basic CRUD Functions with my own personally defined JSONs
    // TODO Is there a case where we would need specify action yet?
    /**
     * TODO
     *
     * @param fromID
     * @param itemType
     * @param createRequest
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static create(fromID, itemType, createRequest, successHandler, failureHandler) {
        return this.invokeDatabaseLambda({
            fromID: fromID,
            action: "CREATE",
            itemType: itemType,
            [("create" + itemType + "Request")]: createRequest,
        }, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param objectID
     * @param objectItemType
     * @param attributeName
     * @param attributeValue
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateSetAttribute(fromID, objectID, objectItemType, attributeName, attributeValue, successHandler, failureHandler) {
        return this.invokeDatabaseLambda({
            fromID: fromID,
            action: "UPDATESET",
            itemType: objectItemType,
            identifiers: [
                objectID
            ],
            attributeName: attributeName,
            attributeValues: [
                attributeValue
            ]
        }, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param objectID
     * @param objectItemType
     * @param attributeName
     * @param attributeValue
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateAddToAttribute(fromID, objectID, objectItemType, attributeName, attributeValue, successHandler, failureHandler) {
        return this.invokeDatabaseLambda({
            fromID,
            action: "UPDATEADD",
            itemType: objectItemType,
            identifiers: [
                objectID
            ],
            attributeName,
            attributeValues: [
                attributeValue
            ],
        }, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param objectID
     * @param objectItemType
     * @param attributeName
     * @param attributeValue
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static updateRemoveFromAttribute(fromID, objectID, objectItemType, attributeName, attributeValue, successHandler, failureHandler) {
        return this.invokeDatabaseLambda({
            fromID,
            action: "UPDATEREMOVE",
            itemType: objectItemType,
            identifiers: [
                objectID
            ],
            attributeName,
            attributeValues: [
                attributeValue
            ],
        }, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param fromID
     * @param objectID
     * @param objectItemType
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static delete(fromID, objectID, objectItemType, successHandler, failureHandler) {
        return this.invokeDatabaseLambda({
            fromID,
            action: "DELETE",
            itemType: objectItemType,
            identifiers: [
                objectID
            ],
        }, successHandler, failureHandler)
    }

    /**
     * TODO
     * @param successHandler
     * @param failureHandler
     * @return {*}
     */
    static ping(successHandler, failureHandler) {
        return this.invokeDatabaseLambda({
            action: "PING"
        }, successHandler, failureHandler);
    }
    static invokeDatabaseLambda(payload, successHandler, failureHandler) {
        return this.invokeLambda("VastusDatabaseLambdaFunction", payload, successHandler, failureHandler);
    }
    static invokePaymentLambda(payload, successHandler, failureHandler) {
        return this.invokeLambda("VastusPaymentLambdaFunction", payload, successHandler, failureHandler);
    }
    static invokeFirebaseLambda(payload, successHandler, failureHandler) {
        return this.invokeLambda("VastusFirebaseTokenFunction", payload, successHandler, failureHandler);
    }

    /**
     * TODO
     *
     * @param functionName
     * @param payload
     * @param successHandler
     * @param failureHandler
     * @return {string}
     */
    static invokeLambda(functionName, payload, successHandler, failureHandler) {
        log&&console.log("Sending lambda payload: " + JSON.stringify(payload));
        if (ifDebug) {
            console.log("Sending lambda payload: " + JSON.stringify(payload));
        }
        const request = {FunctionName: functionName, Payload: JSON.stringify(payload)};
        TestHelper.ifTesting || lambda.invoke(request, (error, data) => {
            if (error) {
                err&&console.error(error);
                err&&console.error("Lambda failure: " + JSON.stringify(error));
                if (ifDebug) {
                    console.log("Lambda failure: " + JSON.stringify(error))
                }
                if (failureHandler) {
                    failureHandler(error);
                }
            } else if (data.Payload) {
                //log&&console.log(data.Payload);
                const payload = JSON.parse(data.Payload);
                if (payload.errorMessage) {
                    err&&console.error("Bad payload!: " + JSON.stringify(payload));
                    err&&console.error(payload.errorMessage);
                    console.log("Bad payload!: " + JSON.stringify(payload));
                    if (failureHandler) {
                        failureHandler(payload.errorMessage);
                    }
                }
                else {
                    log&&console.log("Successfully invoked lambda function!");
                    if (ifDebug) {
                        console.log("Successful Lambda, received " + JSON.stringify(payload));
                    }
                    if (successHandler) {
                        successHandler(payload);
                    }
                }
            }
            else {
                err&&console.error("Weird error: payload returned with nothing...");
                if (failureHandler) {
                    failureHandler("Payload returned with null");
                }
            }
        });
        // console.log("Returning " + JSON.stpayload);
        return JSON.stringify(payload);
    }
}

export default Lambda;
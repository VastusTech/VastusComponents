import "../../testing/SetTesting";
import Lambda from "../Lambda";
import {expect} from "chai";

describe("high level methods", () => {
    // static getCreateRequestName = itemType => "create" + itemType + "Request";
    it("Should get the create request name correctly", () => {
        expect(Lambda.getCreateRequestName(
            "Challenge"
        )).to.be.equal("createChallengeRequest");
    });
    // static create(fromID, itemType, createRequest, successHandler, failureHandler) {
    it("Should send the create payload correctly", () => {
        expect(Lambda.create(
            "FROMID", "Client", {KEY: "VALUE"}
        )).to.be.equal("{\"fromID\":\"FROMID\",\"action\":\"CREATE\",\"itemType\":\"Client\",\"createClientRequest\":" +
            "{\"KEY\":\"VALUE\"}}");
    });
    // static updateSetAttribute(fromID, objectID, objectItemType, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send the update set payload correctly", () => {
        expect(Lambda.updateSetAttribute(
            "FROMID", "OBJECTID", "OBJECTITEMTYPE", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.be.equal("{\"fromID\":\"FROMID\",\"action\":\"UPDATESET\",\"itemType\":\"OBJECTITEMTYPE\",\"identifiers" +
            "\":[\"OBJECTID\"],\"attributeName\":\"ATTRIBUTENAME\",\"attributeValues\":[\"ATTRIBUTEVALUE\"]}");
    });
    // static updateAddToAttribute(fromID, objectID, objectItemType, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send the update add payload correctly", () => {
        expect(Lambda.updateAddToAttribute(
            "FROMID", "OBJECTID", "OBJECTITEMTYPE", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.be.equal("{\"fromID\":\"FROMID\",\"action\":\"UPDATEADD\",\"itemType\":\"OBJECTITEMTYPE\",\"identifiers" +
            "\":[\"OBJECTID\"],\"attributeName\":\"ATTRIBUTENAME\",\"attributeValues\":[\"ATTRIBUTEVALUE\"]}");
    });
    // static updateRemoveFromAttribute(fromID, objectID, objectItemType, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send the update remove payload correctly", () => {
        expect(Lambda.updateRemoveFromAttribute(
            "FROMID", "OBJECTID", "OBJECTITEMTYPE", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.be.equal("{\"fromID\":\"FROMID\",\"action\":\"UPDATEREMOVE\",\"itemType\":\"OBJECTITEMTYPE\",\"ident" +
            "ifiers\":[\"OBJECTID\"],\"attributeName\":\"ATTRIBUTENAME\",\"attributeValues\":[\"ATTRIBUTEVALUE\"]}");
    });
    // static delete(fromID, objectID, objectItemType, successHandler, failureHandler) {
    it("Should send the delete payload correctly", () => {
        expect(Lambda.delete(
            "FROMID", "OBJECTID", "OBJECTITEMTYPE"
        )).to.be.equal("{\"fromID\":\"FROMID\",\"action\":\"DELETE\",\"itemType\":\"OBJECTITEMTYPE\",\"" +
            "identifiers\":[\"OBJECTID\"]}");
    });
    // static ping(successHandler, failureHandler) {
    it("Should send the ping payload correctly", () => {
        expect(Lambda.ping()).to.be.equal("{\"action\":\"PING\"}");
    });
});

describe("low level methods", () => {
    // static invokeDatabaseLambda(payload, successHandler, failureHandler) {
    it("Should invoke the database lambda function correctly", () => {
        expect(Lambda.invokeDatabaseLambda(
            {KEY1: "VALUE1", KEY2: "VALUE2", KEY3: "VALUE3"}
        )).to.be.equal("{\"KEY1\":\"VALUE1\",\"KEY2\":\"VALUE2\",\"KEY3\":\"VALUE3\"}");
    });
    // static invokeLambda(functionName, payload, successHandler, failureHandler) {
    it("Should invoke a lambda function correctly", () => {
        expect(Lambda.invokeLambda(
            "FUNCTIONNAME", {KEY1: "VALUE1", KEY2: "VALUE2", KEY3: "VALUE3"}
        )).to.be.equal("{\"KEY1\":\"VALUE1\",\"KEY2\":\"VALUE2\",\"KEY3\":\"VALUE3\"}");
    });
});

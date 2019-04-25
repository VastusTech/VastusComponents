import TestConfig from "../../testing/TestConfig";
import QL from "../GraphQL";
import { expect } from "chai";

describe("GraphQL.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    // GenerateFilter
    it("Generates a filter correctly", function () {
        const filter = QL.generateFilter({
            or: [{
                access: "$var1"
            }, {
                restriction: "$var2"
            }]
        }, {

        });
        filter.par
        string = string.replace(/\s\s+/g, ' ');
        expect
    });

    // Generate ID List
    it("Generates an ID list from a list of IDs correctly", function () {

    });

    // Construct Query
    it("Constructs Query correctly", function () {

    });

    // Get Next Token String
    it("Gets the next token string correctly", function () {

    });

    // get normalized query
    it("Gets Normalized Query correctly", function () {

    });

    // get query from normalized query
    it("Gets query from normalized query correctly", function () {

    });

    // get compressed from query result
    it("Gets compressed result from query result", function () {

    });

    // get query result from compressed
    it("Gets query result from compressed result", function () {

    });

    // execute
    it("Executes a GraphQL process correctly", function () {

    });

    // get Item (by ID)
    it("Gets a database Item by ID correctly", function () {

    });

    // get Item by username
    it("Gets a database Item by username correctly", function () {

    });

    // get Item by federated ID
    it("Gets a database Item by federated ID correctly", function () {

    });

    // get Items
    it("Batch gets database Items by IDs correctly", function () {

    });

    // construct item query
    it("Constructs a database Item query correctly", function () {

    });

    // query items
    it("Gets a database Item query correctly", function () {

    });

    it("", () => {
        QL.
        expect(true);
    });

    // TODO
});

import TestConfig from "../../../TestConfig";
import QL from "../GraphQL";
import {expect} from "chai";

describe("GraphQL.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

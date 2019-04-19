import TestConfig from "../../../TestConfig";
import PostFunctions from "../PostFunctions";
import {expect} from "chai";

describe("PostFunctions.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

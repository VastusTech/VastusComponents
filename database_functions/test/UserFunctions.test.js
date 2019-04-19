import TestConfig from "../../../TestConfig";
import UserFunctions from "../UserFunctions";
import {expect} from "chai";

describe("UserFunctions.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

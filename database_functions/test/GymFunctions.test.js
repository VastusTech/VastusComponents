import TestConfig from "../../../TestConfig";
import GymFunctions from "../GymFunctions";
import {expect} from "chai";

describe("GymFunctions.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

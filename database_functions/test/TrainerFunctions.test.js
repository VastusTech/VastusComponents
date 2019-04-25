import TestConfig from "../../testing/TestConfig";
import TrainerFunctions from "../TrainerFunctions";
import {expect} from "chai";

describe("TrainerFunctions.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

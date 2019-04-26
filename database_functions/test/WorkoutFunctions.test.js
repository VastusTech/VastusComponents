import TestConfig from "../../testing/TestConfig";
import WorkoutFunctions from "../WorkoutFunctions";
import {expect} from "chai";

describe("WorkoutFunctions.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

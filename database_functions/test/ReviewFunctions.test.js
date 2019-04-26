import TestConfig from "../../testing/TestConfig";
import ReviewFunctions from "../ReviewFunctions";
import {expect} from "chai";

describe("ReviewFunctions.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

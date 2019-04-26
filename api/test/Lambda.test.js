import TestConfig from "../../testing/TestConfig";
import Lambda from "../Lambda";
import {expect} from "chai";

describe("Lambda.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

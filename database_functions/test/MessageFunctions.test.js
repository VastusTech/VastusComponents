import TestConfig from "../../../TestConfig";
import MessageFunctions from "../MessageFunctions";
import {expect} from "chai";

describe("MessageFunctions.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

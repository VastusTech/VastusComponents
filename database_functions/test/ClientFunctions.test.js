import TestConfig from "../../../TestConfig";
import ClientFunctions from "../ClientFunctions";
import {expect} from "chai";

describe("ClientFunctions.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

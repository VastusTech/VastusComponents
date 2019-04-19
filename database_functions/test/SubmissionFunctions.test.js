import TestConfig from "../../../TestConfig";
import SubmissionFunctions from "../SubmissionFunctions";
import {expect} from "chai";

describe("SubmissionFunctions.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

import TestConfig from "../../testing/TestConfig";
import S3 from "../S3Storage";
import {expect} from "chai";

describe("S3Storage.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("", () => {
        expect(true);
    });

    // TODO
});

import TestConfig from "../../../TestConfig";
import Ably from "../Ably";
import {expect} from "chai";

describe("Ably.js", function () {
    // Set up the testing framework so we don't actually send payloads to AWS.
    beforeAll(() => {
        TestConfig();
    });

    it("Subscribes to a channel successfully", () => {
        expect(Ably.subscribeToChannel("CHANNEL", null)).to.be.equal("CHANNEL");
    });

    it("Unsubscribes from a channel successfully", () => {
        expect(Ably.unsubscribeFromChannel("CHANNEL", null)).to.be.equal("CHANNEL");
    });

    afterAll(() => {
        Ably.close();
    });
});

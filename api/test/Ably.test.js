import "../../testing/SetTesting";
import Ably from "../Ably";
import {expect} from "chai";

it("Subscribes to a channel successfully", () => {
    expect(Ably.subscribeToChannel("CHANNEL", null)).to.be.equal("CHANNEL");
});

it("Unsubscribes from a channel successfully", () => {
    expect(Ably.unsubscribeFromChannel("CHANNEL", null)).to.be.equal("CHANNEL");
});

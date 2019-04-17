import { expect } from 'chai';
import {getItemTypeFromID, switchReturnItemType, switchHandleItemType} from "../ItemType";

it('Gets the item type from the ID correctly', () => {
    expect(getItemTypeFromID("CL12345")).to.be.equal("Client");
    expect(getItemTypeFromID("TR123456789")).to.be.equal("Trainer");
    expect(getItemTypeFromID("GY123456789")).to.be.equal("Gym");
    expect(getItemTypeFromID("WO123456789")).to.be.equal("Workout");
    expect(getItemTypeFromID("RE123456789123412341234")).to.be.equal("Review");
    expect(getItemTypeFromID("EV123456789123412341234")).to.be.equal("Event");
    expect(getItemTypeFromID("CH123456789123412341234")).to.be.equal("Challenge");
    expect(getItemTypeFromID("IN1")).to.be.equal("Invite");
    expect(getItemTypeFromID("PO0000001")).to.be.equal("Post");
    expect(getItemTypeFromID("SU0000001")).to.be.equal("Submission");
    expect(getItemTypeFromID("GR31415926535897932384626433")).to.be.equal("Group");
    expect(getItemTypeFromID("CO101")).to.be.equal("Comment");
    expect(getItemTypeFromID("SP")).to.be.equal("Sponsor");
    expect(getItemTypeFromID("ME123456789")).to.be.equal("Message");
    expect(getItemTypeFromID("ST102030405")).to.be.equal("Streak");
    expect(getItemTypeFromID("FE102030405")).to.be.equal(null);
});

it('switches return type correctly', () => {
    // TODO
});

it('switches handle type correctly', () => {
    // TODO
});

import { expect } from 'chai';
import {getIDsFromMessageBoard, getMessageBoardName, ifMessageUnreadFor} from "../MessageHelper";

describe("MessageHelper.js", function () {
    it('Calculates the message board name correctly', () => {
        expect(getMessageBoardName(["ID0001", "ID0002", "ID0003"])).to.be
            .equal("ID0001_ID0002_ID0003");
        expect(getMessageBoardName(["CL101020203", "TR010101", "CL20"])).to.be
            .equal("CL101020203_CL20_TR010101");
    });

    it('Should get the IDs from the message board correctly', () => {
        expect(getIDsFromMessageBoard("CL0001_TR0001")).to.eql(["CL0001", "TR0001"]);
        expect(getIDsFromMessageBoard("CL0001_CL0003_TR0004")).to.eql(["CL0001", "CL0003", "TR0004"]);
    });

    it('should calculate if unread for correctly', function () {
        const userID = "CL0001";
        const message1 = {
            from: "not_user_id",
            lastSeenFor: [
                userID
            ]
        };
        const message2 = {
            from: "not_user_id",
            lastSeenFor: []
        };
        const message3 = {
            from: userID,
            lastSeenFor: []
        };
        const message4 = {
            from: userID,
            lastSeenFor: [
                userID
            ]
        };
        const message5 = {
            from: "not_user_id",
            lastSeenFor: [
                "not_user_id",
                userID
            ]
        };
        const message6 = {
            from: "not_user_id",
            lastSeenFor: [
                "not_user_id",
            ]
        };
        const message7 = {
            from: userID,
            lastSeenFor: [
                "not_user_id",
            ]
        };
        const message8 = {
            from: userID,
            lastSeenFor: [
                "not_user_id",
                userID
            ]
        };
        expect(!ifMessageUnreadFor(userID, message1));
        expect(ifMessageUnreadFor(userID, message2));
        expect(!ifMessageUnreadFor(userID, message3));
        expect(!ifMessageUnreadFor(userID, message4));
        expect(!ifMessageUnreadFor(userID, message5));
        expect(ifMessageUnreadFor(userID, message6));
        expect(!ifMessageUnreadFor(userID, message7));
        expect(!ifMessageUnreadFor(userID, message8));
    });

    it('', () => {

    });
});

import "../../testing/SetTesting";
import ChallengeFunctions from "../ChallengeFunctions";
import {expect} from "chai";

describe("high level functions", () => {
// static createChallenge(fromID, owner, endTime, capacity, title, goal, access, restriction, tags, successHandler,
    it("Should create a bare minimum challenge correctly", () => {
        expect(ChallengeFunctions.createChallenge(
            "FROMID", "OWNER", "ENDTIME", "CAPACITY", "TITLE", "GOAL", "ACCESS", "RESTRICTION", ["TAG1", "TAG2", "TAG3"]
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Challenge',
            createChallengeRequest: {
                owner: 'OWNER',
                endTime: 'ENDTIME',
                capacity: 'CAPACITY',
                title: 'TITLE',
                goal: 'GOAL',
                description: null,
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                difficulty: null,
                prize: null,
                members: null,
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                group: null,
                challengeType: null,
                streakUpdateSpanType: null,
                streakUpdateInterval: null,
                streakN: null
            }
        });
    });
// static createChallengeOptional(fromID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs,
    it("Should create an optional challenge correctly", () => {
        expect(ChallengeFunctions.createChallengeOptional(
            "FROMID", "OWNER", "ENDTIME", "CAPACITY", "TITLE", "GOAL", "DESCRIPTION", "DIFFICULTY", ["MEMBER1",
            "MEMBER2", "MEMBER3"], ["TAG1", "TAG2", "TAG3"], "ACCESS", "RESTRICTION", "PRIZE", "CHALLENGETYPE",
            "STREAKUPDATESPANTYPE", "STREAKUPDATEINTERVAL", "STREAKN"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Challenge',
            createChallengeRequest: {
                owner: 'OWNER',
                endTime: 'ENDTIME',
                capacity: 'CAPACITY',
                title: 'TITLE',
                goal: 'GOAL',
                description: 'DESCRIPTION',
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                difficulty: 'DIFFICULTY',
                prize: 'PRIZE',
                members: [ 'MEMBER1', 'MEMBER2', 'MEMBER3' ],
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                group: null,
                challengeType: 'CHALLENGETYPE',
                streakUpdateSpanType: 'STREAKUPDATESPANTYPE',
                streakUpdateInterval: 'STREAKUPDATEINTERVAL',
                streakN: 'STREAKN'
            }
        });
    });
// static createGroupChallenge(fromID, groupID, owner, endTime, capacity, title, goal, access, restriction, tags, successHandler,
    it("Should create a bare minimum group challenge correctly", () => {
        expect(ChallengeFunctions.createGroupChallenge(
            "FROMID", "GROUPID", "OWNER", "ENDTIME", "CAPACITY", "TITLE", "GOAL", "ACCESS", "RESTRICTION",
            ["TAG1", "TAG2", "TAG3"]
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Challenge',
            createChallengeRequest: {
                owner: 'OWNER',
                endTime: 'ENDTIME',
                capacity: 'CAPACITY',
                title: 'TITLE',
                goal: 'GOAL',
                description: null,
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                difficulty: null,
                prize: null,
                members: null,
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                group: 'GROUPID',
                challengeType: null,
                streakUpdateSpanType: null,
                streakUpdateInterval: null,
                streakN: null
            }
        });
    });
// static createGroupChallengeOptional(fromID, groupID, owner, endTime, capacity, title, goal, description, difficulty, memberIDs,
    it("Should create an optional group challenge correctly", () => {
        expect(ChallengeFunctions.createGroupChallengeOptional(
            "FROMID", "GROUPID", "OWNER", "ENDTIME", "CAPACITY", "TITLE", "GOAL", "DESCRIPTION", "DIFFICULTY", ["MEMBER1",
                "MEMBER2", "MEMBER3"], ["TAG1", "TAG2", "TAG3"], "ACCESS", "RESTRICTION", "PRIZE", "CHALLENGETYPE",
            "STREAKUPDATESPANTYPE", "STREAKUPDATEINTERVAL", "STREAKN"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Challenge',
            createChallengeRequest: {
                owner: 'OWNER',
                endTime: 'ENDTIME',
                capacity: 'CAPACITY',
                title: 'TITLE',
                goal: 'GOAL',
                description: 'DESCRIPTION',
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                difficulty: 'DIFFICULTY',
                prize: 'PRIZE',
                members: [ 'MEMBER1', 'MEMBER2', 'MEMBER3' ],
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                group: 'GROUPID',
                challengeType: 'CHALLENGETYPE',
                streakUpdateSpanType: 'STREAKUPDATESPANTYPE',
                streakUpdateInterval: 'STREAKUPDATEINTERVAL',
                streakN: 'STREAKN'
            }
        });
    });
// static updateWinner(fromID, challengeID, winnerID, successHandler, failureHandler) {
    it("Should update a challenge winner correctly", () => {
        expect(ChallengeFunctions.updateWinner(
            "FROMID", "CHALLENGEID", "WINNERID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'winner',
            attributeValues: [ 'WINNERID' ]
        });
    });
// static updateToPrivate(fromID, challengeID, successHandler, failureHandler) {
    it("Should update a challenge to private correctly", () => {
        expect(ChallengeFunctions.updateToPrivate(
            "FROMID", "CHALLENGEID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: ['CHALLENGEID'],
            attributeName: 'access',
            attributeValues: ['private']
        });
    });
// static updateToPublic(fromID, challengeID, successHandler, failureHandler) {
    it("Should update a challenge to public correctly", () => {
        expect(ChallengeFunctions.updateToPublic(
            "FROMID", "CHALLENGEID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'access',
            attributeValues: [ 'public' ]
        });
    });
// static updateToInviteOnly(fromID, challengeID, successHandler, failureHandler) {
    it("Should update a challenge to invite only", () => {
        expect(ChallengeFunctions.updateToInviteOnly(
            "FROMID", "CHALLENGEID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'restriction',
            attributeValues: [ 'invite' ]
        });
    });
// static updateToUnrestricted(fromID, challengeID, successHandler, failureHandler) {
    it("Should update a challenge to unrestricted", () => {
        expect(ChallengeFunctions.updateToUnrestricted(
            "FROMID", "CHALLENGEID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'restriction',
            attributeValues: [ null ]
        });
    });
// static addTag(fromID, challengeID, tag, successHandler, failureHandler) {
    it("Should add a tag to a challenge correctly", () => {
        expect(ChallengeFunctions.addTag(
            "FROMID", "CHALLENGEID", "TAG"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'tags',
            attributeValues: [ 'TAG' ]
        });
    });
// static removeTag(fromID, challengeID, tag, successHandler, failureHandler) {
    it("Should remove a tag from a challenge correctly", () => {
        expect(ChallengeFunctions.removeTag(
            "FROMID", "CHALLENGEID", "TAG"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'tags',
            attributeValues: [ 'TAG' ]
        });
    });
// static addMember(fromID, challengeID, userID, successHandler, failureHandler) {
//     it("Should add a member to a challenge correctly", () => {
//         expect(ChallengeFunctions.addMember(
//             "FROMID", "CHALLENGEID", "USERID"
//         )).to.eql({
//             environmentType: 'test',
//             fromID: 'FROMID',
//             action: 'UPDATEADD',
//             itemType: null,
//             identifiers: [ 'USERID' ],
//             attributeName: 'challenges',
//             attributeValues: [ 'CHALLENGEID' ]
//         });
//     });
// static removeMember(fromID, challengeID, userID, successHandler, failureHandler) {
    it("Should remove a member from a challenge correctly", () => {
        expect(ChallengeFunctions.removeMember(
            "FROMID", "CHALLENGEID", "USERID"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: null,
            identifiers: [ 'USERID' ],
            attributeName: 'challenges',
            attributeValues: [ 'CHALLENGEID' ]
        });
    });
// static updateEndTime(fromID, challengeID, endTime, successHandler, failureHandler) {
    it("Should update a challenge's end time correctly", () => {
        expect(ChallengeFunctions.updateEndTime(
            "FROMID", "CHALLENGEID", "ENDTIME"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'endTime',
            attributeValues: [ 'ENDTIME' ]
        });
    });
// static updateCapacity(fromID, challengeID, capacity, successHandler, failureHandler) {
    it("Should update a challenge's capacity correctly", () => {
        expect(ChallengeFunctions.updateCapacity(
            "FROMID", "CHALLENGEID", "CAPACITY"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'capacity',
            attributeValues: [ 'CAPACITY' ]
        });
    });
// static updateGoal(fromID, challengeID, goal, successHandler, failureHandler) {
    it("Should update a challenge's goal correctly", () => {
        expect(ChallengeFunctions.updateGoal(
            "FROMID", "CHALLENGEID", "GOAL"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'goal',
            attributeValues: [ 'GOAL' ]
        });
    });
// static updatePrize(fromID, challengeID, prize, successHandler, failureHandler) {
    it("Should update a challenge's prize correctly", () => {
        expect(ChallengeFunctions.updatePrize(
            "FROMID", "CHALLENGEID", "PRIZE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'prize',
            attributeValues: [ 'PRIZE' ]
        });
    });
// static updateTitle(fromID, challengeID, title, successHandler, failureHandler) {
    it("Should update a challenge's title correctly", () => {
        expect(ChallengeFunctions.updateTitle(
            "FROMID", "CHALLENGEID", "TITLE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'title',
            attributeValues: [ 'TITLE' ]
        });
    });
// static updateDescription(fromID, challengeID, description, successHandler, failureHandler) {
    it("Should update a challenge's description correctly", () => {
        expect(ChallengeFunctions.updateDescription(
            "FROMID", "CHALLENGEID", "DESCRIPTION"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'description',
            attributeValues: [ 'DESCRIPTION' ]
        });
    });
// static updateDifficulty(fromID, challengeID, difficulty, successHandler, failureHandler) {
    it("Should update a challenge's difficulty correctly", () => {
        expect(ChallengeFunctions.updateDifficulty(
            "FROMID", "CHALLENGEID", "DIFFICULTY"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'difficulty',
            attributeValues: [ 'DIFFICULTY' ]
        });
    });
});
describe("low level functions", () => {
// static create(fromID, owner, endTime, capacity, title, goal, description, difficulty, members, tags, access,
    it("Should send a create payload for a challenge correctly", () => {
        expect(ChallengeFunctions.create(
            "FROMID", "OWNER", "ENDTIME", "CAPACITY", "TITLE", "GOAL", "DESCRIPTION", "DIFFICULTY",
            ["MEMBER1", "MEMBER2", "MEMBER3"], ["TAG1", "TAG2", "TAG3"], "ACCESS", "RESTRICTION",
            "PRIZE", "GROUP", "CHALLENGETYPE", "STREAKUPDATESPANTYPE", "STREAKUPDATEINTERVAL", "STREAKN"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'CREATE',
            itemType: 'Challenge',
            createChallengeRequest: {
                owner: 'OWNER',
                endTime: 'ENDTIME',
                capacity: 'CAPACITY',
                title: 'TITLE',
                goal: 'GOAL',
                description: 'DESCRIPTION',
                tags: [ 'TAG1', 'TAG2', 'TAG3' ],
                difficulty: 'DIFFICULTY',
                prize: 'PRIZE',
                members: [ 'MEMBER1', 'MEMBER2', 'MEMBER3' ],
                access: 'ACCESS',
                restriction: 'RESTRICTION',
                group: 'GROUP',
                challengeType: 'CHALLENGETYPE',
                streakUpdateSpanType: 'STREAKUPDATESPANTYPE',
                streakUpdateInterval: 'STREAKUPDATEINTERVAL',
                streakN: 'STREAKN'
            }
        });
    });
// static updateAdd(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update add payload for a challenge correctly", () => {
        expect(ChallengeFunctions.updateAdd(
            "FROMID", "CHALLENGEID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEADD',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateRemove(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update remove payload for a challenge correctly", () => {
        expect(ChallengeFunctions.updateRemove(
            "FROMID", "CHALLENGEID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATEREMOVE',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static updateSet(fromID, challengeID, attributeName, attributeValue, successHandler, failureHandler) {
    it("Should send an update set payload for a challenge correctly", () => {
        expect(ChallengeFunctions.updateSet(
            "FROMID", "CHALLENGEID", "ATTRIBUTENAME", "ATTRIBUTEVALUE"
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'UPDATESET',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ],
            attributeName: 'ATTRIBUTENAME',
            attributeValues: [ 'ATTRIBUTEVALUE' ]
        });
    });
// static delete(fromID, challengeID, successHandler, failureHandler) {
    it("Should send a delete payload for a challenge correctly", () => {
        expect(ChallengeFunctions.delete(
            "FROMID", "CHALLENGEID",
        )).to.eql({
            environmentType: 'test',
            fromID: 'FROMID',
            action: 'DELETE',
            itemType: 'Challenge',
            identifiers: [ 'CHALLENGEID' ]
        });
    });
});
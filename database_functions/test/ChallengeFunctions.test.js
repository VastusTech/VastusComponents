import TestConfig from "../../../TestConfig";
import ChallengeFunctions from "../ChallengeFunctions";
import {expect} from "chai";

TestConfig();
it('Creates', () => {
    const lambdaPayload = ChallengeFunctions.create(
        "FROMID", "OWNER", "ENDTIME", "CAPACITY", "TITLE", "GOAL", "DESCRIPTION", "DIFFICULTY",
        ["MEMBER1", "MEMBER2", "MEMBER3"], ["TAG1", "TAG2", "TAG3"], "ACCESS", "RESTRICTION",
        "PRIZE", null, null
    );
    const expected = "{\"fromID\":\"FROMID\",\"action\":\"CREATE\",\"itemType\":\"Challenge\"," +
        "\"createChallengeRequest\":{\"owner\":\"OWNER\",\"endTime\":\"ENDTIME\",\"capacity\":\"CAPACITY\"," +
        "\"title\":\"TITLE\",\"goal\":\"GOAL\",\"description\":\"DESCRIPTION\",\"difficulty\":\"DIFFICULTY\"," +
        "\"memberIDs\":[\"MEMBER1\",\"MEMBER2\",\"MEMBER3\"],\"tags\":[\"TAG1\",\"TAG2\",\"TAG3\"],\"access\":\"ACCESS\"," +
        "\"restriction\":\"RESTRICTION\",\"prize\":\"PRIZE\"}}";
    expect(lambdaPayload).to.be.equal(expected);
});
// it('Update Sets', () => {
//     ChallengeFunctions.create
// });
// it('Update Adds', () => {
//     ChallengeFunctions.create
// });


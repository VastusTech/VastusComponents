import "../../testing/SetTesting";
import QL from "../GraphQL";
import { expect } from "chai";
import {removeWhiteSpace} from "../../logic/StringHelper";

const normalizeQuery = query => ({query: removeWhiteSpace(query.query), variables: query.variables});

describe("high level methods", () => {
    // get Item (by ID)
    describe("get item by ID", () => {
        it("Gets a database Item by ID correctly", function () {
            expect(normalizeQuery(QL.getItem(
                "Client", "CL0001", ["id", "item_type", "name"]
            ))).to.eql({
                query: 'queryGetClient($id:String!){\ngetClient(id:$id){\nid\nitem_type\nname\n}\n}',
                variables: {id: 'CL0001'}
            });
        });
        it("Should throw an error if a bad ID is passed in");
        it("Should throw an error if a null ID is passed in");
        it("Should throw an error if a bad item type is passed in");
        it("Should throw an error if a null item type is passed in");
        it("Should throw an error for an empty list");
        it("Should throw an error for a null list");
    });

    // get Item by username
    describe("get item by username", function () {
        it("Gets a database Item by username correctly", function () {
            expect(normalizeQuery(QL.getItemByUsername(
                "Client", "LB", ["id", "item_type", "username"]
            ))).to.eql({
                query: "queryGetClientByUsername($username:String!){\ngetClientByUsername(username:$username){\nid\nitem_type\nusername\n}\n}",
                variables: {username: "LB"}
            })
        });
        it("Should throw an error if a bad username is passed in");
        it("Should throw an error if a null username is passed in");
        it("Should throw an error if a bad item type is passed in");
        it("Should throw an error if a null item type is passed in");
        it("Should throw an error for an empty list");
        it("Should throw an error for a null list");
    });

    // get Item by federated ID
    describe("get item by federated ID", () => {
        it("Gets a database Item by federated ID correctly", function () {
            expect(normalizeQuery(QL.getItemByFederatedID(
                "Client", "FEDERATEDID", ["id", "item_type", "federatedID"]
            ))).to.eql({
                query: "",
                variables: {}
            })
        });
        it("Should throw an error if a bad federated ID is passed in");
        it("Should throw an error if a null federated ID is passed in");
        it("Should throw an error if a bad item type is passed in");
        it("Should throw an error if a null item type is passed in");
        it("Should throw an error for an empty list");
        it("Should throw an error for a null list");
    });

    // get Items
    describe("batch fetch items by ID", () => {
        it("Batch gets database Items by IDs correctly", function () {
            expect(normalizeQuery(QL.getItems(
                "Client", ["CL0001", "CL0002", "CL0003"], ["id", "item_type", "username"]
            ))).to.eql({
                query: "",
                variables: {}
            })
        });
        it("Should throw an error if a bad ID is passed in");
        it("Should throw an error if a null ID is passed in");
        it("Should throw an error for an empty ID list");
        it("Should throw an error for a null ID list");
        it("Should throw an error if a bad item type is passed in");
        it("Should throw an error if a null item type is passed in");
        it("Should throw an error for an empty list");
        it("Should throw an error for a null list");
    });

    // query items
    describe("query items", () => {
        let filter;
        beforeEach(() => {
            filter = QL.generateFilter({

            }, {

            });
        });
        it("Gets a database Item query correctly", function () {
            const query = QL.constructItemQuery("Challenge", ["id", "item_type", "owner"],
                filter, 100, null);
            expect(normalizeQuery(QL.queryItems(
                "Challenge", query
            ))).to.eql({
                query: "",
                variables: {}
            })
        });
        it("Should get a query with a null filter");
        it("Should throw an error if a bad item type is passed in");
        it("Should throw an error if a null item type is passed in");
    });

});

describe("low level methods", () => {
    // execute
    it("Executes a GraphQL process correctly", function () {
        expect(QL.execute({
            query: "QUERY",
            variables: {
                "VAR1": "VALUE1"
            }
        }, "QUERYFUNCTIONNAME")).to.eql({
            query: "QUERY",
            variables: {
                "VAR1": "VALUE1"
            }
        })
    });
});

describe("query construction methods", () => {
    // GenerateFilter
    it("Generates a filter correctly", function () {
        expect(QL.generateFilter({
            or: [{
                access: "$var1"
            }, {
                restriction: "$var2"
            }]
        }, {
            var1: "public",
            var2: "invite"
        })).to.eql({
            parameterString: "",

        })
    });

    // Generate ID List
    it("Generates an ID list from a list of IDs correctly", function () {

    });

    // Construct Query
    it("Constructs Query correctly", function () {

    });

    // construct item query
    it("Constructs a database Item query correctly", function () {

    });
});

describe("query compression and normalization methods", () => {
    // Get Next Token String
    it("Gets the next token string correctly", function () {

    });

    // get normalized query
    it("Gets Normalized Query correctly", function () {

    });

    // get query from normalized query
    it("Gets query from normalized query correctly", function () {

    });

    // get compressed from query result
    it("Gets compressed result from query result", function () {

    });

    // get query result from compressed
    it("Gets query result from compressed result", function () {

    });

});

describe("item type methods", () => {
    // get Item (by ID)
    describe("get item by ID", () => {
        it("Should get a Client by ID");
        it("Should get a Trainer by ID");
        it("Should get a Gym by ID");
        it("Should get a Workout by ID");
        it("Should get a Review by ID");
        it("Should get a Event by ID");
        it("Should get a Challenge by ID");
        it("Should get a Invite by ID");
        it("Should get a Post by ID");
        it("Should get a Submission by ID");
        it("Should get a Group by ID");
        it("Should get a Comment by ID");
        it("Should get a Sponsor by ID");
        it("Should get a Message by ID");
        it("Should get a Streak by ID");
    });

    // get Item by username
    describe("get item by username", () => {
        it("Should get a Client by username");
        it("Should get a Trainer by username");
        it("Should get a Gym by username");
        it("Should get a Sponsor by username");
    });

    // get Item by federated ID
    describe("get item by federated ID", () => {
        it("Should get a Client by federated ID");
        it("Should get a Trainer by federated ID");
        it("Should get a Gym by federated ID");
        it("Should get a Sponsor by federated ID");
    });

    // get Items
    describe("batch fetch items by ID", () => {
        it("Should batch fetch Clients by IDs");
        it("Should batch fetch Trainers by IDs");
        it("Should batch fetch Gyms by IDs");
        it("Should batch fetch Workouts by IDs");
        it("Should batch fetch Reviews by IDs");
        it("Should batch fetch Events by IDs");
        it("Should batch fetch Challenges by IDs");
        it("Should batch fetch Invites by IDs");
        it("Should batch fetch Posts by IDs");
        it("Should batch fetch Submissions by IDs");
        it("Should batch fetch Groups by IDs");
        it("Should batch fetch Comments by IDs");
        it("Should batch fetch Sponsors by IDs");
        it("Should batch fetch Messages by IDs");
        it("Should batch fetch Streaks by IDs");
    });

    // query items
    describe("query items", () => {
        it("Should query Clients");
        it("Should query Trainers");
        it("Should query Gyms");
        it("Should query Workouts");
        it("Should query Reviews");
        it("Should query Events");
        it("Should query Challenges");
        it("Should query Invites");
        it("Should query Posts");
        it("Should query Submissions");
        it("Should query Groups");
        it("Should query Comments");
        it("Should query Sponsors");
        it("Should query Messages");
        it("Should query Streaks");
    });
});

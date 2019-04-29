import "../../testing/SetTesting";
import QL from "../GraphQL";
import { expect, assert } from "chai";
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
        it("Should throw an error if a null ID is passed in", () => {
            assert.throws(() => QL.getItem(
                "Client", null, ["id", "item_type", "name"]
            ), Error, "ID cannot be null");
        });
        it("Should throw an error if a bad item type is passed in", () => {
            assert.throws(() => QL.getItem(
                "Not-a-Client", "CL0001", ["id", "item_type", "name"]
            ), Error, "Unrecognized item type");
        });
        it("Should throw an error if a null item type is passed in", () => {
            assert.throws(() => QL.getItem(
                null, "CL0001", ["id", "item_type", "name"]
            ), Error, "Item type cannot be null");
        });
        it("Should throw an error for an empty list", () => {
            assert.throws(() => QL.getItem(
                "Client", "CL0001", []
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null list", () => {
            assert.throws(() => QL.getItem(
                "Client", "CL0001", null
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null in the variable list", () => {
            assert.throws(() => QL.getItem(
                "Client", "CL0001", ["id", "item_type", null]
            ), Error, "No variables can be null");
        })
    });

    // get Item by username
    describe("get item by username", function () {
        it("Gets a database Item by username correctly", function () {
            expect(normalizeQuery(QL.getItemByUsername(
                "Client", "LB", ["id", "item_type", "username"]
            ))).to.eql({
                query: "queryGetClientByUsername($username:String!){\ngetClientByUsername(username:$username){" +
                    "\nid\nitem_type\nusername\n}\n}",
                variables: {username: "LB"}
            })
        });
        it("Should throw an error if a null username is passed in", () => {
            assert.throws(() => QL.getItemByUsername(
                "Client", null, ["id", "item_type", "name"]
            ), Error, "Username cannot be null");
        });
        it("Should throw an error if a bad item type is passed in", () => {
            assert.throws(() => QL.getItemByUsername(
                "Not-a-Client", "LB", ["id", "item_type", "name"]
            ), Error, "Unrecognized item type");
        });
        it("Should throw an error if a null item type is passed in", () => {
            assert.throws(() => QL.getItemByUsername(
                null, "LB", ["id", "item_type", "name"]
            ), Error, "Item type cannot be null");
        });
        it("Should throw an error for an empty list", () => {
            assert.throws(() => QL.getItemByUsername(
                "Client", "LB", []
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null list", () => {
            assert.throws(() => QL.getItemByUsername(
                "Client", "LB", null
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null in the variable list", () => {
            assert.throws(() => QL.getItemByUsername(
                "Client", "LB", ["id", "item_type", null]
            ), Error, "No variables can be null");
        })
    });

    // get Item by federated ID
    describe("get item by federated ID", () => {
        it("Gets a database Item by federated ID correctly", function () {
            expect(normalizeQuery(QL.getItemByFederatedID(
                "Client", "FEDERATEDID", ["id", "item_type", "federatedID"]
            ))).to.eql({
                query: 'queryGetClientByFederatedID($federatedID:String!){\ngetClientByFederatedID(' +
                    'federatedID:$federatedID){\nid\nitem_type\nfederatedID\n}\n}',
                variables: { federatedID: 'FEDERATEDID' }
            });
        });
        it("Should throw an error if a null federated ID is passed in", () => {
            assert.throws(() => QL.getItemByFederatedID(
                "Client", null, ["id", "item_type", "federatedID"]
            ), Error, "Federated ID cannot be null");
        });
        it("Should throw an error if a bad item type is passed in", () => {
            assert.throws(() => QL.getItemByFederatedID(
                "Not-a-Client", "FEDERATEDID", ["id", "item_type", "federatedID"]
            ), Error, "Unrecognized item type");
        });
        it("Should throw an error if a null item type is passed in", () => {
            assert.throws(() => QL.getItemByFederatedID(
                null, "FEDERATEDID", ["id", "item_type", "federatedID"]
            ), Error, "Item type cannot be null");
        });
        it("Should throw an error for an empty list", () => {
            assert.throws(() => QL.getItemByFederatedID(
                "Client", "FEDERATEDID", []
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null list", () => {
            assert.throws(() => QL.getItemByFederatedID(
                "Client", "FEDERATEDID", null
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null in the variable list", () => {
            assert.throws(() => QL.getItemByFederatedID(
                "Client", "FEDERATEDID", ["id", "item_type", null]
            ), Error, "No variables can be null");
        })
    });

    // get Items
    describe("batch fetch items by ID", () => {
        it("Batch gets database Items by IDs correctly", function () {
            expect(normalizeQuery(QL.getItems(
                "Client", ["CL0001", "CL0002", "CL0003"], ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetClients($id0:String!,$id1:String!,$id2:String!){\ngetClients(ids:' +
                    '[$id0,$id1,$id2,]){\nitems{\nid\nitem_type\nusername\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: {
                    id0: 'CL0001',
                    id1: 'CL0002',
                    id2: 'CL0003'
                }
            });
        });
        it("Should throw an error if a null ID is passed in", () => {
            assert.throws(() => QL.getItems(
                "Client", ["CL0001", "CL0002", null], ["id", "item_type", "username"]
            ), Error, "No IDs can be null");
        });
        it("Should throw an error for an empty ID list", () => {
            assert.throws(() => QL.getItems(
                "Client", [], ["id", "item_type", "username"]
            ), Error, "ID list must have at least one ID");
        });
        it("Should throw an error for a null ID list", () => {
            assert.throws(() => QL.getItems(
                "Client", null, ["id", "item_type", "username"]
            ), Error, "ID list must have at least one ID");
        });
        it("Should throw an error for a null in the ID list", () => {
            assert.throws(() => QL.getItems(
                "Client", ["CL0001", "CL0002", null], ["id", "item_type", "username"]
            ), Error, "No IDs can be null");
        });
        it("Should throw an error if a bad item type is passed in", () => {
            assert.throws(() => QL.getItems(
                "Not-a-Client", ["CL0001", "CL0002", "CL0003"], ["id", "item_type", "username"]
            ), Error, "Unrecognized item type");
        });
        it("Should throw an error if a null item type is passed in", () => {
            assert.throws(() => QL.getItems(
                null, ["CL0001", "CL0002", "CL0003"], ["id", "item_type", "username"]
            ), Error, "Item type cannot be null");
        });
        it("Should throw an error for an empty list", () => {
            assert.throws(() => QL.getItems(
                "Client", ["CL0001", "CL0002", "CL0003"], []
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null list", () => {
            assert.throws(() => QL.getItems(
                "Client", ["CL0001", "CL0002", "CL0003"], null
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null in the variable list", () => {
            assert.throws(() => QL.getItems(
                "Client", ["CL0001", "CL0002", "CL0003"], ["id", "item_type", null]
            ), Error, "No variables can be null");
        });
    });

    // construct item query
    describe("construct item queries", () => {
        let filter = QL.generateFilter({
            and: [{
                eq: {
                    restriction: "$var1"
                }
            }, {
                eq: {
                    access: "$var2"
                }
            }]
        }, {
            var1: "invite",
            var2: "public"
        });
        it("Constructs a database Item query correctly", function () {
            // TODO
            expect(normalizeQuery(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query with a null filter", () => {
            expect(normalizeQuery(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], null, 10, null
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query with a non-null filter", () => {
            expect(normalizeQuery(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], filter, 10, null
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query with a null next token", () => {
            expect(normalizeQuery(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], filter, 10, null
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query with a non-null next token", () => {
            expect(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], null, 10, "NEXTTOKEN"
            )).to.eql({
                query: "",
                variables: {

                }
            });
        });
        // TODO 0?
        it("Should throw an error if a zero limit is passed in", () => {
            assert.throws(() => QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], filter, 0, "NEXTTOKEN"
            ), Error, "No zero limit");
        });
        it("Should throw an error if a non-positive limit is passed in", () => {
            expect(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], filter, -10, "NEXTTOKEN"
            )).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should throw an error if a bad item type is passed in", () => {
            assert.throws(() => QL.getItems(
                "Not-a-Client", ["CL0001", "CL0002", "CL0003"], ["id", "item_type", "username"]
            ), Error, "Unrecognized item type");
        });
        it("Should throw an error if a null item type is passed in", () => {
            assert.throws(() => QL.getItems(
                null, ["CL0001", "CL0002", "CL0003"], ["id", "item_type", "username"]
            ), Error, "Item type cannot be null");
        });
        it("Should throw an error for an empty list", () => {
            assert.throws(() => QL.getItems(
                "Client", ["CL0001", "CL0002", "CL0003"], []
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null list", () => {
            assert.throws(() => QL.getItems(
                "Client", ["CL0001", "CL0002", "CL0003"], null
            ), Error, "Variable list must have at least one variable");
        });
        it("Should throw an error for a null in the variable list", () => {
            assert.throws(() => QL.getItems(
                "Client", ["CL0001", "CL0002", "CL0003"], ["id", "item_type", null]
            ), Error, "No variables can be null");
        });
    });

    // query items
    describe("query items", () => {
        it("Gets a database Item query correctly", function () {
            const query = QL.constructItemQuery("Challenge", ["id", "item_type", "owner"],
                QL.generateFilter({
                    or: [{
                        eq: {
                            access: "$var1"
                        }
                    }]
                }, {
                    var1: "public"
                }), 100, null);
            expect(normalizeQuery(QL.queryItems(
                "Challenge", query
            ))).to.eql({
                query: "",
                variables: {}
            })
        });
        it("Should throw an error if a bad item type is passed in", () => {
            assert.throws(() => QL.queryItems("Not-a-Client"), Error, "Unrecognized item type");
        });
        it("Should throw an error if a null item type is passed in", () => {
            assert.throws(() => QL.queryItems(null), Error, "Item type cannot be null");
        });
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
            parameterString: 'filter: {or:[{access:$var1},{restriction:$var2}]}',
            parameters: {
                var1: 'public',
                var2: 'invite'
            }
        })
    });

    // Generate ID List
    it("Generates an ID list from a list of IDs correctly", function () {
        expect(QL.generateIDList(["ID1", "ID2", "ID3"])).to.eql({
            parameterString: 'ids: [$id0, $id1, $id2, ]',
            parameters: { id0: 'ID1', id1: 'ID2', id2: 'ID3' }
        });
    });

    // Construct Query
    // TODO
    describe("construct query", () => {
        it("Constructs Query correctly", () => {
            QL.constructQuery()
        });
        it("Should construct a query for a single fetch");
        it("Should construct a query for a batch fetch");
        it("Should construct a query for a query fetch with null filter");
        it("Should construct a query for a query fetch with a filter");
    });
});

describe("query compression and normalization methods", () => {
    // Get Next Token String
    it("Should get the next token string correctly", () => {
        expect(QL.getNextTokenString("NEXTTOKEN")).to.be.equal("NEXTTOKEN");
    });
    it("Should get the null next token string correctly", () => {
        expect(QL.getNextTokenString(null)).to.be.equal("null");
    });

    // get normalized query
    it("Gets Normalized Query correctly", function () {
        expect(QL.getNormalizedQuery({
            query: "QUERY",
            variables: {
                VAR1: "VALUE1"
            }
        })).to.eql({
            query: "QUERY",
            variables: {
                VAR1: "VALUE1",
                nextToken: "not_defined"
            }
        });
    });

    // get query from normalized query
    it("Gets query from normalized query correctly", function () {
        expect(QL.getQueryFromNormalizedQuery({
            query: "QUERY",
            variables: {
                VAR1: "VALUE1"
            }
        }, "NEXTTOKEN")).to.eql({
            query: "QUERY",
            variables: {
                VAR1: "VALUE1",
                nextToken: "NEXTTOKEN"
            }
        });
    });

    // get compressed from query result
    it("Gets compressed result from query result", function () {
        // TODO
        QL.getCompressedFromQueryResult()
    });

    // get query result from compressed
    it("Gets query result from compressed result", function () {
        // TODO
        QL.getQueryResultFromCompressed({

        })
    });

});

// TODO
describe("item type methods", () => {
    // get Item (by ID)
    describe("get item by ID", () => {
        it("Should get a Client by ID", () => {
            expect(normalizeQuery(QL.getClient(
                "CL0001", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Trainer by ID", () => {
            expect(normalizeQuery(QL.getTrainer(
                "TR0001", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Gym by ID", () => {
            expect(normalizeQuery(QL.getGym(
                "GY0001", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Workout by ID", () => {
            expect(normalizeQuery(QL.getWorkout(
                "WO0001", ["id", "item_type", "time"]
            ))).to.eql({

            });
        });
        it("Should get a Review by ID", () => {
            expect(normalizeQuery(QL.getReview(
                "RE0001", ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should get a Event by ID", () => {
            expect(normalizeQuery(QL.getEvent(
                "EV0001", ["id", "item_type", "time"]
            ))).to.eql({

            });
        });
        it("Should get a Challenge by ID", () => {
            expect(normalizeQuery(QL.getChallenge(
                "CH0001", ["id", "item_type", "endtime"]
            ))).to.eql({

            });
        });
        it("Should get a Invite by ID", () => {
            expect(normalizeQuery(QL.getInvite(
                "IN0001", ["id", "item_type", "from"]
            ))).to.eql({

            });
        });
        it("Should get a Post by ID", () => {
            expect(normalizeQuery(QL.getPost(
                "PO0001", ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should get a Submission by ID", () => {
            expect(normalizeQuery(QL.getSubmission(
                "SU0001", ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should get a Group by ID", () => {
            expect(normalizeQuery(QL.getGroup(
                "GR0001", ["id", "item_type", "owners"]
            ))).to.eql({

            });
        });
        it("Should get a Comment by ID", () => {
            expect(normalizeQuery(QL.getComment(
                "CO0001", ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should get a Sponsor by ID", () => {
            expect(normalizeQuery(QL.getSponsor(
                "SP0001", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Message by ID", () => {
            expect(normalizeQuery(QL.getMessage(
                "ME0001", ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should get a Streak by ID", () => {
            expect(normalizeQuery(QL.getStreak(
                "ST0001", ["id", "item_type", "streakType"]
            ))).to.eql({

            });
        });
    });

    // get Item by username
    describe("get item by username", () => {
        it("Should get a Client by username", () => {
            expect(normalizeQuery(QL.getClientByUsername(
                "LB", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Trainer by username", () => {
            expect(normalizeQuery(QL.getTrainerByUsername(
                "LB", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Gym by username", () => {
            expect(normalizeQuery(QL.getGymByUsername(
                "LB", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Sponsor by username", () => {
            expect(normalizeQuery(QL.getSponsorByUsername(
                "LB", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
    });

    // get Item by federated ID
    describe("get item by federated ID", () => {
        it("Should get a Client by federated ID", () => {
            expect(normalizeQuery(QL.getClientByFederatedID(
                "FEDERATEDID", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Trainer by federated ID", () => {
            expect(normalizeQuery(QL.getTrainerByFederatedID(
                "FEDERATEDID", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Gym by federated ID", () => {
            expect(normalizeQuery(QL.getGymByFederatedID(
                "FEDERATEDID", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should get a Sponsor by federated ID", () => {
            expect(normalizeQuery(QL.getSponsorByFederatedID(
                "FEDERATEDID", ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
    });

    // get Items
    describe("batch fetch items by ID", () => {
        it("Should batch fetch Clients by IDs", () => {
            expect(normalizeQuery(QL.getClients(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Trainers by IDs", () => {
            expect(normalizeQuery(QL.getTrainers(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Gyms by IDs", () => {
            expect(normalizeQuery(QL.getGyms(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Workouts by IDs", () => {
            expect(normalizeQuery(QL.getWorkouts(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "time"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Reviews by IDs", () => {
            expect(normalizeQuery(QL.getReviews(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Events by IDs", () => {
            expect(normalizeQuery(QL.getEvents(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "time"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Challenges by IDs", () => {
            expect(normalizeQuery(QL.getChallenges(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "endtime"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Invites by IDs", () => {
            expect(normalizeQuery(QL.getInvites(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Posts by IDs", () => {
            expect(normalizeQuery(QL.getPosts(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Submissions by IDs", () => {
            expect(normalizeQuery(QL.getSubmissions(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Groups by IDs", () => {
            expect(normalizeQuery(QL.getGroups(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "owners"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Comments by IDs", () => {
            expect(normalizeQuery(QL.getComments(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Sponsors by IDs", () => {
            expect(normalizeQuery(QL.getSponsors(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "username"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Messages by IDs", () => {
            expect(normalizeQuery(QL.getMessages(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({

            });
        });
        it("Should batch fetch Streaks by IDs", () => {
            expect(normalizeQuery(QL.getStreaks(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "streakType"]
            ))).to.eql({

            });
        });
    });

    // construct item query
    describe("construct item queries", () => {
        const filter = QL.generateFilter({
            gt: {
                time_created: "$var1"
            }
        }, {
            var1: "1998-10-05"
        });
        it("Should construct a query for Clients", () => {
            expect(normalizeQuery(QL.constructClientQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Trainers", () => {
            expect(normalizeQuery(QL.constructTrainerQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Gyms", () => {
            expect(normalizeQuery(QL.constructGymQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Workouts", () => {
            expect(normalizeQuery(QL.constructWorkoutQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Reviews", () => {
            expect(normalizeQuery(QL.constructReviewQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Events", () => {
            expect(normalizeQuery(QL.constructEventQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Challenges", () => {
            expect(normalizeQuery(QL.constructChallengeQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Invites", () => {
            expect(normalizeQuery(QL.constructInviteQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Posts", () => {
            expect(normalizeQuery(QL.constructPostQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Submissions", () => {
            expect(normalizeQuery(QL.constructSubmissionQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Groups", () => {
            expect(normalizeQuery(QL.constructGroupQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Comments", () => {
            expect(normalizeQuery(QL.constructCommentQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Sponsors", () => {
            expect(normalizeQuery(QL.constructSponsorQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Messages", () => {
            expect(normalizeQuery(QL.constructMessageQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should construct a query for Streaks", () => {
            expect(normalizeQuery(QL.constructStreakQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
    });

    // query items
    describe("query items", () => {
        const filter = QL.generateFilter({
            gt: {
                time_created: "$var1"
            }
        }, {
            var1: "1998-10-05"
        });

        it("Should query Clients", () => {
            expect(normalizeQuery(QL.queryClients(
                QL.constructClientQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Trainers", () => {
            expect(normalizeQuery(QL.queryTrainers(
                QL.constructTrainerQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Gyms", () => {
            expect(normalizeQuery(QL.queryGyms(
                QL.constructGymQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Workouts", () => {
            expect(normalizeQuery(QL.queryWorkouts(
                QL.constructWorkoutQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Reviews", () => {
            expect(normalizeQuery(QL.queryReviews(
                QL.constructReviewQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Events", () => {
            expect(normalizeQuery(QL.queryEvents(
                QL.constructEventQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Challenges", () => {
            expect(normalizeQuery(QL.queryChallenges(
                QL.constructChallengeQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Invites", () => {
            expect(normalizeQuery(QL.queryInvites(
                QL.constructInviteQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Posts", () => {
            expect(normalizeQuery(QL.queryPosts(
                QL.constructPostQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Submissions", () => {
            expect(normalizeQuery(QL.querySubmissions(
                QL.constructSubmissionQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Groups", () => {
            expect(normalizeQuery(QL.queryGroups(
                QL.constructGroupQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Comments", () => {
            expect(normalizeQuery(QL.queryComments(
                QL.constructCommentQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Sponsors", () => {
            expect(normalizeQuery(QL.querySponsors(
                QL.constructSponsorQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Messages", () => {
            expect(normalizeQuery(QL.queryMessages(
                QL.constructMessageQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
        it("Should query Streaks", () => {
            expect(normalizeQuery(QL.queryStreaks(
                QL.constructStreakQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: "",
                variables: {

                }
            });
        });
    });
});

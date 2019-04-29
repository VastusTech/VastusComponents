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
                query: 'queryQueryPosts($limit:Int,$nextToken:String!,$var1:String!,$var2:String!){\n' +
                    'queryPosts(filter:{and:[{eq:{restriction:$var1}},{eq:{access:$var2}}]},limit:$limit,' +
                    'nextToken:$nextToken){\nitems{\nid\nitem_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: 'invite',
                    var2: 'public'
                }
            });
        });
        it("Should construct a query with a null filter", () => {
            expect(normalizeQuery(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], null, 10, null
            ))).to.eql({
                query: 'queryQueryPosts($limit:Int){\nqueryPosts(limit:$limit){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10
                }
            });
        });
        it("Should construct a query with a non-null filter", () => {
            expect(normalizeQuery(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], filter, 10, null
            ))).to.eql({
                query: 'queryQueryPosts($limit:Int,$var1:String!,$var2:String!){\nqueryPosts(filter:' +
                    '{and:[{eq:{restriction:$var1}},{eq:{access:$var2}}]},limit:$limit){\nitems{\nid\n' +
                    'item_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    var1: 'invite',
                    var2: 'public'
                }
            });
        });
        it("Should construct a query with a null next token", () => {
            expect(normalizeQuery(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], filter, 10, null
            ))).to.eql({
                query: 'queryQueryPosts($limit:Int,$var1:String!,$var2:String!){\nqueryPosts(filter:{and:[{eq:' +
                    '{restriction:$var1}},{eq:{access:$var2}}]},limit:$limit){\nitems{\nid\nitem_type\ntime_created' +
                    '\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    var1: 'invite',
                    var2: 'public'
                }
            });
        });
        it("Should construct a query with a non-null next token", () => {
            expect(normalizeQuery(QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], null, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryPosts($limit:Int,$nextToken:String!){\nqueryPosts(limit:$limit,nextToken:' +
                    '$nextToken){\nitems{\nid\nitem_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN'
                }
            });
        });
        // TODO 0?
        it("Should throw an error if a zero limit is passed in", () => {
            assert.throws(() => QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], filter, 0, "NEXTTOKEN"
            ), Error, "Limit must be greater than 0");
        });
        it("Should throw an error if a non-positive limit is passed in", () => {
            assert.throws(() => QL.constructItemQuery(
                "Post", ["id", "item_type", "time_created"], filter, -10, "NEXTTOKEN"
            ), Error, "Limit must be greater than 0");
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
                query: 'queryQueryChallenges($limit:Int,$var1:String!){\nqueryChallenges(filter:{or:[{eq:{access:' +
                    '$var1}}]},limit:$limit){\nitems{\nid\nitem_type\nowner\n}\nnextToken\n}\n}',
                variables: {
                    limit: 100,
                    var1: 'public'
                }
            });
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
        it("Should construct a query for a single fetch", () => {
            expect(normalizeQuery(QL.constructQuery(
                "QUERYNAME", "QUERYFUNCTION", {
                    id: "ID"
                }, ["id", "item_type", "time_created"]
            ))).to.eql({
                query: 'queryQUERYNAME($id:String!){\nQUERYFUNCTION(id:$id){\nid\nitem_type\ntime_created\n}\n}',
                variables: {
                    id: 'ID'
                }
            });
        });
        it("Should construct a query for a batch fetch", () => {
            expect(normalizeQuery(QL.constructQuery(
                "QUERYNAME", "QUERYFUNCTION", {
                    ids: ["ID1", "ID2", "ID3"]
                }, ["id", "item_type", "time_created"], null, true
            ))).to.eql({
                query: 'queryQUERYNAME($ids:[String]!){\nQUERYFUNCTION(ids:$ids){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: {
                    ids: [ 'ID1', 'ID2', 'ID3' ]
                }
            });
        });
        it("Should construct a query for a query fetch with null filter", () => {
            expect(normalizeQuery(QL.constructQuery(
                "QUERYNAME", "QUERYFUNCTION", {
                    nextToken: "NEXTTOKEN",
                    limit: "LIMIT"
                }, ["id", "item_type", "time_created"], null, false, true
            ))).to.eql({
                query: 'queryQUERYNAME($nextToken:String!,$limit:Int){\nQUERYFUNCTION(nextToken:$nextToken,' +
                    'limit:$limit){\nitems{\nid\nitem_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    nextToken: 'NEXTTOKEN',
                    limit: 'LIMIT'
                }
            });
        });
        it("Should construct a query for a query fetch with a filter", () => {
            expect(normalizeQuery(QL.constructQuery(
                "QUERYNAME", "QUERYFUNCTION", {
                    nextToken: "NEXTTOKEN",
                    limit: "LIMIT"
                }, ["id", "item_type", "time_created"], QL.generateFilter({
                    or: [{
                        eq: {
                            access: "$var1"
                        }
                    }, {
                        eq: {
                            restriction: "$var2"
                        }
                    }]
                }, {
                    var1: "public",
                    var2: "invite"
                }), false, true
            ))).to.eql({
                query: 'queryQUERYNAME($nextToken:String!,$limit:Int,$var1:String!,$var2:String!){\n' +
                    'QUERYFUNCTION(filter:{or:[{eq:{access:$var1}},{eq:{restriction:$var2}}]},nextToken:' +
                    '$nextToken,limit:$limit){\nitems{\nid\nitem_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    nextToken: 'NEXTTOKEN',
                    limit: 'LIMIT',
                    var1: 'public',
                    var2: 'invite'
                }
            });
        });
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
        expect(QL.getCompressedFromQueryResult({
            items: [{
                id: "ID1",
                name: "Leo"
            }, {
                id: "ID2",
                name: "Not Leo"
            }],
            nextToken: "NEXTTOKEN"
        })).to.eql({
            ids: ["ID1", "ID2"],
            nextToken: "NEXTTOKEN"
        });
    });

    // get query result from compressed
    it("Gets query result from compressed result", function () {
        expect(QL.getQueryResultFromCompressed({
            ids: ["ID1", "ID2"],
            nextToken: "NEXTTOKEN"
        }, {
            ID1: {
                id: "ID1",
                name: "Leo"
            },
            ID2: {
                id: "ID2",
                name: "Not Leo"
            }
        })).to.eql({
            items: [{
                id: "ID1",
                name: "Leo"
            }, {
                id: "ID2",
                name: "Not Leo"
            }],
            nextToken: "NEXTTOKEN"
        });
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
                query: 'queryGetClient($id:String!){\ngetClient(id:$id){\nid\nitem_type\nusername\n}\n}',
                variables: {
                    id: 'CL0001'
                }
            });
        });
        it("Should get a Trainer by ID", () => {
            expect(normalizeQuery(QL.getTrainer(
                "TR0001", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetTrainer($id:String!){\ngetTrainer(id:$id){\nid\nitem_type\nusername\n}\n}',
                variables: {
                    id: 'TR0001'
                }
            });
        });
        it("Should get a Gym by ID", () => {
            expect(normalizeQuery(QL.getGym(
                "GY0001", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetGym($id:String!){\ngetGym(id:$id){\nid\nitem_type\nusername\n}\n}',
                variables: {
                    id: 'GY0001'
                }
            });
        });
        it("Should get a Workout by ID", () => {
            expect(normalizeQuery(QL.getWorkout(
                "WO0001", ["id", "item_type", "time"]
            ))).to.eql({
                query: 'queryGetWorkout($id:String!){\ngetWorkout(id:$id){\nid\nitem_type\ntime\n}\n}',
                variables: {
                    id: 'WO0001'
                }
            });
        });
        it("Should get a Review by ID", () => {
            expect(normalizeQuery(QL.getReview(
                "RE0001", ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetReview($id:String!){\ngetReview(id:$id){\nid\nitem_type\nby\n}\n}',
                variables: {
                    id: 'RE0001'
                }
            });
        });
        it("Should get a Event by ID", () => {
            expect(normalizeQuery(QL.getEvent(
                "EV0001", ["id", "item_type", "time"]
            ))).to.eql({
                query: 'queryGetEvent($id:String!){\ngetEvent(id:$id){\nid\nitem_type\ntime\n}\n}',
                variables: {
                    id: 'EV0001'
                }
            });
        });
        it("Should get a Challenge by ID", () => {
            expect(normalizeQuery(QL.getChallenge(
                "CH0001", ["id", "item_type", "endtime"]
            ))).to.eql({
                query: 'queryGetChallenge($id:String!){\ngetChallenge(id:$id){\nid\nitem_type\nendtime\n}\n}',
                variables: {
                    id: 'CH0001'
                }
            });
        });
        it("Should get a Invite by ID", () => {
            expect(normalizeQuery(QL.getInvite(
                "IN0001", ["id", "item_type", "from"]
            ))).to.eql({
                query: 'queryGetInvite($id:String!){\ngetInvite(id:$id){\nid\nitem_type\nfrom\n}\n}',
                variables: {
                    id: 'IN0001'
                }
            });
        });
        it("Should get a Post by ID", () => {
            expect(normalizeQuery(QL.getPost(
                "PO0001", ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetPost($id:String!){\ngetPost(id:$id){\nid\nitem_type\nby\n}\n}',
                variables: {
                    id: 'PO0001'
                }
            });
        });
        it("Should get a Submission by ID", () => {
            expect(normalizeQuery(QL.getSubmission(
                "SU0001", ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetSubmission($id:String!){\ngetSubmission(id:$id){\nid\nitem_type\nby\n}\n}',
                variables: {
                    id: 'SU0001'
                }
            });
        });
        it("Should get a Group by ID", () => {
            expect(normalizeQuery(QL.getGroup(
                "GR0001", ["id", "item_type", "owners"]
            ))).to.eql({
                query: 'queryGetGroup($id:String!){\ngetGroup(id:$id){\nid\nitem_type\nowners\n}\n}',
                variables: {
                    id: 'GR0001'
                }
            });
        });
        it("Should get a Comment by ID", () => {
            expect(normalizeQuery(QL.getComment(
                "CO0001", ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetComment($id:String!){\ngetComment(id:$id){\nid\nitem_type\nby\n}\n}',
                variables: {
                    id: 'CO0001'
                }
            });
        });
        it("Should get a Sponsor by ID", () => {
            expect(normalizeQuery(QL.getSponsor(
                "SP0001", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetSponsor($id:String!){\ngetSponsor(id:$id){\nid\nitem_type\nusername\n}\n}',
                variables: {
                    id: 'SP0001'
                }
            });
        });
        it("Should get a Message by ID", () => {
            expect(normalizeQuery(QL.getMessage(
                "CH0001", "ME0001", ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetMessage($board:String!,$id:String!){\ngetMessage(board:$board,id:$id){\nid\n' +
                    'item_type\nby\n}\n}',
                variables: {
                    board: 'CH0001',
                    id: 'ME0001'
                }
            });
        });
        it("Should get a Streak by ID", () => {
            expect(normalizeQuery(QL.getStreak(
                "ST0001", ["id", "item_type", "streakType"]
            ))).to.eql({
                query: 'queryGetStreak($id:String!){\ngetStreak(id:$id){\nid\nitem_type\nstreakType\n}\n}',
                variables: {
                    id: 'ST0001'
                }
            });
        });
    });

    // get Item by username
    describe("get item by username", () => {
        it("Should get a Client by username", () => {
            expect(normalizeQuery(QL.getClientByUsername(
                "LB", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetClientByUsername($username:String!){\ngetClientByUsername(username:$username)' +
                    '{\nid\nitem_type\nusername\n}\n}',
                variables: {
                    username: 'LB'
                }
            });
        });
        it("Should get a Trainer by username", () => {
            expect(normalizeQuery(QL.getTrainerByUsername(
                "LB", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetTrainerByUsername($username:String!){\ngetTrainerByUsername(username:$username)' +
                    '{\nid\nitem_type\nusername\n}\n}',
                variables: {
                    username: 'LB'
                }
            });
        });
        it("Should get a Gym by username", () => {
            expect(normalizeQuery(QL.getGymByUsername(
                "LB", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetGymByUsername($username:String!){\ngetGymByUsername(username:$username){' +
                    '\nid\nitem_type\nusername\n}\n}',
                variables: {
                    username: 'LB'
                }
            });
        });
        it("Should get a Sponsor by username", () => {
            expect(normalizeQuery(QL.getSponsorByUsername(
                "LB", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetSponsorByUsername($username:String!){\ngetSponsorByUsername(username:' +
                    '$username){\nid\nitem_type\nusername\n}\n}',
                variables: {
                    username: 'LB'
                }
            });
        });
    });

    // get Item by federated ID
    describe("get item by federated ID", () => {
        it("Should get a Client by federated ID", () => {
            expect(normalizeQuery(QL.getClientByFederatedID(
                "FEDERATEDID", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetClientByFederatedID($federatedID:String!){\ngetClientByFederatedID(' +
                    'federatedID:$federatedID){\nid\nitem_type\nusername\n}\n}',
                variables: {
                    federatedID: 'FEDERATEDID'
                }
            });
        });
        it("Should get a Trainer by federated ID", () => {
            expect(normalizeQuery(QL.getTrainerByFederatedID(
                "FEDERATEDID", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetTrainerByFederatedID($federatedID:String!){\ngetTrainerByFederatedID(' +
                    'federatedID:$federatedID){\nid\nitem_type\nusername\n}\n}',
                variables: {
                    federatedID: 'FEDERATEDID'
                }
            });
        });
        it("Should get a Gym by federated ID", () => {
            expect(normalizeQuery(QL.getGymByFederatedID(
                "FEDERATEDID", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetGymByFederatedID($federatedID:String!){\ngetGymByFederatedID(federatedID:' +
                    '$federatedID){\nid\nitem_type\nusername\n}\n}',
                variables: {
                    federatedID: 'FEDERATEDID'
                }
            });
        });
        it("Should get a Sponsor by federated ID", () => {
            expect(normalizeQuery(QL.getSponsorByFederatedID(
                "FEDERATEDID", ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetSponsorByFederatedID($federatedID:String!){\ngetSponsorByFederatedID(' +
                    'federatedID:$federatedID){\nid\nitem_type\nusername\n}\n}',
                variables: {
                    federatedID: 'FEDERATEDID'
                }
            });
        });
    });

    // get Items
    describe("batch fetch items by ID", () => {
        it("Should batch fetch Clients by IDs", () => {
            expect(normalizeQuery(QL.getClients(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetClients($id0:String!,$id1:String!,$id2:String!){\ngetClients(ids:[$id0,$id1,$id2,])' +
                    '{\nitems{\nid\nitem_type\nusername\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Trainers by IDs", () => {
            expect(normalizeQuery(QL.getTrainers(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetTrainers($id0:String!,$id1:String!,$id2:String!){\ngetTrainers(ids:[$id0,$id1,$id2,])' +
                    '{\nitems{\nid\nitem_type\nusername\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Gyms by IDs", () => {
            expect(normalizeQuery(QL.getGyms(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetGyms($id0:String!,$id1:String!,$id2:String!){\ngetGyms(ids:[$id0,$id1,$id2,])' +
                    '{\nitems{\nid\nitem_type\nusername\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Workouts by IDs", () => {
            expect(normalizeQuery(QL.getWorkouts(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "time"]
            ))).to.eql({
                query: 'queryGetWorkouts($id0:String!,$id1:String!,$id2:String!){\ngetWorkouts(ids:[$id0,$id1,$id2,' +
                    ']){\nitems{\nid\nitem_type\ntime\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Reviews by IDs", () => {
            expect(normalizeQuery(QL.getReviews(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetReviews($id0:String!,$id1:String!,$id2:String!){\ngetReviews(ids:[$id0,$id1,$id2,' +
                    ']){\nitems{\nid\nitem_type\nby\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Events by IDs", () => {
            expect(normalizeQuery(QL.getEvents(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "time"]
            ))).to.eql({
                query: 'queryGetEvents($id0:String!,$id1:String!,$id2:String!){\ngetEvents(ids:[$id0,$id1,$id2,' +
                    ']){\nitems{\nid\nitem_type\ntime\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Challenges by IDs", () => {
            expect(normalizeQuery(QL.getChallenges(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "endtime"]
            ))).to.eql({
                query: 'queryGetChallenges($id0:String!,$id1:String!,$id2:String!){\ngetChallenges(ids:[$id0,$id1,' +
                    '$id2,]){\nitems{\nid\nitem_type\nendtime\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Invites by IDs", () => {
            expect(normalizeQuery(QL.getInvites(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetInvites($id0:String!,$id1:String!,$id2:String!){\ngetInvites(ids:[$id0,$id1,' +
                    '$id2,]){\nitems{\nid\nitem_type\nby\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Posts by IDs", () => {
            expect(normalizeQuery(QL.getPosts(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetPosts($id0:String!,$id1:String!,$id2:String!){\ngetPosts(ids:[$id0,$id1,$id2,' +
                    ']){\nitems{\nid\nitem_type\nby\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Submissions by IDs", () => {
            expect(normalizeQuery(QL.getSubmissions(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetSubmissions($id0:String!,$id1:String!,$id2:String!){\ngetSubmissions(ids:' +
                    '[$id0,$id1,$id2,]){\nitems{\nid\nitem_type\nby\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Groups by IDs", () => {
            expect(normalizeQuery(QL.getGroups(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "owners"]
            ))).to.eql({
                query: 'queryGetGroups($id0:String!,$id1:String!,$id2:String!){\ngetGroups(ids:[$id0,$id1,$id2,' +
                    ']){\nitems{\nid\nitem_type\nowners\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Comments by IDs", () => {
            expect(normalizeQuery(QL.getComments(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetComments($id0:String!,$id1:String!,$id2:String!){\ngetComments(ids:[$id0,$id1,$id2,' +
                    ']){\nitems{\nid\nitem_type\nby\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Sponsors by IDs", () => {
            expect(normalizeQuery(QL.getSponsors(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "username"]
            ))).to.eql({
                query: 'queryGetSponsors($id0:String!,$id1:String!,$id2:String!){\ngetSponsors(ids:[$id0,$id1,$id2,' +
                    ']){\nitems{\nid\nitem_type\nusername\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Messages by IDs", () => {
            expect(normalizeQuery(QL.getMessages(
                "CH0001", ["ID1", "ID2", "ID3"], ["id", "item_type", "by"]
            ))).to.eql({
                query: 'queryGetMessages($board:String!,$id0:String!,$id1:String!,$id2:String!){\ngetMessages(ids:' +
                    '[$id0,$id1,$id2,],board:$board){\nitems{\nid\nitem_type\nby\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { board: 'CH0001', id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
        });
        it("Should batch fetch Streaks by IDs", () => {
            expect(normalizeQuery(QL.getStreaks(
                ["ID1", "ID2", "ID3"], ["id", "item_type", "streakType"]
            ))).to.eql({
                query: 'queryGetStreaks($id0:String!,$id1:String!,$id2:String!){\ngetStreaks(ids:[$id0,$id1,$id2,' +
                    ']){\nitems{\nid\nitem_type\nstreakType\n}\nunretrievedItems{\nid\n}\n}\n}',
                variables: { id0: 'ID1', id1: 'ID2', id2: 'ID3' } });
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
                query: 'queryQueryClients($limit:Int,$nextToken:String!,$var1:String!){\nqueryClients(' +
                    'filter:{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\n' +
                    'item_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Trainers", () => {
            expect(normalizeQuery(QL.constructTrainerQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryTrainers($limit:Int,$nextToken:String!,$var1:String!){\nqueryTrainers(' +
                    'filter:{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\n' +
                    'item_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Gyms", () => {
            expect(normalizeQuery(QL.constructGymQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryGyms($limit:Int,$nextToken:String!,$var1:String!){\nqueryGyms(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type' +
                    '\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Workouts", () => {
            expect(normalizeQuery(QL.constructWorkoutQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryWorkouts($limit:Int,$nextToken:String!,$var1:String!){\nqueryWorkouts(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Reviews", () => {
            expect(normalizeQuery(QL.constructReviewQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryReviews($limit:Int,$nextToken:String!,$var1:String!){\nqueryReviews(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Events", () => {
            expect(normalizeQuery(QL.constructEventQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryEvents($limit:Int,$nextToken:String!,$var1:String!){\nqueryEvents(filter:{' +
                    'gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Challenges", () => {
            expect(normalizeQuery(QL.constructChallengeQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryChallenges($limit:Int,$nextToken:String!,$var1:String!){\nqueryChallenges(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Invites", () => {
            expect(normalizeQuery(QL.constructInviteQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryInvites($limit:Int,$nextToken:String!,$var1:String!){\nqueryInvites(filter:{gt:' +
                    '{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Posts", () => {
            expect(normalizeQuery(QL.constructPostQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryPosts($limit:Int,$nextToken:String!,$var1:String!){\nqueryPosts(filter:{gt:' +
                    '{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Submissions", () => {
            expect(normalizeQuery(QL.constructSubmissionQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQuerySubmissions($limit:Int,$nextToken:String!,$var1:String!){\nquerySubmissions(filter' +
                    ':{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Groups", () => {
            expect(normalizeQuery(QL.constructGroupQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryGroups($limit:Int,$nextToken:String!,$var1:String!){\nqueryGroups(filter:{' +
                    'gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\n' +
                    'item_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Comments", () => {
            expect(normalizeQuery(QL.constructCommentQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryComments($limit:Int,$nextToken:String!,$var1:String!){\nqueryComments(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Sponsors", () => {
            expect(normalizeQuery(QL.constructSponsorQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQuerySponsors($limit:Int,$nextToken:String!,$var1:String!){\nquerySponsors(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Messages", () => {
            expect(normalizeQuery(QL.constructMessageQuery(
                "CH0001", ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryMessages($board:String!,$limit:Int,$nextToken:String!,$var1:String!){\n' +
                    'queryMessages(filter:{gt:{time_created:$var1}},board:$board,limit:$limit,nextToken:' +
                    '$nextToken){\nitems{\nid\nitem_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    board: 'CH0001',
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should construct a query for Streaks", () => {
            expect(normalizeQuery(QL.constructStreakQuery(
                ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN"
            ))).to.eql({
                query: 'queryQueryStreaks($limit:Int,$nextToken:String!,$var1:String!){\nqueryStreaks(filter:{gt:' +
                    '{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
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
                query: 'queryQueryClients($limit:Int,$nextToken:String!,$var1:String!){\nqueryClients(filter:{' +
                    'gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Trainers", () => {
            expect(normalizeQuery(QL.queryTrainers(
                QL.constructTrainerQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryTrainers($limit:Int,$nextToken:String!,$var1:String!){\nqueryTrainers(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Gyms", () => {
            expect(normalizeQuery(QL.queryGyms(
                QL.constructGymQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryGyms($limit:Int,$nextToken:String!,$var1:String!){\nqueryGyms(filter:{gt:{' +
                    'time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Workouts", () => {
            expect(normalizeQuery(QL.queryWorkouts(
                QL.constructWorkoutQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryWorkouts($limit:Int,$nextToken:String!,$var1:String!){\nqueryWorkouts(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Reviews", () => {
            expect(normalizeQuery(QL.queryReviews(
                QL.constructReviewQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryReviews($limit:Int,$nextToken:String!,$var1:String!){\nqueryReviews(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Events", () => {
            expect(normalizeQuery(QL.queryEvents(
                QL.constructEventQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryEvents($limit:Int,$nextToken:String!,$var1:String!){\nqueryEvents(filter:{gt:' +
                    '{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Challenges", () => {
            expect(normalizeQuery(QL.queryChallenges(
                QL.constructChallengeQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryChallenges($limit:Int,$nextToken:String!,$var1:String!){\nqueryChallenges(' +
                    'filter:{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\n' +
                    'item_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Invites", () => {
            expect(normalizeQuery(QL.queryInvites(
                QL.constructInviteQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryInvites($limit:Int,$nextToken:String!,$var1:String!){\nqueryInvites(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Posts", () => {
            expect(normalizeQuery(QL.queryPosts(
                QL.constructPostQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryPosts($limit:Int,$nextToken:String!,$var1:String!){\nqueryPosts(filter:{gt:' +
                    '{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Submissions", () => {
            expect(normalizeQuery(QL.querySubmissions(
                QL.constructSubmissionQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQuerySubmissions($limit:Int,$nextToken:String!,$var1:String!){\nquerySubmissions(' +
                    'filter:{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\n' +
                    'item_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Groups", () => {
            expect(normalizeQuery(QL.queryGroups(
                QL.constructGroupQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryGroups($limit:Int,$nextToken:String!,$var1:String!){\nqueryGroups(filter:{' +
                    'gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Comments", () => {
            expect(normalizeQuery(QL.queryComments(
                QL.constructCommentQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryComments($limit:Int,$nextToken:String!,$var1:String!){\nqueryComments(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Sponsors", () => {
            expect(normalizeQuery(QL.querySponsors(
                QL.constructSponsorQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQuerySponsors($limit:Int,$nextToken:String!,$var1:String!){\nquerySponsors(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Messages", () => {
            expect(normalizeQuery(QL.queryMessages(
                QL.constructMessageQuery("CH0001", ["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryMessages($board:String!,$limit:Int,$nextToken:String!,$var1:String!){\n' +
                    'queryMessages(filter:{gt:{time_created:$var1}},board:$board,limit:$limit,nextToken:' +
                    '$nextToken){\nitems{\nid\nitem_type\ntime_created\n}\nnextToken\n}\n}',
                variables: {
                    board: 'CH0001',
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
        it("Should query Streaks", () => {
            expect(normalizeQuery(QL.queryStreaks(
                QL.constructStreakQuery(["id", "item_type", "time_created"], filter, 10, "NEXTTOKEN")
            ))).to.eql({
                query: 'queryQueryStreaks($limit:Int,$nextToken:String!,$var1:String!){\nqueryStreaks(filter:' +
                    '{gt:{time_created:$var1}},limit:$limit,nextToken:$nextToken){\nitems{\nid\nitem_type\n' +
                    'time_created\n}\nnextToken\n}\n}',
                variables: {
                    limit: 10,
                    nextToken: 'NEXTTOKEN',
                    var1: '1998-10-05'
                }
            });
        });
    });
});

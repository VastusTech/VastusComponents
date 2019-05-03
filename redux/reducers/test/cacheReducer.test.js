import "../../../testing/SetTesting";
import cache, {CLEAR_ITEM_CACHE, CLEAR_NORMALIZED_ITEM_QUERY, PUT_ITEM_QUERY, PUT_ITEM, REMOVE_ITEM, 
    REMOVE_ITEM_ATTRIBUTE_INDEX, REMOVE_FROM_ITEM_ATTRIBUTES, ADD_TO_ITEM_ATTRIBUTES, SET_ITEM_ATTRIBUTE_INDEX,
    getObjectChannelName} from "../cacheReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
    expect(cache({}, {type: "__NOT_A_REAL_ACTION__", payload: null}).to.eql({}));
});

describe("Cache Reducer", function () {
    let cacheState;

    beforeEach(() => {
        cacheState = cache(undefined, {type: "__INIT__", payload: null});
    });

// export const PUT_ITEM =                    "PUT_ITEM";
    describe(PUT_ITEM, function () {
        it("Should put new item in successfully", function () {
            expect(cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: "attributeValue"
                    }
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: "attributeValue"
                }
            })
        });
        it("Should update existing item successfully", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: "attributeValue"
                    }
                }}
            );
            expect(cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        otherAttributeName: "attributeValue"
                    }
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: "attributeValue",
                    otherAttributeName: "attributeValue"
                }
            })
        });
        it("Should overwrite existing attributes in existing item", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: "attributeValue"
                    }
                }}
            );
            expect(cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        otherAttributeName: "attributeValue"
                    }
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: "attributeValue",
                    otherAttributeName: "attributeValue"
                }
            })
        });
    });
// export const SET_ITEM_ATTRIBUTE_INDEX =    "SET_ITEM_ATTRIBUTE_INDEX";
    describe(SET_ITEM_ATTRIBUTE_INDEX, function () {
        it("Should set the first item attribute index", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["unchangedAttributeValue", "attributeValue1", "attributeValue2"]
                    }
                }}
            );
            expect(cache(cacheState, {type: SET_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "attributeName", index: 0,
                    attributeValue: "changedAttributeValue"
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["changedAttributeValue", "attributeValue1", "attributeValue2"]
                }
            });
        });
        it("Should set a middle item attribute index", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "unchangedAttributeValue", "attributeValue2"]
                    }
                }}
            );
            expect(cache(cacheState, {type: SET_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "attributeName", index: 1,
                    attributeValue: "changedAttributeValue"
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "changedAttributeValue", "attributeValue2"]
                }
            });
        });
        it("Should set the last item attribute index", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "unchangedAttributeValue"]
                    }
                }}
            );
            expect(cache(cacheState, {type: SET_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "attributeName", index: 2,
                    attributeValue: "changedAttributeValue"
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2", "changedAttributeValue"]
                }
            });
        });
        it("Should not set anything for a non-existent attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                    }
                }}
            );
            expect(cache(cacheState, {type: SET_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "notAnAttributeName", index: 0,
                    attributeValue: "changedAttributeValue"
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                }
            });
        });
        it("Should not set anything for a non-array attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: "attributeValue"
                    }
                }}
            );
            expect(cache(cacheState, {type: SET_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "attributeName", index: 0,
                    attributeValue: "changedAttributeValue"
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: "attributeValue"
                }
            });
        });
    });
// export const ADD_TO_ITEM_ATTRIBUTES =         "ADD_TO_ITEM_ATTRIBUTES";
    describe(ADD_TO_ITEM_ATTRIBUTES, function () {
        it("Should add items to an existing attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2"]
                    }
                }}
            );
            expect(cache(cacheState, {type: ADD_TO_ITEM_ATTRIBUTES, payload: {
                    id: "CL0001", itemType: "Client", attributes: {
                        attributeName: ["attributeValue3"]
                    },
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                }
            });
        });
        it("Should add zero items to an existing attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2"]
                    }
                }}
            );
            expect(cache(cacheState, {type: ADD_TO_ITEM_ATTRIBUTES, payload: {
                    id: "CL0001", itemType: "Client", attributes: {
                        attributeName: []
                    },
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2"]
                }
            });
        });
        it("Should create a new array attribute and add values for a null attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2"]
                    }
                }}
            );
            expect(cache(cacheState, {type: ADD_TO_ITEM_ATTRIBUTES, payload: {
                    id: "CL0001", itemType: "Client", attributes: {
                        notAnAttributeName: ["attributeValue"]
                    },
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2"],
                    notAnAttributeName: ["attributeValue"]
                }
            });
        });
        it("Should not add anything for a non-array attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: "attributeValue"
                    }
                }}
            );
            expect(cache(cacheState, {type: ADD_TO_ITEM_ATTRIBUTES, payload: {
                    id: "CL0001", itemType: "Client", attributes: {
                        attributeName: ["attributeValue1", "attributeValue2"]
                    },
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: "attributeValue"
                }
            });
        });
    });

// export const REMOVE_FROM_ITEM_ATTRIBUTES =      "REMOVE_FROM_ITEM_ATTRIBUTES";
    describe(REMOVE_FROM_ITEM_ATTRIBUTES, function () {
        it("Should remove items from an existing attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_FROM_ITEM_ATTRIBUTES, payload: {
                    id: "CL0001", itemType: "Client", attributes: {
                        attributeName: ["attributeValue3"]
                    },
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2"]
                }
            });
        });
        it("Should remove items from an existing attribute even if not in the attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_FROM_ITEM_ATTRIBUTES, payload: {
                    id: "CL0001", itemType: "Client", attributes: {
                        attributeName: ["attributeValue4"]
                    },
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                }
            });
        });
        it("Should remove zero items from an existing attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_FROM_ITEM_ATTRIBUTES, payload: {
                    id: "CL0001", itemType: "Client", attributes: {
                        attributeName: []
                    },
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                }
            });
        });
        it("Should not remove anything for a non-existent attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_FROM_ITEM_ATTRIBUTES, payload: {
                    id: "CL0001", itemType: "Client", attributes: {
                        notAnAttributeName: ["attributeValue"]
                    },
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                }
            });
        });
        it("Should not remove anything for a non-array attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: "attributeValue"
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_FROM_ITEM_ATTRIBUTES, payload: {
                    id: "CL0001", itemType: "Client", attributes: {
                        attributeName: ["attributeValue"]
                    },
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: "attributeValue"
                }
            });
        });
    });

// export const REMOVE_ITEM_ATTRIBUTE_INDEX = "REMOVE_ITEM_ATTRIBUTE_INDEX";
    describe(REMOVE_ITEM_ATTRIBUTE_INDEX, function () {
        it("Should remove the first item attribute index", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "attributeName", index: 0
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue2", "attributeValue3"]
                }
            });
        });
        it("Should remove a middle item attribute index", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "attributeName", index: 1
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue3"]
                }
            });
        });
        it("Should remove the last item attribute index", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "attributeName", index: 2
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2"]
                }
            });
        });
        it("Should not remove anything for a non-existent attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "notAnAttributeName", index: 0
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: ["attributeValue1", "attributeValue2", "attributeValue3"]
                }
            });
        });
        it("Should not remove anything for a non-array attribute", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                        attributeName: "attributeValue"
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_ITEM_ATTRIBUTE_INDEX, payload: {
                    id: "CL0001", itemType: "Client", attributeName: "attributeName", index: 0
                }}).clients).to.eql({
                CL0001: {
                    id: "CL0001",
                    attributeName: "attributeValue"
                }
            });
        });
    });

// export const REMOVE_ITEM =                 "REMOVE_ITEM";
    describe(REMOVE_ITEM, function () {
        it("Should remove an existing item", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                    }
                }}
            );
            expect(cache(cacheState, {type: REMOVE_ITEM, asyncDispatch: () => {}, payload: {
                    id: "CL0001", itemType: "Client"
            }}).clients).to.eql({});
        });
        it("Should remove a non-existing item", () => {
            expect(cache(cacheState, {type: REMOVE_ITEM, asyncDispatch: () => {}, payload: {
                    id: "CL0001", itemType: "Client"
                }}).clients).to.eql({});
        });
    });

// export const PUT_ITEM_QUERY =              "PUT_ITEM_QUERY";
    describe(PUT_ITEM_QUERY, function () {
        it("Should put a item query with a null token", () => {
            expect(cache(cacheState, {type: PUT_ITEM_QUERY, payload: {
                    itemType: "Client",
                    normalizedQueryString: "QUERYSTRING",
                    nextToken: null,
                    queryResult: ["ID1", "ID2", "ID3"]
                }}).clientQueries
            ).to.eql({
                QUERYSTRING: {
                    "null": ["ID1", "ID2", "ID3"]
                }
            })
        });
        it("Should put a item query with a non-null token", () => {
            expect(cache(cacheState, {type: PUT_ITEM_QUERY, payload: {
                    itemType: "Client",
                    normalizedQueryString: "QUERYSTRING",
                    nextToken: "NEXTTOKEN",
                    queryResult: ["ID1", "ID2", "ID3"]
                }}).clientQueries
            ).to.eql({
                QUERYSTRING: {
                    "NEXTTOKEN": ["ID1", "ID2", "ID3"]
                }
            })
        });
        it("Should overwrite an existing item query", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM_QUERY, payload: {
                itemType: "Client",
                normalizedQueryString: "QUERYSTRING",
                nextToken: "NEXTTOKEN",
                queryResult: ["ID1", "ID2", "ID3"]
            }});
            expect(cache(cacheState, {type: PUT_ITEM_QUERY, payload: {
                    itemType: "Client",
                    normalizedQueryString: "QUERYSTRING",
                    nextToken: "NEXTTOKEN",
                    queryResult: ["ID4", "ID5", "ID6"]
                }}).clientQueries
            ).to.eql({
                QUERYSTRING: {
                    NEXTTOKEN: ["ID4", "ID5", "ID6"]
                }
            })
        });
    });

// export const CLEAR_NORMALIZED_ITEM_QUERY = "CLEAR_NORMALIZED_ITEM_QUERY";
    describe(CLEAR_NORMALIZED_ITEM_QUERY, function () {
        it("Should delete a non-existing query", () => {
            expect(cache(cacheState, {type: CLEAR_NORMALIZED_ITEM_QUERY, payload: {
                    itemType: "Client",
                    normalizedQueryString: "QUERYSTRING"
                }}).clientQueries
            ).to.eql({});
        });
        it("Should delete an existing query", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM_QUERY, payload: {
                    itemType: "Client",
                    normalizedQueryString: "QUERYSTRING",
                    nextToken: "NEXTTOKEN",
                    queryResult: ["ID1", "ID2", "ID3"]
                }});
            expect(cache(cacheState, {type: CLEAR_NORMALIZED_ITEM_QUERY, payload: {
                    itemType: "Client",
                    normalizedQueryString: "QUERYSTRING"
                }}).clientQueries
            ).to.eql({});
        });
    });

// export const CLEAR_ITEM_CACHE =            "CLEAR_ITEM_CACHE";
    describe(CLEAR_ITEM_CACHE, function () {
        it("Should clear an empty cache", () => {
            expect(cache(cacheState, {type: CLEAR_ITEM_CACHE, asyncDispatch: () => {}, payload: {
                    itemType: "Client"
                }}).clients
            ).to.eql({});
        });
        it("Should clear a non-empty cache", () => {
            cacheState = cache(cacheState, {type: PUT_ITEM, payload: {
                    id: "CL0001",
                    itemType: "Client",
                    item: {
                        id: "CL0001",
                    }
                }}
            );
            expect(cache(cacheState, {type: CLEAR_ITEM_CACHE, asyncDispatch: () => {}, payload: {
                    itemType: "Client"
                }}).clients
            ).to.eql({});
        });
    });

    describe("Channel Name Getter", function () {
        it("Should get an object update channel name correctly", function () {
            expect(getObjectChannelName("CH0001")).to.be.equal("CH0001-Updates");
        });
    });
});

it("Gets the initial state properly", function () {
    expect(cache(undefined, {type: "__INIT__", payload: null})).to.eql({
        clients: {},
        trainers: {},
        gyms: {},
        workouts: {},
        reviews: {},
        events: {},
        challenges: {},
        invites: {},
        posts: {},
        submissions: {},
        groups: {},
        comments: {},
        sponsors: {},
        streaks: {},
        clientLRUHandler: [],
        trainerLRUHandler: [],
        gymLRUHandler: [],
        workoutLRUHandler: [],
        reviewLRUHandler: [],
        eventLRUHandler: [],
        challengeLRUHandler: [],
        inviteLRUHandler: [],
        postLRUHandler: [],
        submissionLRUHandler: [],
        groupLRUHandler: [],
        commentLRUHandler: [],
        sponsorLRUHandler: [],
        streakLRUHandler: [],
        clientQueries: {},
        trainerQueries: {},
        gymQueries: {},
        workoutQueries: {},
        reviewQueries: {},
        eventQueries: {},
        challengeQueries: {},
        inviteQueries: {},
        postQueries: {},
        submissionQueries: {},
        groupQueries: {},
        commentQueries: {},
        sponsorQueries: {},
        streakQueries: {},
        clientQueryLRUHandler: [],
        trainerQueryLRUHandler: [],
        gymQueryLRUHandler: [],
        workoutQueryLRUHandler: [],
        reviewQueryLRUHandler: [],
        eventQueryLRUHandler: [],
        challengeQueryLRUHandler: [],
        inviteQueryLRUHandler: [],
        postQueryLRUHandler: [],
        submissionQueryLRUHandler: [],
        groupQueryLRUHandler: [],
        commentQueryLRUHandler: [],
        sponsorQueryLRUHandler: [],
        streakQueryLRUHandler: [],
    });
});

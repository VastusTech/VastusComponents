import "../../../testing/SetTesting";
import search, {
  SET_TYPE_FILTER, DISABLE_TYPE, ADD_TYPE_RESULTS, SET_SEARCH_QUERY, SET_TYPE_NEXT_TOKEN,
  RESET_TYPE_QUERY, RESET_QUERY, ENABLE_SEARCH_BAR, DISABLE_SEARCH_BAR, ENABLE_TYPE
} from "../searchReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
  expect(search({}, {type: "__NOT_A_REAL_ACTION__", payload: null})).to.eql({});
});

// export const ENABLE_TYPE = 'ENABLE_TYPE';
describe(ENABLE_TYPE, function () {
  it("Should enable a first type and adds to the number enabled of types", () => {
    let searchState = search(undefined, {
      type: "__INIT__", asyncDispatch: () => {
      }
    });
    const initialNumTypesEnabled = searchState.numTypesEnabled;
    searchState = search(searchState, {
      type: ENABLE_TYPE, asyncDispatch: () => {
      }, payload: "Post"
    });
    expect(searchState.typeQueries.Post.enabled).to.be.equal(true);
    expect(searchState.numTypesEnabled).to.be.equal(initialNumTypesEnabled + 1);
  });
  it("Should enable a second type and adds to the number enabled of types", () => {
    let searchState = search(undefined, {
      type: "__INIT__", asyncDispatch: () => {
      }
    });
    const initialNumTypesEnabled = searchState.numTypesEnabled;
    searchState = search(searchState, {
      type: ENABLE_TYPE, asyncDispatch: () => {
      }, payload: "Post"
    });
    searchState = search(searchState, {
      type: ENABLE_TYPE, asyncDispatch: () => {
      }, payload: "Invite"
    });
    expect(searchState.typeQueries.Post.enabled).to.be.equal(true);
    expect(searchState.typeQueries.Invite.enabled).to.be.equal(true);
    expect(searchState.numTypesEnabled).to.be.equal(initialNumTypesEnabled + 2);
  });
  it("Should enable an already enabled first type and does not add to the number of enabled types", () => {
    let searchState = search(undefined, {
      type: "__INIT__", asyncDispatch: () => {
      }
    });
    const initialNumTypesEnabled = searchState.numTypesEnabled;
    searchState = search(searchState, {
      type: ENABLE_TYPE, asyncDispatch: () => {
      }, payload: "Post"
    });
    searchState = search(searchState, {
      type: ENABLE_TYPE, asyncDispatch: () => {
      }, payload: "Post"
    });
    expect(searchState.typeQueries.Post.enabled).to.be.equal(true);
    expect(searchState.numTypesEnabled).to.be.equal(initialNumTypesEnabled + 1);
  });
  it("Should enable an already enabled second type and does not add to the number of enabled types", () => {
    let searchState = search(undefined, {
      type: "__INIT__", asyncDispatch: () => {
      }
    });
    const initialNumTypesEnabled = searchState.numTypesEnabled;
    searchState = search(searchState, {
      type: ENABLE_TYPE, asyncDispatch: () => {
      }, payload: "Post"
    });
    searchState = search(searchState, {
      type: ENABLE_TYPE, asyncDispatch: () => {
      }, payload: "Invite"
    });
    searchState = search(searchState, {
      type: ENABLE_TYPE, asyncDispatch: () => {
      }, payload: "Invite"
    });
    expect(searchState.typeQueries.Post.enabled).to.be.equal(true);
    expect(searchState.typeQueries.Invite.enabled).to.be.equal(true);
    expect(searchState.numTypesEnabled).to.be.equal(initialNumTypesEnabled + 2);
  });
});

// export const DISABLE_TYPE = 'DISABLE_TYPE';
describe(DISABLE_TYPE, function () {
  it("Should disable a first type and subtract from the number enabled of types", () => {
    let searchState = search(undefined, {
      type: "__INIT__", asyncDispatch: () => {
      }
    });
    const initialNumTypesEnabled = searchState.numTypesEnabled;
    searchState = search(searchState, {
      type: DISABLE_TYPE, asyncDispatch: () => {
      }, payload: "Client"
    });
    expect(searchState.typeQueries.Client.enabled).to.be.equal(false);
    expect(searchState.numTypesEnabled).to.be.equal(initialNumTypesEnabled - 1);
  });
  it("Should disable a second type and subtract from the number enabled of types", () => {
    let searchState = search(undefined, {
      type: "__INIT__", asyncDispatch: () => {
      }
    });
    const initialNumTypesEnabled = searchState.numTypesEnabled;
    searchState = search(searchState, {
      type: DISABLE_TYPE, asyncDispatch: () => {
      }, payload: "Client"
    });
    searchState = search(searchState, {
      type: DISABLE_TYPE, asyncDispatch: () => {
      }, payload: "Trainer"
    });
    expect(searchState.typeQueries.Client.enabled).to.be.equal(false);
    expect(searchState.typeQueries.Trainer.enabled).to.be.equal(false);
    expect(searchState.numTypesEnabled).to.be.equal(initialNumTypesEnabled - 2);
  });
  it("Should disable an already disabled first type and does not subtract from the number of enabled types", () => {
    let searchState = search(undefined, {
      type: "__INIT__", asyncDispatch: () => {
      }
    });
    const initialNumTypesEnabled = searchState.numTypesEnabled;
    searchState = search(searchState, {
      type: DISABLE_TYPE, asyncDispatch: () => {
      }, payload: "Client"
    });
    searchState = search(searchState, {
      type: DISABLE_TYPE, asyncDispatch: () => {
      }, payload: "Client"
    });
    expect(searchState.typeQueries.Client.enabled).to.be.equal(false);
    expect(searchState.numTypesEnabled).to.be.equal(initialNumTypesEnabled - 1);
  });
  it("Should disable an already disabled second type and does not subtract from the number of enabled types", () => {
    let searchState = search(undefined, {
      type: "__INIT__", asyncDispatch: () => {
      }
    });
    const initialNumTypesEnabled = searchState.numTypesEnabled;
    searchState = search(searchState, {
      type: DISABLE_TYPE, asyncDispatch: () => {
      }, payload: "Client"
    });
    searchState = search(searchState, {
      type: DISABLE_TYPE, asyncDispatch: () => {
      }, payload: "Trainer"
    });
    searchState = search(searchState, {
      type: DISABLE_TYPE, asyncDispatch: () => {
      }, payload: "Trainer"
    });
    expect(searchState.typeQueries.Client.enabled).to.be.equal(false);
    expect(searchState.typeQueries.Trainer.enabled).to.be.equal(false);
    expect(searchState.numTypesEnabled).to.be.equal(initialNumTypesEnabled - 2);
  });
});

// export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
describe(SET_SEARCH_QUERY, function () {
  it("Should set the first search query from null", () => {
    expect(search(undefined, {
      type: SET_SEARCH_QUERY, asyncDispatch: () => {
      }, payload: "SEARCHQUERY"
    })
      .searchQuery).to.be.equal("SEARCHQUERY");
  });
  it("Should set the search query from existing", () => {
    const searchState = search(undefined, {
      type: SET_SEARCH_QUERY, asyncDispatch: () => {
      }, payload: "FIRSTQUERY"
    });
    expect(search(searchState, {
      type: SET_SEARCH_QUERY, asyncDispatch: () => {
      }, payload: "SEARCHQUERY"
    })
      .searchQuery).to.be.equal("SEARCHQUERY");
  });
});

// export const SET_TYPE_FILTER = 'SET_TYPE_FILTER';
describe(SET_TYPE_FILTER, function () {
  it("Should set a type filter that is enabled", () => {
    const searchState = search(undefined, {
      type: SET_TYPE_FILTER, asyncDispatch: () => {
      }, payload: {
        type: "Client", filterJSON: {}, filterParameters: {}
      }
    });
    expect(searchState.typeQueries.Client.filterJSON).to.eql({});
    expect(searchState.typeQueries.Client.filterParameters).to.eql({});
  });
  it("Should set a type filter that is disabled", () => {
    const searchState = search(undefined, {
      type: SET_TYPE_FILTER, asyncDispatch: () => {
      }, payload: {
        type: "Invite", filterJSON: {}, filterParameters: {}
      }
    });
    expect(searchState.typeQueries.Invite.filterJSON).to.eql({});
    expect(searchState.typeQueries.Invite.filterParameters).to.eql({});
  });
});

// export const SET_TYPE_NEXT_TOKEN = 'SET_TYPE_NEXT_TOKEN';
describe(SET_TYPE_NEXT_TOKEN, function () {
  it("Should set the next token for a null next token", () => {
    expect(search(undefined, {
      type: SET_TYPE_NEXT_TOKEN, asyncDispatch: () => {
      }, payload: {
        type: "Client", nextToken: "NEXTTOKEN"
      }
    }).typeQueries.Client.nextToken).to.be.equal("NEXTTOKEN");
  });
  it("Should set the next token for a non-null next token", () => {
    const searchState = search(undefined, {
      type: SET_TYPE_NEXT_TOKEN, asyncDispatch: () => {
      }, payload: {
        type: "Client", nextToken: "FIRSTNEXTTOKEN"
      }
    });
    expect(search(searchState, {
      type: SET_TYPE_NEXT_TOKEN, asyncDispatch: () => {
      }, payload: {
        type: "Client", nextToken: "NEXTTOKEN"
      }
    }).typeQueries.Client.nextToken).to.be.equal("NEXTTOKEN");
  });
});

// export const ADD_TYPE_RESULTS = 'ADD_TYPE_RESULTS';
describe(ADD_TYPE_RESULTS, function () {
  it("Should add type results for an empty search total and in type", () => {
    const searchState = search(undefined, {
      type: ADD_TYPE_RESULTS, asyncDispatch: () => {
      }, payload: {
        type: "Client", results: [{id: "CL0001"}, {id: "CL0002"}]
      }
    });
    expect(searchState.results).to.eql([{id: "CL0001"}, {id: "CL0002"}]);
    expect(searchState.typeQueries.Client.results).to.eql([{id: "CL0001"}, {id: "CL0002"}]);
  });
  it("Should add type results for an empty search type, not total", () => {
    let searchState = search(undefined, {
      type: ADD_TYPE_RESULTS, asyncDispatch: () => {
      }, payload: {
        type: "Client", results: [{id: "CL0001"}, {id: "CL0002"}]
      }
    });
    searchState = search(searchState, {
      type: ADD_TYPE_RESULTS, asyncDispatch: () => {
      }, payload: {
        type: "Trainer", results: [{id: "TR0001"}, {id: "TR0002"}]
      }
    });
    expect(searchState.results).to.eql([{id: "CL0001"}, {id: "CL0002"}, {id: "TR0001"}, {id: "TR0002"}]);
    expect(searchState.typeQueries.Client.results).to.eql([{id: "CL0001"}, {id: "CL0002"}]);
    expect(searchState.typeQueries.Trainer.results).to.eql([{id: "TR0001"}, {id: "TR0002"}]);
  });
  it("Should add type results for an non-empty search type and total", () => {
    let searchState = search(undefined, {
      type: ADD_TYPE_RESULTS, asyncDispatch: () => {
      }, payload: {
        type: "Client", results: [{id: "CL0001"}, {id: "CL0002"}]
      }
    });
    searchState = search(searchState, {
      type: ADD_TYPE_RESULTS, asyncDispatch: () => {
      }, payload: {
        type: "Client", results: [{id: "CL0003"}, {id: "CL0004"}]
      }
    });
    expect(searchState.results).to.eql([{id: "CL0001"}, {id: "CL0002"}, {id: "CL0003"}, {id: "CL0004"}]);
    expect(searchState.typeQueries.Client.results).to.eql([{id: "CL0001"}, {id: "CL0002"}, {id: "CL0003"}, {id: "CL0004"}]);
  });
});

// export const RESET_TYPE_QUERY = 'RESET_TYPE_QUERY';
describe(RESET_TYPE_QUERY, function () {
  it("Should reset type query for empty type", () => {
    const searchState = search(undefined, {type: RESET_TYPE_QUERY, payload: "Client"});
    expect(searchState.results).to.eql([]);
    expect(searchState.typeQueries.Client.results).to.eql([]);
  });
  it("Should reset type query for non-empty type", () => {
    let searchState = search(undefined, {
      type: ADD_TYPE_RESULTS, asyncDispatch: () => {
      }, payload: {
        type: "Client", results: [{id: "CL0001"}, {id: "CL0002"}]
      }
    });
    searchState = search(searchState, {type: RESET_TYPE_QUERY, payload: "Client"});
    expect(searchState.results).to.eql([]);
    expect(searchState.typeQueries.Client.results).to.eql([]);
  });
});

// export const RESET_QUERY = 'RESET_QUERY';
describe(RESET_QUERY, function () {
  it("Should rest query for empty query", () => {
    const searchState = search(undefined, {type: RESET_QUERY});
    expect(searchState.results).to.eql([]);
  });
  it("Should reset query for non-empty", () => {
    let searchState = search(undefined, {
      type: ADD_TYPE_RESULTS, asyncDispatch: () => {
      }, payload: {
        type: "Client", results: [{id: "CL0001"}, {id: "CL0002"}]
      }
    });
    searchState = search(searchState, {type: RESET_QUERY});
    expect(searchState.results).to.eql([]);
    expect(searchState.typeQueries.Client.results).to.eql([]);
  });
});

// export const ENABLE_SEARCH_BAR = 'ENABLE_SEARCH_BAR';
describe(ENABLE_SEARCH_BAR, function () {
  it("Should enable a disabled search bar", () => {
    const searchState = search(undefined, {type: DISABLE_SEARCH_BAR});
    expect(search(searchState, {type: ENABLE_SEARCH_BAR}).searchBarEnabled).to.be.equal(true);
  });
  it("Should enable an enabled search bar", () => {
    expect(search(undefined, {type: ENABLE_SEARCH_BAR}).searchBarEnabled).to.be.equal(true);
  });
});

// export const DISABLE_SEARCH_BAR = 'DISABLE_SEARCH_BAR';
describe(DISABLE_SEARCH_BAR, function () {
  it("Should disable an enabled search bar", () => {
    expect(search(undefined, {type: DISABLE_SEARCH_BAR}).searchBarEnabled).to.be.equal(false);
  });
  it("Should disable a disabled search bar", () => {
    const searchState = search(undefined, {type: ENABLE_SEARCH_BAR});
    expect(search(searchState, {type: DISABLE_SEARCH_BAR}).searchBarEnabled).to.be.equal(false);
  });
});

it("Gets the initial state properly", function () {
  expect(search(undefined, {type: "__INIT__", payload: null})).to.eql({
    searchQuery: '',
    results: [],
    limit: 100,
    numTypesEnabled: 3,
    ifFinished: false,
    searchBarEnabled: true,
    typeQueries: {
      Client: {
        enabled: true,
        variableList: ["id", "item_type", "username", "gender", "birthday", "name", "friends", "challengesWon", "scheduledEvents", "profileImagePath", /*"profilePicture"*/ "friendRequests"],
        filterJSON: {
          or: [{
            username: {
              contains: "$searchQuery"
            }
          }, {
            name: {
              contains: "$searchQuery"
            }
          }, {
            email: {
              contains: "$searchQuery"
            }
          }]
        },
        filterParameters: {},
        nextToken: null,
        ifFirst: true,
        limit: 100,
        results: []
      },
      Trainer: {
        enabled: true,
        variableList: ["id", "name", "username", "item_type", "gender", "birthday", "profileImagePath", "profileImagePaths", "subscribers", "friendlinessRating", "effectivenessRating", "posts"],
        filterJSON: {
          or: [{
            username: {
              contains: "$searchQuery"
            }
          }, {
            name: {
              contains: "$searchQuery"
            }
          }, {
            email: {
              contains: "$searchQuery"
            }
          }]
        },
        filterParameters: {},
        nextToken: null,
        ifFirst: true,
        limit: 100,
        results: []
      },
      Gym: {
        enabled: false,
        variableList: [],
        filterJSON: {
          or: [{
            username: {
              contains: "$searchQuery"
            }
          }, {
            name: {
              contains: "$searchQuery"
            }
          }, {
            email: {
              contains: "$searchQuery"
            }
          }]
        },
        filterParameters: {},
        nextToken: null,
        ifFirst: true,
        limit: 100,
        results: []
      },
      Workout: {
        enabled: false,
        variableList: [],
        filterJSON: {},
        filterParameters: {},
        nextToken: null,
        ifFirst: true,
        limit: 100,
        results: []
      },
      Review: {
        enabled: false,
        variableList: [],
        filterJSON: {},
        filterParameters: {},
        nextToken: null,
        ifFirst: true,
        limit: 100,
        results: []
      }, Event: {
        enabled: false,
        variableList: [],
        filterJSON: {
          and: [{
            or: [{
              title: {
                contains: "$searchQuery"
              }
            }, {
              description: {
                contains: "$searchQuery"
              }
            }]
          }, {
            access: {
              eq: "$access"
            }
          }]
        },
        filterParameters: {
          access: "public",
        },
        nextToken: null,
        ifFirst: true,
        limit: 100,
        results: []
      },
      Challenge: {
        enabled: true,
        variableList: ["id", "item_type", "title", "endTime", "time_created", "owner", "ifCompleted", "members", "capacity", "goal", "access", "description", "restriction", "tags", "prize", "submissions"],
        filterJSON: {
          and: [{
            or: [{
              title: {
                contains: "$searchQuery"
              }
            }, {
              description: {
                contains: "$searchQuery"
              }
            }]
          }, {
            access: {
              eq: "$access"
            }
          }]
        },
        filterParameters: {
          access: "public",
        },
        nextToken: null,
        ifFirst: true,
        limit: 100,
        results: []
      },
      Invite: {
        enabled: false,
        variableList: [],
        filterJSON: {},
        filterParameters: {},
        nextToken: null,
        ifFirst: true,
        limit: 100,
        results: []
      },
      Post: {
        enabled: false,
        variableList: [],
        filterJSON: {},
        filterParameters: {},
        nextToken: null,
        ifFirst: true,
        limit: 100,
        results: []
      }
    }
  });
});

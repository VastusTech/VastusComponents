import "../../../testing/SetTesting";
import message, {ADD_MESSAGE, ADD_QUERY, CLEAR_BOARD, SET_BOARD_READ, CLEAR_ALL_BOARDS, getBoardChannel}
  from "../messageReducer";
import {expect} from "chai";

it("Ignores other actions correctly", () => {
  expect(message({}, {type: "__NOT_A_REAL_ACTION__", payload: null})).to.eql({});
});

// export const ADD_MESSAGE = 'ADD_MESSAGE';
describe(ADD_MESSAGE, function () {
  it("Should add a message to a non-existent board to the front", () => {
    expect(message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    })).excludingEvery(['profilePicture', 'messageURL']).to.eql({
      boards: {BOARD: [{message: "MESSAGE"}]},
      boardLRUHandler: ['BOARD'],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 1
    });
  });
  it("Should add a message to an existent and empty board to the front", () => {
    let messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    messageState = message(messageState, {
      type: CLEAR_BOARD, asyncDispatch: () => {
      }, payload: {board: "BOARD"}
    });
    expect(message(messageState, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    })).excludingEvery(['profilePicture', 'messageURL']).to.eql({
      boards: {BOARD: [{message: "MESSAGE"}]},
      boardLRUHandler: ['BOARD'],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 1
    });
  });
  it("Should add a message to an existent and non-empty board to the front", () => {
    const messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    expect(message(messageState, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    })).excludingEvery(['profilePicture', 'messageURL']).to.eql({
      numMessages: 2,
      boardIfSubscribed: {},
      boardIfFirsts: {},
      boardNextTokens: {},
      boardLRUHandler: ['BOARD'],
      boards: {BOARD: [{message: "MESSAGE"}, {message: "MESSAGE"}]}
    });
  });
});

// export const ADD_QUERY = 'ADD_QUERY';
describe(ADD_QUERY, function () {
  it("Should add a list of messages to a non-existent board to the back", () => {
    expect(message(undefined, {
      type: ADD_QUERY, asyncDispatch: () => {
      }, payload: {
        board: "BOARD", messages: [], nextToken: null, ifSubscribed: false
      }
    })).to.eql({
      boards: {BOARD: []},
      boardLRUHandler: ['BOARD'],
      boardNextTokens: {BOARD: null},
      boardIfFirsts: {BOARD: false},
      boardIfSubscribed: {BOARD: false},
      numMessages: 0
    });
  });
  it("Should add a list of messages to an existent and empty board to the back", () => {
    let messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    messageState = message(messageState, {
      type: CLEAR_BOARD, asyncDispatch: () => {
      }, payload: {board: "BOARD"}
    });
    expect(message(messageState, {
      type: ADD_QUERY, asyncDispatch: () => {
      }, payload: {
        board: "BOARD", messages: [], nextToken: null, ifSubscribed: false
      }
    })).to.eql({
      boards: {BOARD: []},
      boardLRUHandler: ['BOARD'],
      boardNextTokens: {BOARD: null},
      boardIfFirsts: {BOARD: false},
      boardIfSubscribed: {BOARD: false},
      numMessages: 0
    });
  });
  it("Should add a list of messages to an existent and non-empty board to the back", () => {
    let messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    expect(message(messageState, {
      type: ADD_QUERY, asyncDispatch: () => {
      }, payload: {
        board: "BOARD", messages: [], nextToken: null, ifSubscribed: false
      }
    })).excludingEvery(['messageURL', 'profilePicture']).to.eql({
      boards: {BOARD: [{message: "MESSAGE"}]},
      boardLRUHandler: ['BOARD'],
      boardNextTokens: {BOARD: null},
      boardIfFirsts: {BOARD: false},
      boardIfSubscribed: {BOARD: false},
      numMessages: 1
    });
  });
});

// export const SET_BOARD_READ = 'SET_BOARD_READ';
describe(SET_BOARD_READ, function () {
  it("Should set the board read for a board with one message", () => {
    let messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    expect(message(messageState, {
      type: SET_BOARD_READ, asyncDispatch: () => {
      }, payload: {
        board: "BOARD", userID: "CL0001"
      }
    })).excludingEvery(['messageURL', 'profilePicture']).to.eql({
      boards: {BOARD: [{message: "MESSAGE", lastSeenFor: ["CL0001"]}]},
      boardLRUHandler: ['BOARD'],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 1
    });
  });
  it("Should set the board read for a board with more than one message", () => {
    let messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    messageState = message(messageState, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    expect(message(messageState, {
      type: SET_BOARD_READ, asyncDispatch: () => {
      }, payload: {
        board: "BOARD", userID: "CL0001"
      }
    })).excludingEvery(['messageURL', 'profilePicture']).to.eql({
      boards: {BOARD: [{message: "MESSAGE", lastSeenFor: ["CL0001"]}, {message: "MESSAGE"}]},
      boardLRUHandler: ['BOARD'],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 2
    });
  });
  it("Should do nothing for a non-existent board", () => {
    expect(message(undefined, {
      type: SET_BOARD_READ, asyncDispatch: () => {
      }, payload: {
        board: "BOARD", userID: "CL0001"
      }
    })).to.eql({
      boards: {},
      boardLRUHandler: [],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 0
    });
  });
  it("Should do nothing for a board with no messages", () => {
    let messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    messageState = message(messageState, {
      type: CLEAR_BOARD, asyncDispatch: () => {
      }, payload: {board: "BOARD"}
    });
    expect(message(messageState, {
      type: SET_BOARD_READ, asyncDispatch: () => {
      }, payload: {
        board: "BOARD", userID: "CL0001"
      }
    })).to.eql({
      boards: {},
      boardLRUHandler: [],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 0
    });
  });
});

// export const CLEAR_BOARD = 'CLEAR_BOARD';
describe(CLEAR_BOARD, function () {
  it("Should clear a board with messages", () => {
    let messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    expect(message(messageState, {
      type: CLEAR_BOARD, asyncDispatch: () => {
      }, payload: {
        board: "BOARD"
      }
    })).to.eql({
      boards: {},
      boardLRUHandler: [],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 0
    })
  });
  it("Should clear a board with no messages", () => {
    let messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    messageState = message(messageState, {
      type: CLEAR_BOARD, asyncDispatch: () => {
      }, payload: {board: "BOARD"}
    });
    expect(message(messageState, {
      type: CLEAR_BOARD, asyncDispatch: () => {
      }, payload: {
        board: "BOARD"
      }
    })).to.eql({
      boards: {},
      boardLRUHandler: [],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 0
    })
  });
  it("Should clear a non-existent board", () => {
    expect(message(undefined, {
      type: CLEAR_BOARD, asyncDispatch: () => {
      }, payload: {
        board: "BOARD"
      }
    })).to.eql({
      boards: {},
      boardLRUHandler: [],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 0
    })
  });
});

// export const CLEAR_ALL_BOARDS = 'CLEAR_ALL_BOARDS';
describe(CLEAR_ALL_BOARDS, function () {
  it("Should clear a non-empty board cache", () => {
    let messageState = message(undefined, {
      type: ADD_MESSAGE, asyncDispatch: () => {
      }, payload: {
        board: "BOARD",
        message: {message: "MESSAGE"}
      }
    });
    expect(message(messageState, {
      type: CLEAR_ALL_BOARDS, asyncDispatch: () => {
      }
    })).to.eql({
      boards: {},
      boardLRUHandler: [],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 0
    })
  });
  it("Should clear an empty board cache", () => {
    expect(message(undefined, {
      type: CLEAR_ALL_BOARDS, asyncDispatch: () => {
      }
    })).to.eql({
      boards: {},
      boardLRUHandler: [],
      boardNextTokens: {},
      boardIfFirsts: {},
      boardIfSubscribed: {},
      numMessages: 0
    })
  });
});

describe("Get Message Board Channel", function () {
  it("Should get the correct channel name for the message board", function () {
    expect(getBoardChannel("CH0001")).to.be.equal("CH0001-Board");
  });
});

it("Gets the initial state properly", function () {
  expect(message(undefined, {type: "__INIT__", payload: null})).to.eql({
    boards: {},
    boardLRUHandler: [],
    boardNextTokens: {},
    boardIfFirsts: {},
    boardIfSubscribed: {},
    numMessages: 0,
  });
});

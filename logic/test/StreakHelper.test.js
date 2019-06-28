import {expect} from 'chai';
import {streakInfo, streakUpdateInfo, numberOfUpdateSpansPassed, ifStreakExpired} from "../StreakHelper";
import type Streak from "../../types/Streak";
import {hoursBefore, nowDate} from "../TimeHelper";

let streak1: Streak = {
  id: "ST0001", item_type: "Streak", N: 0, currentN: 0, streakN: 1, bestN: 0,
  updateSpanType: "daily", lastAttemptStarted: hoursBefore(nowDate(), 0),
  updateInterval: 1
};
let streak2: Streak = {
  id: "ST0002", item_type: "Streak", N: 1, currentN: 1, streakN: 1, bestN: 1,
  updateSpanType: "daily", lastAttemptStarted: hoursBefore(nowDate(), 0),
  updateInterval: 1
};
let streak3: Streak = {
  id: "ST0003", item_type: "Streak", N: 1, currentN: 1, streakN: 2, bestN: 1,
  updateSpanType: "daily", lastAttemptStarted: hoursBefore(nowDate(), 0),
  updateInterval: 1
};
let streak4: Streak = {
  id: "ST0004", item_type: "Streak", N: 1, currentN: 1, streakN: 1, bestN: 1,
  updateSpanType: "daily", lastAttemptStarted: hoursBefore(nowDate(), 24),
  updateInterval: 1
};
let streak5: Streak = {
  id: "ST0005", item_type: "Streak", N: 1, currentN: 1, streakN: 1, bestN: 1,
  updateSpanType: "daily", lastAttemptStarted: hoursBefore(nowDate(), 48),
  updateInterval: 1
};

describe("Streak Info", () => {
  it("Should get not started correctly", () => {
    expect(streakInfo(streak1)).to.be.equal("not_started")
  });
  it("Should get completed correctly", () => {
    expect(streakInfo(streak2)).to.be.equal("completed");
  });
  it("Should get still completing correctly", () => {
    expect(streakInfo(streak3)).to.be.equal("still_completing");
  });
  it("Should get not completed correctly", () => {
    expect(streakInfo(streak4)).to.be.equal("not_completed");
  });
  it("Should get broken correctly", () => {
    expect(streakInfo(streak5)).to.be.equal("broken");
  });
});
describe("If Streak Expired", () => {

});
describe("Streak Update Info", () => {

});
describe("Number of Update Spans Passed", () => {

});
describe("StreakHelper.js", function () {
  // TODO

  it("", () => {
    expect(true);
  })
});

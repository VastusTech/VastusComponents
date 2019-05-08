import { expect } from 'chai';
import {
    convertToISOString, midnightsBetween, hourStartsBetween, startsOfMonthBetween,
    startsOfYearBetween, mondaysBetween
} from '../TimeHelper';

describe("Between Functions", () => {
    describe("Hour Starts Between", () => {
        it("Should calculate hour starts between correctly shortest", () => {
            expect(hourStartsBetween(
                new Date(2019, 5, 4, 12, 0, 0, 0),
                new Date(2019, 5, 4, 12, 59, 59, 999)
            )).to.be.equal(0);
        });
        it("Should calculate hour starts between correctly 2", () => {
            expect(hourStartsBetween(
                new Date(2019, 5, 4, 12, 59, 59, 999),
                new Date(2019, 5, 4, 13, 0, 0, 0)
            )).to.be.equal(1);
        });
        it("Should calculate hour starts between correctly", () => {
            expect(hourStartsBetween(
                new Date(2019, 5, 4, 12, 30, 0, 0),
                new Date(2019, 5, 4, 13, 30, 0, 0)
            )).to.be.equal(1);
        });
        it("Should calculate hour starts between correctly", () => {
            expect(hourStartsBetween(
                new Date(2019, 5, 4, 12, 59, 59, 999),
                new Date(2019, 5, 4, 14, 0, 0, 0)
            )).to.be.equal(2);
        });
        it("Should calculate hour starts between days", () => {
            expect(hourStartsBetween(
                new Date(2019, 5, 4, 23, 59, 59, 999),
                new Date(2019, 5, 5, 0, 0, 0, 0)
            )).to.be.equal(1);
        });
    });
    describe("Midnights Between", () => {
        it('Calculates midnights between correctly 1', () => {
            const from = new Date(2000, 3, 15, 12, 0);
            const to = new Date(2000, 3, 18, 12, 0);
            expect(midnightsBetween(from, to)).to.be.equal(3);
        });

        it('Calculates midnights between correctly 2', () => {
            const from = new Date(2000, 3, 15, 0, 0);
            const to = new Date(2000, 3, 18, 23, 59);
            expect(midnightsBetween(from, to)).to.be.equal(3);
        });

        it('Calculates midnights between correctly 3', () => {
            const from = new Date(2000, 3, 15, 0, 0);
            const to = new Date(2000, 3, 15, 23, 59);
            expect(midnightsBetween(from, to)).to.be.equal(0);
        });

        it('Calculates midnights between correctly 4', () => {
            const from = new Date(2000, 3, 15, 23, 59);
            const to = new Date(2000, 3, 16, 0, 0);
            expect(midnightsBetween(from, to)).to.be.equal(1);
        });
    });
    describe("Mondays Between", () => {
        it("Should calculate 0 mondays between correctly longest", () => {
            // 5 / 13 / 19 is a Monday
            expect(mondaysBetween(
                new Date(2019, 4, 13, 0, 0, 0, 0),
                new Date(2019, 4, 19, 23, 59, 59, 999)
            )).to.be.equal(0);
        });
        it("Should calculate 1 monday between shortest", () => {
            expect(mondaysBetween(
                new Date(2019, 4, 12, 23, 59, 59, 999),
                new Date(2019, 4, 13, 0, 0, 0, 0)
            )).to.be.equal(1);
        });
    });
    describe("Starts of Month Between", () => {
        it("Should calculate 0 months between longest", () => {
            expect(startsOfMonthBetween(
                new Date(2019, 4, 1, 0, 0, 0, 0),
                new Date(2019, 4, 31, 23, 59, 59, 999)
            )).to.be.equal(0);
        });
        it("Should calculate 1 month between shortest", () => {
            expect(startsOfMonthBetween(
                new Date(2019, 4, 31, 23, 59, 59, 999),
                new Date(2019, 5, 1, 0, 0, 0, 0)
            )).to.be.equal(1);
        });
    });
    describe("Starts of Year Between", () => {
        it("Should calculate 0 years between longest", () => {
            expect(startsOfYearBetween(
                new Date(2019, 0, 1, 0, 0, 0, 0),
                new Date(2019, 11, 31, 23, 59, 59, 999)
            )).to.be.equal(0);
        });
        it("Should calculate 1 year between shortest", () => {
            expect(startsOfYearBetween(
                new Date(2019, 11, 31, 23, 59, 59, 999),
                new Date(2020, 0, 1, 0, 0, 0, 0)
            )).to.be.equal(1);
        });
    });
});

describe("TimeHelper.js", function () {
    it('Converts to ISO String Correctly', () => {
        const date = convertToISOString(new Date(2000, 3, 15));
        expect(date).to.be.equal("2000-04-15T00:00:00-04:00");
    });
});

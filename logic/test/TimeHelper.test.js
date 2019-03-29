import { expect } from 'chai';
import {convertToISOString, midnightsBetween} from '../TimeHelper';

it('Converts to ISO String Correctly', () => {
    const date = convertToISOString(new Date(2000, 3, 15));
    expect(date).to.be.equal("2000-04-15T00:00:00-04:00");
});

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

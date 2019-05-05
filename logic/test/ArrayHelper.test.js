import { expect } from 'chai';
import {
    shuffleArray,
    subtractArray,
    addUniqueToArray,
    removeFromArray,
    arrayIntersection,
    arraysIntersect,
    isSubset,
    setEquals
} from "../ArrayHelper";

describe("ArrayHelper.js", function () {
    it('Shuffles Array without removing elements', () => {
        const array = [1, 2, 3, 4, 5, 6];
        const copy = [...array];
        shuffleArray(copy);
        expect(copy.length).to.be.eq(array.length);
        for (let i = 0; i < array.length; i++) {
            const indexOf = copy.indexOf(array[i]);
            expect(indexOf).not.eq(-1);
            copy.splice(indexOf, 1);
        }
        expect(copy.length).to.be.eq(0);
    });

    it('Subtract Array works as expected 1', () => {
        const originalArray = [1, 2, 3];
        const minusArray = [2, 3];
        subtractArray(originalArray, minusArray);
        expect(originalArray).to.eql([1]);
    });

    it('Subtract Array works as expected 2', () => {
        const originalArray = [1, 1, 3];
        const minusArray = [1, 3];
        subtractArray(originalArray, minusArray);
        expect(originalArray).to.eql([1]);
    });

    it('Add Unique to Array works as expected 1', () => {
        const originalArray = [1, 2, 3];
        const addArray = [1, 2, 4];
        addUniqueToArray(originalArray, addArray);
        expect(originalArray).to.eql([1, 2, 3, 4]);
    });

    it('Remove from array works as expected', () => {
        const originalArray = [1, 2, 3];
        removeFromArray(originalArray, 3);
        expect(originalArray).to.eql([1, 2]);
        removeFromArray(originalArray, 2);
        expect(originalArray).to.eql([1]);
        removeFromArray(originalArray, 2);
        expect(originalArray).to.eql([1]);
        removeFromArray(originalArray, 1);
        expect(originalArray).to.eql([]);
    });

    it('array intersection works', () => {
        expect(arrayIntersection([1, 2, 3], [2, 3, 4])).to.eql([2, 3]);
    });

    it('arrays intersect works', () => {
        expect(arraysIntersect([1, 2, 3, 4, 5], [6, 7, 8, 5, 9, 10]));
    });

    it("Calculates subset correctly", () => {
        expect(isSubset([1, 2, 3, 4], [1, 2, 3]));
        expect(isSubset([], []));
        expect(isSubset([1], [1]));
        expect(!isSubset([1, 2, 3, 4], [1, 2, 3, 5]));
        expect(isSubset([1, 2, 3, 4, 5, 6, 7], [7]));
        expect(isSubset([1, 2, 3, 4, 5, 6, 7], []));
        expect(!isSubset([], [1, 2, 3, 5]));
        expect(!isSubset([], [1]));
    });

    it("Calculates set equality correctly", () => {
        expect(setEquals([1, 2, 3], [1, 2, 3])).to.be.equal(true);
        expect(setEquals([2, 1, 3], [1, 2, 3])).to.be.equal(true);
        expect(setEquals([2, 1, 3], [3, 2, 1])).to.be.equal(true);
        expect(setEquals([2, 1, 3, 3], [3, 2, 1])).to.be.equal(true);
        expect(setEquals([2, 1, 3], [3, 2, 3, 3, 2, 1])).to.be.equal(true);
        expect(setEquals([], [])).to.be.equal(true);
        expect(!setEquals([4, 2, 1, 3], [3, 2, 3, 3, 2, 1])).to.be.equal(true);
        expect(!setEquals([4, 2, 1, 3], [3, 2, 1, 3, 3, 2, 1])).to.be.equal(true);
        expect(!setEquals([1], [3])).to.be.equal(true);
        expect(!setEquals([3], [3, 1])).to.be.equal(true);
        expect(!setEquals([3, 1], [3])).to.be.equal(true);
        expect(!setEquals([], ["asdf", "fdas", "asfd"])).to.be.equal(true);
        expect(setEquals(["asdf", "fdas", "asdf"], ["asdf", "fdas", "asdf"])).to.be.equal(true);
        expect(!setEquals(["asdf", "fdas", "asdf"], [])).to.be.equal(true);
    });
});

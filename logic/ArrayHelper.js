// Helpful and optimized functions for dealing with arrays

/**
 * Deletes all the elements present in "minusArray" from "originalArray". Cannot be array of objects.
 *
 * @param originalArray The original array to be subtracted from.
 * @param minusArray The array from which the remove elements will be taken.
 */
export function subtractArray(originalArray, minusArray) {
    for (let i = minusArray.length - 1; i >= 0; i--) {
        removeFromArray(originalArray, minusArray[i]);
    }
    return originalArray;
}

// Does the same thing but doesn't affect the array
export function subtractArrayCopy(array, minusArray) {
    return subtractArray([...array], minusArray);
}

/**
 * Removes all instances of a single element from the original array. Cannot be object.
 *
 * @param originalArray The original array to be altered.
 * @param element The element to remove from the array.
 */
export function removeFromArray(originalArray, element) {
    const indexOf = originalArray.indexOf(element);
    if (indexOf !== -1) {
        originalArray.splice(indexOf, 1);
    }
    return originalArray;
}

/**
 * Adds the elements not already in the original array from the newArray. Cannot be array of objects.
 *
 * @param {[*]} originalArray The array to be added to.
 * @param {[*]} newArray The array of elements to be added to the original array.
 * @return {[*]} the original array that is updated.
 */
export function addUniqueToArray(originalArray, newArray) {
    for (let i = 0; i < newArray.length; i++) {
        const e = newArray[i];
        addUniqueElementToArray(originalArray, e);
    }
    return originalArray;
}

/**
 * Adds the element if it is not already in the given already. Element cannot be an object.
 *
 * @param {[*]} originalArray The array to be added to.
 * @param {*} element The element to add uniquely.
 */
export function addUniqueElementToArray(originalArray, element) {
    // Aborts if index is not -1
    originalArray.indexOf(element) === -1 && originalArray.push(element);
}

/**
 * Returns whether there is any overlap between the two arrays. Uses pure === for equality checks.
 *
 * @param {[*]} array1 The first array to check for overlap.
 * @param {[*]} array2 The second array to check for overlap.
 * @return {boolean} Whether there is overlap between the two arrays.
 */
export function arraysIntersect(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
        if (array2.indexOf(array1[i]) !== -1) {
            return true;
        }
    }
    return false;
}

/**
 * Returns the intersection between the two arrays.
 *
 * @param array1
 * @param array2
 */
export function arrayIntersection(array1, array2) {
    const returnArray = [...array1];
    return returnArray.filter(v => array2.includes(v));
}

/**
 * Shuffles a given array based on the Fisher-Yates implementation.
 *
 * @param array The array to be mutated and shuffled.
 */
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

/**
 * Calculates whether the two arrays are equal in the set sense. That is, if they are subsets of each other.
 *
 * @param {[*]} array1 The first array to check set equality for.
 * @param {[*]} array2 The seconds array to check set equality for.
 * @return {boolean} Whether the two arrays are set equal.
 */
export const setEquals = (array1, array2) => {
    return isSubset(array1, array2) && isSubset(array2, array1);
};

/**
 * Finds out if an array is a subset of another array by making sure all the elements in the subset array are also
 * present in the original array.
 *
 * @param {[*]} array The original array to check.
 * @param {[*]} subsetArray The array to check all the elements for being in the original array.
 * @return {boolean} If the second array is a subset of the first array.
 */
export const isSubset = (array, subsetArray) => {
    for (let i = 0; i < subsetArray.length; i++) {
        if (!array.includes(subsetArray[i])) {
            return false;
        }
    }
    return true;
};
// This will just be filled with a bunch of optimized array functions we'll need

/**
 * Deletes all the elements present in "minusArray" from "originalArray". Cannot be array of objects.
 *
 * @param originalArray The original array to be subtracted from.
 * @param minusArray The array from which the remove elements will be taken.
 */
export function subtractArray(originalArray, minusArray) {
    for (let i = minusArray.length -1; i >= 0; i--) {
        removeFromArray(minusArray[i]);
    }
    return originalArray;
}

/**
 * Removes all instances of a single element from the original array. Cannot be object.
 *
 * @param originalArray The original array to be altered.
 * @param element The element to remove from the array.
 */
export function removeFromArray(originalArray, element) {
    originalArray.splice(element, 1);
    return originalArray;
}

/**
 * Adds the elements not already in the original array from the newArray. Cannot be array of objects.
 *
 * @param originalArray The array to be added to.
 * @param newArray The array of elements to be added to the original array.
 * @return the original array that is updated.
 */
export function addUniqueToArray(originalArray, newArray) {
    for (let i = 0; i < newArray.length; i++) {
        const e = newArray[i];
        // Aborts if index is not -1
        originalArray.indexOf(e) === -1 && originalArray.push(e);
    }
    return originalArray;
}
/**
 * Removes the whitespace from a string. This includes spaces, tabs, escaped whitespace....
 *
 * @param {string} str The original string, not to be modified.
 * @return {string} The string with the removed white space.
 */
export const removeWhiteSpace = str => str.replace(/[ \t\r]+/g, "");

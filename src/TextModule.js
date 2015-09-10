/**
 * Text module.
 * Introduces several handy methods for transforming and displaying text in different ways
 * 
 * @module TextModule
 */

/**
 * Reducing text by word limit
 * 
 * @method customExcerpt
 * @param {String} str - the string representation of the excerpt
 * @param {Number} length - the maximum allowed number of words in the excerpt
 * @return {String} the new excerpt-string
 */
function customExcerpt(str, maxLength, useASCIIor) {
    var words = str.split(' ');
    words.splice(maxLength, words.length - 1);
    return words.join(' ') + 
      (words.length !== str.split(' ').length ? '&hellip;' : '');
}
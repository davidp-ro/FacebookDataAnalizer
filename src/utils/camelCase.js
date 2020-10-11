/**
 * Transform a string into a CamelCase string
 * 
 * @param {The string that gets CamelCase'd} stringtoTransform 
 * 
 * @throws {Error} if given string lenght is less than 2
 * 
 * @returns {string} transformed string
 */
const toCamelCase = (stringtoTransform) => {
    if (stringtoTransform.length < 2) {
        throw new Error("toCamelCase() requires a string of at least lenght 2");
    }
    let newString = ""
    newString += stringtoTransform.charAt(0).toUpperCase();
    newString += stringtoTransform.substr(1).toLowerCase();
    return newString;
}

exports.toCamelCase = toCamelCase;
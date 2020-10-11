/**
 * Will return a random color (classname) from the W3.css palette
 * 
 * Does not include very light colors!
 * 
 * @param {boolean} isTextColor, if true returns w3-text-...else w3-...
 */
const getColor = (isTextColor = false) => {
    const validColors = [
        "w3-amber",
        "w3-aqua",
        "w3-blue",
        "w3-light-blue",
        "w3-brown",
        "w3-cyan",
        "w3-blue-grey",
        "w3-green",
        "w3-light-green",
        "w3-indigo",
        "w3-khaki",
        "w3-lime",
        "w3-orange",
        "w3-deep-orange",
        "w3-pink",
        "w3-purple",
        "w3-deep-purple",
        "w3-red",
        "w3-teal",
        "w3-yellow",
        "w3-black",
        "w3-pale-red",
        "w3-pale-green",
        "w3-pale-yellow",
        "w3-pale-blue"
    ];

    const index = Math.floor(Math.random() * validColors.length);
    if (isTextColor == false) {
        return validColors[index];
    } else {
        return "w3-text" + validColors[index].substr(2);
    }
}

exports.getColor = getColor;
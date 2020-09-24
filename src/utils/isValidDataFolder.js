/**
 * Check if the given folder from setDataDir is a valid one
 * 
 * @param {Given folder path} folder 
 * 
 * @returns {true} if it is.
 * @returns {false} if it's not.
 */
const isValidFolder = (folder) => {
    const fs = require('fs');
    const path = require('path');
    const checked_folders = [
        'about_you',
        'ads_and_businesses',
        'apps_and_websites'
    ]
    let is_valid = true;

    checked_folders.forEach(checked_folder => {
        if (!fs.existsSync(path.join(folder, checked_folder))) {
            is_valid = false;
            return;
        }
    });

    return is_valid;
}

exports.isValidFolder = isValidFolder;
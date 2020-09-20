const ipcRenderer = require('electron').ipcRenderer;

let dir; // Main data directory, to be saved in the config file.

/**
 * Listening for when the user selects a folder
 * 
 * Shows warning if user still hasn't selected a folder (or folder is invalid)
 */
ipcRenderer.on('setDataDir', (event, args) => {
    if (args.canceled === false && isValidFolder(args.filePaths[0])) {
        dir = args.filePaths[0];
        console.log("[✔] " + dir + " is now the data directory");
        loadNormalHome();
    } else {
        ipcRenderer.send('showWarning', {
            "title": "Error",
            "content": "You must select a data directory!"
        })
    }
});

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
    const checked_folders = ['about_you', 'ads_and_businesses', 'apps_and_websites']
    let is_valid = true;

    checked_folders.forEach(checked_folder => {
        if (!fs.existsSync(path.join(folder, checked_folder))) {
            is_valid = false;
            return;
        }
    });

    return is_valid;
}

/**
 * Reads / Checks the config file
 * 
 * @returns {null} file does not exist
 * @returns {JSON} JSON Object if it exists
 */
const readConfig = () => {
    try {
        const file = require('./config.json');
        return file;
    } catch (e) {
        console.warn(e.message);
        return null;
    }
}

const loadHome = async() => {
    changeTitle();

    const page = document.getElementById('mainPage');
    page.style.display = 'flex';
    page.style.alignContent = 'center';
    page.style.justifyContent = 'center';

    let config = readConfig();

    if (config === null) {
        // Show the 'no config found' card
        page.innerHTML = noConfigCard;
        const _noConfigCard = document.getElementById('noConfigFound');
        _noConfigCard.style.marginTop = '20%';

        const selectDataBtn = document.getElementById('selectDataFolder');
        selectDataBtn.addEventListener('click', async() => {
            console.log('selectDataFolder');
            await ipcRenderer.send('selectDataDir');
        });
    } else {
        loadNormalHome();
    }
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Facebook Data Visualizer</h1>'
}

const loadNormalHome = () => {
    const page = document.getElementById('mainPage');
    page.innerHTML = '<h3> Data directory is: ' + dir + '</h3>';
}

/* Static elements */

const noConfigCard = '\
<div id="noConfigFound" class="w3-card-4" style="width:550px">\
<header class="w3-container w3-light-grey">\
    <h3>No config file found</h3>\
</header>\
<div class="w3-container" style="margin-top: 12px;">\
    <i class="material-icons w3-left w3-circle w3-margin-right" style="color: #FB8C00; font-size: 48px;">warning</i>\
    <p>You need to select the folder that contains the downloaded data</p><br>\
</div>\
<button id="howToDownloadData" class="w3-button w3-block w3-dark-grey">How To Download your data from Facebook</button>\
<button id="selectDataFolder" class="w3-button w3-block w3-dark-grey">Select folder</button>\
</div>\
' // End of configCard

exports.loadHome = loadHome;
const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs');
const isValidDataFolder = require('./utils/isValidDataFolder');

let dir; // Main data directory, to be saved in the config file.

/**
 * Listening for when the user selects a folder, and saves the config in a file
 * 
 * Default configs:
 *  dataPath : data directory path
 *  ignoredFolders : [], empty list
 * 
 * Shows warning if user still hasn't selected a folder (or folder is invalid)
 */
ipcRenderer.on('setDataDir', (event, args) => {
    if (args.canceled === false && isValidDataFolder.isValidFolder(args.filePaths[0])) {
        dir = args.filePaths[0];
        console.log("[✔] " + dir + " is now the data directory");
        let config = {
            "dataPath": dir,
            "ignoredFolders": []
        }
        ipcRenderer.send('saveConfig', config);
        loadNormalHome(config);
    } else {
        ipcRenderer.send('showWarning', {
            "title": "You must select a data directory!",
            "content": "It's the one that contains the data downloaded from your account"
        })
    }
});

/**
 * Load the page
 */
const loadHome = async() => {
    let config;

    ipcRenderer.on('setConfig', (event, args) => {
        config = args.config;
    });

    changeTitle();

    const page = document.getElementById('mainPage');
    page.style.display = 'flex';
    page.style.alignContent = 'center';
    page.style.justifyContent = 'center';

    try {
        // To get the config
        ipcRenderer.send('getConfig');
    } catch (e) {
        console.warn("Could not get config! Exception: " + e.message);
    }

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
        loadNormalHome(config);
    }
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Facebook Data Visualizer</h1>'
}

/**
 * Load the normal homepage
 * 
 * @param {Config object} config 
 */
const loadNormalHome = (config) => {
    const page = document.getElementById('mainPage');
    page.innerHTML = "";
    generateIgnoredFoldersCard(page, config);
}

/* Dynamic elements */

const generateIgnoredFoldersCard = (page, config) => {
    if (config.ignoredFolders.length == 0) {
        page.innerHTML += noIgnoredFoldersCard;
    } else {
        page.innerHTML += "abc";
    }
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

const noIgnoredFoldersCard = '\
<div id="noIgnoredFolders" class="w3-card-4" style="width:100%">\
    <header class="w3-container w3-light-grey">\
        <h3>Will scan all folders available</h3>\
    </header>\
    <div class="w3-container" style="margin-top: 12px;">\
        <i class="material-icons w3-left w3-circle w3-margin-right" style="color:#3BCEBC; font-size: 48px;">info</i>\
        <p>Do you want to ignore a folder? Add it to the ignored folders list in the config</p><br>\
    </div>\
    <button id="howToIgnoreFolder" class="w3-button w3-block w3-dark-grey">How To Ignore a Folder</button>\
</div>\
' // End of noIgnoredFoldersCard

exports.loadHome = loadHome;
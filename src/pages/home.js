const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs');
const isValidDataFolder = require('../utils/isValidDataFolder');
const cC = require('../utils/camelCase')

let dir; // Main data directory, to be saved in the config file.
// let config; // Config object

// ipcRenderer.send('getConfig')
// ipcRenderer.on('loadConfig', (event, args) => {
//     config = args.config;
// });

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
        config = {
            "dataPath": dir,
            "ignoredFolders": []
        }
        ipcRenderer.send('saveConfig', {
            "config": config
        });
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
const loadHome = async(config) => {
    changeTitle();

    const page = document.getElementById('mainPage');
    page.style.display = 'flex';
    page.style.flexDirection = 'column';
    page.style.alignContent = 'center';
    page.style.justifyContent = 'center';
    page.style.marginRight = '2%';

    if (config === null || config === undefined) {
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
 */
const loadNormalHome = async(config) => {
    const page = document.getElementById('mainPage');
    page.innerHTML = "";
    generateIgnoredFoldersCard(page, config);
    const ignoreBtn = document.getElementById('howToIgnoreFolder');
    ignoreBtn.addEventListener('click', () => {
        // TODO: Show a help page
    })
    news = await getNews();
    generateNewsCard(page, news);
}

/**
 * Get the latest news from the repo
 * 
 * @returns {JSON Object} with the news
 */
const getNews = async() => {
    news = await fetch('https://raw.githubusercontent.com/davidp-ro/FacebookDataVisualizer/master/news.json');
    return news.json();
}

/* Dynamic elements */

const generateIgnoredFoldersCard = (page, config) => {
    if (config.ignoredFolders.length == 0) {
        page.innerHTML += noIgnoredFoldersCard;
    } else {
        let ignoredFoldersString = "";
        for (let index = 0; index < config.ignoredFolders.length; ++index) {
            let folder = config.ignoredFolders[index].replace('_', ' ');
            ignoredFoldersString += cC.toCamelCase(folder);
            // Put a comma if element is not the last one
            ignoredFoldersString += (index == (config.ignoredFolders.length - 1)) ? '' : '?';
        }
        let ignoredFoldersCard = (`
        <div id="ignoredFolders" class="w3-card-4 w3-margin-left w3-margin-right w3-margin-top" style="min-width: 750px;">
            <header class="w3-container w3-light-grey" style="text-align: center;">
                <h3>You have set some folders to ignore: </h3>
            </header>
            <div class="w3-container" style="margin-top: 12px;">
                <i class="material-icons w3-left w3-circle w3-margin-right" style="color:#3BCEBC; font-size: 48px;">info</i>
                <p>The ignored folders are: ${ignoredFoldersString}</p><br>
            </div>
            <button id="howToIgnoreFolder" class="w3-button w3-block w3-dark-grey">How To Ignore / Un-Ignore a Folder</button>
        </div>
        `);
        page.innerHTML += ignoredFoldersCard;
    }

    page.innerHTML += '<br>';
}

const generateNewsCard = (page, news) => {
    let date = new Date(news.updated_on).toString().substr(0, 21);
    const newsCard = (`
    <div id="newsCard" class="w3-card-4 w3-margin-left w3-margin-right w3-margin-top" style="min-width: 750px;">
        <header class="w3-container w3-light-grey" style="text-align: center;">
            <h3>Latest news</h3>
        </header>
        <div class="w3-container" style="margin-top: 12px;">
            <h5>${news.title}<h5>
            ${news.toRender}<br>
            <small>Last updated on ${date}</small>
        </div>
    </div>

    <br>
    `);
    page.innerHTML += newsCard;
}

/* Static elements */

const noConfigCard = (`
<div id="noConfigFound" class="w3-card-4 w3-margin-left w3-margin-right" style="min-width: 550px;">
<header class="w3-container w3-light-grey">
    <h3>No config file found or the data folder coudn't be found!</h3>
</header>
<div class="w3-container" style="margin-top: 12px;">
    <i class="material-icons w3-left w3-circle w3-margin-right" style="color: #FB8C00; font-size: 48px;">warning</i>
    <p>You need to select the folder that contains the downloaded data</p><br>
</div>
<button id="howToDownloadData" class="w3-button w3-block w3-dark-grey">How To Download your data from Facebook</button>
<button id="selectDataFolder" class="w3-button w3-block w3-dark-grey">Select folder</button>
</div>
`); // End of configCard

const noIgnoredFoldersCard = (`
<div id="noIgnoredFolders" class="w3-card-4 w3-margin-left w3-margin-right w3-margin-top" style="min-width: 750px;">
    <header class="w3-container w3-light-grey" style="text-align: center;">
        <h3>Will scan all folders available</h3>
    </header>
    <div class="w3-container" style="margin-top: 12px;">
        <i class="material-icons w3-left w3-circle w3-margin-right" style="color:#3BCEBC; font-size: 48px;">info</i>
        <p>Do you want to ignore a folder? Add it to the ignored folders list in the config</p><br>
    </div>
    <button id="howToIgnoreFolder" class="w3-button w3-block w3-dark-grey">How To Ignore a Folder</button>
</div>
`); // End of noIgnoredFoldersCard

exports.loadHome = loadHome;
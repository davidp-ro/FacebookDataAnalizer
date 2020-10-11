const { app, dialog, ipcMain, BrowserWindow } = require('electron');
const path = require('path');

/**
 * Docs
 * 
 *  Load the config:
 *      ipcRenderer.send('getConfig');
 *      ipcRenderer.on('loadConfig', (event, args) => {
 *         config = args.config;
 *      });
 * 
 *  Save the config:
 *      ipcRenderer.send('saveConfig', {
 *          config: configToSave
 *      });
 */

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

// Event Calls

/**
 * Open the dialog so that the user can select the data directory
 * 
 * Sends an event (setDataDir) to set the directory
 */
ipcMain.on('selectDataDir', async(event, args) => {
    let dataDir = await dialog.showOpenDialog({
        title: 'Select the folder containing your facebook data',
        properties: ['openDirectory']
    });
    event.sender.send('setDataDir', dataDir);
});

/**
 * Show an error box
 * 
 * @param {title} : Box title
 * @param {content} : Box message
 */
ipcMain.on('showWarning', (event, args) => {
    dialog.showErrorBox(args.title, args.content);
})

/**
 * Save the config
 * 
 * @param {config} : config to save
 */
ipcMain.on('saveConfig', (event, args) => {
    config = args.config;
    saveConfig();
});

/**
 * Config
 */
let config = null;

/**
 * Reads / Checks the config file
 * 
 * @returns {null} file does not exist
 * @returns {JSON Object} if it exists
 */
const readConfig = () => {
    try {
        const file = require('./config.json');
        return file;
    } catch (e) {
        if (e.message.startsWith('Cannot find')) {
            console.log('No config file found, showing prompt!');
        } else {
            console.warn(e.message);
        }
        return null;
    }
}

/**
 * Saves the config present in the config object
 * 
 * @throws {The config is null, will not be saved!} if config is null or undefined
 */
const saveConfig = () => {
    if (config === null || config === undefined) {
        throw new Error("The config is null, will not be saved!");
    } else {
        const fs = require('fs');
        fs.writeFile('./src/config.json', JSON.stringify(config, null, 4), () => {
            console.log("[✔] Saved the new config");
        });
    }
}

const createWindow = () => {
    // Read config, will be null if non-existant
    config = readConfig();

    // Send the config to requests
    ipcMain.on('getConfig', (event, args) => {
        event.sender.send('loadConfig', {
            "config": config
        });
    });

    // Create the window.
    const mainWindow = new BrowserWindow({
        width: 1336,
        height: 768,
        resizable: false,
        autoHideMenuBar: true,
        icon: __dirname + '/res/icon_128x128.ico',
        webPreferences: {
            nodeIntegration: true,
        }
    });

    // Load index.html
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Open the DevTools at startup.
    // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
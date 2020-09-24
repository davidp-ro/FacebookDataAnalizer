const { app, dialog, ipcMain, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

class Config {
    Config(config) {
        this.dataPath = config.dataPath;
        this.ignoredFolders = config.ignoredFolders;
    }
}

let config = null;

// IPC Calls

ipcMain.on('selectDataDir', async(event, args) => {
    let dataDir = await dialog.showOpenDialog({
        title: 'Select the folder containing your facebook data',
        properties: ['openDirectory']
    });
    event.sender.send('setDataDir', dataDir);
});

ipcMain.on('showWarning', (event, args) => {
    dialog.showErrorBox(args.title, args.content);
})

ipcMain.on('setConfig', (event, args) => {
    setConfig(args.config)
});

/**
 * @throws {Config is null} If the config couldn't be read
 */
ipcMain.on('getConfig', (event, args) => {
    if (config != null) {
        event.sender.send('setConfig', config);
    } else throw ("Config is null");
});

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

/**
 * Save a new config
 * 
 * Deletes (if present) the config instance, and starts a new one, and saves the
 * config to config.json
 * 
 * @param {Config object (optional, defaults to null)} _config  
 */
const setConfig = (_config = null) => {
    const saveConfig = (configToSave) => {
        const fs = require('fs');
        fs.writeFile('./src/config.json', JSON.stringify(configToSave, null, 4), () => {
            console.log("[✔] Saved the new config");
        });
    }

    if (_config == null) {
        let cfg = readConfig();
        if (cfg == null) {
            return;
        } else {
            try {
                delete(config);
            } catch (e) {
                console.error(e);
            } finally {
                config = new Config(cfg);
                saveConfig(config);
            }
        }
    } else {
        try {
            delete(config);
        } catch (e) {
            console.error(e);
        } finally {
            config = new Config(_config);
            saveConfig(config);
        }
    }
}

const createWindow = () => {
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
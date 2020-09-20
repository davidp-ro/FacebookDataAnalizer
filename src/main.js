const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
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
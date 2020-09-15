const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Facebook Data Analizer',
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')

    // DEBUG: Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// Called after Electron finished loading and is ready to render pages
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})
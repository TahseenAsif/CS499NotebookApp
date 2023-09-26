// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
//const fs = require('fs');

let mainWindow;

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 900,
        height: 800,
        minHeight: 650,
        minWidth: 600,
        frame: false,
        webPreferences: {
            //setting true will run into potential security issues
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // ipcMain.handle('create-file', (req, data) => {
    //     if(!data || !data.title || !data.content){
    //         return false;
    //     }
    //     const filePath = path.join(__dirname, 'notes', `${data.title}.txt`);
    //     fs.writeFileSync(filePath, data.content);
    //     return {success: true, filePath};
    // });

    // and load the index.html of the app.
    mainWindow.loadFile('codeeditor.html');
    // open dev tools
    mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
    createWindow();
    // app.on('activate', function () {
    //     // On macOS it's common to re-create a window in the app when the
    //     // dock icon is clicked and there are no other windows open.
    //     if (BrowserWindow.getAllWindows().length === 0) createWindow()
    //   })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

/**
 * ipcmain listening for title bar interactions (minimize, maximize, exit)
 */
ipcMain.on("winMinimize", () => {
    mainWindow.minimize();
})

ipcMain.on("winMaximize", () => {
    mainWindow.maximize();
})

ipcMain.on("winClose", () => {
    mainWindow.close();
})


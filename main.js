// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const { signIn, signUp, mySignOut } = require('./firebase-config.js');
const path = require('path');

let mainWindow;
let childWindow;
let loginWindow;

function createWindow(){
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        
        frame: false,
        webPreferences: {
            //setting true will run into potential security issues
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, './html/index.html'));
    // open dev tools
    mainWindow.webContents.openDevTools();
};

const createLoginWindow = () => {
    const loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nativeWindowOpen: true,
        }
    })
    loginWindow.loadFile("login.html")
}

function createChildWindow(){
    childWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        modal: true,
        show: false,
        frame: false,
        parent: mainWindow,

        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });
    childWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
    createLoginWindow();
    ipcMain.on('sign-in', (event, email, password) => {
        signIn(email, password, (uid) => {
            console.log(`Signed in ${uid}`);
            // win.close();
        });
    });
    ipcMain.on('sign-up', (event, email, password) => {
        signUp(email, password, (uid) => {
            console.log(`Signed in ${uid}`);
            // win.close();
        });
    });
    ipcMain.on('sign-out', () => {
        mySignOut(() => {
            console.log('Signed out');
        });
    });
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
});

ipcMain.on("winMaximize", () => {
    mainWindow.maximize();
});

ipcMain.on("winClose", () => {
    mainWindow.close();
});

ipcMain.on("runAbout", () => {
    createChildWindow();
    childWindow.loadFile(path.join(__dirname, './html/about.html'));
    childWindow.once("ready-to-show", () => {
        childWindow.show();
    });
});

ipcMain.on("childMinimize", () => {
    console.log("minimizing");
    childWindow.minimize();
});

ipcMain.on("childMaximize", () => {
    childWindow.maximize();
});

ipcMain.on("childClose", () => {
    childWindow.close();
});
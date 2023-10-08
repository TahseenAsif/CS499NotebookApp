const { app, BrowserWindow, ipcMain } = require('electron');
const { signInWithGoogle, signOutUser } = require('./firebase-config.js');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        //frame: false
    })
    win.loadFile("codeeditor.html")
}

const createLoginWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    // win.loadFile("login.html")
    win.webContents.openDevTools();
    win.loadFile("test_login.html")
}

const createPaintWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height: 600,
    })
    win.loadFile("paint.html")
}

const createTestWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height:600,
    })
    win.loadFile("test.html")
}

app.whenReady().then(() => {
    createLoginWindow();

    ipcMain.on('sign-in', () => {
        signInWithGoogle((uid) => {
            console.log(`Signed in ${uid}`);
        });
    });
    ipcMain.on('sign-out', () => {
        signOutUser(() => {
            console.log('Signed out');
        });
    });
})
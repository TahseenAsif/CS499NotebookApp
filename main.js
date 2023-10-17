const { app, BrowserWindow, ipcMain } = require('electron');
const { signIn, signUp, mySignOut } = require('./firebase-config.js');

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
            contextIsolation: false,
            nativeWindowOpen: true
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
})
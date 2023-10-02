const { app, BrowserWindow } = require('electron');
const { signInWithGoogle } = require('./firebase-config');

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
        frame: false
    })
    //win.loadFile("login.html")
    signInWithGoogle();
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
    createLoginWindow()
})
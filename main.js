const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow() {
    const window = new BrowserWindow({
        title: 'Note App',
        width: 100000,
        height: 100000
    });

    window.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createWindow();
    

    app.on('activate' , () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
});
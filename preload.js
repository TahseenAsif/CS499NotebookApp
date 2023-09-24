const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("api", {
    window:{
        minimize: () => ipcRenderer.send("winMinimize"),
        maximize: () => ipcRenderer.send("winMaximize"),
        exit: () => ipcRenderer.send("winClose"),
    }
});
const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("api", {
    window:{
        minimize: () => ipcRenderer.send("winMinimize"),
        maximize: () => ipcRenderer.send("winMaximize"),
        exit: () => ipcRenderer.send("winClose"),
        about: () => ipcRenderer.send("runAbout"),
    },
    child_window:{
        minimize: () => ipcRenderer.send("childMinimize"),
        maximize: () => ipcRenderer.send("childMaximize"),
        exit: () => ipcRenderer.send("childClose"),
    }
});
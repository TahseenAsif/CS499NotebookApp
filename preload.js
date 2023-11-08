const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("api", {
    window:{
        minimize: () => ipcRenderer.send("winMinimize"),
        maximize: () => ipcRenderer.send("winMaximize"),
        exit: () => ipcRenderer.send("winClose"),
        about: () => ipcRenderer.send("runAbout"),
        paint: () => ipcRenderer.send("runPaint"),
    },
    child_window:{
        minimize: () => ipcRenderer.send("childMinimize"),
        maximize: () => ipcRenderer.send("childMaximize"),
        exit: () => ipcRenderer.send("childClose"),
    },
    paint_window:{
        minimize: () => ipcRenderer.send("paintMinimize"),
        maximize: () => ipcRenderer.send("paintMaximize"),
        exit: () => ipcRenderer.send("paintClose"),
    }
});
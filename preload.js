const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("api", {
    login:{
        signInRequest: (email, password) => ipcRenderer.send("sign-in", email, password),
        signUpRequest: (email, password) => ipcRenderer.send("sign-up", email, password),
        guestRequest: () => ipcRenderer.send("guest"),
    },
    window:{
        minimize: () => ipcRenderer.send("winMinimize"),
        maximize: () => ipcRenderer.send("winMaximize"),
        exit: () => ipcRenderer.send("winClose"),
        paint: () => ipcRenderer.send("runPaint"),
        execute: () => ipcRenderer.send("runCode"),
    },
    paint_window:{
        minimize: () => ipcRenderer.send("paintMinimize"),
        maximize: () => ipcRenderer.send("paintMaximize"),
        exit: () => ipcRenderer.send("paintClose"),
    },
    terminal:{
        minimize: () => ipcRenderer.send("termMinimize"),
        maximize: () => ipcRenderer.send("termMaximize"),
        exit: () => ipcRenderer.send("termClose"),
    },
    // menuOptions:{
    //     about: () => ipcRenderer.send("runAbout"),
    //     settings: () => ipcRenderer.send("runSettings"),
    //     open_files: () => ipcRenderer.send("runOpenFiles"),
    // }
});
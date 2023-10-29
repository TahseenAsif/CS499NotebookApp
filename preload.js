const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("api", {
    login:{
        signInRequest: (email, password) => ipcRenderer.send("sign-in", email, password),
        signUpRequest: (email, password) => ipcRenderer.send("sign-up", email, password),
    },
    window:{
        minimize: () => ipcRenderer.send("winMinimize"),
        maximize: () => ipcRenderer.send("winMaximize"),
        exit: () => ipcRenderer.send("winClose"),
    },
    menuOptions:{
        about: () => ipcRenderer.send("runAbout"),
        settings: () => ipcRenderer.send("runSettings"),
        open_files: () => ipcRenderer.send("runOpenFiles"),
    }
});
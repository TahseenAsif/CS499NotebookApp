const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("api", {
    sendUserID: (callback) => ipcRenderer.on("sendUserID", (callback)),
    login:{
        signInRequest:  (email, password) => ipcRenderer.send("sign-in", email, password),
        signUpRequest:  (email, password) => ipcRenderer.send("sign-up", email, password),
        guestRequest:   ()                => ipcRenderer.send("guest"),
    },
    window:{
        minimize:       () => ipcRenderer.send("winMinimize"),
        maximize:       () => ipcRenderer.send("winMaximize"),
        exit:           () => ipcRenderer.send("winClose"),
    },
    paint_window:{
        paint:          () => ipcRenderer.send("runPaint"),
        minimize:       () => ipcRenderer.send("paintMinimize"),
        maximize:       () => ipcRenderer.send("paintMaximize"),
        exit:           () => ipcRenderer.send("paintClose"),
    },
    editor:{
        allSave:        (content, path) => ipcRenderer.send("saveAll", content),
        runCode:        (content, path) => ipcRenderer.send("runCode", content),
        savePython:     (content, path) => ipcRenderer.send("save_as_Py", content),
        saveJavascript: (content, path) => ipcRenderer.send("save_as_Js", content, path),
        runPython:      ()              => ipcRenderer.send("runPyth"),
        runJavascript:  ()              => ipcRenderer.send("runJs"),
        // runPython:      (path)          => ipcRenderer.send("runPyth", path),
        // runJavascript:  (path)          => ipcRenderer.send("runJs", path),
    },
    terminal:{
        minimize:       () => ipcRenderer.send("termMinimize"),
        maximize:       () => ipcRenderer.send("termMaximize"),
        exit:           () => ipcRenderer.send("termClose"),
    },

    //to be used later in development
    // menuOptions:{
    //     about: () => ipcRenderer.send("runAbout"),
    //     settings: () => ipcRenderer.send("runSettings"),
    //     open_files: () => ipcRenderer.send("runOpenFiles"),
    // },
});
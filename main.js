// Modules to control application life and create native browser window
const { Notification, app, BrowserWindow, ipcMain } = require('electron');
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { getFirestore, doc, getDoc, setDoc } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
const { eventNames } = require('process');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');
//for running CMD from js
const exec = require('child_process').exec;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiChsQ4kN8Dk4Ael5H3XStWFD4iMQb3tE",
    authDomain: "codestone-a5ed4.firebaseapp.com",
    projectId: "codestone-a5ed4",
    storageBucket: "codestone-a5ed4.appspot.com",
    messagingSenderId: "238633592214",
    appId: "1:238633592214:web:5c63ffa4a1cd808d2aa9b7",
    measurementId: "G-DW8W1X0TLK"
};

const firebase_app = initializeApp(firebaseConfig);     //Initialize Firebase
const auth = getAuth(firebase_app);                     //Initialize Firebase Authentication and get a reference to the server
const db = getFirestore(firebase_app)                   //Initialize Firestore
const storage = getStorage(firebase_app);               //Initialize Firebase Storage

//Sign in with email and password
const signIn = async (email, password, onSignIn) => {
    try{
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const user = userCred.user
        console.log(`Signed in as ${user.email}`);
        if(onSignIn){
            onSignIn(user.uid);
        }
    } catch(error){
        console.error("Error signing in", error);
    }
};

const signUp = async (email, password, onSignUp) => {
    try{
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        console.log(`Signed in as ${user.email}`);
        if(onSignUp){
            onSignUp(user.uid);
        }
    } catch(error){
        console.error("Error signing in", error);
    }
};

const mySignOut = async (onSignOut) => {
    try {
        await signOut(auth);
        console.log("Signed out");
        // Call the onSignOut callback
        if(onSignOut){
            onSignOut();
        }
    } catch(error){
        console.log("Error signing out", error);
    }
}

let mainWindow;
let paintWindow;
let termWindow;

function createWindowApp(){
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        minWidth: 800,
        minHeight: 800,
        frame: false,
        webPreferences: {
            //setting true will run into potential security issues
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // load the login.html of the app
    mainWindow.loadFile(path.join(__dirname, 'html/login.html'));
    // open dev tools
    // mainWindow.webContents.openDevTools();
};

function createPaintWindow(){
    // Create the browser window.
    paintWindow = new BrowserWindow({
        width: 1500,
        height: 800,
        resizable: false,
        show: false,
        frame: false,
        webPreferences: {
            //setting true will run into potential security issues
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // and load the index.html of the app.
    paintWindow.loadFile(path.join(__dirname, './html/paint.html'));
};

function createTerminal(){
    //create terminal
    termWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        modal: true,
        show: false,
        frame: false,
        parent: mainWindow,
        webPreferences: {
            //setting true will run into potential security issues
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // and load the index.html of the app.
    termWindow.loadFile(path.join(__dirname, './html/terminal.html'));
    //open dev tools
    termWindow.webContents.openDevTools();
}

// change window size and html after successful login
function updateWindowApp(){
    mainWindow.setSize(1200, 900);
    mainWindow.setMinimumSize(1200, 700);
    mainWindow.moveTop();
    mainWindow.center();
    mainWindow.loadFile(path.join(__dirname, './html/index.html'));
    mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
    createWindowApp();
    mainWindow.moveTop();
    mainWindow.center();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

// ipcMain listening for title bar interactions (minimize, maximize, exit)
ipcMain.on("winMinimize", () => {
    mainWindow.minimize();
});

ipcMain.on("winMaximize", () => {
    mainWindow.maximize();
});

ipcMain.on("winClose", () => {
    mainWindow.close();
});

//ipcMain listening for login interactions (signUp, signIn, guest)
ipcMain.on("sign-in", (event, email, password) => {
    signIn(email, password, (uid) => {
        console.log(`Signed in ${uid}`);
        updateWindowApp();
    });
})

ipcMain.on("sign-up", (event, email, password) => {
    signUp(email, password, (uid) => {
        console.log(`Signed in ${uid}`);
        updateWindowApp();
    });
})

ipcMain.on("guest", () => {
    setTimeout(() => {
        updateWindowApp();
    }, 100);
})

//ipcMain listening for paint window interactions (runPaint, minimize, maximize, exit)

//creates paint window
ipcMain.on("runPaint", () => {
    createPaintWindow();
    paintWindow.once('ready-to-show', () => {
        paintWindow.show();
    })
});

//create terminal window
ipcMain.on("runCode", () => {
    createTerminal();
    termWindow.once('ready-to-show', () => {
        termWindow.show();
    })
});

ipcMain.on("paintMinimize", () => {
    paintWindow.minimize();
});

ipcMain.on("paintMaximize", () => {
    paintWindow.maximize();
});

ipcMain.on("paintClose", () => {
    paintWindow.close();
});

//save infomation of the data locally in a .json file
ipcMain.on("saveAll", (event, content) => {
    var toJSON = JSON.stringify(content, null, 2);
    fs.writeFileSync('data.json', toJSON, 'utf-8');
    console.log('Saved data.json file!');
    new Notification({
        title: 'Saved',
        body: "Your files have been saved successfully!"
    }).show();
})

//save python file locally
ipcMain.on("save_as_Py", (event, content) => {
    //The weird indenting here seems necessary
    const totalPyth =
    `
import sys
old_stdout = sys.stdout
log_file = open("output.txt", "w")
sys.stdout = log_file
${content}
sys.stdout = old_stdout
log_file.close()
    `
    fs.writeFileSync('testPy.py', totalPyth);
    console.log('Saved test.py file!');
    new Notification({
        title: 'Saved',
        body: "Your file has been successfully saved!"
    }).show();
});

//save javascript file locally
ipcMain.on("save_as_Js", (event, content) => {
    fs.writeFileSync("testJs.js", content);
    console.log('Saved test.js file!');
    new Notification({
        title: 'Saved',
        body: "Your file has been successfully saved!"
    }).show();
});

ipcMain.on("runPyth", (event) => {
    pyshell = new PythonShell("testPy.py");
    pyshell.on('message', function(message){
        console.log(message);
    })
});

ipcMain.on("runJs", (event) => {
    exec('node testJs.js > output.txt',
    function(error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if(error !== null){
            console.log('exec error: ' + error);
        }
    });
});
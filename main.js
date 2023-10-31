// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { getFirestore, doc, getDoc, setDoc } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
const path = require('path');
const fs = require('fs');

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

const firebase_app = initializeApp(firebaseConfig);     // Initialize Firebase
const auth = getAuth(firebase_app);                     //Initialize Firebase Authentication and get a reference to the server
const db = getFirestore(firebase_app)                   //Initialize Firestore
const storage = getStorage(firebase_app);               //Initialize Firebase Storage

//Sign in with email and password
const signIn = async (email, password, onSignIn) => {
    try{
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const user = userCred.user
        console.log(`Signed in as ${user.email}`);
        if (onSignIn){
            onSignIn(user.uid);
        }
    } catch (error){
        console.error("Error signing in", error);
    }
};

const signUp = async (email, password, onSignUp) => {
    try{
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        console.log(`Signed in as ${user.email}`);
        if (onSignUp){
            onSignUp(user.uid);
        }
    } catch (error) {
        console.error("Error signing in", error);
    }
};

const mySignOut = async (onSignOut) => {
    try {
      await signOut(auth);
      console.log("Signed out");
      // Call the onSignOut callback
      if (onSignOut) {
        onSignOut();
      }
    } catch (error) {
      console.log("Error signing out", error);
    }
}

let mainWindow;
let childWindow;

function createApp(){
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 700,
        height: 700,
        minWidth: 700,
        minHeight: 700,
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

// change window size and html after successful login
function updateWindowApp(){
    mainWindow.setSize(1200, 900);
    mainWindow.setMinimumSize(1200, 700);
    mainWindow.moveTop();
    mainWindow.center();
    mainWindow.loadFile(path.join(__dirname, './html/index.html'));
    mainWindow.webContents.openDevTools();
}

// maybe used to display code output instead of outputing to devtools when running code
// function createChildWindow(){
//     childWindow = new BrowserWindow({
//         width: 1000,
//         height: 700,
//         modal: true,
//         show: false,
//         frame: false,
//         parent: mainWindow,
//         webPreferences: {
//             nodeIntegration: false,
//             preload: path.join(__dirname, 'preload.js')
//         },
//     });
//     childWindow.webContents.openDevTools();
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
    createApp();
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

// ipcMain.on("childMinimize", () => {
//     console.log("minimizing");
//     childWindow.minimize();
// });

// ipcMain.on("childMaximize", () => {
//     childWindow.maximize();
// });

// ipcMain.on("childClose", () => {
//     childWindow.close();
// });

//ipcMain listening for login interactions (signUp, signIn)
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
    // updateWindowApp();
})
// Modules to control application life and create native browser window
const { Notification, app, BrowserWindow, ipcMain} = require('electron');
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { getFirestore, doc, getDoc, setDoc } = require("firebase/firestore");
const { getStorage, ref, uploadBytes, getMetadata, getDownloadURL } = require("firebase/storage");
const path = require('path');
const fs = require('fs');
const { eventNames } = require('process');
const { PythonShell } = require('python-shell');
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

let userID;

/*
This function was supposed to be used to create folders in firebase databse with the users ID, but mkdir doesn't work in
firebase. Instead, the way to make folders is just so specify a path, and firebase auto creates the folder. 
Leave this function as it contains some checks that may need to be used in other functions
const checkAndCreateFolder = async (userID) =>{
    const storageRef = ref(storage, `user-files/${userID}`);
    // If metadata doesn't exist, that means folder doesn't exist and we must create a new one.
    try {
        await getMetadata(storageRef);
    } catch (error) {
        if (error.code === 'storage/object-not-found') {
            try {
                await mkdir(storageRef);
                console.log(`Folder for ${userID} created`);
            } catch (error) {
                console.log(error.code);
                console.error(`Error creating folder for ${userID}`);
            }
        }
        else {
            console.error(`Error checking folder for ${userID}`);
        }
    }
};
*/

//Sign in with email and password
let docSnap;
const signIn = async (email, password, onSignIn) => {
    try{
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const user = userCred.user
        console.log(`Signed in as ${user.email}`);
        if (onSignIn){
            onSignIn(user.uid);
        }
        userID = user.uid;
        // await checkAndCreateFolder(userID);
    } catch (error){
        console.error("Error signing in", error);
    }
    const docRef = doc(db, "users", `${userID}`);
    docSnap = await getDoc(docRef);
};

const signUp = async (email, password, onSignUp) => {
    try{
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        console.log(`Signed in as ${user.email}`);
        if (onSignUp){
            onSignUp(user.uid);
        }
        userID = user.uid
        // await checkAndCreateFolder(userID);
    } catch (error) {
        console.error("Error signing in", error);
    }
};

// const mySignOut = async (onSignOut) => {
//     try {
//       await signOut(auth);
//       console.log("Signed out");
//       // Call the onSignOut callback
//       if (onSignOut) {
//         onSignOut();
//       }
//     } catch (error) {
//       console.log("Error signing out", error);
//     }
// }

let mainWindow;
let termWindow;

function createApp(){
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
    //mainWindow.webContents.openDevTools();
};

function createTerminalWindow(){
    termWindow = new BrowserWindow({
        width: 900,
        height: 600,
        resizable: false,
        modal: true,
        show: false,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    termWindow.loadFile(path.join(__dirname, 'html/terminal.html'));
    //childWindow.webContents.openDevTools();
};

//Used for testing paint functionality, feel free to remove/modify this
function createPaintWindow(){
    // Create the browser window.
    paintWindow = new BrowserWindow({
        width: 1500,
        height: 800,
        resizable: false,
        frame: false,
        webPreferences: {
            //setting true will run into potential security issues
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // and load the paint.html of the app.
    paintWindow.loadFile(path.join(__dirname, './html/paint.html'));

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
    createApp();
    // createPaintWindow();
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

//ipcMain listening for login interactions (signUp, signIn)
ipcMain.on("sign-in", (event, email, password) => {
    signIn(email, password, (uid) => {
        console.log(`Signed in ${uid}`);
        //I do not know if this setTimeout is needed
        setTimeout(() => {
            updateWindowApp();
        }, 100);
        //This setTimeout is needed, however. I don't know if it needs to be 400 though
        setTimeout(() => {
            mainWindow.webContents.send("sendUserData", docSnap.data());
        }, 400);
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
    setTimeout(() => {
        mainWindow.webContents.send("sendUserData", "guest");
    }, 1000);
})

//creating paint window
ipcMain.on('runPaint', () => {
    createPaintWindow();
})

ipcMain.on("paintMinimize", () => {
    paintWindow.minimize();
});

ipcMain.on("paintMaximize", () => {
    paintWindow.maximize();
});

ipcMain.on("paintClose", () => {
    paintWindow.close();
});

ipcMain.on("saveText", (event,content,path) =>{
    fs.writeFileSync(`savedfiles/${path}.txt`,content,'utf-8');
    console.log(`Saved ${path}.txt file!`);
    new Notification({
        title: 'Saved',
        body: 'Your file have been successfully saved!'
    }).show();
})

ipcMain.on("saveCode", (event,content,path) =>{
    fs.writeFileSync(`savedfiles/${path}`,content,'utf-8');
    console.log(`Saved ${path} file!`);
    new Notification({
        title: 'Saved',
        body: 'Your file have been successfully saved!'
    }).show();
})

ipcMain.on("saveAll", async (event, content) => {
    // const storageRef = ref(storage, `user-files/${userID}/data.json`);
    console.log(userID);
    if(!userID){
        var toJSON = JSON.stringify(content, null, 2);
        fs.writeFileSync('data.json', toJSON, 'utf-8');
        console.log('Saved data.json file!');
    }
    /*
    try{
        uploadBytes(storageRef, 'data.json').then((snapshot) => {
            console.log('Uploaded!')
        })
    } catch (error) {
        console.error('Error saving to Firebase', error);
    }
    */
    else{
        await setDoc(doc(db, "users", `${userID}`), {
            json_data: content
        });
    }
    new Notification({
        title: 'Saved',
        body: "Your file has been successfully saved!"
    }).show();
})

ipcMain.on("codeRun", () => {
    //if terminal already exist
    if(termWindow){
        //move top to show user
        termWindow.moveTop();
    }
    else{
        createTerminalWindow();
        termWindow.once('ready-to-show', () => {
            termWindow.show();
        })
    }
    // codeoutput();
})

ipcMain.on("termMinimize", () => {
    termWindow.minimize();
});

ipcMain.on("termMaximize", () => {
    termWindow.maximize();
});

ipcMain.on("termClose", () => {
    termWindow.close();
});

ipcMain.on("save_as_Py", (event, content) => {
    //The weird indenting here seems necessary
    const totalPyth =`
import sys
old_stdout = sys.stdout
log_file = open("message.txt","w")
sys.stdout = log_file
${content}
sys.stdout = old_stdout
log_file.close()
    `
    fs.writeFileSync('test.py', totalPyth);
    console.log('Saved test.py file!');
    new Notification({
        title: 'Saved',
        body: "Your file has been successfully saved!"
    }).show();
});

ipcMain.on("save_as_Js", (event, content) => {
    fs.writeFileSync("test.js", content)
    console.log('Saved test.js file!');
    new Notification({
        title: 'Saved',
        body: "Your file has been successfully saved!"
    }).show();
});

ipcMain.on("runPyth", (event) => {
    pyshell = new PythonShell("test.py");
    pyshell.on('message', function(message){
        console.log(message);
    })
});

ipcMain.on("runJs", (event) => {
    exec('node test.js > message.txt',
    function(error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
});
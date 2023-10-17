// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { getFirestore, doc, getDoc, setDoc } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

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

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

//Initialize Firebase Authentication and get a reference to the server
const auth = getAuth(firebase_app);

//Initialize Firestore
const db = getFirestore(firebase_app)

//Initialize Firebase Storage
const storage = getStorage(firebase_app);

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

module.exports = {
    signIn,
    signUp,
    mySignOut
};
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth, GoogleAuthProvider, signInWithPopup } = require("firebase/auth");
const { getFirestore, doc, getDoc, setDoc, signOut } = require("firebase/firestore");
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

//Sign in with Google
const signInWithGoogle = (onSignIn) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const uid = result.user.uid;

            //Check if user exists in db
            const userDoc = doc(db, "users", uid);
            const docSnap = await getDoc(userDoc);
            //If user doesn't exist
            if(!docSnap.exists()){
                await setDoc(doc(db, "users", uid), {});
            }
            if (onSignIn){
                onSignIn(uid);
            }
        })
        .catch((error) => {
            console.log("Error signing in", error);
        });
};

const signOutUser = async (onSignOut) => {
    try {
      await signOut(auth);
  
      // Call the onSignOut callback
      if (onSignOut) {
        onSignOut();
      }
    } catch (error) {
      console.log("Error signing out", error);
    }
}
module.exports = {
    signInWithGoogle,
    signOutUser
};

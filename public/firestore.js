// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, signOut } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOGTQ58qEHB3VLCPqQ_e61YxM4Ioqwb7Y",
    authDomain: "notebookapp-b3575.firebaseapp.com",
    projectId: "notebookapp-b3575",
    storageBucket: "notebookapp-b3575.appspot.com",
    messagingSenderId: "527397683665",
    appId: "1:527397683665:web:51e37d653006ac4b6ce0f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firebase Authentication and get a reference to the server
const auth = getAuth(app);

//Initialize Firestore
const db = getFirestore(app)

//Initialize Firebase Storage
const storage = getStorage(app);

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
            console.log(error);
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
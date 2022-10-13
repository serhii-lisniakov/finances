import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyDjfO_X3xKZFTY0EQn54mpVSYPr9oXF1AQ",
    authDomain: "finances-6d2e5.firebaseapp.com",
    projectId: "finances-6d2e5",
    storageBucket: "finances-6d2e5.appspot.com",
    messagingSenderId: "739636511063",
    appId: "1:739636511063:web:4defdeb64cee3d159bbe12"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

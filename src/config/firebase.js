// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , connectFirestoreEmulator } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8ROJ_J9G--npa51KRCV3uDT6YRWCbgAs",
  authDomain: "library-be0da.firebaseapp.com",
  projectId: "library-be0da",
  storageBucket: "library-be0da.appspot.com",
  messagingSenderId: "436696709558",
  appId: "1:436696709558:web:a3cd1c4abafead770d6917",
  measurementId: "G-3GY1QJTHN7"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCG7yJgeU_uCFsuLfRzo1-PN--x_FLEpyI",
//   authDomain: "reading-list-677ae.firebaseapp.com",
//   projectId: "reading-list-677ae",
//   storageBucket: "reading-list-677ae.appspot.com",
//   messagingSenderId: "375961447656",
//   appId: "1:375961447656:web:dd49fb9220a4410b5e2d5d",
//   measurementId: "G-1VNFNE1KE1"
// };

// Code for using local emulator
// export const db = getFirestore();
// connectFirestoreEmulator(db, '127.0.0.1', 8080);

// Code for using online FireStore
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// Code for authentication using Google accounts
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// const analytics = getAnalytics(app);
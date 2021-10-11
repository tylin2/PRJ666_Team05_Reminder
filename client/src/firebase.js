import firebase from "firebase";

// TO DO: Please put them in .env
const firebaseConfig = {
  apiKey: "AIzaSyBoLJ0XOfsILlCKw3_XoWwVEYy01__aBe8",
  authDomain: "reminder-34a82.firebaseapp.com",
  projectId: "reminder-34a82",
  storageBucket: "reminder-34a82.appspot.com",
  messagingSenderId: "525589612405",
  appId: "1:525589612405:web:fd34401357d1f612c4753c",
  measurementId: "G-ENDZVXV1EP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

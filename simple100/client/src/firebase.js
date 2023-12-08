import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD28TsB9U2VQ7XUVmZeFLKqgp9sOBJON5Y",
    authDomain: "simple-test-2f7c6.firebaseapp.com",
    projectId: "simple-test-2f7c6",
    storageBucket: "simple-test-2f7c6.appspot.com",
    messagingSenderId: "701890977223",
    appId: "1:701890977223:web:270d4d017dd77a07d00de2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
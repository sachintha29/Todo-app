

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "todo-app-sachintha.firebaseapp.com",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
});

const db = firebaseApp.firestore();


export default db;


    
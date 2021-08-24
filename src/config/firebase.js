import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCWGMieR9ciIs6MJG_-z5sgtuwQBSKk1pM",
    authDomain: "login-page-52229.firebaseapp.com",
    projectId: "login-page-52229",
    storageBucket: "login-page-52229.appspot.com",
    messagingSenderId: "999131672644",
    appId: "1:999131672644:web:cb060327e0110bc0cc8c11"
  };

 

  let firebaseApp = firebase.initializeApp(firebaseConfig);
  export let firebaseAuth = firebaseApp.auth();
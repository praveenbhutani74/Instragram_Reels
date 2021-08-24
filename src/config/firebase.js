import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBULm8WLaVosGvPekucr5RHnbWfsus3Slo",
    authDomain: "reels-794a4.firebaseapp.com",
    projectId: "reels-794a4",
    storageBucket: "reels-794a4.appspot.com",
    messagingSenderId: "80706255488",
    appId: "1:80706255488:web:ac07f8f354d9d912ed8465"
  };

 

  let firebaseApp = firebase.initializeApp(firebaseConfig);
  export let firebaseAuth = firebaseApp.auth();
  export let firebaseStorage=firebaseApp.storage();
  export let firebaseDb=firebaseApp.firestore();
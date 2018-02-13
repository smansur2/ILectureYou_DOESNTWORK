import * as Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCmQn0mxQ7pJl1KA3rUdFbevmna17ylRxg",
    authDomain: "livelecture-2dceb.firebaseapp.com",
    databaseURL: "https://livelecture-2dceb.firebaseio.com",
    projectId: "livelecture-2dceb",
    storageBucket: "livelecture-2dceb.appspot.com",
    messagingSenderId: "853634963553"
  };

  export const firebase = Firebase.initializeApp(config);
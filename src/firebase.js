import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyB0xhGSqSU9y1dMCOz2dCywtaWig78dWTw",
  authDomain: "hackathon-a1593.firebaseapp.com",
  databaseURL: "https://hackathon-a1593.firebaseio.com",
  projectId: "hackathon-a1593",
  storageBucket: "",
  messagingSenderId: "464358544397"
};

firebase.initializeApp(config);

export default firebase;

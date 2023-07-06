import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAvYb0a2hnjz1zec_C4RFn1FvgEWxVOaDY",
  authDomain: "sharpenerstore.firebaseapp.com",
  projectId: "sharpenerstore",
  storageBucket: "sharpenerstore.appspot.com",
  messagingSenderId: "659549301713",
  appId: "1:659549301713:web:2963dd281fef6cfe47cef0",
  measurementId: "G-BEJ41MK16Q",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;

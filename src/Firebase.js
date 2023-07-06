// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//   apiKey: "AIzaSyCWpP9EG0bQaMCGERHI-LkX3s3bZAUC34c",
//   authDomain: "woven-bonbon-382307.firebaseapp.com",
//   projectId: "woven-bonbon-382307",
//   storageBucket: "woven-bonbon-382307.appspot.com",
//   messagingSenderId: "909830975682",
//   appId: "1:909830975682:web:5febeebb99074e7a854b5b",
//   measurementId: "G-TFBNXLP30D",
// };
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import firebase from "firebase/compat/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCWpP9EG0bQaMCGERHI-LkX3s3bZAUC34c",
  authDomain: "woven-bonbon-382307.firebaseapp.com",
  projectId: "woven-bonbon-382307",
  storageBucket: "woven-bonbon-382307.appspot.com",
  messagingSenderId: "909830975682",
  appId: "1:909830975682:web:5febeebb99074e7a854b5b",
  measurementId: "G-TFBNXLP30D",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
export { auth };
export default firebase;

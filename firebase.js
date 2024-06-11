// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAfhy7BDJFpdPzsU8Vw2_Y26X5HFGD2Gu0",
  authDomain: "vamp-25f71.firebaseapp.com",
  projectId: "vamp-25f71",
  storageBucket: "vamp-25f71.appspot.com",
  messagingSenderId: "409417155015",
  appId: "1:409417155015:web:2929d71d2360280ebe59e2",
  measurementId: "G-E69Y661B6G"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  
  export default firebase;
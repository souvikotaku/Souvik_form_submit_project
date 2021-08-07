import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBEaehdZGOBZKn8au9iwQ6NbXbFhwYJavY",
  authDomain: "forms-projects-2732a.firebaseapp.com",
  databaseURL:
    "https://forms-projects-2732a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "forms-projects-2732a",
  storageBucket: "forms-projects-2732a.appspot.com",
  messagingSenderId: "1009753132483",
  appId: "1:1009753132483:web:a3cbbeb8ff051f54910176",
  measurementId: "G-L06QV2Q3PX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

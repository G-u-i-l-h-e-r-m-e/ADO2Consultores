// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const environment  = {
  firebase: {
  apiKey: "AIzaSyDf9R31X3f9LRXtEY-S8OnRVIVjXLYqpww",
  authDomain: "consultores-spa.firebaseapp.com",
  projectId: "consultores-spa",
  storageBucket: "consultores-spa.firebasestorage.app",
  messagingSenderId: "118667886394",
  appId: "1:118667886394:web:9ee8ed195bde4e63f8da03"
},
production: false
};

// Initialize Firebase
const app = initializeApp(environment.firebase);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSPKEz9n61RAtUItKJvsI9Tu7lIOVMpTI",
  authDomain: "innovators-hub-music-83ce0.firebaseapp.com",
  projectId: "innovators-hub-music-83ce0",
  storageBucket: "innovators-hub-music-83ce0.firebasestorage.app",
  messagingSenderId: "746511610286",
  appId: "1:746511610286:web:eeec9c603050847e2e183f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// own sdk will be given  by firebase google 
// import {getAuth} from 'firebase/getAuth'
import { getAuth } from 'firebase/auth';

import {getFirestore} from "firebase/firestore"
//  instead of app use firebaseApp in initializze

const firebaseApp=initializeApp(firebaseConfig)
export const __AUTH=getAuth(firebaseApp)
export const __DB=getFirestore(firebaseApp)

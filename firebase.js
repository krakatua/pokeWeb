// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {collection, getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAj3AL5JsA_Fn0YqvVokRxzzza0PhZkAN4",
    authDomain: "poke-accounts.firebaseapp.com",
    projectId: "poke-accounts",
    storageBucket: "poke-accounts.appspot.com",
    messagingSenderId: "554217316826",
    appId: "1:554217316826:web:eff9d69c4e2db24c9320e3",
    measurementId: "G-7MP9K8J0HP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
export const auth = getAuth(app)
export const firebaseDB = getFirestore(app);
export const pokemonListRef = collection(firebaseDB, "pokemonList");

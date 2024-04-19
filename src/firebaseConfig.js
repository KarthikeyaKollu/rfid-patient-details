// FirebaseConfig.js

import { initializeApp } from 'firebase/app';
import 'firebase/database'; // Import the database module

const firebaseConfig = {
  apiKey: "AIzaSyB0pD79eHl-pJCXVlqX1cmG05DQyoTJVC8",
  authDomain: "case-b4176.firebaseapp.com",
  databaseURL: "https://case-b4176-default-rtdb.firebaseio.com",
  projectId: "case-b4176",
  storageBucket: "case-b4176.appspot.com",
  messagingSenderId: "896456049498",
  appId: "1:896456049498:web:db3f0c16cb904db56aa963",
  measurementId: "G-DEH96T1JV6"
};

const app = initializeApp(firebaseConfig);

export default app;

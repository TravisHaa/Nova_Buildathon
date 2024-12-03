import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import secretapiKey from "/keys"

const firebaseConfig = {
    apiKey: secretapiKey,
    authDomain: "leteam-a9091.firebaseapp.com",
    databaseURL: "https://leteam-a9091-default-rtdb.firebaseio.com",
    projectId: "leteam-a9091",
    storageBucket: "leteam-a9091.firebasestorage.app",
    messagingSenderId: "568744918599",
    appId: "1:568744918599:web:f643d0fea43a60276dbb62",
    measurementId: "G-LR2KSTW1SZ"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  
  export { db };
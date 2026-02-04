import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmOgHaHkAz0KZ4Qg23iibUGZndI8RQmvg",
  authDomain: "readinglist-e9028.firebaseapp.com",
  projectId: "readinglist-e9028",
  storageBucket: "readinglist-e9028.firebasestorage.app",
  messagingSenderId: "734118096265",
  appId: "1:734118096265:web:0783f1a3263d60befb8558",
  databaseURL: "https://readinglist-e9028-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const booksRef = ref(db, '/books');

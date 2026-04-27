import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// Firebaseの接続情報
const firebaseConfig = {
  apiKey: "AIzaSyC7o9LjbtaYC1IrMWPoI9FXuyl1D6raS9g",
  authDomain: "record-to-job.firebaseapp.com",
  projectId: "record-to-job",
  storageBucket: "record-to-job.firebasestorage.app",
  messagingSenderId: "81126103926",
  appId: "1:81126103926:web:e5d21a2bbe629ebd423857",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

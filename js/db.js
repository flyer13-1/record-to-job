import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// データ送信
export const addRecord = async (collectionName, data) => {
  await addDoc(collection(db, collectionName), data);
};

// データ取得（全件）
export const getRecords = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

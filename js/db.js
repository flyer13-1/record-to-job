import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// データ送信
export const addRecord = async (collectionName, data) => {
  await addDoc(collection(db, collectionName), data);
};

// データ取得（全件）
export const getRecords = async (collectionName) => {
  const q = query(collection(db, collectionName), orderBy("date", "asc"));
  console.log(q);
  const snapshot = await getDocs(q);
  console.log(snapshot.docs.map((doc) => doc.data().date));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

//データを削除（１行ずつ）
export const deleteRecord = async (id) => {
  await deleteDoc(doc(db, "records", id));
};

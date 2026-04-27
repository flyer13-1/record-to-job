import { getRecordsByUid } from "./db.js";
import { auth } from "./firebase.js";

// 活動内容のマスタ
const DOING_OPTIONS = {
  1: "インターン",
  2: "インターン選考",
  3: "オープンカンパニー",
  4: "個別説明会",
  5: "合同説明会",
  6: "選考or受験",
  7: "内定",
  8: "内定後の集まり",
  9: "その他",
};

// 試験内容のマスタ
const TEST_OPTIONS = {
  1: "筆記試験",
  2: "面接試験",
  3: "グループワーク",
  4: "その他",
};

export const loadRecords = async () => {
  const records = await getRecordsByUid("records", auth.currentUser.uid);
  const tbody = document.getElementById("infoTableBody");
  tbody.innerHTML = "";

  records.forEach((record) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${record.date}</td>
      <td>${record.dayNum}</td>
      <td>${record.company}</td>
      <td>${record.place}</td>
      <td>${DOING_OPTIONS[record.doing]}</td>
      <td>${TEST_OPTIONS[record.test]}</td>
      <td>${record.doingOther}</td>
      <td>${record.testOther}</td>
    `;
    tbody.appendChild(tr);
  });
};

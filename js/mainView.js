import { getRecords, deleteRecord } from "./db.js";

const doArr = {
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

const testArr = {
  1: "筆記試験",
  2: "面接試験",
  3: "グループワーク",
  4: "その他",
};

export const loadRecords = async (uid) => {
  const recs = await getRecords("records", uid);
  // 活動日で昇順ソート
  recs.sort((a, b) => new Date(a.date) - new Date(b.date));

  const tbody = document.getElementById("infoTableBody");
  tbody.innerHTML = "";

  recs.forEach((rec) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${rec.date}</td>
    <td>${rec.dayNum}</td>
    <td>${rec.company}</td>
    <td>${rec.place}</td>
    <td>${doArr[rec.doing]}</td>
    <td>${rec.test ? testArr[rec.test] : "none"}</td>
    <td>${rec.doingOther ? rec.doingOther : "none"}</td>
    <td>${rec.testOther ? rec.testOther : "none"}</td>
    <td><button class="deleteBtn" data-id="${rec.id}">削除</button></td>
  `;
    tbody.appendChild(tr);
  });

  // 削除ボタンのイベント
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (window.confirm("本当に削除しますか？")) {
        await deleteRecord(btn.dataset.id);
        await loadRecords(uid); // 削除後に再読み込み
      }
    });
  });
};

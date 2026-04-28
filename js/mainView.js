import { getRecords, deleteRecord } from "./db.js";

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

const TEST_OPTIONS = {
  1: "筆記試験",
  2: "面接試験",
  3: "グループワーク",
  4: "その他",
};

export const loadRecords = async () => {
  const records = await getRecords("records");
  // 活動日で降順ソート
  records.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log("Loaded records:", records);

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
    <td>${record.test ? TEST_OPTIONS[record.test] : "none"}</td>
    <td>${record.doingOther ? record.doingOther : "none"}</td>
    <td>${record.testOther ? record.testOther : "none"}</td>
    <td><button class="deleteBtn" data-id="${record.id}">削除</button></td>
  `;
    tbody.appendChild(tr);
  });

  // 削除ボタンのイベント
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await deleteRecord(btn.dataset.id);
      console.log(`Record with ID ${btn.dataset.id} deleted`);
      await loadRecords(); // 削除後に再読み込み
    });
  });
};

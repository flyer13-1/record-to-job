import { getRecords } from "./db.js";

export const loadRecords = async () => {
  const records = await getRecords("records");
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

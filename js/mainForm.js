import { addRecord } from "./db.js";
import { auth } from "./firebase.js";

// 選択画面：その他の入力欄表示切替
function toggleOtherInput(selectElement, otherInputId, otherValue) {
  const otherInput = document.getElementById(otherInputId);
  if (!otherInput) return;
  const isOtherSelected = selectElement.value === otherValue;
  otherInput.style.display = isOtherSelected ? "block" : "none";
  otherInput.required = isOtherSelected;
  if (!isOtherSelected) {
    otherInput.value = "";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const doingSelect = document.getElementById("doing");
  const testSelect = document.getElementById("test");

  if (doingSelect) {
    doingSelect.addEventListener("change", () => {
      toggleOtherInput(doingSelect, "doingOther", "9");
    });
    toggleOtherInput(doingSelect, "doingOther", "9");
  }

  if (testSelect) {
    testSelect.addEventListener("change", () => {
      toggleOtherInput(testSelect, "testOther", "4");
    });
    toggleOtherInput(testSelect, "testOther", "4");
  }
});

// データ送信
document.getElementById("recordForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const doingSelect = document.getElementById("doing");
  const testSelect = document.getElementById("test");

  const doingOtherInput = document.getElementById("doingOther");
  const testOtherInput = document.getElementById("testOther");

  if (doingSelect.value === "9" && !doingOtherInput.value.trim()) {
    alert("活動内容が「その他」の場合、その他の活動内容を入力してください。");
    doingOtherInput.focus();
    return;
  } else if (testSelect.value === "4" && !testOtherInput.value.trim()) {
    alert("試験内容が「その他」の場合、その他の試験内容を入力してください。");
    testOtherInput.focus();
    return;
  }

  const data = {
    uid: auth.currentUser.uid,
    date: document.getElementById("date").value,
    dayNum: document.getElementById("dayNum").value,
    company: document.getElementById("company").value,
    place: document.getElementById("place").value,
    doing: doingSelect.value,
    doingOther:
      doingSelect.value === "9"
        ? document.getElementById("doingOther").value
        : "",
    test: testSelect.value,
    testOther:
      testSelect.value === "4"
        ? document.getElementById("testOther").value
        : "",
  };

  await addRecord("records", data);
  alert("登録しました！");
  e.target.reset();
});

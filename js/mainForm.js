import { addRecord } from "./db.js";
import { auth } from "./firebase.js";

//セレクターの宣言
const doSel = document.getElementById("doing");
const testSel = document.getElementById("test");

// その他の入力欄表示切替
function toggleOther(sel, otherId, otherVal) {
  const otherInp = document.getElementById(otherId);
  if (!otherInp) return;

  const isOtherSel = sel.value === otherVal;
  otherInp.style.display = isOtherSel ? "block" : "none";
  otherInp.required = isOtherSel;

  if (!isOtherSel) {
    otherInp.value = "";
  }
}

// ← 送信処理をmain.jsから呼び出す
export const initForm = (onSubmit) => {
  window.addEventListener("DOMContentLoaded", () => {
    if (doSel) {
      doSel.addEventListener("change", () => {
        toggleOther(doSel, "doingOther", "9");
        // testareaの切替
        const testArea = document.getElementById("testarea");
        if (testArea)
          testArea.style.display = doSel.value === "6" ? "block" : "none";
      });
      toggleOther(doSel, "doingOther", "9");
    }
    if (testSel) {
      testSel.addEventListener("change", () =>
        toggleOther(testSel, "testOther", "4"),
      );
      toggleOther(testSel, "testOther", "4");
    }
  });

  // データ送信
  document
    .getElementById("recordForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const doOth = document.getElementById("doingOther");
      const testOth = document.getElementById("testOther");

      if (doSel.value === "9" && !doOth.value.trim()) {
        alert("その他の活動内容を入力してください。");
        doOth.focus();
        return;
      }
      if (testSel.value === "4" && !testOth.value.trim()) {
        alert("その他の試験内容を入力してください。");
        testOth.focus();
        return;
      }

      const data = {
        uid: auth.currentUser.uid,
        date: document.getElementById("date").value,
        dayNum: document.getElementById("dayNum").value,
        company: document.getElementById("company").value,
        place: document.getElementById("place").value,
        doing: doSel.value,
        doingOther: doSel.value === "9" ? doOth.value : "",
        test: testSel.value,
        testOther: testSel.value === "4" ? testOth.value : "",
      };

      await addRecord("records", data);
      await onSubmit();

      document.getElementById("testarea").style.display = "none";
      alert("登録しました！");
      e.target.reset();
    });
};

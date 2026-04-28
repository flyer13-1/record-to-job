import { watchAuthState } from "./auth.js";
import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { loadRecords } from "./mainView.js";
import { initForm } from "./mainForm.js";

//フィールドの宣言
let init = false; // ← 重複呼び出し防止フラグ

watchAuthState(
  // 未ログイン時ログインページに飛ばす
  async (user) => {
    if (init) return; // ← 重複呼び出し防止
    init = true;

    // フォーム初期化（登録後にloadRecordsを呼ぶ）
    initForm(() => loadRecords());
    await loadRecords(); // ← 初回ロード
  },
  () => {
    window.location.href = "./index.html";
  },
);

// ログアウト
document.getElementById("logout").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "./index.html";
});

import { watchAuthState } from "./auth.js";
import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { loadRecords } from "./mainView.js";

// 未ログインならログインページに飛ばす
watchAuthState(
  async (user) => {
    const records = await loadRecords();
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

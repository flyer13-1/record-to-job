import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

export const watchAuthState = (loggedIn, loggedOut) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedIn(user);
    } else {
      loggedOut();
    }
  });
};

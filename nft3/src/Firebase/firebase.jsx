
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBKyK79KJ_p7Ie3qBKg4tVFRwWMEkPyBfs",
  authDomain: "nft123-85727.firebaseapp.com",
  projectId: "nft123-85727",
  storageBucket: "nft123-85727.appspot.com",
  messagingSenderId: "773383992832",
  appId: "1:773383992832:web:0ef9caa457c27e4a600ae5",
  measurementId: "G-2YYX7V92FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBs-XJisNS-IQO2eiTG8-r2g4xraukKE4M",
//   authDomain: "monkey-blogging-5c6ce.firebaseapp.com",
//   projectId: "monkey-blogging-5c6ce",
//   storageBucket: "monkey-blogging-5c6ce.appspot.com",
//   messagingSenderId: "30347826289",
//   appId: "1:30347826289:web:14b8b1adee356a879c37d0",
// };

// Import the functions you need from the SDKs you need

// const firebaseConfig = {
//   apiKey: "AIzaSyDGyKR3Q7MPQFNdY2wF7EreadZGtyvqTrc",
//   authDomain: "monkeyblog2.firebaseapp.com",
//   projectId: "monkeyblog2",
//   storageBucket: "monkeyblog2.appspot.com",
//   messagingSenderId: "885852709207",
//   appId: "1:885852709207:web:d11ecca366b6bcbbed1e12",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyAuCeMfxR9IoMWShy2ufd9xmuqIjrNu_lE",
//   authDomain: "monkeyblog3.firebaseapp.com",
//   projectId: "monkeyblog3",
//   storageBucket: "monkeyblog3.appspot.com",
//   messagingSenderId: "412814757359",
//   appId: "1:412814757359:web:81baf65608bba501257a1a",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBzZbz10GbOTqgGhvXZOQJrAkSSh810AC8",
  authDomain: "monkeybl4.firebaseapp.com",
  projectId: "monkeybl4",
  storageBucket: "monkeybl4.appspot.com",
  messagingSenderId: "696103871622",
  appId: "1:696103871622:web:3282dd14e7a6d05f449d07",
  measurementId: "G-5ZLCT6YXP2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

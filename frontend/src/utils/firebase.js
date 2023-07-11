import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvAgc-ZN83iMEr75j39WhqGwSksPjNp3I",
  authDomain: "fir-project-d0406.firebaseapp.com",
  projectId: "fir-project-d0406",
  storageBucket: "fir-project-d0406.appspot.com",
  messagingSenderId: "212669285320",
  appId: "1:212669285320:web:8779c434487663965076fd",
  measurementId: "G-XHPTP2CD66",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

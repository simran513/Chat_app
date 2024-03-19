import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getDatabase, ref, set } from "firebase/database";
// import path from 'path';
// import dotenv from "dotenv";
// dotenv.config({ path: path.join(__dirname, './.env') });
// const result = dotenv.config()
// dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyAWUcMTCOwp5hZKMUK0FzTdBmNl3M9BIMY",
  authDomain: "chat-demo-c245b.firebaseapp.com",
  projectId: "chat-demo-c245b",
  storageBucket: "chat-demo-c245b.appspot.com",
  messagingSenderId: "140428530831",
  appId: "1:140428530831:web:31456269c4509396648cfa",
  measurementId: "G-CHSN5EEE70"
};

const app = initializeApp(firebaseConfig);
// console.log(process.env.api_key)
// console.log(app);
// const analytics = getAnalytics(app);

// function writeUserData(userId, name, email) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId), {
//       username: name,
//       email: email,
//     });
//   }

//   writeUserData("10101",'Simran','kandhual')
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
// const colref = collection(db, 'Chats')
// getDocs(colref).then((snapshot) => {
//   let chats = []
//   snapshot.docs.forEach((doc) => {
//     chats.push({ ...doc.data(), id: doc.id })
//   })
//   console.log(chats)
// }).catch(err=>{
//   console.log(err.message)
// })

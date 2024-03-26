import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  setDoc,
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const[message,setMessge]=useState([])
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
        const docRef = doc(db, "chats", data.chatId);
const docSnap = await getDoc(docRef);
    const uuid =crypto.randomUUID()
    if (img) {
      const storageRef = ref(storage,uuid);
      // const storageRef = ref(storage, crypto.randomUUID());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        if(docSnap.data()===undefined)
            
            await setDoc(doc(db, "chats", data.chatId), {
              messages : arrayUnion({
                
                            id: uuid,
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL,
                      })
            })
              
            
            
            await updateDoc(doc(db, "chats", data.chatId), {
              messages : arrayUnion({
    // Issue is Over-writting instead of Appending !!
    /*
                Arrays of Pre-Data OLD Data
    */ 
                id: uuid,
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
          }),
            });
          });
        }
      );
    } else {
      // console.log('Data.chatId : ',data.chatId)
      if(docSnap.data()===undefined)
            await setDoc(doc(db, "chats", data.chatId), {
              messages:arrayUnion({
                id: uuid,
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
              })

            })
      await updateDoc(doc(db, "chats", data.chatId), {
        messages : arrayUnion({
          id: uuid,
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

    }







    await setDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await setDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        {/* <img src={Attach} alt="" /> */}
        {/* <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        /> */}
        {/* <label htmlFor="file">
          <img src={Img} alt="" />
        </label> */}
        <button onClick={()=>handleSend()}>Send</button>
      </div>
    </div>
  );
};








/*

Function:
  GetFunction 
 import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "chats", data.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}


*/
import React, { useState } from "react";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log("File available at", downloadURL);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate("/")
          });
        }
      );

    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Display name" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src="{add}" alt="" />
          <p>Add an avatar</p>
        </label>
        <button type="submit">Sign Up</button>
        {err && <span>Something went wrong</span>}
      </form>
      <p>Do you have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

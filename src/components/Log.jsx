import React, { useState } from "react";
import { auth, storage, db } from "../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Log() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>SignIn</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      {err && <span>Something went wrong</span>}
    </div>
  );
}

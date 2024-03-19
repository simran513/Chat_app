import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span>my-chat</span>
      <div>
        <img src={currentUser.photoURL} style={{height:"100px"}} alt="" srcset="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>LogOut</button>
      </div>
    </div>
  );
}

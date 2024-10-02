"use client"

import Canvas from "@/components/Canvas";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ResultDialog from "@/components/ResultDialog";

import { app } from "@/lib/firebase";
import { setUser } from "@/redux/store";
import { getAuth } from "firebase/auth";

import { useState , useRef ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Home() {


  const dispatch = useDispatch();
 
  const auth = getAuth(app);
  
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      const serializedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      };
      dispatch(setUser(serializedUser));
    } else {
      dispatch(setUser(null));
    }
  });

  
  return () => unsubscribe();
}, [auth ,dispatch]);  // Runs on component mount and if dispatch changes


  const canvasRef = useRef(null)
  
 
  return (
    <>
   
    <div className="flex flex-col items-center justify-center">
      
        <Navbar  canvasRef={canvasRef}/>
      <Canvas canvasRef={canvasRef} />
        <Footer  />
       

    </div>
    </>   
  );
}

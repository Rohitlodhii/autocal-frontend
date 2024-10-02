/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { app } from '@/lib/firebase';
import { setUser } from '@/redux/store';
import { getAuth } from 'firebase/auth';
import {React , useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {

//         const [curUser , setCurUser] = useState({});
    
//   const dispatch = useDispatch();
  
//   const auth = getAuth(app);
//   useEffect(()=> {

//     auth.onAuthStateChanged((user)=>{
//         setCurUser(user);
//     })
//   })


  return (
    <div className="h-[90vh] flex justify-center items-center gap-2 flex-col">
      <h1 className="bg-zinc-900 py-4 px-8 rounded-xl">Feature Coming Soon !</h1>
      <p>Stay Tuned till next update !</p>
      <p>You can try out our other apps on the Other App button above :-/</p>
    </div>
  )
}

export default page

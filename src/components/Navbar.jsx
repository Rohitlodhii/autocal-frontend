"use client"

import {useState} from 'react'

import { Card } from './ui/card'
import { Button } from './ui/button'
import Settings from './Buttons/Settings'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useToast } from '@/hooks/use-toast'
import { getFirestore, doc, addDoc, collection } from "firebase/firestore"; 
import { app } from '@/lib/firebase'
import { setResult } from '@/redux/store'


const Navbar = ({canvasRef}) => {

  const [isLoading , setIsLoading] = useState(false);

  
  const [answerData , setAnsData] = useState();

  const {toast} = useToast();

  const currentUser = useSelector((state)=>state.user.user);

  const dispatch = useDispatch();

  

  
  const dictOfVars = useSelector((state) => state.canvas.dictOfVars);

  const db = getFirestore(app);


  const HandleSubmit = async (canvasRef, dictOfVars , User) => {
    try {
      setIsLoading(true); // Start loading state
      const canvas = canvasRef.current;
  
      if (canvas) {
        // Export the image from the canvas
        const imageDataUrl = await canvas.exportImage('png');
        //Uploading to the Firebase for testing..
      //   if(User){
      //   await addDoc(collection(db, "CanvasData"), {
      //     userID: User.uid,    // Associate the blog with the user's ID
      //     title: "Saved",      // Blog title
      //     image: imageDataUrl,  // Blog content
      //     createdAt: new Date()  // Timestamp for when the blog was created
      //   });
      // }
  
        // Send the image and other data to the server
        const response = await axios({
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_API_URL}/calculate`,
          data: {
            image: imageDataUrl,
            dict_of_vars: dictOfVars,
          },
        });
  
        // Handle server response
        const resp = response.data;
        setAnsData(resp);
        console.log(resp);
      } else {
        console.error("Canvas element not found");
      }
    } catch (error) {
      // Catch and log any errors
      console.error("Error in HandleSubmit:", error);
      toast({
        variant: "destructive",
        title: "Arrey yarr! Something went wrong.",
        description: "Maybe the server's aren't Running !",
        
      })
    } finally {
      // Stop loading state in both success and error cases
      setIsLoading(false);
    }
  };
  
  



  return (
    <>
    <Card className="flex items-center justify-around md:gap-16 gap-2 fixed top-2  px-3 py-2 select-none">
    
      <div>
      <Settings/>
      </div>
      <div className="hidden md:flex"><h2>AutoCal</h2></div>
      <div>

      { isLoading ?

             <Button disabled>
         <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
            </Button>
      
       : 

        <Button  onClick={() => HandleSubmit(canvasRef, dictOfVars ,currentUser)} variant="outline">Generate Answer</Button>

      }


      </div>
    
    </Card>
      { answerData ?
      <Card className="flex items-center justify-around md:gap-16 gap-2 fixed top-20  px-3 py-2 select-none">
       {answerData?.data?.map((item, index) => (
        <div key={index}>
          <p>Expression: {item.expr}</p>
          <p>Result: {item.result}</p>
        </div>
      ))}

      </Card> : null
}


    </>
  )
}

export default Navbar

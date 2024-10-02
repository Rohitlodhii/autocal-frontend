/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import React from 'react'
import { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, getAuth, GithubAuthProvider } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';
import { FaGithub } from "react-icons/fa";


const page = () => {

    const [isLoading , setIsLoading] = useState(false);
    const [isLoadingGit , setIsLoadingGit] = useState(false);

    const {toast} = useToast();
    

    const currentUser = useSelector((state)=>state.user.user);

   
    const dispatch = useDispatch();

   
  


    


    const auth = getAuth(app)

    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }));
          router.push('/'); // Navigate to home on auth change
        }
      });
      return () => unsubscribe(); // Cleanup on unmount
    }, [auth, dispatch, router]);

    const signInWithGoogle = async () => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          dispatch(setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }))

          
          
          setIsLoading(false);
          toast({
            title: "Signed in successfully",
          description: "Redirecting to the Calculator ..",
          })

          router.push('/');
        } catch (error) {
          console.error('Error signing in', error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Signin Failed , Try Again !",
            
          })
          setIsLoading(false)
        }
      };

      const signInWithGitHub = async () => {
        setIsLoadingGit(true); // Start loading spinner
        const provider = new GithubAuthProvider(); // Use GitHub provider instead of Google
      
        try {
          const result = await signInWithPopup(auth, provider); // Sign in with GitHub popup
          const user = result.user; // Get the signed-in user information

          dispatch(setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }))
      
          // Dispatch user data to your Redux store
          dispatch(setUser(user));
      
          setIsLoadingGit(false); // Stop loading spinner
      
          // Show success toast
          toast({
            title: "Signed in successfully",
            description: "Redirecting to the Calculator ..",
          });
      
          // Redirect to homepage or another route
          router.push('/');
        } catch (error) {
          console.error('Error signing in', error);
      
          // Show error toast
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Signin Failed, Try Again!",
          });
      
          setIsLoadingGit(false); // Stop loading spinner in case of error
        }
      };
      
      


    if(currentUser){
      return (
        <div className="flex h-screen justify-center items-center">
            <Card className="w-72">
                <CardHeader>
                  <CardTitle>You are already Signed In ..</CardTitle>
                  <CardDescription>Redirecting you to the Calculator ..</CardDescription>
                </CardHeader>
            </Card>
        </div>
      )
    }

  return (
    <div className="flex justify-center items-center h-screen">
       <Card  className="w-72">
        <CardHeader>
          <CardTitle>Autocal</CardTitle>
          <CardDescription>Login to your autocal account</CardDescription>
        </CardHeader>

      <CardContent>

        <div className="flex flex-col gap-2 items-center justify-center">

        {isLoading ? 

         <Button className="w-full" disabled> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button>
       :
          <Button  onClick={signInWithGoogle} className="flex gap-2 items-center justify-center w-full"> <FcGoogle/><span> Login with Google</span> </Button> 
        }

{isLoadingGit ? 

<Button className="w-full" disabled> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button>
:
 <Button   onClick={signInWithGitHub} className="flex gap-2 items-center justify-center w-full"> <FaGithub/><span> Login with Github</span> </Button> 
}

  </div>
      </CardContent>

      <CardFooter>
        <CardDescription>You can logout anytime by logout button in settings menu !</CardDescription>
      </CardFooter>

       </Card>
    </div>
  )
}

export default page

"use client"

import React from 'react'
import { SelectDemo } from './BackGroundSelector'
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdHistory } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiSimplelogin } from "react-icons/si";
import { RiLockPasswordFill } from "react-icons/ri";




import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { clearUser } from '@/redux/store';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';




const Settings = () => {

  const {toast} = useToast();

  const dispatch = useDispatch();
   
  const auth = getAuth(app)

  const router = useRouter()

  const currentUser = useSelector((state)=>state.user.user);

  const handleSignOut = async() => {
    if(currentUser){
      try {
        await signOut(auth); // Firebase sign out
        dispatch(clearUser()); // Clear user from Redux state after logout
        console.log('User logged out successfully.');
        toast({
          description: "Successfully Logged Out !",
        })
      } catch (error) {
        console.error('Error during logout:', error);
        toast({
          description: "Logout Failed , Try Again!",
        })
      }
    };

    }

  
    const RedirectLogin =()=> {
      router.push('/login')
    }
  


  return (
    <div className="flex items-center justify-center gap-2">
       
        <div>
        <DropdownMenu>
  <DropdownMenuTrigger>
    <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
   <span className="md:flex hidden items-center justify-center">Settings </span> <IoSettingsOutline/>
   </div>
  </DropdownMenuTrigger>

  <DropdownMenuContent>

  

    <DropdownMenuLabel>
    { currentUser ? currentUser.displayName : "User Setting"}
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
    <DropdownMenuItem disabled={!currentUser}>Profile
        <DropdownMenuShortcut><CgProfile/></DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem disabled={!currentUser}>History
    <DropdownMenuShortcut><MdHistory/></DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleSignOut} disabled={!currentUser}>Logout
    <DropdownMenuShortcut><IoIosLogOut/></DropdownMenuShortcut>
    </DropdownMenuItem>
    </DropdownMenuGroup>

    <DropdownMenuSeparator/>

    <DropdownMenuLabel>
    

   Autocal
    
    
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
    <DropdownMenuItem>Github
        <DropdownMenuShortcut><FaGithub/></DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>Instagram
    <DropdownMenuShortcut><FaInstagram/></DropdownMenuShortcut>
    </DropdownMenuItem>
    </DropdownMenuGroup>

    

    <DropdownMenuItem ><SelectDemo/></DropdownMenuItem>

    <DropdownMenuSeparator/>

    <DropdownMenuGroup>
   
    <DropdownMenuItem onClick={RedirectLogin} disabled={currentUser}>Login
    <DropdownMenuShortcut><SiSimplelogin/></DropdownMenuShortcut>
    </DropdownMenuItem>
    
    </DropdownMenuGroup>



  </DropdownMenuContent>
</DropdownMenu>


        </div>
    
    </div>
  )
}

export default Settings

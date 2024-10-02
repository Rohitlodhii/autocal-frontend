import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { IoMenu } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const NavbarSetting = () => {

  const router =useRouter()
  return (
    <DropdownMenu>
  <DropdownMenuTrigger>
  <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
   Other Apps<IoMenu/>
   </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Apps</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>{router.push('/')}} >Draw Calc</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>{router.push('/currency')}}>Currency Converter</DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default NavbarSetting

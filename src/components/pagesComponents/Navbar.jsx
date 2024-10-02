import React from 'react'
import NavbarSetting from './NavbarSetting'
import { usePathname } from 'next/navigation'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../ui/menubar';
import { Card } from '../ui/card';

const Navbar = () => {

    const pathname = usePathname();

  return (
    <Card className="py-2 md:w-[90%] rounded-none md:rounded-xl mx-auto md:mt-4 flex items-center justify-around gap-2">


                <div >AutoCal</div>
                <div><NavbarSetting/></div>
                

       
    </Card>
  )
}

export default Navbar

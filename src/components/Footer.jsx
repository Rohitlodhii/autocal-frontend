import React from 'react'
import PenPopOver from './Buttons/PenPopOver'
import EraserPopOver from './Buttons/EraserPopOver'
import { Button } from './ui/button'
import UndoRedo from './Buttons/UndoRedo'
import ClearCanvas from './Buttons/ClearCanvas'
import { Card } from './ui/card'



const Footer = () => {

 

  return (
    <Card className="flex items-center justify-around h-11 gap-2 px-2 py-6 fixed bottom-5  md:bottom-1 ">
    
      <div className="flex items-center justify-center gap-2"><PenPopOver />
      <EraserPopOver/></div>
      <div><ClearCanvas/></div>
      
      <div> 
        <UndoRedo/>
        </div>
   
    </Card>
  )
}

export default Footer

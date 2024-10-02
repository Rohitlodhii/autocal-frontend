import React from 'react'
import { FaUndo , FaRedo  } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { changeRedo, changeUndo } from '@/redux/store';

const UndoRedo = () => {
    const dispatch = useDispatch()

    const handleUndo = () => {
        dispatch(changeUndo())
    }
    const handleRedo = () => {
        dispatch(changeRedo())
    }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button onClick={handleUndo} variant="outline" size="icon">
          <FaUndo />
        </Button>
      <Button onClick={handleRedo} variant="outline" size="icon">
          <FaRedo />
        </Button>
    </div>
  )
}

export default UndoRedo

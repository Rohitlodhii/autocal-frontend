import React from 'react'
import { Button } from '../ui/button'
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { clearCanvas } from '@/redux/store';

const ClearCanvas = () => {


    const dispatch = useDispatch();

    const handleClearCanvas = () => {
        dispatch(clearCanvas());
    }

  return (
    <div>
        <Button onClick={handleClearCanvas} variant="outline" size="icon">
          <MdDeleteForever />
        </Button>
    </div>
  )
}

export default ClearCanvas

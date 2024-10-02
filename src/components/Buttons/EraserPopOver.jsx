"useClient"

import {useState} from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { BsEraserFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { changeEraserMode, changeEraserWidth } from '@/redux/store';
import { Slider } from '../ui/slider';

const EraserPopOver = () => {
  const [curWidth , setWidth] = useState(4);

  const EraserMode = useSelector((state)=>state.eraser.eraserMode);

    const dispatch = useDispatch();

    const handlerEraserMode = () => {
       if(!EraserMode) {
        dispatch(changeEraserMode())
       }
    }

    const handleWidthChange = (value) => {
      setWidth(value); // Update local state
      dispatch(changeEraserWidth(value)); // Dispatch the width change to Redux
    };
  
  

  return (
    <Popover>
        <PopoverTrigger asChild>
        <Button onClick={handlerEraserMode} variant={ EraserMode ? "secondary" : "outline"} size="icon">
          <BsEraserFill />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 bg-zinc-800">
        <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <h2>Eraser Size</h2>
          <Slider
              onValueChange={handleWidthChange} // Use `onValueChange` for Slider value
              defaultValue={[curWidth]}
              max={20}
              min={1}
              step={1}
            />
            <h2> Size : {curWidth}</h2>
          </div>

         

        </div>
      </PopoverContent>
    </Popover>
  )
}

export default EraserPopOver

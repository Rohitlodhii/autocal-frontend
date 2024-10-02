"use client"
import { FaPen } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { colorOptions } from "@/constants/ColorOptions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor, changeEraserMode, changeWidth } from "@/redux/store";
import { Slider } from "../ui/slider";

const PenPopOver = () => {
  const [curWidth , setWidth] = useState(3);

  const dispatch = useDispatch();
  const currentColor = useSelector((state)=>state.pen.color);
  const EraserMode = useSelector((state)=>state.eraser.eraserMode);

  const handleEraserMode = () => {
    if(EraserMode){
      dispatch(changeEraserMode())
    }
  }

  const handleColorChange = (color) => {
    dispatch(changeColor(color))

  }

  const handleWidthChange = (value) => {
    setWidth(value); // Update local state
    dispatch(changeWidth(value)); // Dispatch the width change to Redux
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-lg" onClick={handleEraserMode} variant={ !EraserMode ? "secondary" : "outline"} size="icon">
          <FaPen />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 bg-zinc-900">
        <div className="flex flex-col gap-4  ">
          <h2 className="font-bold leading-none ">Pen</h2>



          <div className="grid grid-cols-4 gap-2 p-2">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`h-7 w-7 rounded-full cursor-pointer ${
                 currentColor === color
                    ? "ring-2 ring-offset-2 ring-gray-500"
                    : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              ></div>
            ))}
          </div>



          <div className="flex flex-col gap-2">
            <h2>Pen Size</h2>
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
  );
};

export default PenPopOver;

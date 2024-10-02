import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch } from "react-redux";
import { changeBg } from "@/redux/store";

const colorcode = [
    { name: "Black", colorCode: "#000000" },
    { name: "White", colorCode: "#FFFFFF" },
    { name: "Sky", colorCode: "#87CEEB" },
    { name: "Green", colorCode: "#008000" },
    { name: "Blue", colorCode: "#0000FF" }
  ];
  

export function SelectDemo() {

    const dispatch = useDispatch();

    const handleBgChange = (e) => {
       
        dispatch(changeBg(e));
    }

  return (
    <Select onValueChange={handleBgChange} >
      <SelectTrigger className="w-[180px] bg-zinc-900">
        <SelectValue placeholder="Background Color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          
          {colorcode.map((item, index) => (
                  <SelectItem key={index} value={item.colorCode}>
                  {item.name}
                  </SelectItem>
                    ))}

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

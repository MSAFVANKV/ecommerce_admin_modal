"use client";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface Color {
  value: string;
  label: string;
  id?: string;
}

interface Props {
  onSaveColor: (color: Color) => void;
  colorOptions: { code: string; name: string }[];
  setShowColor: (val: boolean) => void;
}

const ColorPicker: React.FC<Props> = ({ onSaveColor, setShowColor }) => {
  const [color, setColor] = useState("#aabbcc");
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [error, setError] = useState("");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setColorCode(newColor);
  };

  const handleSaveColor = () => {
    if (!colorName.trim()) {
      setError("Please enter a color name.");
      return;
    }

    const newColor: Color = {
      value: color,
      label: colorName,
    };

    // Call the parent component's onSaveColor with the new color
    onSaveColor(newColor);

    // Reset the input fields
    setColor("#aabbcc");
    setColorName("");
    setError("");
  };

  // const handleSaveColor = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!colorName.trim()) {
  //     setError("Please enter a color name.");
  //     return;
  //   }
  //   if (!isValidColorCode(colorCode)) {
  //     setError("Please enter a valid color code.");
  //     return;
  //   }

  //   const newColor: Color = {
  //     value: colorCode,
  //     label: colorName,
  //     id: "", // This will be filled by the backend response
  //   };

  //   try {
  //     // Send the color data to the backend
  //     const response = await axios.post(`/product/addColor`, {
  //       colorName: newColor.label,
  //       colorCode: newColor.value,
  //     },{withCredentials:true});

  //     if (response.data.success) {
  //       onSaveColor({
  //         ...newColor,
  //         id: response.data.color._id,
  //       });
  //       setColor("#aabbcc"); // Reset color picker to default color
  //       setColorName(""); // Reset color name input
  //       setColorCode(""); // Reset color code input
  //       setError(""); // Clear any previous errors
  //     } else {
  //       setError("Failed to save color.");
  //     }
  //   } catch (error) {
  //     console.error("There was an error saving the color:");
  //     setError("An error occurred while saving the color.");
  //   }
  // };

  // const isValidColorCode = (code: string) => {
  //   return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(code);
  // };

  return (
    <div className="bg-slate-100 relative shadow-xl border p-2 rounded-xl flex flex-col items-center max-w-[200px] mx-auto">
      <span
      onClick={() => setShowColor(false)}
        className="h-5 w-5 rounded-full bg-black m-auto 
     flex justify-center items-center text-white absolute cursor-pointer top-0 z-50 -right-4"
      >
        X
      </span>

      <HexColorPicker
        color={color}
        onChange={handleColorChange}
        style={{ width: "calc(200px - 1rem)", height: "calc(200px - 1rem)" }}
      />
      <div className="flex mt-2 w-full">
        <input
          type="text"
          name="colorName"
          className="w-full bg-white text-[#8b8888] p-3 rounded-xl mt-2"
          placeholder="Enter Colour Name"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
        />
      </div>
      <div className="flex mt-2 gap-3">
        <input
          type="text"
          name="colorCode"
          className="w-1/2 bg-gray-50 text-[#8b8888] p-3 rounded-xl"
          placeholder="# Code"
          value={colorCode}
          readOnly
          onChange={(e) => setColorCode(e.target.value)}
        />
        <button
          className="bg-bg w-1/2 rounded-xl text-white font-bold hover:bg-[#e76814] duration-300 transition-all active:scale-95"
          type="submit"
          onClick={handleSaveColor}
        >
          Save
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ColorPicker;

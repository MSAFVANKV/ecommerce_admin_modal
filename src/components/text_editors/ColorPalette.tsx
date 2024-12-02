import React from 'react';

const colors = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF'
];

type Props = {
  onSelectColor: (color: string) => void;
};

const ColorPalette = ({ onSelectColor }: Props) => {
  return (
    <div className="flex">
      {colors.map(color => (
        <button
          key={color}
          type='button'
          onClick={() => onSelectColor(color)}
          style={{ backgroundColor: color }}
          className="w-6 h-6 m-1 border border-gray-300"
        />
      ))}
    </div>
  );
};

export default ColorPalette;

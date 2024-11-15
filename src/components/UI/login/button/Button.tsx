


import React from 'react';

export interface ButtonProps {
  text: string;
  onClick?: () => void; // Optional onClick handler
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#C473FF] text-white py-2 px-4 rounded mt-4"
    >
      {text}
    </button>
  );
};

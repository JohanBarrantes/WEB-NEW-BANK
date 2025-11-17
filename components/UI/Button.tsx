// components/UI/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full bg-blue-600 text-white py-2 rounded-lg 
        hover:bg-blue-700 transition 
        ${props.className ?? ""}
      `}
    >
      {children}
    </button>
  );
}

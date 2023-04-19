import { FC, InputHTMLAttributes } from "react";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="h-16 text-xl rounded-2xl text-black font-semibold px-4 focus:outline-none  w-full"
      {...props}
    />
  );
};

import { FC, InputHTMLAttributes } from "react";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="h-16 text-md sm:text-lg md:text-xl border-2 border-black rounded-2xl text-black font-semibold px-4 focus:outline-none  w-full"
      {...props}
    />
  );
};

export const TextArea: FC<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = (props) => {
  return (
    <textarea
      className="h-16 text-md sm:text-lg md:text-xl rounded-2xl text-black font-semibold px-4 focus:outline-none  w-full"
      {...props}
    />
  );
};

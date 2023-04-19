import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ButtonSubmit: FC<Props> = (props) => {
  const { label } = props;
  return (
    <button
      className="bg-@028090 py-3 my-10 px-14 inline-flex justify-center items-center rounded-2xl text-xl text-white font-semibold "
      {...props}
    >
      {label}
    </button>
  );
};

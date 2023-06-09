import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ButtonSubmit: FC<Props> = (props) => {
  const { label } = props;
  return (
    <button
      className="bg-@028090 hover:bg-orange-500 hover:-translate-y-1 duration-300 py-3 px-14 inline-flex justify-center items-center rounded-2xl text-xl text-white font-semibold "
      {...props}
    >
      {label}
    </button>
  );
};

interface PropsAction extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ButtonAction: FC<Partial<PropsAction>> = (props) => {
  const { label, onClick } = props;
  return (
    <button
      className={`bg-@028090 hover:bg-orange-500 hover:-translate-y-1 duration-300 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold `}
      {...props}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const ButtonCancelOrDelete: FC<Partial<PropsAction>> = (props) => {
  const { label, onClick } = props;
  return (
    <button
      className={`bg-red-600 hover:bg-blue-500 hover:-translate-y-1 duration-300 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold `}
      {...props}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const ButtonCheckout: FC<Partial<PropsAction>> = (props) => {
  const { label, onClick } = props;
  return (
    <button
      className={`bg-orange-500 hover:bg-@028090 hover:-translate-y-1 duration-300 py-3 px-5 md:px-10 inline-flex justify-center items-center rounded-2xl lg:text-md xl:text-lg  text-white font-semibold `}
      {...props}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

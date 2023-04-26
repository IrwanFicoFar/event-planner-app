import { FC, ReactNode } from "react";
import { Disclosure } from "@headlessui/react";
import { BiTime, BiMap, BiMicrophone } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ButtonAction, ButtonCheckout } from "./Button";

interface Props {
  date: ReactNode;
  time: ReactNode;
}

export const Card: FC<Partial<Props>> = (props) => {
  const { date, time } = props;

  return (
    <div className="bg-black p-5 rounded-3xl hover:scale-105 hover:-translate-y-1 transition ease-in-out delay-150 drop-shadow-md hover:drop-shadow-xl  duration-300">
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="text-white">{"13 APR"}</h1>
        </div>
        <div>
          <h1 className="text-white">{"17:17 WIB"}</h1>
        </div>
      </div>
      <div className="mb-5">
        <Link to={`detail-event/:id`}>
          <img src="/header3.jpg" alt="image-card" className="rounded-3xl" />
        </Link>
      </div>
      <Link to={"detail-event/:id"}>
        <div className="bg-gray-800 p-5 mb-5 flex flex-col gap-4 rounded-3xl">
          <h1 className="text-xl font-semibold">{"Title Conference"}</h1>
          <div className="flex flex-col gap-2">
            <div className="flex space-x-2 items-center">
              <BiTime className="text-orange-500 text-xl" />
              <div>
                <h1>{"2023-04-13 17:17:02"}</h1>
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <BiMap className="text-orange-500 text-xl" />
              <h1>{"Senayan"}</h1>
            </div>
            <div className="flex space-x-2 items-center">
              <BiMicrophone className="text-orange-500 text-xl" />
              <h1>{"IndoxPloit"}</h1>
            </div>
          </div>
        </div>
      </Link>
      <div>participants = {"10"}</div>
    </div>
  );
};

interface DataAttandance {
  image: string;
  name: string;
}

export const CardAttandance: FC<Partial<DataAttandance>> = (props) => {
  const { image, name } = props;
  return (
    <div className="bg-white rounded-2xl">
      <div className=" flex justify-center items-center pt-5 px-3">
        <Link to={`detail-event/:id`}>
          <img
            src={image}
            alt="image-card"
            className="rounded-full border-2 drop-shadow-lg border-black w-28"
          />
        </Link>
      </div>
      <div className=" flex justify-center items-center py-5">
        <h1 className="text-black font-semibold text:xl md:text-2xl">{name}</h1>
      </div>
    </div>
  );
};

interface DataComment {
  image: string;
  name: string;
  comment: string;
}

export const CardComment: FC<Partial<DataComment>> = (props) => {
  const { image, name, comment } = props;
  return (
    <div className="flex">
      <div className="bg-white rounded-2xl py-2 w-24 px-3">
        <div className=" flex justify-center items-center pt-2">
          <Link to={`detail-event/:id`}>
            <img
              src={image}
              alt="image-card"
              className="rounded-full border-2 drop-shadow-lg border-black w-16"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-black font-semibold text:xl md:text-2xl ">
            {name}
          </h1>
        </div>
      </div>
      <div className="p-5 space-x-5">
        <h1>{comment}</h1>
      </div>
    </div>
  );
};

interface DataTicket {
  ticket: string;
  price: string;
  onClick: React.MouseEventHandler<Element>;
}

export const CardTicket: FC<Partial<DataTicket>> = (props) => {
  const { ticket, price, onClick } = props;
  return (
    <div className="rounded-2xl">
      <div className="bg-white rounded-2xl">
        <div className="bg-black rounded-b-2xl border-b-4 border-white py-4 flex justify-center drop-shadow-lg">
          <h1 className="text-xl font-semibold">{ticket}</h1>
        </div>
        <div className="flex justify-center py-8">
          <h1 className="text-orange-500 lg:text-md xl:text-xl font-semibold">
            {price}
          </h1>
        </div>
      </div>
      <div className="py-5 flex justify-center">
        <ButtonCheckout label="Add to Cart" onClick={onClick} />
      </div>
    </div>
  );
};

interface DataCheckout {
  ticket: string;
  price: string;
}

export const CardCart: FC<Partial<DataCheckout>> = (props) => {
  const { ticket, price } = props;
  return (
    <div className="flex justify-between bg-white text-black sm:text-xl font-semibold px-5 pt-5 pb-10 rounded-3xl">
      <div>
        <h1>{ticket}</h1>
      </div>
      <div>
        <h1>{price}</h1>
      </div>
    </div>
  );
};

interface Payment {
  id: string;
  image: string;
  payment: string;
}

export const PaymentMethode: FC<Partial<Payment>> = (props) => {
  const { image, payment, id } = props;
  return (
    <div
      className=" rounded-3xl border-black px-5 py-1 my-2 flex items-center justify-between"
      id={id}
    >
      <div className="flex justify-between items-center">
        <img src={image} alt="payment image" className="h-5 sm:h-12 w-auto" />
        <h1>{payment}</h1>
      </div>
    </div>
  );
};

interface DataCard {
  onClick: React.MouseEventHandler<Element>;
}

export const CardEdit: FC<Partial<DataCard>> = (props) => {
  const { onClick } = props;

  return (
    <div className="bg-black p-5 rounded-3xl hover:scale-105 hover:-translate-y-1 transition ease-in-out delay-150 drop-shadow-md hover:drop-shadow-xl  duration-300">
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="text-white">{"13 APR"}</h1>
        </div>
        <div>
          <h1 className="text-white">{"17:17 WIB"}</h1>
        </div>
      </div>
      <div className="mb-5">
        <Link to={`detail-event/:id`}>
          <img src="/header3.jpg" alt="image-card" className="rounded-3xl" />
        </Link>
      </div>
      <Link to={"detail-event/:id"}>
        <div className="bg-gray-800 p-5 mb-5 flex flex-col gap-4 rounded-3xl">
          <h1 className="text-xl font-semibold">{"Title Conference"}</h1>
          <div className="flex flex-col gap-2">
            <div className="flex space-x-2 items-center">
              <BiTime className="text-orange-500 text-xl" />
              <div>
                <h1>{"2023-04-13 17:17:02"}</h1>
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <BiMap className="text-orange-500 text-xl" />
              <h1>{"Senayan"}</h1>
            </div>
            <div className="flex space-x-2 items-center">
              <BiMicrophone className="text-orange-500 text-xl" />
              <h1>{"IndoxPloit"}</h1>
            </div>
          </div>
        </div>
      </Link>
      <div>participants = {"10"}</div>
      <div className="py-5 flex flex-col justify-center ">
        <ButtonAction label="Edit" onClick={onClick} />
      </div>
    </div>
  );
};

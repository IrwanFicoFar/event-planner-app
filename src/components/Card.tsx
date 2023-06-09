import { BiTime, BiMap, BiMicrophone, BiTimer } from "react-icons/bi";
import { ButtonAction, ButtonCheckout } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { FC, ReactNode } from "react";

interface Props {
  image: string;
  name: string;
  dateHeader: string;
  date: string;
  time: string;
  location: string;
  hosted_by: string;
  participants: string;
  id: number;
  goTo: string;
  dateEnd: string;
  timeEnd: string;
  quota: number;
}

export const Card: FC<Partial<Props>> = (props) => {
  const {
    date,
    time,
    id,
    dateHeader,
    location,
    hosted_by,
    participants,
    name,
    dateEnd,
    timeEnd,
    image,
    quota,
  } = props;

  return (
    <div className="flex flex-col justify-between bg-black p-5 rounded-3xl hover:scale-105 hover:-translate-y-1 drop-shadow-md hover:drop-shadow-xl  duration-700">
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="text-white">{dateHeader}</h1>
        </div>
        <div>
          <h1 className="text-white">{time} WIB</h1>
        </div>
      </div>
      <div className="mb-5">
        <Link to={`event/${id}`}>
          <img src={image} alt="image-card" className="rounded-3xl w-full" />
        </Link>
      </div>
      <Link to={`/event/${id}`}>
        <div className="bg-gray-800 p-5 mb-5 flex flex-col gap-4 rounded-3xl">
          <h1 className="text-xl font-semibold">{name}</h1>
          <div className="flex flex-col gap-2">
            <div className="flex space-x-2 items-center">
              <BiTime className="text-orange-500 text-xl" />
              <div>
                <h1>
                  {date} {time} WIB
                </h1>
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <BiTimer className="text-orange-500 text-xl" />
              <div>
                <h1>
                  {dateEnd} {timeEnd} WIB
                </h1>
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <BiMap className="text-orange-500 text-xl" />
              <h1>{location}</h1>
            </div>
            <div className="flex space-x-2 items-center">
              <BiMicrophone className="text-orange-500 text-xl" />
              <h1>{hosted_by}</h1>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex gap-4 flex-col mid-lg:flex-row  mid-lg:justify-between">
        <h1>
          Attand = <span className="text-orange-500">{participants} </span>{" "}
        </h1>
        <h1>
          Avail = <span className="text-orange-500">{quota}</span>
        </h1>
      </div>
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
    <div className="bg-white rounded-2xl h-40 w-32">
      <div className=" flex justify-center items-center pt-5 px-3 ">
        <img
          src={image}
          alt="image-card"
          className="rounded-full border-2 drop-shadow-lg border-black h-24 w-24 "
        />
      </div>
      <div className=" flex justify-center items-center py-2">
        <h1 className="text-black font-semibold text:xl md:text-xl">{name}</h1>
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
          <img
            src={image}
            alt="image-card"
            className="rounded-full border-2 drop-shadow-lg border-black w-16 h-16"
          />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-black font-semibold text:xl md:text-xl ">
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
  price: number;
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
            Rp {price?.toLocaleString("id-ID")}
            {/* Rp {price} */}
          </h1>
        </div>
      </div>
      <div className="py-5 flex justify-center">
        <ButtonCheckout label="Add" onClick={onClick} />
      </div>
    </div>
  );
};

interface DataCheckout {
  Event: string;
  Ticket: string;
  Price: number;
  Qty: number;
  SubTotal: number;
}

export const CardCart: FC<Partial<DataCheckout>> = (props) => {
  const { Event, Price, Qty, SubTotal } = props;
  return (
    <div className="grid grid-cols-4 bg-white dark:bg-gray-500 my-3 text-black dark:text-white items-center sm:text-xl font-semibold px-5 py-5 rounded-3xl">
      <div className="flex justify-center">
        <h1>{Event}</h1>
      </div>
      <div className="flex justify-center">
        <h1>Rp {Price?.toLocaleString("id-ID")}</h1>
      </div>
      <div className="flex justify-center">
        <h1>{Qty}</h1>
      </div>
      <div className="flex justify-center">
        <h1>Rp {SubTotal?.toLocaleString("id-ID")}</h1>
      </div>
    </div>
  );
};

export const CardSummary: FC<Partial<DataCheckout>> = (props) => {
  const { Event, Ticket, Price, Qty, SubTotal } = props;
  return (
    <div className="grid grid-cols-4 text-black sm:text-xl font-semibold px-5 mt-3 py-2 border-b-4 border-gray-800 rounded-b-3xl">
      <div className="flex justify-center">
        <h1>{Event}</h1>
      </div>
      <div className="flex justify-center">
        <h1>Rp {Price?.toLocaleString("id-ID")}</h1>
      </div>
      <div className="flex justify-center">
        <h1>{Qty}</h1>
      </div>
      <div className="flex justify-center">
        <h1>Rp {SubTotal?.toLocaleString("id-ID")}</h1>
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
  image: string;
  name: string;
  dateHeader: string;
  date: string;
  time: string;
  location: string;
  hosted_by: string;
  participants: string;
  id: number;
  goTo: string;
  dateEnd: string;
  timeEnd: string;
  quota: number;
}

export const CardEdit: FC<Partial<DataCard>> = (props) => {
  const navigate = useNavigate();
  const {
    onClick,
    image,
    name,
    dateHeader,
    date,
    time,
    location,
    hosted_by,
    participants,
    goTo,
    dateEnd,
    timeEnd,
    quota,
  } = props;

  return (
    <div className="flex flex-col justify-between bg-black p-5 rounded-3xl hover:scale-105 hover:-translate-y-1 transition ease-in-out delay-150 drop-shadow-md hover:drop-shadow-xl  duration-300">
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="text-white">{dateHeader}</h1>
        </div>
        <div>
          <h1 className="text-white">{time} WIB</h1>
        </div>
      </div>
      <div className="mb-5">
        <img src={image} alt="image-card" className="rounded-3xl" />
      </div>
      <div className="bg-gray-800 p-5 mb-5 flex flex-col gap-4 rounded-3xl">
        <h1 className="text-xl font-semibold">{name}</h1>
        <div className="flex flex-col gap-2">
          <div className="flex space-x-2 items-center">
            <BiTime className="text-orange-500 text-xl" />
            <div>
              <h1>
                {date} {time} WIB
              </h1>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <BiTimer className="text-orange-500 text-xl" />
            <div>
              <h1>
                {dateEnd} {timeEnd} WIB
              </h1>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <BiMap className="text-orange-500 text-xl" />
            <h1>{location}</h1>
          </div>
          <div className="flex space-x-2 items-center">
            <BiMicrophone className="text-orange-500 text-xl" />
            <h1>{hosted_by}</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <h1>
          participants ={" "}
          <span className="text-orange-500">{participants} </span>{" "}
        </h1>
        <h1>
          Avail = <span className="text-orange-500">{quota}</span>
        </h1>
      </div>

      <div className="py-5 flex flex-col justify-center ">
        <ButtonAction label="Edit" onClick={() => navigate(`${goTo}`)} />
      </div>
    </div>
  );
};

interface DataModalTicket {
  type: string;
  name: string;
  date: string;
  time: string;
  location: string;
  hosted_by: string;
}

export const CardModalTicket: FC<DataModalTicket> = (props) => {
  const { type, name, date, time, location, hosted_by } = props;
  return (
    <div className={`rounded-2xl bg-teal-500 p-4 flex border-2 my-5`}>
      <div className=" rounded-2xl items-center text-black text-3xl font-semibold mr-2 flex justify-center">
        <h1 className="-rotate-90 flex">{type}</h1>
      </div>
      <div className="bg-white w-[100%] border-2  rounded-2xl text-black p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">{name}</h1>
          <div className="font-semibold flex space-x-2">
            <BiTime className="text-orange-500 text-xl" />
            <div>
              {date} at {time}
            </div>
          </div>
          <div className="font-semibold flex space-x-2">
            <BiMap className="text-orange-500 text-xl" />
            <div>{location}</div>
          </div>
        </div>
        <div>
          <p className="font-semibold">Hosted By: {hosted_by}</p>
        </div>
      </div>
    </div>
  );
};

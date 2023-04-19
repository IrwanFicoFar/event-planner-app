import { FC, ReactNode } from "react";
import { Disclosure } from "@headlessui/react";
import { BiTime, BiMap, BiMicrophone } from "react-icons/bi";
import { Link } from "react-router-dom";

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
                <h1>{"2023-04-13 17:17:02"} to</h1>
                <h1>{"2023-04-13 18:17:02"}</h1>
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

import { FC } from "react";
import { Layout } from "../components/Layout";
import { CardEdit } from "../components/Card";
import { Card } from "../components/Card";

const Event: FC = () => {
  const handleEditEvent = () => {
    alert("handle edit");
  };

  return (
    <Layout>
      <div className="h-full">
        <div className="bg-black py-10 flex justify-center">
          <div className=" absolute w-[50%] bg-white top-42  py-6 rounded-full drop-shadow-lg flex justify-center hover:scale-105 duration-300">
            <h1 className="text-black text-2xl font-semibold">My Event</h1>
          </div>
        </div>
        <div className="bg-white w-full pt-32 px-16 sm:px-10 md:px-20 mid-lg:px-32 lg:px-40 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 pb-20">
          <CardEdit onClick={() => handleEditEvent()} />
          <CardEdit onClick={() => handleEditEvent()} />
          <CardEdit onClick={() => handleEditEvent()} />
          <CardEdit onClick={() => handleEditEvent()} />
        </div>
        <div className="bg-white py-10 flex justify-center">
          <div className=" absolute w-[50%] bg-black top-42  py-6 rounded-full drop-shadow-lg flex justify-center hover:scale-105 duration-300">
            <h1 className="text-white text-2xl font-semibold">My History</h1>
          </div>
        </div>
        <div className="bg-gray-300 w-full pt-32 px-16 sm:px-10 md:px-20 mid-lg:px-32 lg:px-40 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 pb-20">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </Layout>
  );
};

export default Event;

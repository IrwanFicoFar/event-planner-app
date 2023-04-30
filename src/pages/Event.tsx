import { FC, Fragment, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { CardEdit } from "../components/Card";
import { Card } from "../components/Card";
import { Transition, Dialog } from "@headlessui/react";
import { ButtonAction, ButtonCancelOrDelete } from "../components/Button";
import { Input, TextArea } from "../components/Input";
import axios from "axios";
import { error } from "console";
import Swal from "sweetalert2";

interface EventAdd {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  detail: string;
  date: string;
  time: string;
  location: string;
  qty: number;
  duration: number;
  ticket: string;
  price: number;
  image: any;
  hosted_by: string;
  participants: string;
}

const Event: FC = () => {
  const [data, setData] = useState<EventAdd[]>([]);
  const [dataHistory, setDataHistory] = useState<EventAdd[]>([]);
  // const [image, setImage] = useState<Partial<EventAdd>>({});
  const [csrf, setCsrf] = useState<string>("");
  const [csrfHistory, setCsrfHistory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  document.title = `My Event | Event Management`;

  useEffect(() => {
    fetchData();
    fetchDataHistory();
  }, []);

  const fetchData = () => {
    axios
      .get(`users/events`)
      .then((response) => {
        const { data } = response.data;
        setData(data.data);
        setCsrf(data.csrf);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDataHistory = () => {
    axios
      .get(`users/history`)
      .then((response) => {
        const { data } = response.data;
        setDataHistory(data.data);
        setCsrfHistory(data.csrf);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(dataHistory);
  console.log(csrfHistory);

  return (
    <Layout>
      <div className="h-full">
        <div className="bg-black py-10 flex justify-center">
          <div className=" absolute w-[50%] bg-white top-42  py-6 rounded-full drop-shadow-lg flex justify-center hover:scale-105 duration-300">
            <h1 className="text-black text-2xl font-semibold">My Event</h1>
          </div>
        </div>
        {loading ? (
          <div className="h-screen text-black bg-white font-bold text-3xl flex justify-center pt-24">
            Loading...
          </div>
        ) : (
          <div>
            <div className="bg-white w-full pt-32 px-16 sm:px-10 md:px-20 mid-lg:px-32 lg:px-40 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 pb-20">
              {data.map((e: EventAdd) => {
                const date = new Date(e.date);
                const optionsHeader = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour12: false,
                } as Intl.DateTimeFormatOptions;
                const options = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour12: false,
                } as Intl.DateTimeFormatOptions;
                const dateStringHeader = date.toLocaleDateString(
                  "en-US",
                  optionsHeader
                );
                const dateString = date.toLocaleDateString("en-US", options);
                const timeString = date.toLocaleTimeString();
                return (
                  <CardEdit
                    key={e.id}
                    image={e.image === "" ? e.image : `/header2.jpg`}
                    name={e.name}
                    dateHeader={dateStringHeader}
                    date={dateString}
                    time={timeString}
                    location={e.location}
                    participants={e.participants}
                    hosted_by={e.hosted_by}
                    goTo={`/edit-event/${e.id}`}
                  />
                );
              })}
            </div>
            <div className="bg-white py-10 flex justify-center">
              <div className=" absolute w-[50%] bg-black top-42  py-6 rounded-full drop-shadow-lg flex justify-center hover:scale-105 duration-300">
                <h1 className="text-white text-2xl font-semibold">
                  My History
                </h1>
              </div>
            </div>
            <div className="bg-gray-300 w-full pt-32 px-16 sm:px-10 md:px-20 mid-lg:px-32 lg:px-40 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 pb-20">
              {dataHistory.map((e: EventAdd | undefined) => {
                if (!e) {
                  return null; // or some other value to represent undefined elements
                }
                const date = new Date(e.date);
                const optionsHeader = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour12: false,
                } as Intl.DateTimeFormatOptions;
                const options = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour12: false,
                } as Intl.DateTimeFormatOptions;
                const dateStringHeader = date.toLocaleDateString(
                  "en-US",
                  optionsHeader
                );
                const dateString = date.toLocaleDateString("en-US", options);
                const timeString = date.toLocaleTimeString();
                return (
                  <Card
                    key={e.id}
                    image={e.image === "" ? e.image : `/header2.jpg`}
                    name={e.name}
                    dateHeader={dateStringHeader}
                    date={dateString}
                    time={timeString}
                    location={e.location}
                    participants={e.participants}
                    hosted_by={e.hosted_by}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Event;

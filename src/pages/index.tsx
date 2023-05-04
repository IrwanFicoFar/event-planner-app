import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { BiSearchAlt } from "react-icons/bi";
import { ButtonAction } from "../components/Button";
import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { DataType } from "../utils/user";
import { Input } from "../components/Input";

const Home: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>();
  const [datas, setDatas] = useState<DataType[]>([]);
  const [limit, setLimit] = useState<number>(4);
  const [count, setCount] = useState<number>(1);
  const [csrf, setCsrf] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");
  const [cookie] = useCookies(["tkn"]);
  const checToken = cookie.tkn;

  const navigate = useNavigate();

  document.title = `Event Planner App | index management`;

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setLimit(2);
    } else {
      setLimit(4);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [count]);

  const fetchData = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setLimit(2);
    } else {
      setLimit(4);
    }
    axios
      .get(
        `https://go-event.online/events?page=${count}&limit=${limit}&search=`
      )
      .then((response) => {
        const { data } = response.data;
        setTotalPage(data.total_page);
        setDatas(data.data);
        setCsrf(data.csrf);
      })
      .catch((error) => {
        const { message, code } = error.response.data;
        Swal.fire({
          icon: "error",
          title: code,
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSeacrh = () => {
    axios
      .get(
        `https://go-event.online/events?page=${count}&limit=${limit}&search=${inputSearch}`
      )
      .then((response) => {
        const { data } = response.data;
        setTotalPage(data.total_page);
        setDatas(data.data);
        setCsrf(data.csrf);
      })
      .catch((error) => {
        console.log(error);
        const { message, code } = error.response.data;
        Swal.fire({
          icon: "error",
          title: code,
          text: message,
          showCancelButton: false,
        });
      });
  };

  const handleGoToAddEventPage = () => {
    checToken
      ? navigate("/add-event")
      : Swal.fire({
          icon: "warning",
          title: "Login First !!",
        });
  };

  const handleIncrement = () => {
    if (totalPage) {
      if (count < totalPage) {
        setCount(count + 1);
      } else {
        setCount(totalPage);
      }
    }
  };

  const handleDecrement = () => {
    if (count <= 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <Layout>
      <div>
        <div className="w-full flex bg-black">
          <div className=" w-full lg:w-[50%] p-10 sm:p-16 md:p-20 flex flex-col gap-3 md:gap-6 lg:gap-8">
            <div className="lg:absolute w-full md:w-[90%] lg:w-[80%]">
              <div className=" lg:my-20">
                <h1 className="text-@F46036 text-lg font-semibold">NEWS</h1>
                <h1 className=" md:text-4xl lg:text-5xl xl:text-6xl font-semibold my-1 sm:my-3">
                  WORLD BIGGEST APP CONFERENCE
                </h1>
                <h1 className="md:text-4xl lg:text-5xl xl:text-6xl font-semibold sm:my-3 ">
                  FOR DIGITAL TECHNOLOGY
                </h1>
              </div>
            </div>
            <p className=" md:text-lg lg:text-xl lg:mb-65 xl:mb-72 lg:mt-80">
              We are exceptionally pleased to announce the 2023 2nd
              International Conference On Multidisciplinary Applications of
              Information Technology (ICOMIT). This conference will attract
              authors from various disciplines to share their latest research
              findings and ideas.
            </p>
          </div>
          <div className="hidden lg:block bg-red-400 w-[50%] lg:bg-[url('/header3.jpg')] bg-center m-10 bg-cover rounded-3xl"></div>
        </div>
        <div className="static">
          <div className="bg-black relative pt-10 flex justify-center mt-10">
            {/* Search */}
            <div className="flex justify-center absolute top-0 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] ">
              <div className="bg-white dark:bg-slate-700 hover:scale-105 duration-500 grid grid-cols-2 p-4 w-full drop-shadow-lg  rounded-full items-center">
                <div className=" rounded-l-@yes ">
                  <button onClick={() => handleGoToAddEventPage()}>
                    <h1 className="text-black dark:text-white dark:hover:text-slate-700 text-md lg:text-lg hover:text-xl md:font-semibold px-2 hover:bg-slate-200 py-2 hover:rounded-3xl duration-700">
                      Add Event
                    </h1>
                  </button>
                </div>
                <div className="bg-@F46036 rounded-@yes py-3">
                  <div className="flex">
                    <button
                      className="mr-1 px-2 duration-300"
                      onClick={() => handleSeacrh()}
                    >
                      <BiSearchAlt className="text-2xl hover:text-3xl duration-300 hover:bg-orange-700 hover:rounded-full hover:p-1 " />
                    </button>
                    <input
                      className="w-full bg-@F46036 hover:bg-orange-700 duration-300 rounded-lg px-2 mr-3 text-white font-semibold focus:outline-none"
                      onChange={(e) => setInputSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="h-screen text-black bg-white dark:bg-slate-800 font-bold text-3xl flex justify-center pt-24">
            Loading...
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 w-full pt-24 px-10 sm:px-12 md:px-20 mid-lg:px-32 lg:px-32 xl:px-16 2xl:24 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 md:gap-12 lg:gap-24  xl:gap-12 2xl:gap-10 gap-10 pb-10">
            {datas &&
              datas.map((e) => {
                const date = new Date(e.date);
                const dateEnd = new Date(e.end_date);
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
                const timeString = date.toLocaleTimeString("en-US", {
                  hour12: false,
                });
                const dateEndString = dateEnd.toLocaleDateString(
                  "en-US",
                  options
                );
                const timeEndString = dateEnd.toLocaleTimeString("en-US", {
                  hour12: false,
                });
                return (
                  <Card
                    key={e.id}
                    image={
                      e.image
                        ? `https://storage.googleapis.com/prj1ropel/${e.image}`
                        : `/header3.jpg`
                    }
                    name={e.name}
                    dateHeader={dateStringHeader}
                    date={dateString}
                    time={timeString}
                    location={e.location}
                    participants={e.participants}
                    hosted_by={e.hosted_by}
                    id={e.id}
                    dateEnd={dateEndString}
                    timeEnd={timeEndString}
                    quota={e.quota}
                  />
                );
              })}
          </div>
        )}
      </div>
      <div className="bg-white dark:bg-slate-800 pb-10 flex justify-center items-center">
        <h1 className="text-xl text-black font-semibold"></h1>
        {count <= 1 ? (
          <div className="w-36"></div>
        ) : (
          <div className="mx-2">
            <ButtonAction label="Back" onClick={() => handleDecrement()} />
          </div>
        )}
        {totalPage === count ? (
          <div className="w-36"></div>
        ) : (
          <div className="mx-2 flex items-center">
            <ButtonAction label="Next" onClick={() => handleIncrement()} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;

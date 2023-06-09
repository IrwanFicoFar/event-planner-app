import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { ButtonAction } from "../../components/Button";
import { CardEdit } from "../../components/Card";
import { Layout } from "../../components/Layout";
import { Card } from "../../components/Card";
import { MyEventType } from "../../utils/user";

const MyEvent: FC = () => {
  const [dataNotFoundHistory, setDataNotFoundHistory] =
    useState<boolean>(false);
  const [dataHistory, setDataHistory] = useState<MyEventType[]>([]);
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);
  const [csrfHistory, setCsrfHistory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPage2, setTotalPage2] = useState<number>();
  const [totalPage, setTotalPage] = useState<number>();
  const [data, setData] = useState<MyEventType[]>([]);
  const [count2, setCount2] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [csrf, setCsrf] = useState<string>("");
  const [limit, setLimit] = useState<number>(4);
  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  document.title = `My Event | Event Management`;

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
    fetchDataHistory();
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
        `https://go-event.online/users/events?page=${count}&limit=${limit}&search=`,
        {
          headers: {
            Authorization: `Bearer ${checkToken}`,
          },
        }
      )
      .then((response) => {
        const { data } = response.data;
        setData(data.data);
        setTotalPage(data.total_page);
        setCsrf(data.csrf);
        if (data.data === null) {
          setDataNotFound(true);
        } else {
          setDataNotFound(false);
        }
      })
      .catch((error) => {
        const { message, code } = error.response.data;
        setDataNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDataHistory = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setLimit(2);
    } else {
      setLimit(4);
    }
    axios
      .get(
        `https://go-event.online/users/history?page=${count2}&limit=${limit}&search=`,
        {
          headers: {
            Authorization: `Bearer ${checkToken}`,
          },
        }
      )
      .then((response) => {
        const { data } = response.data;
        setDataHistory(data.data);
        setTotalPage2(data.total_page);
        setCsrfHistory(data.csrf);
        if (data.data === null) {
          setDataNotFound(true);
        } else {
          setDataNotFound(false);
        }
      })
      .catch((error) => {
        const { message, code } = error.response.data;
        if (message === "data not found") {
          setDataNotFoundHistory(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Fetch My History",
            text: message,
            showCancelButton: false,
          });
        }
      })
      .finally(() => {
        setLoading(false);
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

  const handleIncrementHistory = () => {
    if (totalPage) {
      if (count2 < totalPage) {
        setCount(count2 + 1);
      } else {
        setCount(totalPage);
      }
    }
  };

  const handleDecrementHistory = () => {
    if (count2 <= 1) {
      setCount(1);
    } else {
      setCount(count2 - 1);
    }
  };

  console.log(dataNotFound);

  return (
    <Layout>
      <div className="h-full">
        <div className="bg-black py-10 flex justify-center">
          <div className=" absolute w-[50%] bg-white dark:bg-slate-600 top-42  py-6 rounded-full drop-shadow-lg flex justify-center hover:scale-105 duration-300">
            <h1 className="text-black text-2xl dark:text-white font-semibold">
              My Event
            </h1>
          </div>
        </div>
        {loading ? (
          <div className="h-screen text-black bg-white font-bold text-3xl flex justify-center pt-24">
            Loading...
          </div>
        ) : (
          <div>
            {dataNotFound ? (
              <div className="bg-white flex justify-center pt-24 cols-span-3">
                <h1 className="text-gray-400 text-2xl md:text-3xl lg:text-5xl font-bold ">
                  EMPTY DATA
                </h1>
              </div>
            ) : (
              <div>
                <div className="bg-white dark:bg-slate-800 w-full pt-24 px-10 sm:px-12 md:px-20 mid-lg:px-32 lg:px-32 xl:px-16 2xl:24 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 md:gap-12 lg:gap-24  xl:gap-12 2xl:gap-10 gap-10 pb-10">
                  {data &&
                    data.map((e) => {
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
                      const dateString = date.toLocaleDateString(
                        "en-US",
                        options
                      );
                      const timeString = date.toLocaleTimeString("en-US", {
                        hour12: false,
                      });
                      const dateEndString = dateEnd.toLocaleDateString(
                        "en-US",
                        options
                      );
                      const timeEndString = dateEnd.toLocaleTimeString(
                        "en-US",
                        {
                          hour12: false,
                        }
                      );
                      return (
                        <CardEdit
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
                          goTo={`/event/${e.id}/edit`}
                          dateEnd={dateEndString}
                          timeEnd={timeEndString}
                          quota={e.quota}
                        />
                      );
                    })}
                </div>
                <div>
                  <div className="bg-white flex justify-center items-center">
                    {count <= 1 ? (
                      <div className="w-36"></div>
                    ) : (
                      <div className="mx-2">
                        <ButtonAction
                          label="Back"
                          onClick={() => handleDecrement()}
                        />
                      </div>
                    )}
                    {totalPage === count ? (
                      <div className="w-36"></div>
                    ) : totalPage === 0 ? (
                      <div className="w-36"></div>
                    ) : (
                      <div className="mx-2 flex items-center">
                        <ButtonAction
                          label="Next"
                          onClick={() => handleIncrement()}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-800 py-10 flex justify-center">
              <div className=" absolute w-[50%] bg-black top-42  py-6 rounded-full drop-shadow-lg flex justify-center hover:scale-105 duration-300">
                <h1 className="text-white text-2xl font-semibold">
                  My History
                </h1>
              </div>
            </div>
            {dataNotFoundHistory ? (
              <div className="bg-gray-300  dark:bg-slate-900 flex justify-center pt-24 cols-span-3 pb-12">
                <h1 className="text-gray-400 text-2xl md:text-3xl lg:text-5xl font-bold ">
                  EMPTY DATA
                </h1>
              </div>
            ) : (
              <div className="bg-gray-300 w-full dark:bg-slate-900 pt-24 px-10 sm:px-12 md:px-20 mid-lg:px-32 lg:px-32 xl:px-16 2xl:24 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 md:gap-12 lg:gap-24  xl:gap-12 2xl:gap-10 gap-10 pb-10">
                {dataHistory &&
                  dataHistory.map((e) => {
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
                    const dateString = date.toLocaleDateString(
                      "en-US",
                      options
                    );
                    const timeString = date.toLocaleTimeString();
                    const dateEndString = dateEnd.toLocaleDateString(
                      "en-US",
                      options
                    );
                    const timeEndString = dateEnd.toLocaleTimeString();
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
                        dateEnd={dateEndString}
                        timeEnd={timeEndString}
                      />
                    );
                  })}
              </div>
            )}
            <div className="bg-white dark:bg-slate-700 flex justify-center items-center">
              {count2 <= 1 ? (
                <div className="w-36"></div>
              ) : (
                <div className="mx-2">
                  <ButtonAction
                    label="Back"
                    onClick={() => handleDecrementHistory()}
                  />
                </div>
              )}
              {totalPage2 === count2 ? (
                <div className="w-36"></div>
              ) : totalPage2 === undefined ? (
                <div className="w-36"></div>
              ) : (
                <div className="mx-2 flex items-center">
                  <ButtonAction
                    label="Next"
                    onClick={() => handleIncrementHistory()}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyEvent;

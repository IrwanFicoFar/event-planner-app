import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { CardEdit } from "../../components/Card";
import { Card } from "../../components/Card";
import axios from "axios";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { ButtonAction } from "../../components/Button";

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
  end_date: string;
}

const MyEvent: FC = () => {
  const [data, setData] = useState<EventAdd[]>([]);
  const [dataHistory, setDataHistory] = useState<EventAdd[]>([]);
  // const [image, setImage] = useState<Partial<EventAdd>>({});
  const [csrf, setCsrf] = useState<string>("");
  const [csrfHistory, setCsrfHistory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;
  const [count, setCount] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [count2, setCount2] = useState<number>(1);
  const [totalPage2, setTotalPage2] = useState<number>();

  const limit = 3;
  const page = 1;

  document.title = `My Event | Event Management`;

  useEffect(() => {
    fetchData();
    fetchDataHistory();
  }, [count]);

  const fetchData = () => {
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
        console.log(response);
        // console.log(data);
        setData(data.data);
        setTotalPage(data.total_page);
        // setCsrf(data.csrf);
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

  const fetchDataHistory = () => {
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
        console.log(response);
        setDataHistory(data.data);
        setTotalPage2(data.total_page);
        // setCsrfHistory(data.csrf);
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

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count <= 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  const handleIncrementHistory = () => {
    setCount(count2 + 1);
  };

  const handleDecrementHistory = () => {
    if (count2 <= 1) {
      setCount(1);
    } else {
      setCount(count2 - 1);
    }
  };

  console.log(totalPage2);
  console.log(count2);

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
            <div className="bg-white w-full pt-24 sm:pt-32 px-10 sm:px-12 md:px-20 mid-lg:px-32 lg:px-40 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-3 gap-10 2xl:gap-20 pb-20">
              {data.map((e: EventAdd) => {
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
                const timeString = date.toLocaleTimeString();
                const dateEndString = dateEnd.toLocaleDateString(
                  "en-US",
                  options
                );
                const timeEndString = dateEnd.toLocaleTimeString();
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
                  />
                );
              })}
            </div>
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
            <div className="bg-white py-10 flex justify-center">
              <div className=" absolute w-[50%] bg-black top-42  py-6 rounded-full drop-shadow-lg flex justify-center hover:scale-105 duration-300">
                <h1 className="text-white text-2xl font-semibold">
                  My History
                </h1>
              </div>
            </div>
            <div className="bg-gray-300 w-full pt-24 sm:pt-32 px-10 sm:px-12 md:px-20 mid-lg:px-32 lg:px-40 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 pb-20">
              {dataHistory.map((e) => {
                if (!e) {
                  return null;
                }
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
            <div className="bg-white flex justify-center items-center">
              {count2 <= 1 ? (
                <div className="w-36"></div>
              ) : (
                <div className="mx-2">
                  <ButtonAction
                    label="Back"
                    onClick={() => handleDecrement()}
                  />
                </div>
              )}
              {totalPage2 === count2 ? (
                <div className="w-36"></div>
              ) : totalPage2 === 0 ? (
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
        )}
      </div>
    </Layout>
  );
};

export default MyEvent;

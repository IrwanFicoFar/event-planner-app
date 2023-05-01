import { FC, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { CardAttandance, CardComment, CardTicket } from "../components/Card";
import { Input } from "../components/Input";
import { ButtonAction } from "../components/Button";
import { BiMap, BiTime, BiTimer } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { types } from "util";
import { useCookies } from "react-cookie";

interface DetailDataType {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  details: string;
  date: string;
  time: string;
  location: string;
  quota: number;
  duration: number;
  ticket: string;
  price: number;
  image: any;
  hosted_by: string;
  participants: [
    {
      name: string;
      image: string;
    }
  ];
  types: [
    {
      type_id: number;
      type_name: string;
      price: number;
    }
  ];
  comments: [
    {
      name: string;
      image: string;
      comment: string;
    }
  ];
}

interface objAddType {
  event_id: number;
  comment: string;
}

const DetailEvent: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Partial<DetailDataType>>({});
  const [csrf, setCsrf] = useState<string>("");
  const params = useParams();
  const { id } = params;
  const [objAdd, setObjAdd] = useState<objAddType>({
    event_id: Number(id),
    comment: "",
  });
  const [cookie] = useCookies(["tkn"]);
  const checToken = cookie.tkn;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/events/${id}`)
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

  const handleAddComment = () => {
    {
      checToken
        ? axios
            .post(`/comments`, objAdd)
            .then((response) => {
              const { message, code } = response.data;
              Swal.fire({
                icon: "success",
                title: code,
                text: message,
                showCancelButton: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  objAdd.comment = "";
                }
              });
            })
            .catch((error) => {
              const { message } = error.message;
              // console.log(message);
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: error,
                showCancelButton: false,
              });
            })
        : Swal.fire({
            icon: "warning",
            title: "Login First to Comment !!",
          });
    }
  };

  let dateStringHeader = "";
  let dateString = "";
  let timeString = "";

  if (data.date) {
    const Newdate = new Date(data.date);
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
    dateStringHeader = Newdate.toLocaleDateString("en-US", optionsHeader);
    dateString = Newdate.toLocaleDateString("en-US", options);
    timeString = Newdate.toLocaleTimeString(); // format: 5:17:02 PM
  }

  const handleToCart = (type_id: number) => {
    {
      checToken
        ? axios
            .post(`/transactions/cart`, {
              type_id: type_id,
            })
            .then((response) => {
              const { message, code } = response.data;
              Swal.fire({
                icon: "success",
                title: code,
                text: message,
                showCancelButton: false,
              });
            })
            .catch((error) => {
              const { message } = error.message;
              // console.log(message);
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: error,
                showCancelButton: false,
              });
            })
        : Swal.fire({
            icon: "warning",
            title: "Login First to add Ticket !!",
          });
    }
  };

  console.log(data);

  return (
    <Layout>
      <div className="h-full">
        <div className="grid lg:grid-cols-2 ">
          <div className="p-10">
            <div
              className={`bg-[url('/header3.jpg')] bg-center bg-cover rounded-3xl h-96`}
            ></div>
            <h1 className="text-xl sm:text-2xl font-semibold text-orange-500 py-5 pr-5 flex justify-end">
              5 left
            </h1>
            <p className="text-lg">{data.details}</p>
            <h1 className="text-xl font-semibold py-10">
              Hosted By : {data.hosted_by}
            </h1>
          </div>
          <div className="bg-white rounded-tl-@yes p-10 flex flex-col gap-8">
            <div className="flex space-x-2 items-center bg-black p-5 rounded-2xl">
              <BiMap className="text-orange-500 text-2xl" />
              <h1 className="text-xl xl:text-2xl font-semibold">
                {data.location}
              </h1>
            </div>
            <div className="flex space-x-2 items-center bg-black p-5 rounded-2xl">
              <div>
                <div className="text-xl xl:text-2xl font-semibold flex flex-col gap-5">
                  <div className="flex space-x-3 items-center">
                    <BiTime className="text-orange-500 text-2xl" />
                    <h1 className="text-xl xl:text-2xl font-semibold flex justify-between">
                      {dateString} at {timeString}
                    </h1>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <BiTimer className="text-orange-500 text-2xl" />
                    <h1 className="text-xl xl:text-2xl font-semibold">
                      Duration:{" "}
                      {data.duration !== undefined
                        ? `${data.duration} ${
                            data.duration <= 1 ? "hour" : "hours"
                          }`
                        : ""}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black rounded-3xl">
              <div className="border-b-4 border-white rounded-b-3xl py-7 flex justify-center">
                <h1 className="text-2xl font-semibold">Get Ticket</h1>
              </div>
              <div className="p-12 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 xl:gap-10">
                {data.types &&
                  data.types.map((type) => (
                    <CardTicket
                      key={type.type_id}
                      ticket={type.type_name}
                      price={type.price}
                      onClick={() => handleToCart(type.type_id)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 ">
          <div className="px-10 pb-10">
            <div>
              <h1 className="text-xl font-semibold py-5">
                Attandance : {data.participants?.length}
              </h1>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5">
                {data.participants &&
                  data.participants.map((data, index) => (
                    <CardAttandance
                      key={index}
                      image={data.image}
                      name={data.name}
                    />
                  ))}
                <CardAttandance image="/avatar.jpg" name="irwan" />
                <CardAttandance image="/avatar.jpg" name="irwan" />
              </div>
            </div>
            <div className="py-10">
              <h1 className="text-xl font-semibold py-5">Comment</h1>
              <div className="flex space-x-3">
                <Input
                  placeholder="Enter Comment"
                  id="input-comment"
                  type="text"
                  onChange={(event) =>
                    setObjAdd({ ...objAdd, comment: event.target.value })
                  }
                />
                <ButtonAction label="Add" onClick={() => handleAddComment()} />
              </div>
            </div>
            <div className="grid grid-flow-row gap-5 border-2 rounded-2xl p-5">
              {data.comments &&
                data.comments.map((item) => (
                  <CardComment
                    image={`/${item.image}`}
                    name={item.name}
                    comment={item.comment}
                  />
                ))}
              <CardComment
                image={"/avatar.jpg"}
                name={"Wibowo"}
                comment={"apakah event nya bagus?"}
              />
              <CardComment
                image={"/avatar.jpg"}
                name={"Alfian hadis"}
                comment={"apakah event nya bagus?"}
              />
            </div>
          </div>
          <div className="bg-white rounded-bl-@yes "></div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailEvent;

import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { CardAttandance, CardComment, CardTicket } from "../../components/Card";
import { Input } from "../../components/Input";
import { ButtonAction } from "../../components/Button";
import { BiMap, BiTime, BiTimer } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { type } from "os";
import { DetailDataType, objAddType } from "../../utils/user";

const DetailEvent: FC = () => {
  const [data, setData] = useState<Partial<DetailDataType>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [csrf, setCsrf] = useState<string>("");
  const [currentTime, setCurrentTime] = useState("");

  const params = useParams();
  const { id } = params;
  const [objAdd, setObjAdd] = useState<objAddType>({
    event_id: Number(id),
    comment: "",
  });

  const [cookie] = useCookies(["tkn"]);
  const checToken = cookie.tkn;

  document.title = `Detail Event | Event management`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const jakartaOffset = 7 * 60; // UTC offset for Jakarta timezone in minutes
      const now = new Date();
      const jakartaTimestamp = now.getTime() + jakartaOffset * 60 * 1000;
      const jakartaDate =
        new Date(jakartaTimestamp).toISOString().slice(0, 19) + "Z";
      setCurrentTime(jakartaDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  let EventDate = "";
  let updateDate = "";

  if (data.date) {
    const jakartaOffset = 7 * 60; // UTC offset for Jakarta timezone in minutes
    const now = new Date(data.date);
    const jakartaTimestamp = now.getTime() + jakartaOffset * 60 * 1000;
    EventDate = new Date(jakartaTimestamp).toISOString().slice(0, 19) + "Z"; // format: 2023-05-07T12:24:42Z
    let ExpDate = new Date(jakartaTimestamp);
    ExpDate.setHours(ExpDate.getHours() + 1);
    updateDate = ExpDate.toISOString().slice(0, 19) + "Z";
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://go-event.online/events/${id}`)
      .then((response) => {
        const { data } = response.data;
        setData(data.data);
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

  const handleAddComment = () => {
    {
      checToken
        ? axios
            .post(`https://go-event.online/comments`, objAdd, {
              headers: {
                Authorization: `Bearer ${checToken}`,
              },
            })
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
              const { message, code } = error.response.data;
              Swal.fire({
                icon: "error",
                title: code,
                text: message,
                showCancelButton: false,
              });
            })
            .finally(() => {
              fetchData();
            })
        : Swal.fire({
            icon: "warning",
            title: "Login First to Comment !!",
          });
    }
  };

  const handleJointEvent = () => {
    Swal.fire({
      title: "Custom width, padding, color, background.",
      width: 450,
      padding: "3em",
      color: "#716add",
      background:
        "#fff url(https://tenor.com/view/gwen-stacy-gif-18065640.gif)no-repeat",
      backdrop: `
    rgba(0,0,123,0.4)
    url("https://media.tenor.com/-AyTtMgs2mMAAAAi/nyan-cat-nyan.gif")
    left top
    no-repeat
  `,
    });
  };

  let dateString = "";
  let timeString = "";

  if (data.date) {
    const Newdate = new Date(data.date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
    } as Intl.DateTimeFormatOptions;
    dateString = Newdate.toLocaleDateString("en-US", options);
    timeString = Newdate.toLocaleTimeString("en-US", {
      hour12: false,
    });
  }

  const handleToCart = (id: number) => {
    {
      checToken
        ? axios
            .post(
              `https://go-event.online/transactions/cart`,
              {
                type_id: id,
              },
              {
                headers: {
                  Authorization: `Bearer ${checToken}`,
                },
              }
            )
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
              const { message, code } = error.response.data;
              Swal.fire({
                icon: "error",
                title: code,
                text: message,
                showCancelButton: false,
              });
            })
        : Swal.fire({
            icon: "warning",
            title: "Login First to add Ticket !!",
          });
    }
  };

  return (
    <Layout>
      {loading ? (
        <div className="h-screen text-white bg-black font-bold text-3xl flex justify-center pt-24">
          Loading...
        </div>
      ) : (
        <div className="h-full">
          <div className="grid lg:grid-cols-2 ">
            <div className="p-10">
              <div className="rounded-3xl flex justify-center">
                <img
                  src={`https://storage.googleapis.com/prj1ropel/${
                    data && data.image
                  }`}
                  alt=""
                  className="w-full rounded-3xl"
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-orange-500 py-5 pr-5 flex justify-end">
                {data.quota} left
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
                        {dateString} at {timeString} WIB
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
              {currentTime > EventDate ? (
                <ButtonAction
                  label="Join Event"
                  onClick={() => handleJointEvent()}
                />
              ) : (
                <div className="bg-black rounded-3xl">
                  <div className="border-b-4 border-white rounded-b-3xl py-7 flex justify-center">
                    <h1 className="text-2xl font-semibold">Get Ticket</h1>
                  </div>
                  <div className="p-12 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 xl:gap-10">
                    {data.types &&
                      data.types.map((type) => (
                        <CardTicket
                          key={type.id}
                          ticket={type.type_name}
                          price={type.price}
                          onClick={() => {
                            handleToCart(type.id);
                          }}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 ">
            <div className="px-10 pb-10">
              <div>
                <h1 className="text-xl font-semibold py-5">
                  Attandance : {data.participants?.length}
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {data.participants &&
                    data.participants.map((data, index) => (
                      <CardAttandance
                        key={index}
                        image={data.image}
                        name={data.name}
                      />
                    ))}
                  <CardAttandance image="/default.jpg" name="kosong" />
                  <CardAttandance image="/default.jpg" name="kosong" />
                  <CardAttandance image="/default.jpg" name="kosong" />
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
                  <ButtonAction
                    label="Add"
                    onClick={() => handleAddComment()}
                  />
                </div>
              </div>
              <div className="grid grid-flow-row gap-5 border-2 rounded-2xl p-5">
                {data.comments &&
                  data.comments.map((item) => (
                    <CardComment
                      image={`https://storage.googleapis.com/prj1ropel/${item.image}`}
                      name={item.name}
                      comment={item.comment}
                    />
                  ))}
              </div>
            </div>
            <div className="bg-white rounded-bl-@yes "></div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailEvent;

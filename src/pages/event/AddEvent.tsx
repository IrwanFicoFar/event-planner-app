import { FC, useState, FormEvent, MouseEvent, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { Input, TextArea } from "../../components/Input";
import { AddType, dataTicket } from "../../utils/user";
import { ButtonAction } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AddEvent: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<AddType>>({});
  const [data, setData] = useState<Partial<AddType>>({});
  const [MyType, setMyType] = useState<dataTicket[]>([]);
  const [ticket, setTicket] = useState<dataTicket>({
    type_name: "",
    price: 0,
  });
  const [tomorrow, setTomorrow] = useState<Date>();
  const [jakartaDate, setJakartaDate] = useState<string>("");
  const [cookie] = useCookies(["tkn"]);
  const navigate = useNavigate();
  const checkToken = cookie.tkn;

  document.title = `Add Event | Event management`;

  useEffect(() => {
    minTomorrow();
  }, []);

  const handleAddTicket = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let nameExists = false;
    MyType.forEach((e) => {
      if (e.type_name === ticket.type_name) {
        nameExists = true;
        Swal.fire({
          icon: "warning",
          title: "Name Cannot be the same",
          showCancelButton: false,
        });
      }
    });
    if (!nameExists) {
      if (ticket.type_name === "") {
        Swal.fire({
          icon: "warning",
          title: "Ticket type is empty, please fill it",
          showCancelButton: false,
        });
      } else {
        setMyType(MyType.concat(ticket));
      }
    }
  };

  const handleChange = (
    value: string | File | number | null,
    key: keyof typeof objSubmit
  ) => {
    let temp = { ...objSubmit };
    if (value === null) {
      temp[key] = null;
    } else {
      if (key === "date") {
        const date = new Date(value as string);
        const formattedDate = date.toISOString().slice(0, 19);
        temp[key] = formattedDate;
      } else {
        temp[key] = value;
      }
    }
    setObjSubmit(temp);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const type = JSON.stringify(MyType);
    const join = { ...objSubmit, type };
    axios
      .post("/events", join, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message, code } = response.data;
        Swal.fire({
          icon: "success",
          title: "Success Add Event!!",
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const { message, code } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Failed to add Event!!",
          text: message,
          showCancelButton: false,
        });
      });
  };

  const minTomorrow = () => {
    const jakartaOffset = 7 * 60;
    const now = new Date();
    const jakartaTimestamp = now.getTime() + jakartaOffset * 60 * 1000;
    const jakartaDate = new Date(jakartaTimestamp).toISOString().slice(0, 16);
    setJakartaDate(jakartaDate);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTomorrow(tomorrow);
  };

  return (
    <Layout>
      <div className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-@night ">
          {/* input */}
          <div className="bg-white rounded-2xl lg:rounded-none  lg:rounded-r-@yes mx-5 sm:mx-10 md:mx-16 lg:mx-0">
            <div className="flex flex-col gap-8 justify-center p-2 sm:p-5 md:p-10 lg:p-20 ">
              <div className="flex flex-col gap-5 ">
                <div className="flex justify-center">
                  <img
                    src={
                      objSubmit.image
                        ? URL.createObjectURL(objSubmit.image)
                        : "/header3.jpg"
                    }
                    alt="user-avatar"
                    className="rounded-2xl w-full h-auto border-1 border-black drop-shadow-lg"
                  />
                </div>
                <div className="w-full mx-auto bg-white text-black rounded-xl border-2 border-gray-600 lg:border-black">
                  <input
                    placeholder=""
                    id="upload-image"
                    type="file"
                    className="p-4"
                    onChange={(event) => {
                      if (!event.currentTarget.files) {
                        return;
                      }
                      setData({
                        ...data,
                        image: URL.createObjectURL(
                          event.currentTarget.files[0]
                        ),
                      });
                      handleChange(event.currentTarget.files[0], "image");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="flex flex-col gap-3 sm:gap-6 md:gap-8 px-5 sm:px-10 md:px-16 lg:px-18 xl:px-20  py-10 ms:py-16 md:py-20">
              <Input
                placeholder="Name"
                id="input-name"
                // defaultValue={"name"}
                onChange={(event) => handleChange(event.target.value, "name")}
              />
              <Input
                placeholder="Hosted By"
                id="input-host"
                // defaultValue={"hosted by"}
                onChange={(event) =>
                  handleChange(event.target.value, "hosted_by")
                }
              />
              <TextArea
                placeholder="Detail"
                id="input-textarea"
                // defaultValue={"detail"}
                onChange={(event) =>
                  handleChange(event.target.value, "details")
                }
              />
              <Input
                placeholder="input date and time"
                id="input-date"
                step="1"
                type="datetime-local"
                defaultValue={jakartaDate}
                min={`${tomorrow && tomorrow.toISOString().slice(0, 16)}`}
                onChange={(event) => handleChange(event.target.value, "date")}
              />
              <div className="flex space-x-3">
                <Input
                  placeholder="Kuota"
                  id="input-qty"
                  // defaultValue={"Kuota"}
                  type="number"
                  onChange={(event) =>
                    handleChange(event.target.value, "quota")
                  }
                />
                <Input
                  placeholder="Duration"
                  id="input-qty"
                  // defaultValue={"Duration"}
                  type="float"
                  onChange={(event) =>
                    handleChange(event.target.value, "duration")
                  }
                />
              </div>
              <Input
                placeholder="Location"
                id="input-location"
                // defaultValue={"Duration"}
                type="text"
                onChange={(event) =>
                  handleChange(event.target.value, "location")
                }
              />
              <div className="flex space-x-4">
                <Input
                  placeholder="Add Ticket"
                  id="input-ticket"
                  type="text"
                  onChange={(event) =>
                    setTicket({ ...ticket, type_name: event.target.value })
                  }
                />
                <Input
                  placeholder="Price"
                  id="input-price"
                  type="number"
                  onChange={(event) =>
                    setTicket({ ...ticket, price: Number(event.target.value) })
                  }
                />
                <ButtonAction
                  label="Submit"
                  onClick={(event) => handleAddTicket(event)}
                />
              </div>
              <div>
                {MyType.map((e, index) => (
                  <div className="grid grid-cols-3 gap-5" key={index}>
                    <div className="bg-orange-200 text-black text-lg py-2 px-3 my-2 font-semibold rounded-xl">
                      {e.type_name}
                    </div>
                    <div className="bg-orange-200 text-black text-lg py-2 px-3 my-2 font-semibold rounded-xl">
                      {e.price}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col py-5 sm:py-10  md:py-16 lg:py-20">
                <ButtonAction label="Submit" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEvent;

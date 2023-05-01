import { FC, useEffect, useState, FormEvent, MouseEvent } from "react";
import { Layout } from "../components/Layout";
import { Input, TextArea } from "../components/Input";
import { ButtonAction } from "../components/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface EventAdd {
  id: string;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  address: string | undefined;
  detail: string;
  date: string;
  time: string;
  location: string;
  quota: number;
  duration: number;
  ticket: string;
  price: number;
  image: any;
  hosted_by: string;
}

interface dataTicket {
  type_name: string;
  price: string;
}

const AddEvent: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<EventAdd>>({});
  const [data, setData] = useState<Partial<EventAdd>>({});
  const [type, setType] = useState<dataTicket[]>([]);
  const [displayAddTicket, setDisplayAddTicket] = useState<string>("");
  const [ticket, setTicket] = useState<dataTicket>({
    type_name: "",
    price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setDisplayAddTicket("");
  }, [type]);

  const handleAddTicket = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (ticket.type_name === "") {
      Swal.fire({
        icon: "warning",
        title: "ticket empty, fill please ",
        showCancelButton: false,
      });
    } else {
      setType(type.concat(ticket));
    }
  };
  console.log(type);

  const handleChange = (
    value: string | File | number,
    key: keyof typeof objSubmit
  ) => {
    console.log(value);
    let temp = { ...objSubmit };
    if (value === null) {
      temp[key] = null;
    } else {
      temp[key] = value;
    }
    setObjSubmit(temp);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(
        "/events",
        {
          objSubmit,
          type: type,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        const { code, message } = response.data;
        Swal.fire({
          icon: "success",
          title: code,
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      });
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
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="flex flex-col gap-3 sm:gap-6 md:gap-8 px-5 sm:px-10 md:px-16 lg:px-18 xl:px-20  py-10 ms:py-16 md:py-20">
              <Input
                placeholder="Name"
                id="input-name"
                // defaultValue={"name"}
                onChange={(event) => handleChange(event.target.value, "name")}
              />
              <Input
                placeholder=""
                id="input-host"
                defaultValue={"hosted by"}
                onChange={(event) =>
                  handleChange(event.target.value, "hosted_by")
                }
              />
              <TextArea
                placeholder="Detail"
                id="input-textarea"
                // defaultValue={"detail"}
                onChange={(event) => handleChange(event.target.value, "detail")}
              />
              <Input
                placeholder="Location"
                id="input-location"
                step="1"
                type="datetime-local"
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
                  type="number"
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
                    setTicket({ ...ticket, price: event.target.value })
                  }
                />
                <ButtonAction
                  label="Submit"
                  onClick={(event) => handleAddTicket(event)}
                />
              </div>
              <div>
                {type.map((e) => (
                  <div className="grid grid-cols-3 gap-5">
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

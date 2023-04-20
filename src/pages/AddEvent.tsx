import { FC, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Input, TextArea } from "../components/Input";
import { BiMap } from "react-icons/bi";
import { ButtonAction } from "../components/Button";

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
  qty: number;
  duration: number;
  ticket: string;
  price: number;
  image: any;
}

interface dataTicket {
  addTicket: string;
  price: number;
}

const AddEvent: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<EventAdd>>({});
  const [data, setData] = useState<Partial<EventAdd>>({});
  const [type, setType] = useState<dataTicket[]>([]);
  const [displayAddTicket, setDisplayAddTicket] = useState<string>("");
  const [ticket, setTicket] = useState<dataTicket>({
    addTicket: "",
    price: 0,
  });

  console.log(type);

  useEffect(() => {
    setDisplayAddTicket("");
  }, [type]);

  const handleAddTicket = () => {
    setDisplayAddTicket("");
    if (ticket.addTicket === "") {
      alert("ticket empty, please fill");
      return;
    } else {
      setType(type.concat(ticket));
      setTicket({
        addTicket: "",
        price: 0,
      });
    }
  };
  console.log(displayAddTicket);

  const handleSubmit = () => {
    // setObjSubmit(objSubmit.concat(type));
    console.log(objSubmit);
  };

  const handleChange = (
    value: string | File | number,
    key: keyof typeof objSubmit
  ) => {
    console.log(value);
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
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
          <form>
            <div className="flex flex-col gap-3 sm:gap-6 md:gap-8 px-5 sm:px-10 md:px-16 lg:px-18 xl:px-20  py-10 ms:py-16 md:py-20">
              <Input
                placeholder="Name"
                id="input-name"
                // defaultValue={"name"}
                onChange={(event) => handleChange(event.target.value, "name")}
              />
              {/* <Input
                placeholder=""
                id="input-host"
                defaultValue={"hosted by"}
                onChange={(event) => handleChange(event.target.value, "hosted")}
              /> */}
              <TextArea
                placeholder="Detail"
                id="input-textarea"
                // defaultValue={"detail"}
                onChange={(event) => handleChange(event.target.value, "detail")}
              />
              <div className="flex space-x-3 items-center">
                <Input
                  placeholder="select date"
                  id="input-date"
                  // defaultValue={"date"}
                  type="date"
                  onChange={(event) => handleChange(event.target.value, "date")}
                />
                <Input
                  placeholder="Time"
                  id="input-date"
                  // defaultValue={"date"}
                  type="time"
                  onChange={(event) => handleChange(event.target.value, "time")}
                />
              </div>
              <div className="flex space-x-3">
                <Input
                  placeholder="Kuota"
                  id="input-qty"
                  // defaultValue={"Kuota"}
                  type="number"
                  onChange={(event) => handleChange(event.target.value, "qty")}
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
              <div className="flex space-x-4">
                <Input
                  placeholder="Add Ticket"
                  id="input-ticket"
                  type="text"
                  // defaultValue={`${displayAddTicket}`}
                  onChange={(event) =>
                    handleChange(event.target.value, "ticket")
                  }
                />
                <Input
                  placeholder="Price"
                  id="input-price"
                  type="number"
                  onChange={(event) =>
                    handleChange(event.target.value, "price")
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
              <div className="flex flex-col py-5 sm:py-10  md:py-16 lg:py-20">
                <ButtonAction label="Submit" onClick={() => handleSubmit()} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEvent;

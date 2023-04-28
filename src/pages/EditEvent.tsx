import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { TextArea, Input } from "../components/Input";
import { ButtonAction } from "../components/Button";
import { Layout } from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

interface EventAdd {
  id: string;
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
  image: any;
  hosted_by: string;
  participants: string;
  type_name: string;
  price: number;
  types: [
    {
      type_name: string;
      price: number;
    }
  ];
}

const EditEvent: FC = () => {
  const [objSubmit, setObjSubmit] = useState<Partial<EventAdd>>({});
  const [data, setData] = useState<Partial<EventAdd>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [csrf, setCsrf] = useState<string>("");

  const navigate = useNavigate();

  const params = useParams();

  const { id } = params;

  console.log(data.types);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`events/${id}`)
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

  const handleEditEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    axios
      .put(`/events`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${csrf}`,
        },
      })
      .then((response) => {
        const { message, code } = response.data;
        // console.log(response);
        Swal.fire({
          icon: "success",
          title: code,
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setObjSubmit({});
            navigate("/event");
          }
        });
      })
      .catch((error) => {
        // console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Failed, update at least 1",
          text: error,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  };

  console.log(data);
  console.log(objSubmit);
  return (
    <Layout>
      <div className="">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-@night pt-10 lg:pt-0">
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
            <form onSubmit={(event) => handleEditEvent(event)} id={data.id}>
              <div className="flex flex-col gap-3 sm:gap-6 md:gap-8 px-5 sm:px-10 md:px-16 lg:px-18 xl:px-20  py-5 ms:py-10 ">
                <Input
                  placeholder="Name"
                  id="input-name"
                  defaultValue={data.name}
                  onChange={(event) => handleChange(event.target.value, "name")}
                />
                <Input
                  placeholder=""
                  id="input-host"
                  defaultValue={data.hosted_by}
                  onChange={(event) =>
                    handleChange(event.target.value, "hosted_by")
                  }
                />
                <TextArea
                  placeholder="Detail"
                  id="input-textarea"
                  defaultValue={data.details}
                  onChange={(event) =>
                    handleChange(event.target.value, "details")
                  }
                />
                <Input
                  placeholder="Location"
                  id="input-location"
                  step="1"
                  defaultValue={data.date}
                  type="datetime-local"
                  onChange={(event) => handleChange(event.target.value, "date")}
                />
                <div className="flex space-x-3">
                  <Input
                    placeholder="Kuota"
                    id="input-qty"
                    defaultValue={"Kuota"}
                    type="number"
                    onChange={(event) =>
                      handleChange(event.target.value, "quota")
                    }
                  />
                  <Input
                    placeholder="Duration"
                    id="input-qty"
                    defaultValue={data.duration}
                    type="number"
                    onChange={(event) =>
                      handleChange(event.target.value, "duration")
                    }
                  />
                </div>
                <div className="flex space-x-4">
                  {data.types && data.types.map((e) => <div></div>)}
                </div>
                <Input
                  placeholder="Location"
                  id="input-location"
                  defaultValue={data.location}
                  type="text"
                  onChange={(event) =>
                    handleChange(event.target.value, "location")
                  }
                />
                <div className="flex flex-col py-5 gap-5 sm:py-10  md:py-16 lg:py-20">
                  <ButtonAction label="Update" type="submit" />
                  <button
                    type="button"
                    className="inline-flex justify-center items-center rounded-2xl border border-transparent bg-red-500 px-2 py-3 text-xl font-semibold text-white hover:bg-red-700 hover:text-white focus:outline-none "
                    onClick={() => navigate("/event")}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditEvent;

{
  /* <Input
                          placeholder="Add Ticket"
                          id="input-ticket"
                          type="text"
                          defaultValue={e.type_name}
                          onChange={(event) =>
                            handleChange(event.target.value, "type_name")
                          }
                        />
                        <Input
                          placeholder="Price"
                          id="input-price"
                          type="number"
                          defaultValue={`${e.price}`}
                          onChange={(event) =>
                            handleChange(event.target.value, "price")
                          }
                        /> */
}

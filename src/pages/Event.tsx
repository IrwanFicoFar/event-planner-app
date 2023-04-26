import { FC, Fragment, useState } from "react";
import { Layout } from "../components/Layout";
import { CardEdit } from "../components/Card";
import { Card } from "../components/Card";
import { Transition, Dialog } from "@headlessui/react";
import { ButtonAction, ButtonCancelOrDelete } from "../components/Button";
import { Input, TextArea } from "../components/Input";

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
  hosted: string;
}

const Event: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [objSubmit, setObjSubmit] = useState<Partial<EventAdd>>({});
  const [data, setData] = useState<Partial<EventAdd>>({});

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleEditEvent = () => {
    alert("handle edit");
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

  const handleSubmit = () => {
    // setObjSubmit(objSubmit.concat(type));
    console.log(objSubmit);
    alert("submit");
  };

  return (
    <Layout>
      <div className="h-full">
        <div className="bg-black py-10 flex justify-center">
          <div className=" absolute w-[50%] bg-white top-42  py-6 rounded-full drop-shadow-lg flex justify-center hover:scale-105 duration-300">
            <h1 className="text-black text-2xl font-semibold">My Event</h1>
          </div>
        </div>
        <div className="bg-white w-full pt-32 px-16 sm:px-10 md:px-20 mid-lg:px-32 lg:px-40 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 pb-20">
          <CardEdit
            onClick={() => {
              openModal();
            }}
          />
          <CardEdit
            onClick={() => {
              openModal();
            }}
          />
          <CardEdit
            onClick={() => {
              openModal();
            }}
          />
          <CardEdit
            onClick={() => {
              openModal();
            }}
          />
        </div>
        <div className="bg-white py-10 flex justify-center">
          <div className=" absolute w-[50%] bg-black top-42  py-6 rounded-full drop-shadow-lg flex justify-center hover:scale-105 duration-300">
            <h1 className="text-white text-2xl font-semibold">My History</h1>
          </div>
        </div>
        <div className="bg-gray-300 w-full pt-32 px-16 sm:px-10 md:px-20 mid-lg:px-32 lg:px-40 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 pb-20">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      {/* modal edit event */}
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto print-section">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all ">
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
                                      handleChange(
                                        event.currentTarget.files[0],
                                        "image"
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <form>
                            <div className="flex flex-col gap-3 sm:gap-6 md:gap-8 px-5 sm:px-10 md:px-16 lg:px-18 xl:px-20  py-5 ms:py-10 ">
                              <Input
                                placeholder="Name"
                                id="input-name"
                                // defaultValue={"name"}
                                onChange={(event) =>
                                  handleChange(event.target.value, "name")
                                }
                              />
                              <Input
                                placeholder=""
                                id="input-host"
                                defaultValue={"hosted by"}
                                onChange={(event) =>
                                  handleChange(event.target.value, "hosted")
                                }
                              />
                              <TextArea
                                placeholder="Detail"
                                id="input-textarea"
                                // defaultValue={"detail"}
                                onChange={(event) =>
                                  handleChange(event.target.value, "detail")
                                }
                              />
                              <Input
                                placeholder="Location"
                                id="input-location"
                                step="1"
                                type="datetime-local"
                                onChange={(event) =>
                                  handleChange(event.target.value, "date")
                                }
                              />
                              <div className="flex space-x-3">
                                <Input
                                  placeholder="Kuota"
                                  id="input-qty"
                                  // defaultValue={"Kuota"}
                                  type="number"
                                  onChange={(event) =>
                                    handleChange(event.target.value, "qty")
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
                              <div className="flex flex-col py-5 gap-5 sm:py-10  md:py-16 lg:py-20">
                                <ButtonAction
                                  label="Submit"
                                  onClick={() => handleSubmit()}
                                />
                                <button
                                  type="button"
                                  className="inline-flex justify-center items-center rounded-2xl border border-transparent bg-red-500 px-2 py-3 text-xl font-semibold text-white hover:bg-red-700 hover:text-white focus:outline-none "
                                  onClick={closeModal}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </Layout>
  );
};

export default Event;

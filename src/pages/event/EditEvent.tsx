import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { TextArea, Input } from "../../components/Input";
import { ButtonAction, ButtonCancelOrDelete } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import {
  EventEditType,
  DataEditTicketType,
  DataAddTicketType,
} from "../../utils/user";

const EditEvent: FC = () => {
  const [MyType, setMyType] = useState<Partial<DataEditTicketType[]>>([]);
  const [objSubmit, setObjSubmit] = useState<Partial<EventEditType>>({});
  const [data, setData] = useState<Partial<EventEditType>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type_id, setType_id] = useState<Number>();
  const [csrf, setCsrf] = useState<string>("");

  const params = useParams();
  const { id } = params;
  const [ticket, setTicket] = useState<Partial<DataEditTicketType>>({
    id: type_id,
    type_name: "",
    price: 0,
  });
  const [addTicket, setAddTicket] = useState<Partial<DataAddTicketType>>({
    event_id: Number(id),
    type_name: "",
    type_price: 0,
  });

  const [cookie] = useCookies(["tkn"]);
  const navigate = useNavigate();
  const checkToken = cookie.tkn;

  document.title = `Edit Event | Event management`;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    MyType;
  }, [ticket]);

  const fetchData = () => {
    axios
      .get(`https://go-event.online/events/${id}`)
      .then((response) => {
        const { data } = response.data;
        setData(data.data);
        setMyType([...data.data.types]);
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

  const handleUpdateTicket = (Mytype: number) => {
    setTicket({ ...ticket, id: Mytype });
  };

  const UpdateTicketToType = () => {
    const updatedTicket = { ...ticket };
    const updatedType = MyType.map((t) => {
      if (t && t.id === ticket.id) {
        if (
          t.type_name === updatedTicket.type_name &&
          t.price === updatedTicket.price
        ) {
          Swal.fire({
            icon: "error",
            title: "edit at least 1",
          });
          return t;
        } else {
          return {
            ...t,
            ...updatedTicket,
          };
        }
      } else {
        return t;
      }
    });

    setMyType(updatedType);
    Swal.fire({
      icon: "success",
      title: `Success update ticket ${ticket.id} !!`,
      showCancelButton: false,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        closeModal();
      }
    });
  };

  const handleEditEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    const type = JSON.stringify(MyType);

    const join = { ...objSubmit, id: Number(id), type };
    axios
      .put(`https://go-event.online/events`, join, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { message, code } = response.data;
        Swal.fire({
          icon: "success",
          title: code,
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setObjSubmit({});
            navigate("/my-event");
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
      .finally(() => fetchData());
  };

  const handleDeleteEvent = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://go-event.online/events/${id}`, {
            headers: {
              Authorization: `Bearer ${checkToken}`,
            },
          })
          .then((response) => {
            const { message, code } = response.data;
            Swal.fire({
              icon: "info",
              title: code,
              text: message,
              showCancelButton: false,
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/my-event");
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
          });
      }
    });
  };

  const handleDeleteTicket = (id: number) => {
    Swal.fire({
      icon: "question",
      title: "Are You Sure to Deleted ticket",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes Deleted",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://go-event.online/tickets/${id}`, {
            headers: {
              Authorization: `Bearer ${checkToken}`,
            },
          })
          .then((response) => {
            const { message, code } = response.data && response.data;
            Swal.fire({
              icon: "success",
              title: code,
              text: message,
              showCancelButton: false,
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                setIsOpen(false);
                fetchData();
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
          });
      }
    });
  };

  const handleAddTicket = () => {
    axios
      .post(
        "https://go-event.online/tickets",
        {
          ...addTicket,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${checkToken}`,
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
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setAddTicket({});
            fetchData();
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
      });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const jakartaOffset = 7 * 60; // UTC offset for Jakarta timezone in minutes
  const now = new Date();
  const jakartaTimestamp = now.getTime() + jakartaOffset * 60 * 1000;
  const jakartaDate = new Date(jakartaTimestamp).toISOString().slice(0, 16);

  const today = new Date();
  return (
    <Layout>
      {loading ? (
        <div className="h-screen text-black bg-white font-bold text-3xl flex justify-center pt-24">
          Loading...
        </div>
      ) : (
        <div className="">
          <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-black pt-10 lg:pt-0">
              {/* input */}
              <div className="bg-white rounded-2xl lg:rounded-none  lg:rounded-r-@yes mx-5 sm:mx-10 md:mx-16 lg:mx-0">
                <div className="flex flex-col gap-8 justify-center p-2 sm:p-5 md:p-10 lg:p-20 ">
                  <div className="flex flex-col gap-5 ">
                    <div className="flex justify-center">
                      <img
                        src={
                          objSubmit.image
                            ? URL.createObjectURL(objSubmit.image)
                            : `https://storage.googleapis.com/prj1ropel/${data.image}`
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
              <form onSubmit={(event) => handleEditEvent(event)}>
                <div className=" flex flex-col gap-3 sm:gap-6 md:gap-8 px-5 sm:px-10 md:px-16 lg:px-18 xl:px-20  py-5 ms:py-10 ">
                  <Input
                    placeholder="Name"
                    id="input-name"
                    defaultValue={data.name}
                    onChange={(event) =>
                      handleChange(event.target.value, "name")
                    }
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
                    placeholder={`${data.date}`}
                    id="input-date"
                    step="1"
                    defaultValue={jakartaDate}
                    min={`${today.toISOString().slice(0, 16)}`}
                    type="datetime-local"
                    onChange={(event) =>
                      handleChange(event.target.value, "date")
                    }
                  />
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Kuota"
                      id="input-qty"
                      defaultValue={data.quota}
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
                  <Input
                    placeholder="Location"
                    id="input-location"
                    defaultValue={data.location}
                    type="text"
                    onChange={(event) =>
                      handleChange(event.target.value, "location")
                    }
                  />
                  <h1 className="text-xl font-semibold text-center">Ticket</h1>
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Add Ticket"
                      id="input-ticket"
                      type="text"
                      onChange={(event) =>
                        setAddTicket({
                          ...addTicket,
                          type_name: event.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Price"
                      id="input-price"
                      type="number"
                      onChange={(event) =>
                        setAddTicket({
                          ...addTicket,
                          type_price: Number(event.target.value),
                        })
                      }
                    />
                    <ButtonAction
                      label="Add"
                      onClick={(event) => {
                        event.preventDefault();
                        handleAddTicket();
                      }}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 border-2 border-white p-5 rounded-2xl">
                    {MyType &&
                      MyType.map((e, index) => {
                        return (
                          <div
                            key={index}
                            className="grid sm:grid-cols-2 gap-3 bg-slate-600 p-5 rounded-2xl"
                          >
                            <div className="bg-orange-200 text-black text-lg py-4 px-3 my-2 font-semibold rounded-2xl">
                              {e && e.type_name}
                            </div>
                            <div className="bg-orange-200 text-black text-lg py-4 px-3 my-2 font-semibold rounded-2xl">
                              {e && e.price}
                            </div>
                            <ButtonAction
                              label="Update"
                              onClick={(event) => {
                                event.preventDefault();
                                handleUpdateTicket(Number(e && e.id));
                                openModal();
                              }}
                            />
                            <ButtonCancelOrDelete
                              label="Delete"
                              onClick={(event) => {
                                event.preventDefault();
                                handleDeleteTicket(Number(e && e.id));
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex flex-col py-5 gap-5 sm:py-10  md:py-16 lg:py-20">
                    <ButtonAction label="Update" type="submit" />
                    <ButtonCancelOrDelete
                      label="Deleted"
                      onClick={(event) => {
                        event.preventDefault();
                        handleDeleteEvent();
                      }}
                    />
                    <button
                      type="button"
                      className="inline-flex justify-center items-center rounded-2xl border border-transparent bg-orange-500 px-2 py-3 text-xl font-semibold text-white hover:bg-orange-700 hover:text-white focus:outline-none "
                      onClick={() => navigate("/my-event")}
                    >
                      Back to My Event
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Modal */}
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
                <div className="fixed inset-0 overflow-y-auto">
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
                      <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="flex flex-col text-lg font-semibold items-center justify-center leading-6 text-gray-900 py-5"
                        >
                          <h1>Update</h1>
                          <div>Ticket_id: {ticket.id?.toString()}</div>
                        </Dialog.Title>
                        <div className="mt-2 text-black flex flex-col gap-5 mb-5">
                          <Input
                            placeholder="Ticket"
                            id="change-ticket"
                            defaultValue={ticket.type_name}
                            type="text"
                            onChange={(event) =>
                              setTicket({
                                ...ticket,
                                type_name: event.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Price"
                            id="input-qty"
                            defaultValue={ticket.price}
                            type="text"
                            onChange={(event) =>
                              setTicket({
                                ...ticket,
                                price: Number(event.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="mt-10 flex justify-between">
                          <button
                            type="button"
                            className="bg-red-600 hover:bg-blue-500 hover:-translate-y-1 duration-300 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold "
                            onClick={closeModal}
                          >
                            close
                          </button>
                          <ButtonAction
                            label="Update"
                            onClick={(event) => {
                              event.preventDefault();
                              UpdateTicketToType();
                            }}
                          />
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EditEvent;

import { FC, Fragment, useEffect, useState, ReactNode } from "react";
import { TbFileInvoice } from "react-icons/tb";
import { useCookies } from "react-cookie";
import Pusher from "pusher-js";
import Swal from "sweetalert2";
import axios from "axios";

import { ButtonAction, ButtonCheckout } from "../../components/Button";
import { DataInvoice, DataEvent, DataTicket } from "../../utils/user";
import { CardModalTicket } from "../../components/Card";
import { Dialog, Transition } from "@headlessui/react";
import { Layout } from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const APP_KEY = "198b35e916a3f0811a9c";
const CLUSTER_NAME = "ap1";

const pusher = new Pusher(APP_KEY, {
  cluster: CLUSTER_NAME,
});

const Transaction: FC = () => {
  const [dataNotFoundPending, setDataNotFoundPending] =
    useState<boolean>(false);
  const [datasTicket, setDatasTicket] = useState<Partial<DataTicket[]>>([]);
  const [dataNotFoundPaid, setDataNotFoundPaid] = useState<boolean>(false);
  const [dataEventPaid, setDataEventPaid] = useState<DataEvent[]>([]);
  const [datas, setDatas] = useState<Partial<DataInvoice>>({});
  const [dataEvent, setDataEvent] = useState<DataEvent[]>([]);
  const [csrfTicket, setCsrfTicket] = useState<string>("");
  const [ticketIsOpen, setTicketIsOpen] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [invoice, setInvoice] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [csrf, setCsrf] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [cookie] = useCookies(["tkn"]);
  const navigate = useNavigate();
  const checkToken = cookie.tkn;
  const [pusherInvoice, setPusherInvoice] = useState<string>("");
  const [pusherStatus, setPusherStatus] = useState<string>("");

  document.title = `List | Transactions Management`;

  useEffect(() => {
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", (data: any) => {
      setPusherInvoice(data.invoice);
      setPusherStatus(data.status);
    });
    return () => {
      channel.unbind("my-event");
      pusher.unsubscribe("my-channel");
    };
  }, []);

  useEffect(() => {
    fetchDataEventPending();
    fetchDataEventPaid();
    handleShowPusher();
  }, [pusherStatus]);

  const handleShowPusher = () => {
    dataEvent.map((e) => {
      if (e.invoice === pusherInvoice) {
        Swal.fire({
          icon: "info",
          title: `${pusherStatus}`,
          text: `INVOICE NO: ${pusherInvoice}`,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setPusherInvoice("");
            setPusherStatus("");
          }
        });
      }
    });

    dataEventPaid.map((e) => {
      if (e.invoice === pusherInvoice) {
        Swal.fire({
          icon: "info",
          title: `${pusherStatus}`,
          text: `INVOICE NO: ${pusherInvoice}`,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setPusherInvoice("");
            setPusherStatus("");
          }
        });
      }
    });
  };

  const fetchDataEventPending = () => {
    axios
      .get(`https://go-event.online/users/transactions?status=pending`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setDataEvent(data.data);
        if (data.data === null) {
          setDataNotFoundPending(true);
        } else {
          setDataNotFoundPending(false);
        }
      })
      .catch((error) => {
        const { message, code } = error.response.data;
        setDataNotFoundPending(true);
      })
      .finally(() => setLoading(false));
  };

  const fetchDataEventPaid = () => {
    axios
      .get(`https://go-event.online/users/transactions?status=paid`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setDataEventPaid(data.data);
        if (data.data === null) {
          setDataNotFoundPaid(true);
        } else {
          setDataNotFoundPaid(false);
        }
      })
      .catch((error) => {
        const { message, code } = error.response.data;
        setDataNotFoundPaid(true);
      })
      .finally(() => setLoading(false));
  };

  const handleInvoiceModal = (invoice: string) => {
    if (invoice !== "") {
      axios
        .get(`https://go-event.online/transactions/${invoice}`, {
          headers: {
            Authorization: `Bearer ${checkToken}`,
          },
        })
        .then((response) => {
          const { data } = response.data;
          setDatas(data.data);
          setCsrf(data.csrf);
          setStatus(data.data.status);
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
          openModal();
          setLoading(false);
        });
    }
  };

  const handleTicketModal = (invoice: string) => {
    axios
      .get(`https://go-event.online/tickets/${invoice}`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setDatasTicket(data.data);
        setCsrfTicket(data.csrf);
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
        openModalTicket();
        setLoading(false);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const openModalTicket = () => {
    setTicketIsOpen(true);
  };

  const closeModalTicket = () => {
    setTicketIsOpen(false);
  };

  useEffect(() => {}, []);

  let dateString: string = "";
  let timeString: string = "";
  let dateStringExp: string = "";
  let timeStringExp: string = "";

  if (datas.date) {
    const dateObj = new Date(datas.date);
    dateString = dateObj.toISOString().slice(0, 10);
    timeString = dateObj.toISOString().slice(11, 19);
  }

  if (datas.expire) {
    const dateObj = new Date(datas.expire);
    dateStringExp = dateObj.toISOString().slice(0, 10);
    timeStringExp = dateObj.toISOString().slice(11, 19);
  }

  const handlePayGopay = () => {
    window.open("https://simulator.sandbox.midtrans.com/qris/index");
  };

  const handlePayBca = () => {
    window.open("https://simulator.sandbox.midtrans.com/bca/va/index");
  };

  const handlePayMandiri = () => {
    window.open(
      "https://simulator.sandbox.midtrans.com/openapi/va/index?bank=mandiri"
    );
  };

  const handlePayIndomaret = () => {
    window.open("https://simulator.sandbox.midtrans.com/indomaret/index");
  };

  return (
    <Layout>
      {loading ? (
        <div className="h-screen text-black bg-white dark:bg-gray-700 font-bold text-3xl flex justify-center pt-24">
          Loading...
        </div>
      ) : (
        <div className="h-full bg-white dark:bg-gray-700 py-10 px-3 md:px-20">
          <div className="bg-gray-300 dark:bg-gray-600 p-5 rounded-3xl">
            <div className="text-lg md:text-2xl font-semibold bg-orange-500 py-8 rounded-3xl my-5 px-5 flex w-[50%]">
              <h1 className="text-white text-lg md:text-2xl font-semibold">
                Pending
              </h1>
            </div>
            <div className="grid grid-cols-3 text-white text-lg md:text-2xl font-semibold bg-black py-8 rounded-3xl my-5">
              <div className="flex justify-center">
                <h1>Event</h1>
              </div>
              <div className="flex justify-center">
                <h1>Invoice</h1>
              </div>
              <div className="flex justify-center">
                <h1>Ticket</h1>
              </div>
            </div>
            {dataNotFoundPending ? (
              <div className="flex justify-center py-16 cols-span-3">
                <h1 className="text-gray-400 text-2xl md:text-3xl lg:text-5xl font-bold ">
                  EMPTY DATA
                </h1>
              </div>
            ) : (
              <div>
                {dataEvent &&
                  dataEvent.map((e: DataEvent, index: number) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 sm:grid-cols-3 text-black text-lg md:text-2xl font-semibold bg-gray-200 dark:bg-gray-700 py-8 rounded-3xl my-5"
                    >
                      <div className="col-span-2 sm:col-span-1 flex justify-center items-center">
                        <h1>{e.event_name}</h1>
                      </div>
                      <div className="flex justify-center">
                        <ButtonCheckout
                          id="1"
                          label="Invoice"
                          onClick={() => {
                            setEventName(e.event_name);
                            setInvoice(e.invoice);
                            handleInvoiceModal(e.invoice);
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="bg-gray-300 dark:bg-gray-600 p-5 rounded-3xl mt-24">
            <div>
              <div className=" text-lg md:text-2xl font-semibold bg-orange-500 py-8 rounded-3xl my-5 px-5 flex w-[50%]">
                <h1 className="text-white text-lg md:text-2xl font-semibold">
                  Success Paid
                </h1>
              </div>
              <div className="grid grid-cols-3 text-white text-lg md:text-2xl font-semibold bg-black py-8 rounded-3xl my-5">
                <div className="flex justify-center">
                  <h1>Event</h1>
                </div>
                <div className="flex justify-center">
                  <h1>Invoice</h1>
                </div>
                <div className="flex justify-center">
                  <h1>Ticket</h1>
                </div>
              </div>
              {dataNotFoundPaid ? (
                <div className="flex justify-center py-16 cols-span-3">
                  <h1 className="text-gray-400 text-2xl md:text-3xl lg:text-5xl font-bold ">
                    EMPTY DATA
                  </h1>
                </div>
              ) : (
                <div>
                  {dataEventPaid &&
                    dataEventPaid.map((e: DataEvent, index: number) => (
                      <div
                        key={index}
                        className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-0  text-black text-lg md:text-2xl font-semibold bg-gray-200 dark:bg-gray-700 py-8 rounded-3xl my-5"
                      >
                        <div className="flex justify-center items-center col-span-2 sm:col-span-1">
                          <h1>{e.event_name}</h1>
                        </div>
                        <div className="flex justify-center">
                          <ButtonCheckout
                            id="1"
                            label="Invoice"
                            onClick={() => {
                              setEventName(e.event_name);
                              setInvoice(e.invoice);
                              handleInvoiceModal(e.invoice);
                            }}
                          />
                        </div>
                        <div className="flex justify-center">
                          <ButtonCheckout
                            id="1"
                            label="Ticket"
                            onClick={() => {
                              handleTicketModal(e.invoice);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* modal invoice */}
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
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-b-2xl bg-black pb-6 text-left align-middle shadow-xl transition-all ">
                    <div className="">
                      <div className="static bg-white h-20 rounded-b-full flex justify-center items-end">
                        <TbFileInvoice className="absolute top-11 overflow-visible  text-7xl p-3 rounded-full border-4 border-white bg-black" />
                      </div>
                      <div className="mt-14 flex flex-col justify-center items-center  font-medium">
                        <h1 className="text-white text-xl">INVOICE</h1>
                        <h1 className="text-gray-500 italic text-md">
                          (NO: {invoice})
                        </h1>
                      </div>
                      <div className="mt-14 pl-10 flex items-center space-x-3 font-medium">
                        <h1 className="text-white text-xl">EVENT NAME : </h1>
                        <h1 className="text-gray-500 text-xl">
                          {eventName.toUpperCase()}
                        </h1>
                      </div>
                      <div className="grid grid-cols-3 px-10 mt-5 font-semibold">
                        <div className="flex flex-col gap-5">
                          <div>
                            <h1 className="text-gray-500">PAYMENT METHODE</h1>
                            <h1>{datas.payment_method}</h1>
                          </div>
                          <div>
                            <h1 className="text-gray-500">STATUS</h1>
                            <h1>{datas.status}</h1>
                          </div>
                          <div>
                            {datas.status !== "paid" ? (
                              <div>
                                {datas.payment_method === "gopay" ? (
                                  <div>
                                    <h1>
                                      <img
                                        src="https://api.sandbox.midtrans.com/v2/gopay/f597999d-75e7-4c58-894a-afe87ba525c8/qr-code"
                                        alt=""
                                        className="w-24"
                                      />
                                    </h1>
                                  </div>
                                ) : (
                                  <div className="flex flex-col">
                                    <h1>Virtual Account</h1>
                                    <h1 className="text-gray-500">
                                      {datas.payment_code}
                                    </h1>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          {datas.status === "pending" ? (
                            <div>
                              {datas.payment_method === "gopay" ? (
                                <button
                                  type="button"
                                  className="w-full bg-orange-500 hover:bg-@028090 hover:-translate-y-1 duration-300 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                                  onClick={() => {
                                    closeModal();
                                    handlePayGopay();
                                  }}
                                >
                                  Pay Now
                                </button>
                              ) : datas.payment_method === "bca" ? (
                                <button
                                  type="button"
                                  className="w-full  bg-orange-500 hover:bg-@028090 hover:-translate-y-1 duration-300 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                                  onClick={() => {
                                    closeModal();
                                    handlePayBca();
                                  }}
                                >
                                  Pay Now
                                </button>
                              ) : datas.payment_method === "mandiri" ? (
                                <button
                                  type="button"
                                  className="w-full  bg-orange-500 hover:bg-@028090 hover:-translate-y-1 duration-300 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                                  onClick={() => {
                                    closeModal();
                                    handlePayMandiri();
                                  }}
                                >
                                  Pay Now
                                </button>
                              ) : datas.payment_method === "indomaret" ? (
                                <button
                                  type="button"
                                  className=" w-full bg-orange-500 hover:bg-@028090 hover:-translate-y-1 duration-300 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                                  onClick={() => {
                                    closeModal();
                                    handlePayIndomaret();
                                  }}
                                >
                                  Pay Now
                                </button>
                              ) : (
                                <></>
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="flex flex-col items-center">
                          <h1 className="text-gray-500">AMOUNT PAID</h1>
                          <h1>Rp {datas && datas.total?.toLocaleString()}</h1>
                        </div>
                        <div>
                          <div>
                            <h1 className="text-gray-500">DATE</h1>
                            <h1>{dateString}</h1>
                            <h1>at {timeString} WIB</h1>
                          </div>
                          <div>
                            <h1 className="text-gray-500 mt-5">
                              {datas.status === "paid" ? "" : "EXPIRED"}
                            </h1>
                            <h1>
                              {datas.status === "paid" ? "" : dateStringExp}
                            </h1>
                            <h1>
                              {" "}
                              {datas.status === "paid"
                                ? ""
                                : `at ${timeStringExp} WIB`}
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="p-10 ">
                        <h1>SUMMARY</h1>
                        <div className="rounded-2xl border-2 border-white p-5">
                          <table className="w-full">
                            {datas.item_details?.map((e) => (
                              <tr className="border-2 text-center">
                                <th>{e.name}</th>
                                <td>{e.price}</td>
                                <td className="flex justify-center">
                                  {e.qty}
                                  <div className="mx-1">
                                    {e.qty <= 1 ? "pc" : "pcs"}
                                  </div>{" "}
                                </td>
                                <td>Rp {e.sub_total?.toLocaleString("id")}</td>
                              </tr>
                            ))}
                            <tr className="border-2 text-center">
                              <th></th>
                              <td></td>
                              <td>Total</td>
                              <td>Rp {datas.total?.toLocaleString()}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between px-10">
                        <button
                          type="button"
                          className="bg-red-600 hover:bg-blue-500 hover:-translate-y-1 duration-300 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold "
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          close
                        </button>
                        <ButtonAction
                          label="Print"
                          onClick={() => window.print()}
                        />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      {/* { modal ticket} */}
      <div>
        <Transition appear show={ticketIsOpen} as={Fragment}>
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
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-b-2xl bg-black pb-6 text-left align-middle shadow-xl transition-all ">
                    <div className="">
                      <div className="static bg-white h-20 rounded-b-full flex justify-center items-end">
                        <TbFileInvoice className="absolute top-11 overflow-visible  text-7xl p-3 rounded-full border-4 border-white bg-black" />
                      </div>
                      <div className="mt-14 flex flex-col justify-center items-center  font-medium">
                        <h1 className="text-white text-xl">TICKET</h1>
                      </div>
                      <div className="pt-10 px-3 sm:px-10 ">
                        {datasTicket &&
                          datasTicket.map((e) => {
                            let dateString: string = "";
                            let timeString: string = "";
                            if (e) {
                              const date = new Date(e.date);
                              const option = {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour12: false,
                              } as Intl.DateTimeFormatOptions;
                              dateString = date.toLocaleDateString(
                                "en-US",
                                option
                              );
                              timeString = date.toLocaleTimeString();
                              return (
                                <div>
                                  <CardModalTicket
                                    type={e.ticket_type}
                                    name={e.event_name}
                                    date={dateString}
                                    time={timeString}
                                    location={e.location}
                                    hosted_by={e.hosted_by}
                                  />
                                </div>
                              );
                            }
                          })}
                      </div>
                      <div className="flex justify-between px-10 py-10">
                        <button
                          type="button"
                          className="bg-red-600 hover:bg-blue-500 hover:-translate-y-1 duration-300 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold "
                          onClick={closeModalTicket}
                        >
                          close
                        </button>
                        <ButtonAction
                          label="Print"
                          onClick={() => window.print()}
                        />
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

export default Transaction;

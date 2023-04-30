import {
  FC,
  Fragment,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { Layout } from "../components/Layout";
import { ButtonAction, ButtonCheckout } from "../components/Button";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { TbFileInvoice, TbDownload } from "react-icons/tb";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CardModalTicket } from "../components/Card";
import { useCookies } from "react-cookie";

interface DataInvoice {
  total: string;
  date: string;
  expire: string;
  payment_method: string;
  status: string;
  payment_code: string;
  item_details: [
    {
      name: ReactNode;
      price: number;
      qty: number;
      sub_total: number;
    }
  ];
}

interface DataEvent {
  event_name: string;
  invoice: string;
}

interface DataTicket {
  date: string;
  event_name: string;
  hosted_by: string;
  location: string;
  ticket_type: string;
}

const DetailTransaction: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketIsOpen, setTicketIsOpen] = useState(false);
  const [csrf, setCsrf] = useState<string>("");
  const [csrfTicket, setCsrfTicket] = useState<string>("");
  const [dataEvent, setDataEvent] = useState<DataEvent[]>([]);
  const [datas, setDatas] = useState<Partial<DataInvoice>>({});
  const [datasTicket, setDatasTicket] = useState<Partial<DataTicket[]>>([]);
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  document.title = `Detail | Transactions Management`;

  useEffect(() => {
    fetchDataEvent();
  }, []);

  const fetchDataEvent = () => {
    axios
      .get(`/users/transactions`)
      .then((response) => {
        const { data } = response.data;
        setDataEvent(data.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleInvoiceModal = (invoice: string) => {
    if (invoice !== "") {
      console.log(invoice);
      axios
        .get(`/transactions/{${invoice}}`)
        .then((response) => {
          const { data } = response.data;
          setDatas(data.data);
          setCsrf(data.csrf);
          setStatus(data.data.status);
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
          openModal();
          setLoading(false);
        });
    }
  };

  const handleTicketModal = (invoice: string) => {
    if (invoice !== "") {
      console.log(invoice);
      axios
        .get(`/transactions/{${invoice}}`)
        .then((response) => {
          const { data } = response.data;
          setStatus(data.data.status);
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
          if (status === "unpaid" || status === "") {
            Swal.fire({
              icon: "info",
              title: "please pay first",
              showCancelButton: false,
            });
          } else {
            axios
              .get(`/tickets/${invoice}`)
              .then((response) => {
                const { data } = response.data;
                setDatasTicket(data.data);
                setCsrfTicket(data.csrf);
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
                openModalTicket();
                setLoading(false);
              });
          }
        });
    }
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

  let localDateStr: string = "";
  let localTimeStr: string = "";
  let localDateStrExp: string = "";
  let localTimeStrExp: string = "";

  if (datas.date) {
    const option = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
    } as Intl.DateTimeFormatOptions;
    const dateObj = new Date(datas.date);
    localTimeStr = dateObj.toLocaleTimeString();
    localDateStr = dateObj.toLocaleDateString("en-US", option);
  }
  if (datas.expire) {
    const option = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
    } as Intl.DateTimeFormatOptions;
    const dateObj = new Date(datas.expire);
    localTimeStrExp = dateObj.toLocaleTimeString();
    localDateStrExp = dateObj.toLocaleDateString("en-US", option);
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
        <div className="h-screen text-black bg-white font-bold text-3xl flex justify-center pt-24">
          Loading...
        </div>
      ) : (
        <div className="h-screen bg-white py-10 px-3 md:px-20">
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
          {dataEvent &&
            dataEvent.map((e: DataEvent, index: number) => (
              <div
                key={index}
                className="grid grid-cols-3 text-black text-lg md:text-2xl font-semibold bg-gray-200 py-8 rounded-3xl my-5"
              >
                <div className="flex justify-center">
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
                        <h1 className="text-gray-500 text-xl">{eventName}</h1>
                      </div>
                      <div className="grid grid-cols-3 px-10 mt-5 font-semibold">
                        <div>
                          <h1 className="text-gray-500">AMOUNT PAID</h1>
                          <h1>Rp {datas && datas.total}</h1>
                        </div>
                        <div>
                          <div>
                            <h1 className="text-gray-500">DATE</h1>
                            <h1>{localDateStr}</h1>
                            <h1>at {localTimeStr}</h1>
                          </div>
                          <div>
                            <h1 className="text-gray-500 mt-5">EXPIRED</h1>
                            <h1>{localDateStrExp}</h1>
                            <h1>at {localTimeStrExp}</h1>
                          </div>
                        </div>
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
                          {datas.status === "unpaid" ? (
                            <div>
                              {datas.payment_method === "gopay" ? (
                                <button
                                  type="button"
                                  className="w-full bg-orange-500 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                                  onClick={handlePayGopay}
                                >
                                  Pay Now
                                </button>
                              ) : datas.payment_method === "bca" ? (
                                <button
                                  type="button"
                                  className="w-full  bg-orange-500 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                                  onClick={handlePayBca}
                                >
                                  Pay Now
                                </button>
                              ) : datas.payment_method === "mandiri" ? (
                                <button
                                  type="button"
                                  className="w-full  bg-orange-500 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                                  onClick={handlePayMandiri}
                                >
                                  Pay Now
                                </button>
                              ) : datas.payment_method === "indomaret" ? (
                                <button
                                  type="button"
                                  className=" w-full bg-orange-500 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                                  onClick={handlePayIndomaret}
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
                                <td>Rp {e.sub_total}</td>
                              </tr>
                            ))}
                            <tr className="border-2 text-center">
                              <th></th>
                              <td></td>
                              <td>Total</td>
                              <td>Rp {datas.total}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      {/* <div className="flex justify-end px-10">
                        <button className="flex space-x-2 bg-@028090 px-3 py-2 rounded-3xl">
                          <Link
                            to="/pdf"
                            target="_blank"
                            className="flex space-x-3 px-3"
                          >
                            <TbDownload className="text-2xl" />
                            <h1>pdf</h1>
                          </Link>
                        </button>
                      </div> */}
                      <div className="mt-4 flex justify-between px-10">
                        <button
                          type="button"
                          className="bg-red-600 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                          onClick={closeModal}
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
                          className="bg-red-600 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold "
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

export default DetailTransaction;

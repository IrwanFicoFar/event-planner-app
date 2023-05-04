import { Dialog, Listbox, Transition } from "@headlessui/react";
import { MdArrowForwardIos, MdCheck } from "react-icons/md";
import { FC, Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { CardCart, PaymentMethode, CardSummary } from "../../components/Card";
import { Option, DataCartType, ModalInvoiceType } from "../../utils/user";
import { ButtonCheckout } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { TbFileInvoice } from "react-icons/tb";

const options: Option[] = [
  {
    id: "1",
    name: "BCA",
    image: "bca.png",
  },
  {
    id: "2",
    name: "MANDIRI",
    image: "Mandiri_logo.png",
  },
  {
    id: "3",
    name: "INDOMARET",
    image: "indomaret.png",
  },
  {
    id: "4",
    name: "GOPAY",
    image: "gopay.png",
  },
];

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Cart: FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [openModalInvoice, setOpenModalInvoice] = useState<boolean>(false);
  const [dataNotFoundCart, setDataNotFoundCart] = useState<boolean>(false);
  const [modalInvoice, setModalInvoice] = useState<ModalInvoiceType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<DataCartType[]>([]);
  const [total, setTotal] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const [invoice, setInvoice] = useState("");

  const [cookie] = useCookies(["tkn"]);
  const navigate = useNavigate();
  const checkToken = cookie.tkn;

  document.title = `Cart | Transactions Management`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://go-event.online/transactions/cart`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setType(data.data);
        setTotal(data.total);
      })
      .catch((error) => {
        const { message, code } = error.response.data;
        if (message === "Data Not Found") {
          setDataNotFoundCart(true);
        } else {
          Swal.fire({
            icon: "error",
            title: code,
            text: message,
            showCancelButton: false,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    if (dataNotFoundCart === true) {
      Swal.fire({
        icon: "warning",
        title: "add ticket please !!",
        showCancelButton: false,
      });
    } else {
      setIsOpen(true);
    }
  };

  const handleCheckout = () => {
    const event_id = type[0].event_id;
    const data = {
      event_id: event_id,
      payment_type: `${selectedOption.name.toLowerCase()}`,
      items_detail: type,
    };
    if (event_id === undefined) {
      Swal.fire({
        icon: "warning",
        text: "add ticket please !!",
        showCancelButton: false,
      });
    } else {
      axios
        .post(`https://go-event.online/transactions/checkout`, data, {
          headers: {
            Authorization: `Bearer ${checkToken}`,
          },
        })
        .then((response) => {
          const { message, code, data } = response.data;
          setModalInvoice(data.data);
          setInvoice(data.data.invoice);
          Swal.fire({
            icon: "success",
            title: code,
            text: message,
            showCancelButton: false,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              closeModal();
              setOpenModalInvoice(true);
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
        .finally(() => {});
    }
  };

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
      <div className="h-full grid grid-cols-1 md:grid-cols-2">
        {loading ? (
          <div className=" text-white bg-black font-bold text-3xl flex justify-center pt-24">
            Loading...
          </div>
        ) : (
          <div className="p-10 flex flex-col gap-5">
            <div>
              <div className="grid grid-cols-4 items-center bg-gray-800 text-white text-md md:text-xl font-semibold h-16 px-5 rounded-3xl">
                <div className="flex justify-center">
                  <h1>Ticket</h1>
                </div>
                <div className="flex justify-center">
                  <h1>Price</h1>
                </div>
                <div className="flex justify-center">
                  <h1>Qty</h1>
                </div>
                <div className="flex justify-center">
                  <h1>Sub Total</h1>
                </div>
              </div>
            </div>
            {dataNotFoundCart ? (
              <div className=" flex justify-center py-16 cols-span-3">
                <h1 className="text-gray-400 text-2xl md:text-3xl lg:text-5xl font-bold ">
                  EMPTY DATA
                </h1>
              </div>
            ) : (
              <div>
                {type &&
                  type.map((e) => (
                    <div key={e && e.type_id}>
                      <CardCart
                        Event={e && e.type_name}
                        Price={e && e.type_price}
                        Qty={e && e.qty}
                        SubTotal={e && e.sub_total}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
        <div className="bg-white rounded-l-3xl p-10">
          <div className="top-16">
            <Listbox value={selectedOption} onChange={setSelectedOption}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="flex items-center justify-between relative w-full py-2 bg-white hover:bg-orange-400 text-black rounded-3xl border-4 border-black shadow-md duration-300  focus:outline-none sm:text-sm">
                      <span className="flex items-center sm:text-xl font-semibold">
                        <PaymentMethode
                          id={selectedOption.id}
                          image={selectedOption.image}
                        />
                        {selectedOption.name}
                      </span>
                      <span className="inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <MdArrowForwardIos
                          className={`${
                            open ? "rotate-90 transform" : ""
                          } text-2xl font-semibold mr-2`}
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      show={open}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Listbox.Options className="border-4 border-black w-full py-1 mt-1 overflow-auto text-base bg-white rounded-3xl shadow-lg sm:text-sm">
                        {options.map((option) => (
                          <Listbox.Option
                            key={option.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-black text-xl bg-orange-200"
                                  : "text-gray-900",
                                "cursor-default select-none relative py-3 sm:py-7 pl-3 pr-9"
                              )
                            }
                            value={option}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center text-lg">
                                  <img
                                    className="h-10 w-auto mr-3"
                                    src={option.image}
                                    alt=""
                                  />
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "block truncate"
                                    )}
                                  >
                                    {option.name}
                                  </span>
                                </div>
                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <MdCheck
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div className="bg-black mt-10 sm:mt-20 rounded-3xl p-10">
            <h1 className="text-xl font-semibold">Detail order</h1>
            <div className="flex justify-between py-10">
              <h1 className="text-xl font-semibold">Total</h1>
              <h1 className="text-xl font-semibold">
                Rp {total?.toLocaleString("id-ID")}
              </h1>
            </div>
            <div className=" flex flex-col">
              <ButtonCheckout
                label="Checkout "
                onClick={() => {
                  openModal();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Modal proccess*/}
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
                    <div className="mt-2 text-black">
                      <div className="grid grid-cols-2">
                        <div className="flex flex-col col-span-2">
                          <h1 className="text-xl font-semibold">Summary</h1>
                          <div className="bg-gray-300 rounded-t-3xl rounded-b-3xl my-5">
                            <div>
                              <div className="grid grid-cols-4 items-center bg-gray-800 text-white text-md md:text-xl font-semibold h-16 px-5 rounded-3xl">
                                <div className="flex justify-center">
                                  <h1>Ticket</h1>
                                </div>
                                <div className="flex justify-center">
                                  <h1>Price</h1>
                                </div>
                                <div className="flex justify-center">
                                  <h1>Qty</h1>
                                </div>
                                <div className="flex justify-center">
                                  <h1>Sub Total</h1>
                                </div>
                              </div>
                            </div>
                            {type &&
                              type.map((e) => (
                                <div>
                                  <CardSummary
                                    key={e && e.type_id}
                                    Event={e && e.type_name}
                                    Price={e && e.type_price}
                                    Qty={e && e.qty}
                                    SubTotal={e && e.sub_total}
                                  />
                                </div>
                              ))}
                            <div className="grid grid-cols-4 text-black sm:text-xl font-semibold px-5 mt-3 py-2 border-b-4 border-gray-800 rounded-b-3xl">
                              <div className="flex justify-center"></div>
                              <div className="flex justify-center"></div>
                              <div className="flex justify-center">Total</div>
                              <div className="flex justify-center">
                                <h1>Rp {total?.toLocaleString("id-ID")}</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-around p-5 bg-gray-200 rounded-3xl mr-2">
                          <h1 className="font-semibold">Payment Methode</h1>
                          <img src={selectedOption.image} alt="" />
                        </div>
                        <div className="bg-black rounded-3xl p-5 text-white flex flex-col justify-between ml-2">
                          <div className="flex flex-col sm:flex-row pb-5 ">
                            <h1 className="md:text-xl font-semibold">
                              all data is right ?
                            </h1>
                          </div>
                          <div className=" flex flex-col gap-5">
                            <ButtonCheckout
                              label="Proccess"
                              onClick={() => handleCheckout()}
                            />
                            <button
                              type="button"
                              className="bg-red-600 hover:bg-blue-500 hover:-translate-y-1 duration-300 py-2 px-10 inline-flex justify-center items-center rounded-2xl  text-white font-semibold "
                              onClick={() => {
                                closeModal();
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between"></div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      {/* Modal after proccess*/}{" "}
      <div>
        <Transition appear show={openModalInvoice} as={Fragment}>
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
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-b-2xl bg-black pb-6 text-left align-middle shadow-xl transition-all border-white border-2 ">
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
                        <h1 className="text-gray-500 text-xl">{}</h1>
                      </div>
                      <div className="grid grid-cols-3 gap-2 px-10 mt-5 font-semibold">
                        <div className="flex flex-col gap-5">
                          <div>
                            <h1 className="text-gray-500">PAYMENT METHODE</h1>
                            <h1>
                              {modalInvoice?.payment_method.toUpperCase()}
                            </h1>
                          </div>
                          <div>
                            <h1 className="text-gray-500">PAYMENT CODE</h1>
                            {modalInvoice?.payment_method === "gopay" ? (
                              <div>
                                <h1>
                                  <img
                                    src="https://api.sandbox.midtrans.com/v2/gopay/f597999d-75e7-4c58-894a-afe87ba525c8/qr-code"
                                    alt=""
                                    className="w-24"
                                  />
                                </h1>
                                <h1>{modalInvoice?.payment_code}</h1>
                              </div>
                            ) : (
                              <div className="flex flex-col">
                                <h1>Virtual Account</h1>
                                <h1 className="text-gray-500">
                                  {modalInvoice?.payment_code}
                                </h1>
                              </div>
                            )}
                          </div>
                          {modalInvoice?.payment_method === "gopay" ? (
                            <button
                              type="button"
                              className="w-full bg-orange-500 hover:bg-@028090 hover:-translate-y-1 duration-300 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                              onClick={() => {
                                handlePayGopay();
                                navigate("/transaction");
                              }}
                            >
                              Pay Now
                            </button>
                          ) : modalInvoice?.payment_method === "bca" ? (
                            <button
                              type="button"
                              className="w-full  bg-orange-500 hover:bg-@028090 hover:-translate-y-1 duration-300 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                              onClick={() => {
                                handlePayBca();
                                navigate("/transaction");
                              }}
                            >
                              Pay Now
                            </button>
                          ) : modalInvoice?.payment_method === "mandiri" ? (
                            <button
                              type="button"
                              className="w-full  bg-orange-500 hover:bg-@028090 hover:-translate-y-1 duration-300 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                              onClick={() => {
                                handlePayMandiri();
                                navigate("/transaction");
                              }}
                            >
                              Pay Now
                            </button>
                          ) : modalInvoice?.payment_method === "indomaret" ? (
                            <button
                              type="button"
                              className=" w-full bg-orange-500 hover:bg-@028090 hover:-translate-y-1 duration-300 py-2 px-2 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold"
                              onClick={() => {
                                handlePayIndomaret();
                                navigate("/transaction");
                              }}
                            >
                              Pay Now
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="text-center">
                          <h1 className="text-gray-500">AMOUNT PAID</h1>
                          <h1>
                            Rp {modalInvoice?.total?.toLocaleString("id")}
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-gray-500">PAY BEFORE</h1>
                          <h1>{modalInvoice?.expire}</h1>
                        </div>
                      </div>
                      <div className="p-10 ">
                        <h1>SUMMARY</h1>
                        <div className="rounded-2xl border-2 border-white p-5">
                          <table className="w-full">
                            {type?.map((e) => (
                              <tr className="border-2 text-center">
                                <th>{e.type_name}</th>
                                <td>{e.type_price}</td>
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
                              <td>Rp {total?.toLocaleString("id")}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between px-10">
                        <button
                          type="button"
                          className="bg-red-600 hover:bg-blue-500 hover:-translate-y-1 duration-300 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold "
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          close
                        </button>
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

export default Cart;

{
  /* <div>
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
                      <h1>Transaction</h1>
                      <h1 className="italic text-gray-500">(NO:{invoice})</h1>
                    </Dialog.Title>
                    <div className="mt-2 text-black">
                      <div className="grid grid-cols-2">
                        <div className="flex flex-col justify-center">
                          <h1 className="text-xl font-semibold">
                            Payment Methode
                          </h1>
                          <img src={selectedOption.image} alt="" />
                        </div>
                        <div className="bg-black rounded-3xl p-5 text-white flex flex-col justify-between">
                          <div className="flex flex-col sm:flex-row justify-between py-5 ">
                            <h1 className="md:text-xl font-semibold">Total</h1>
                            <h1 className="md:text-xl font-semibold">
                              {total}
                            </h1>
                          </div>
                          <div className=" flex flex-col">
                            <ButtonCheckout
                              label="Pay Now"
                              onClick={() => payBca()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        className="bg-red-600 hover:bg-blue-500 hover:-translate-y-1 duration-300 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold "
                        onClick={() => {
                          closeModal();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="bg-red-600 hover:bg-blue-500 hover:-translate-y-1 duration-300 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold "
                        onClick={() => {
                          navigate(`/transaction`);
                        }}
                      >
                        List transaction
                      </button>
                      <div className="text-black flex space-x-3 items-center ">
                        <h1>Pay before : {} </h1>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>{" "} */
}

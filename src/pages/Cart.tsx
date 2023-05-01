import { FC, Fragment, useState, useEffect, createContext } from "react";
import { Layout } from "../components/Layout";
import { CardCart, PaymentMethode } from "../components/Card";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { MdArrowForwardIos, MdCheck } from "react-icons/md";
import { ButtonCheckout } from "../components/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const InvoiceContext = createContext("");

interface Option {
  id: string;
  name: string;
  image: string;
}

const options: Option[] = [
  {
    id: "1",
    name: "bca",
    image: "bca.png",
  },
  {
    id: "2",
    name: "mandiri",
    image: "Mandiri_logo.png",
  },
  {
    id: "3",
    name: "indomaret",
    image: "indomaret.png",
  },
  {
    id: "4",
    name: "gopay",
    image: "gopay.png",
  },
];

interface DataCartType {
  event_id: number;
  type_id: number;
  type_name: string;
  type_price: string;
  qty: number;
  sub_total: number;
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Cart: FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [datas, setDatas] = useState<Partial<DataCartType[]>>([]);
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [invoice, setInvoice] = useState("");
  const navigate = useNavigate();

  document.title = `Cart | Transactions Management`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`transactions/cart`)
      .then((response) => {
        const { data } = response.data;
        setDatas(data.data);
        setTotal(data.total);
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

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleCheckout = () => {
    axios
      .post(`/transactions/checkout`, {
        event_id: datas?.[0]?.event_id,
        payment_methode: selectedOption,
        items_detail: datas,
      })
      .then((response) => {
        const { message, code, data } = response.data;
        setInvoice(data.invoice);
        Swal.fire({
          icon: "success",
          title: code,
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            openModal();
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error,
          showCancelButton: false,
        });
      })
      .finally(() => {});
  };

  console.log(invoice);
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
            {datas &&
              datas.map((e) => (
                <CardCart
                  key={e && e.type_id}
                  Event={e && e.type_name}
                  Price={e && e.type_price}
                  Qty={e && e.qty}
                  SubTotal={e && e.sub_total}
                />
              ))}
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
              <h1 className="text-xl font-semibold">Rp {total}</h1>
            </div>
            <div className=" flex flex-col">
              <ButtonCheckout
                label="Checkout "
                onClick={() => {
                  handleCheckout();
                }}
              />
            </div>
          </div>
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
                              label="Detail Transactions"
                              onClick={() => navigate(`/detail-transaction`)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        className="bg-red-600 hover:bg-blue-500 hover:-translate-y-1 duration-300 py-3 px-10 inline-flex justify-center items-center rounded-2xl text-lg sm:text-xl  text-white font-semibold "
                        onClick={closeModal}
                      >
                        close
                      </button>
                      <div className="text-black flex space-x-3 items-center ">
                        <h1>Pay before :</h1>
                        {/* {showTimer && (
                          <CountdownTimer
                            duration={displayCount}
                            onComplete={handleTimerComplete}
                          />
                        )} */}
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

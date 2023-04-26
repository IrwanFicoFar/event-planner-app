import { FC, Fragment, useState } from "react";
import { Layout } from "../components/Layout";
import { ButtonAction, ButtonCheckout } from "../components/Button";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { TbFileInvoice, TbDownload } from "react-icons/tb";
import { Link } from "react-router-dom";
// import "../styles/print.css";

const DetailTransaction: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketIsOpen, setTicketIsOpen] = useState(false);

  const handleInvoiceModal = () => {
    openModal();
  };

  const handleTicketModal = () => {
    openModalTicket();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModalTicket = () => {
    setTicketIsOpen(false);
  };

  const openModalTicket = () => {
    setTicketIsOpen(true);
  };

  return (
    <Layout>
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
        <div className="grid grid-cols-3 text-black md:text-xl font-semibold bg-gray-200 py-5 items-center rounded-3xl my-5">
          <div className="flex justify-center">
            <h1>{"Web Design"}</h1>
          </div>
          <div className="flex justify-center">
            <ButtonCheckout
              id="1"
              label="Invoice"
              onClick={() => handleInvoiceModal()}
            />
          </div>
          <div className="flex justify-center">
            <ButtonCheckout
              id="1"
              label="Ticket"
              onClick={() => handleTicketModal()}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 place-items-center text-black md:text-xl font-semibold bg-gray-200 py-5 items-center rounded-3xl my-5">
          <div className="">
            <h1>{"Javascript"}</h1>
          </div>
          <div className="">
            <ButtonCheckout
              id="2"
              label="Invoice"
              onClick={() => handleInvoiceModal()}
            />
          </div>
          <div className="">
            <ButtonCheckout
              id="2"
              label="Ticket"
              onClick={() => handleTicketModal()}
            />
          </div>
        </div>
      </div>
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
                          {"(NO: INV232323232 )"}
                        </h1>
                      </div>
                      <div className="grid grid-cols-3 px-10 mt-10 font-semibold">
                        <div>
                          <h1 className="text-gray-500">AMOUNT PAID</h1>
                          <h1>Rp 250.000</h1>
                        </div>
                        <div>
                          <h1 className="text-gray-500">DATE PAID</h1>
                          <h1>APRIL 23, 2023</h1>
                        </div>
                        <div className="flex flex-col gap-5">
                          <div>
                            <h1 className="text-gray-500">PAYMENT METHODE</h1>
                            <h1>GOPAY</h1>
                          </div>
                          <div>
                            <h1 className="text-gray-500">STATUS</h1>
                            <h1>UNPAID</h1>
                          </div>
                          <div>
                            <h1 className="text-gray-500">PAYMENT CODE</h1>
                            <h1>
                              <img
                                src="https://api.sandbox.midtrans.com/v2/gopay/f597999d-75e7-4c58-894a-afe87ba525c8/qr-code"
                                alt=""
                                className="w-24"
                              />
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="p-10 ">
                        <h1>SUMMARY</h1>
                        <div className="rounded-2xl border-2 border-white p-5">
                          <table className="w-full">
                            <tr className="border-b-2 border-white text-center">
                              <th>Mythic</th>
                              <td>Rp 150.000</td>
                              <td>1 pc</td>
                              <td>Rp 150.000</td>
                            </tr>
                            <tr className="border-b-2 border-white text-center">
                              <th>Legend</th>
                              <td>Rp 100.000</td>
                              <td>2 pcs</td>
                              <td>Rp 200.000</td>
                            </tr>
                            <tr className=" text-center">
                              <th></th>
                              <td></td>
                              <td>Total</td>
                              <td>Rp 350.000</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <div className="flex justify-end px-10">
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
                      </div>
                      <div className="mt-4 flex justify-between px-10">
                        <button
                          type="button"
                          className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
      {/* modal ticket */}
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
                      <div className="pt-10 px-3 sm:px-10">
                        <div className="rounded-2xl bg-amber-500 p-4 flex border-2">
                          <div className=" rounded-2xl my-16 -rotate-90 text-black text-3xl font-semibold w-[10%] mr-2 flex justify-center">
                            MYTHIC
                          </div>
                          <div className="bg-white w-[100%] rounded-2xl text-black p-5 flex flex-col justify-between">
                            <div>
                              <h1 className="text-2xl font-semibold mb-1">
                                WEB Design
                              </h1>
                              <p className="font-semibold">
                                Wednesdey, April 12, 2023 at 19.00 WIB
                              </p>
                              <p className="font-semibold">
                                Jakarta Convention Center
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold">Irwan</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-10 px-3 sm:px-10 ">
                        <div className="rounded-2xl bg-teal-500 p-4 flex border-2">
                          <div className=" rounded-2xl my-16 -rotate-90 text-black text-3xl font-semibold w-[10%] mr-2 flex justify-center">
                            LEGEND
                          </div>
                          <div className="bg-white w-[100%] rounded-2xl text-black p-5 flex flex-col justify-between">
                            <div>
                              <h1 className="text-2xl font-semibold mb-1">
                                WEB Design
                              </h1>
                              <p className="font-semibold">
                                Wednesdey, April 12, 2023 at 19.00 WIB
                              </p>
                              <p className="font-semibold">
                                Jakarta Convention Center
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold">Irwan</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-10 px-3 sm:px-10">
                        <div className="rounded-2xl bg-teal-500 p-4 flex border-2">
                          <div className=" rounded-2xl my-16 -rotate-90 text-black text-3xl font-semibold w-[10%] mr-2 flex justify-center">
                            LEGEND
                          </div>
                          <div className="bg-white w-[100%] rounded-2xl text-black p-5 flex flex-col justify-between">
                            <div>
                              <h1 className="text-2xl font-semibold mb-1">
                                WEB Design
                              </h1>
                              <p className="font-semibold">
                                Wednesdey, April 12, 2023 at 19.00 WIB
                              </p>
                              <p className="font-semibold">
                                Jakarta Convention Center
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold">Irwan</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between px-10 py-10">
                        <button
                          type="button"
                          className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

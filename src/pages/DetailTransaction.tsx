import { FC, Fragment, useState } from "react";
import { Layout } from "../components/Layout";
import { ButtonAction, ButtonCheckout } from "../components/Button";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { TbFileInvoice, TbDownload } from "react-icons/tb";
import { Link } from "react-router-dom";

const DetailTransaction: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInvoiceModal = () => {
    openModal();
  };

  const handleTicketModal = () => {
    alert("ticket Modal");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Layout>
      <div className="h-screen bg-white py-10 px-20">
        <div className="grid grid-cols-3 text-white text-2xl font-semibold bg-black py-8 rounded-3xl my-5">
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
        <div className="grid grid-cols-3 text-black text-xl font-semibold bg-gray-200 py-5 items-center rounded-3xl my-5">
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
        <div className="grid grid-cols-3 place-items-center text-black text-xl font-semibold bg-gray-200 py-5 items-center rounded-3xl my-5">
          <div className="">
            <h1>{"Javascript Learning"}</h1>
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
      <div id="pdf-content">
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
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-b-2xl bg-black pb-6 text-left align-middle shadow-xl transition-all">
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
                    <div className="p-10">
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
                        <Link to="/pdf" target="_blank">
                          <TbDownload className="text-2xl" />
                          <h1>pdf</h1>
                        </Link>
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        close
                      </button>
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

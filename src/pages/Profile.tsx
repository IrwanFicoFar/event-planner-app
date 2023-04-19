import { FC, useState, Fragment } from "react";
import { Layout } from "../components/Layout";
import { ButtonAction, ButtonCancelOrDelete } from "../components/Button";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "../components/Input";

interface UserEdit {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  image: any;
}

const Profile: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<Partial<UserEdit>>({});
  const [objSubmit, setObjSubmit] = useState<Partial<UserEdit>>({});

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const handleChange = (value: string | File, key: keyof typeof objSubmit) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleUpdate = () => {
    console.log("update");
    setIsOpen(false);
  };

  return (
    <Layout>
      <div className="flex flex-col bg-white pb-20">
        <div className="relative h-40 bg-@night rounded-b-@nice flex flex-col place-content-end">
          <h1 className="hidden md:block ml-100 text-white text-3xl font-semibold mb-3">
            Detail
          </h1>
        </div>
        <div className="absolute md:ml-40 mt-10 w-full  flex justify-center md:justify-start">
          <div
            className={`rounded-full border-8 border-white w-40 h-40 sm:w-56 sm:h-56 bg-[url(/avatar.jpg)] bg-center bg-cover`}
          ></div>
        </div>

        <div className="h-10 sm:h-20 md:h-40 bg-white">
          <h1 className="hidden md:block ml-100 text-black text-3xl font-semibold mt-3">
            User Profile
          </h1>
        </div>
        {/* main */}
        <div className="container mx-auto bg-black md:mt-5 rounded-xl sm:rounded-2xl md:rounded-@yes flex">
          <div className="flex flex-col gap-8 p-10 sm:p-20 w-full lg:w-[60%]">
            <div className="flex h-16 sm:h-20 gap-8">
              <div className="w-40 flex items-center">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                  Name
                </h1>
              </div>
              <div className="bg-white w-full rounded-3xl flex items-center px-5">
                <h1 className="text-black text-lg sm:text-xl md:text-2xl font-semibold ">
                  string
                </h1>
              </div>
            </div>
            <div className="flex h-16 sm:h-20 gap-8">
              <div className="w-40 flex items-center">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                  Email
                </h1>
              </div>
              <div className="bg-white w-full rounded-3xl flex items-center px-5">
                <h1 className="text-black text-lg sm:text-xl md:text-2xl font-semibold ">
                  satrio@gmail.com
                </h1>
              </div>
            </div>
            <div className="flex h-16 sm:h-20 gap-8">
              <div className="w-40 flex items-center">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                  address
                </h1>
              </div>
              <div className="bg-white w-full rounded-3xl flex items-center px-5">
                <h1 className="text-black text-lg sm:text-xl md:text-2xl font-semibold ">
                  Bogor
                </h1>
              </div>
            </div>
            <div className="flex justify-end gap-6">
              <ButtonAction label="Edit" onClick={openModal} />
              <ButtonCancelOrDelete
                label="Delete"
                onClick={() => handleDelete()}
              />
            </div>
          </div>
          <div className="hidden lg:block lg:bg-[url('/profile.jpg')] bg-center m-5 bg-cover lg:w-[40%] rounded-@yes"></div>
        </div>
      </div>

      {/* modal */}
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
            <div className="flex items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <form>
                  <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-@yes bg-black px-16 border-2 border-x-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title className="flex justify-center m-10">
                      <img
                        src={
                          objSubmit.image
                            ? URL.createObjectURL(objSubmit.image)
                            : "/avatar.jpg"
                        }
                        alt="user-avatar"
                        className="rounded-full w-56 h-56 border-8 border-white"
                      />
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col gap-5">
                      <div className="w-full bg-white text-black rounded-xl">
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
                      <Input
                        placeholder=""
                        id="input-name"
                        defaultValue={"name"}
                        onChange={(event) =>
                          handleChange(event.target.value, "name")
                        }
                      />
                      <Input
                        placeholder=""
                        id="input-email"
                        defaultValue={"email"}
                        onChange={(event) =>
                          handleChange(event.target.value, "email")
                        }
                      />
                      <Input
                        placeholder=""
                        type="password"
                        id="input-password"
                        defaultValue={"password"}
                        onChange={(event) =>
                          handleChange(event.target.value, "password")
                        }
                      />
                      <Input
                        placeholder=""
                        type="text"
                        id="input-address"
                        defaultValue={"address"}
                        onChange={(event) =>
                          handleChange(event.target.value, "address")
                        }
                      />
                    </div>
                    <div className="my-10 flex justify-between">
                      <ButtonAction
                        label="Update"
                        onClick={() => handleUpdate()}
                      />
                      <ButtonCancelOrDelete
                        label="Cancel"
                        onClick={closeModal}
                      />
                    </div>
                  </Dialog.Panel>
                </form>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
};

export default Profile;

import {
  FC,
  useState,
  Fragment,
  MouseEvent,
  useEffect,
  FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { ButtonAction, ButtonCancelOrDelete } from "../components/Button";
import { Dialog, Transition } from "@headlessui/react";
import { Layout } from "../components/Layout";
import { Input } from "../components/Input";
import { UserEdit } from "../utils/user";

const Profile: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<Partial<UserEdit>>({});
  const [csrf, setCsrf] = useState<string>("");
  const [objSubmit, setObjSubmit] = useState<Partial<UserEdit>>({});
  const [loading, setloading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [cookie, , removeCookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://go-event.online/users`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
        // setCsrf(data.csrf);
        document.title = `${data.name} | User Management`;
      })
      .catch((error) => {
        const { message } = error.response.data;
        const { status } = error.response;
        Swal.fire({
          icon: "error",
          title: status,
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setloading(false));
  };

  const closeModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleChange = (value: string | File, key: keyof typeof objSubmit) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }

    axios
      .put("https://go-event.online/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
            setObjSubmit({});
            setIsOpen(false);
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

  const handleDelete = () => {
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
          .delete(`https://go-event.online/users`, {
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
                removeCookie("tkn");
                navigate("/");
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

  return (
    <Layout>
      <div className="flex flex-col bg-white dark:bg-gray-700 pb-20">
        <div className="relative h-40 bg-@night rounded-b-@nice flex flex-col place-content-end">
          <h1 className="hidden md:block ml-100 text-white text-3xl font-semibold mb-3">
            Detail
          </h1>
        </div>
        <div className="absolute md:ml-40 mt-10 w-full md:w-max flex justify-center md:justify-start">
          <div
            className={`rounded-full border-8 border-gray-100 dark:border-gray-600 w-40 h-40 sm:w-56 sm:h-56 `}
          >
            <img
              src={
                datas && datas.image === "default.jpg"
                  ? "/default.jpg"
                  : `https://storage.googleapis.com/prj1ropel/${
                      datas && datas.image
                    }`
              }
              alt=""
              className="rounded-full w-full h-full"
            />
          </div>
        </div>
        <div className="h-10 sm:h-20 md:h-40 bg-white dark:bg-gray-700">
          <h1 className="hidden md:block ml-100 text-black dark:text-white text-3xl font-semibold mt-3">
            User Profile
          </h1>
        </div>
        {/* main */}
        {loading ? (
          <div className="h-screen text-black font-bold text-3xl flex justify-center">
            Loading...
          </div>
        ) : (
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
                    {datas.name}
                  </h1>
                </div>
              </div>
              <div className="flex justify-between h-16 sm:h-20 gap-8">
                <div className="w-40 flex items-center">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                    Email
                  </h1>
                </div>
                <div className="bg-white w-full rounded-3xl flex items-center px-5">
                  <h1 className="text-black text-lg sm:text-xl md:text-2xl font-semibold ">
                    {datas.email}
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
                    {datas.address}
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
        )}
      </div>
      {/* modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal}>
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
                <form onSubmit={(event) => handleUpdate(event)}>
                  <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-@yes bg-black px-16 border-2 border-x-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title className="flex justify-center m-10">
                      <img
                        src={
                          objSubmit.image
                            ? URL.createObjectURL(objSubmit.image)
                            : datas && datas.image === "default.jpg"
                            ? "/default.jpg"
                            : `https://storage.googleapis.com/prj1ropel/${
                                datas && datas.image
                              }`
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
                            setDatas({
                              ...datas,
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
                        defaultValue={datas.name}
                        onChange={(event) =>
                          handleChange(event.target.value, "name")
                        }
                      />
                      <Input
                        placeholder=""
                        id="input-email"
                        defaultValue={datas.email}
                        onChange={(event) =>
                          handleChange(event.target.value, "email")
                        }
                      />
                      <Input
                        placeholder=""
                        type="password"
                        id="input-password"
                        defaultValue={datas.password}
                        onChange={(event) =>
                          handleChange(event.target.value, "password")
                        }
                      />
                      <Input
                        placeholder=""
                        type="text"
                        id="input-address"
                        defaultValue={datas.address}
                        onChange={(event) =>
                          handleChange(event.target.value, "address")
                        }
                      />
                    </div>
                    <div className="my-10 flex justify-between">
                      <ButtonAction label="Update" type="submit" />
                      <ButtonCancelOrDelete
                        label="Cancel"
                        onClick={(event) => closeModal(event)}
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

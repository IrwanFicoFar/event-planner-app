import React, { FC, useEffect, useState, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  BiMenu,
  BiX,
  BiDownArrow,
  BiMessageSquareDetail,
  BiHome,
  BiUser,
  BiCalendarCheck,
  BiLogOut,
  BiCartAlt,
  BiLogIn,
  BiUserPlus,
  BiMoon,
  BiSun,
} from "react-icons/bi";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

import { ThemeContext } from "../utils/context";

export const Navbar: FC = () => {
  const [cookie, , removeCookie] = useCookies(["tkn", "uname"]);
  const { theme, setTheme } = useContext(ThemeContext);
  const handleTheme = (mode: string) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };
  const navigate = useNavigate();
  const checkToken = cookie.tkn;

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you Sure to Log out",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("tkn");
        removeCookie("uname");
        Swal.fire({
          icon: "success",
          title: "Succes Logout",
          showCancelButton: false,
          showConfirmButton: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <Disclosure as="nav" className="bg-black z-50">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-20">
              <div className="absolute inset-y-0 right-3 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 hover:rounded-3xl duration-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                <Link to="/">
                  <div className="flex-shrink-0 justify-center flex items-center">
                    <img
                      className="block  md:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                    <div className="hidden md:flex h-8 w-auto flex-row items-center space-x-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Event planner App image"
                      />
                      <h1 className="text-xl font-semibold text-white">
                        Go Event App
                      </h1>
                    </div>
                  </div>
                </Link>
                {checkToken ? (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/cart"
                        className="flex gap-2 items-center px-4 text-white hover:bg-gray-700 hover:rounded-3xl duration-700 py-2  text-md font-medium"
                      >
                        <BiCartAlt />
                        Cart
                      </Link>
                      <Link
                        to={`/transaction`}
                        className="flex gap-2 items-center px-4 text-white hover:bg-gray-700 hover:rounded-3xl duration-700 py-2 rounded-md text-md font-medium"
                      >
                        <BiMessageSquareDetail />
                        Transactions
                      </Link>
                      <Menu
                        as="div"
                        className="z-50 relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="hover:bg-gray-700 text-white px-3 py-2 hover:rounded-3xl duration-700 text-md font-medium flex gap-2 items-center">
                            Action
                            <BiDownArrow />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-56 rounded-2xl shadow-lg bg-white dark:bg-black dark:border-white dark:border-2 ring-1 ring-black ring-opacity-5 focus:outline-none p-3">
                            <div className="py-1">
                              <Menu.Item>
                                <Link
                                  to="/"
                                  className=" flex gap-2 items-center px-4  py-2 text-md font-medium text-black dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 hover:rounded-2xl duration-700"
                                >
                                  <BiHome />
                                  Home Page
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  to="/profile"
                                  className=" flex gap-2 items-center px-4 py-2 text-md font-medium text-black dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 hover:rounded-2xl duration-700"
                                >
                                  <BiUser />
                                  Profile
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  to="/my-event"
                                  className="flex gap-2 items-center px-4 py-2 text-md font-medium text-black dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 hover:rounded-2xl duration-700"
                                >
                                  <BiCalendarCheck />
                                  My Event
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  onClick={() => {
                                    handleTheme(
                                      theme === "light" ? "dark" : "light"
                                    );
                                  }}
                                  id="btn-dark"
                                  className="flex gap-2 items-center px-4 w-full py-2 text-md font-medium text-black dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 hover:rounded-2xl duration-700"
                                >
                                  {theme === "dark" ? <BiMoon /> : <BiSun />}
                                  {theme} Mode
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  className="flex gap-2 items-center px-4 w-full py-2 text-md font-medium text-black dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 hover:rounded-2xl duration-700"
                                  onClick={() => handleLogout()}
                                >
                                  <BiLogOut />
                                  Log out
                                </button>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/login"
                        className="flex gap-2 items-center px-4 text-white hover:bg-gray-700 hover:rounded-3xl duration-700 py-2 rounded-md text-md font-medium"
                      >
                        <BiLogIn />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="flex gap-2 items-center px-4 text-white hover:bg-gray-700 hover:rounded-3xl duration-700 py-2 rounded-md text-md font-medium"
                      >
                        <BiUserPlus className="text-xl" />
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* mobile display */}
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="sm:hidden">
              {checkToken ? (
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link
                    to="/"
                    className=" flex gap-2 items-center px-4  py-2 text-md font-medium text-white hover:bg-gray-700 hover:rounded-2xl duration-700"
                  >
                    <BiHome />
                    Home Page
                  </Link>
                  <Link
                    to="/cart"
                    className="flex gap-2 items-center px-4 text-white hover:bg-gray-700 hover:text-white py-2 rounded-md text-md font-medium hover:rounded-2xl duration-700"
                  >
                    <BiCartAlt />
                    Cart
                  </Link>
                  <Link
                    to="/transaction"
                    className="flex gap-2 items-center px-4 text-white hover:bg-gray-700 hover:text-white py-2 rounded-md text-md font-medium hover:rounded-2xl duration-700"
                  >
                    <BiMessageSquareDetail />
                    Transactions
                  </Link>
                  <Link
                    to="/profile"
                    className=" flex gap-2 items-center px-4 py-2 text-md font-medium text-white hover:bg-gray-700 hover:rounded-2xl duration-700"
                  >
                    <BiUser />
                    Profile
                  </Link>
                  <Link
                    to="/my-event"
                    className="flex gap-2 items-center px-4 py-2 text-md font-medium text-white hover:bg-gray-700 hover:rounded-2xl duration-700"
                  >
                    <BiCalendarCheck />
                    My Event
                  </Link>
                  <button
                    className="flex gap-2 items-center px-4 w-full py-2 text-md font-medium text-white hover:bg-gray-700 hover:rounded-2xl duration-700"
                    onClick={() => handleLogout()}
                  >
                    <BiLogOut />
                    Log out
                  </button>
                </div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className=" flex gap-2 items-center px-4  py-2 text-md font-medium text-white hover:bg-gray-700 hover:rounded-2xl duration-700"
                  >
                    <BiLogIn />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex gap-2 items-center px-4 text-white hover:bg-gray-700 hover:text-white py-2 rounded-md text-md font-medium hover:rounded-2xl duration-700"
                  >
                    <BiUserPlus className="text-xl" />
                    Register
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

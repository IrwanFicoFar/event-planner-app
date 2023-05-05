import { FC, useEffect, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import { ButtonSubmit } from "../../components/Button";
import { objRegisterType } from "../../utils/user";
import { Input } from "../../components/Input";

const Register: FC = () => {
  const [objSubmit, setObjSubmit] = useState<objRegisterType>({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const navigate = useNavigate();

  document.title = `Register | User Management`;

  useEffect(() => {
    setIsEmpty(Object.values(objSubmit).every((val) => val === ""));
  }, [objSubmit]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      objSubmit.name === "" ||
      objSubmit.email === "" ||
      objSubmit.password === "" ||
      objSubmit.address === ""
    ) {
      Swal.fire({
        title: "Not Completed",
        text: "Please Fill All Input",
        showCancelButton: false,
      });
      return;
    }
    axios
      .post("https://go-event.online/register", objSubmit, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { message, code } = response.data;
        Swal.fire({
          icon: "success",
          title: "Success Register!!",
          text: message,
          showCancelButton: false,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      })
      .catch((error) => {
        const { message, code } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Failed to Register!!",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {});
  };

  return (
    <div className="h-screen flex mx-auto space-x-10 bg-black">
      <div className="hidden md:block  md:w-[50%] bg-[url('/register.jpg')] bg-center bg-cover rounded-r-3xl"></div>
      <div className="w-full  md:w-[50%] ">
        <div className="h-20 md:h-32 bg-black flex items-center">
          <h1 className="text-2xl font-semibold text-white">Go Event App</h1>
        </div>
        <h1 className="text-xl text-white font-semibold my-5 md:my-20">
          Sign Up
        </h1>
        <div className="">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="w-[70%] flex flex-col gap-8 md:gap-10">
              <Input
                placeholder="Input Name"
                id="input-name"
                type="text"
                onChange={(event) =>
                  setObjSubmit({ ...objSubmit, name: event.target.value })
                }
              />
              <Input
                placeholder="Enter Email"
                id="input-email"
                type="email"
                onChange={(event) =>
                  setObjSubmit({ ...objSubmit, email: event.target.value })
                }
              />
              <Input
                placeholder="Enter Password"
                id="input-password"
                type="password"
                onChange={(event) =>
                  setObjSubmit({ ...objSubmit, password: event.target.value })
                }
              />
              <Input
                placeholder="Input Address"
                id="input-address"
                type="text"
                onChange={(event) =>
                  setObjSubmit({ ...objSubmit, address: event.target.value })
                }
              />
              <div className="my-5 md:my-10">
                <ButtonSubmit type="submit" label="Submit" />
              </div>
            </div>
          </form>
          <div className="my-5 flex flex-col md:flex-row gap-2 md:gap-5">
            <h1 className="text-xl font-semibold text-white">
              have an account ?{" "}
            </h1>
            <h1 className="text-xl font-semibold text-@028090 hover:text-orange-500 hover:-translate-y-1 duration-300">
              <Link to="/login">Sign In here !!</Link>
            </h1>
          </div>
          <div className="my-5 flex flex-col md:flex-row gap-2 md:gap-5">
            <h1 className="text-xl font-semibold text-white">
              Back to home page ?
            </h1>
            <h1 className="text-xl font-semibold text-@028090 hover:text-orange-500 hover:-translate-y-1 duration-300 mb-10">
              <Link to="/">Click Here !!</Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { FC, useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { ButtonSubmit } from "../../components/Button";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

interface objSubmitType {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [objSubmit, setObjSubmit] = useState<objSubmitType>({
    email: "",
    password: "",
  });
  const [isEmpty, setIsEmpty] = useState(true);
  const navigate = useNavigate();
  const [, setCookie] = useCookies();

  useEffect(() => {
    setIsEmpty(Object.values(objSubmit).every((val) => val === ""));
  }, [objSubmit]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (objSubmit.email === "" || objSubmit.password === "") {
      Swal.fire({
        icon: "warning",
        title: " Not Completed",
        text: "Please Fill All Input",
        showCancelButton: false,
      });
      return;
    }

    axios
      .post("https://go-event.online/login", objSubmit, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data, message, code } = response.data;
        console.log(data.token);
        setCookie("tkn", data.token);
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: code,
          text: message,
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1500,
        });
        navigate("/");
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
  };

  return (
    <div className="h-screen flex mx-auto space-x-10 bg-black">
      <div className="hidden md:block  md:w-[50%] bg-[url('/login.jpg')] bg-center bg-cover rounded-r-3xl"></div>
      <div className="h-full w-full  md:w-[50%] ">
        <div className="h-20 md:h-32 bg-black flex items-center">
          <h1 className="text-2xl font-semibold text-white">
            Event Planner App
          </h1>
        </div>
        <h1 className="text-xl text-white font-semibold my-5 md:my-20">
          Sign In
        </h1>
        <div className="">
          <form onSubmit={(event) => handleLogin(event)}>
            <div className="w-[70%] flex flex-col gap-8 md:gap-12">
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
              <div className="my-5 md:my-10">
                <ButtonSubmit type="submit" label="Log In" />
              </div>
            </div>
          </form>
          <div className="my-5 flex flex-col md:flex-row gap-2 md:gap-5">
            <h1 className="text-xl font-semibold text-white">
              don’t have an account ?{" "}
            </h1>
            <h1 className="text-xl font-semibold text-@028090 hover:text-orange-500 hover:-translate-y-1 duration-300">
              <Link to="/register">Sign Up here !!</Link>
            </h1>
          </div>
          <div className="my-5 flex flex-col md:flex-row gap-2 md:gap-5">
            <h1 className="text-xl font-semibold text-white">
              Back to home page ?
            </h1>
            <h1 className="text-xl font-semibold text-@028090 hover:text-orange-500 hover:-translate-y-1 duration-300">
              <Link to="/">Click Here !!</Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

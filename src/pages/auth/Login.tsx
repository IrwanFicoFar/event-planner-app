import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { ButtonSubmit } from "../../components/Button";

interface objSubmitType {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [objSUbmit, setObjSubmit] = useState<objSubmitType>({
    email: "",
    password: "",
  });

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
          <form>
            <div className="w-[70%] flex flex-col gap-8 md:gap-12">
              <Input
                placeholder="Enter Email"
                id="input-email"
                type="email"
                onChange={(event) =>
                  setObjSubmit({ ...objSUbmit, email: event.target.value })
                }
              />
              <Input
                placeholder="Enter Password"
                id="input-password"
                type="password"
                onChange={(event) =>
                  setObjSubmit({ ...objSUbmit, password: event.target.value })
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
            <h1 className="text-xl font-semibold text-@028090">
              <Link to="/register">Sign Up here !!</Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

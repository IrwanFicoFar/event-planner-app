import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { ButtonSubmit } from "../../components/Button";

interface objSubmitType {
  name: string;
  email: string;
  password: string;
  address: string;
}

const Register: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [objSUbmit, setObjSubmit] = useState<objSubmitType>({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  return (
    <div className="h-screen flex mx-auto space-x-10 bg-black">
      <div className="hidden md:block  md:w-[50%] bg-[url('/register.jpg')] bg-center bg-cover rounded-r-3xl"></div>
      <div className="w-full  md:w-[50%] ">
        <div className="h-32 bg-black flex items-center">
          <h1 className="text-2xl font-semibold text-white">
            Event Planner App
          </h1>
        </div>
        <h1 className="text-xl text-white font-semibold my-20">Sign Up</h1>
        <div className="">
          <form>
            <div className="w-[70%] flex flex-col gap-10">
              <Input
                placeholder="Input Name"
                id="input-name"
                type="text"
                onChange={(event) =>
                  setObjSubmit({ ...objSUbmit, name: event.target.value })
                }
              />
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
              <Input
                placeholder="Input Address"
                id="input-address"
                type="text"
                onChange={(event) =>
                  setObjSubmit({ ...objSUbmit, address: event.target.value })
                }
              />
              <div>
                <ButtonSubmit type="submit" label="Submit" />
              </div>
            </div>
          </form>
          <div className="my-5">
            <h1 className="text-xl font-semibold text-white">
              have an account ?{" "}
              <span className="text-@028090">
                <Link to="/login">Sign In here !!</Link>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { FC } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Input } from "../components/Input";
import { BiSearchAlt } from "react-icons/bi";
import { ButtonAction } from "../components/Button";
import { Card } from "../components/Card";

const Home: FC = () => {
  const handleSeacrh = () => {
    alert("oke");
  };

  return (
    <Layout>
      <div>
        <div className="w-full flex bg-black">
          <div className=" w-full lg:w-[50%] p-10 sm:p-16 md:p-20 flex flex-col gap-3 md:gap-6 lg:gap-8">
            <div className="lg:absolute w-full md:w-[90%] lg:w-[80%]">
              <div className=" lg:my-20">
                <h1 className="text-@F46036 text-lg font-semibold">NEWS</h1>
                <h1 className=" md:text-4xl lg:text-5xl xl:text-6xl font-semibold my-1 sm:my-3">
                  WORLD BIGGEST APP CONFERENCE
                </h1>
                <h1 className="md:text-4xl lg:text-5xl xl:text-6xl font-semibold sm:my-3 ">
                  FOR DIGITAL TECHNOLOGY
                </h1>
              </div>
            </div>
            <p className=" md:text-lg lg:text-xl lg:mb-65 xl:mb-72 lg:mt-80">
              We are exceptionally pleased to announce the 2023 2nd
              International Conference On Multidisciplinary Applications of
              Information Technology (ICOMIT). This conference will attract
              authors from various disciplines to share their latest research
              findings and ideas.
            </p>
          </div>
          <div className="hidden lg:block bg-red-400 w-[50%] lg:bg-[url('/header3.jpg')] bg-center m-10 bg-cover rounded-3xl"></div>
        </div>
        <div className="static">
          <div className="bg-black relative pt-10 flex justify-center mt-10">
            {/* Search */}
            <div className="flex justify-center absolute top-0 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] ">
              <div className="bg-white hover:scale-105 duration-300 grid grid-cols-2 p-4 w-full drop-shadow-lg  rounded-full items-center">
                <div className=" rounded-l-@yes ">
                  <Link to="/add-event">
                    <h1 className="text-black text-md lg:text-lg hover:text-xl md:font-semibold px-2 hover:bg-slate-200 py-2 rounded-l-3xl hover:rounded-3xl duration-300">
                      Add Event
                    </h1>
                  </Link>
                </div>
                <div className="bg-@F46036 rounded-@yes py-3">
                  <div className="flex">
                    <button
                      className="mr-1 px-2 duration-300"
                      onClick={() => handleSeacrh()}
                    >
                      <BiSearchAlt className="text-2xl hover:text-3xl duration-300 hover:bg-orange-700 hover:rounded-full hover:p-1 " />
                    </button>
                    <input className="w-full bg-@F46036 hover:bg-orange-700 duration-300 rounded-lg px-2 mr-3 text-white font-semibold focus:outline-none" />
                  </div>
                </div>
                {/* <div className="bg-@F46036 flex items-center p-3 hover:p-4 rounded-full duration-300">
                  <button
                    className="mr-1 px-2 py-3 duration-300"
                    onClick={() => handleSeacrh()}
                  >
                    <BiSearchAlt className="text-3xl hover:text-5xl duration-300 hover:bg-orange-700 hover:p-1 hover:rounded-full" />
                  </button>
                  <input className=" bg-orange-700 rounded-full h-16 text-xl text-white font-semibold md:px-4 focus:outline-none" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full pt-32 px-16 sm:px-10 md:px-20 mid-lg:px-32 lg:px-40 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 pb-20">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="bg-white h-20 flex justify-center items-center border-2 border-black">
          <h1 className="text-xl text-black font-semibold">Pagination</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

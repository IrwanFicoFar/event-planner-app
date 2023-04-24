import { FC } from "react";
import { Layout } from "../components/Layout";
import { CardAttandance, CardComment, CardTicket } from "../components/Card";
import { Input } from "../components/Input";
import { ButtonAction } from "../components/Button";
import { BiMap, BiTime, BiTimer } from "react-icons/bi";

const DetailEvent: FC = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const fullDate = today.toLocaleDateString("en-US", options);

  const handleCheckout = () => {
    alert("checkout oke");
  };

  return (
    <Layout>
      <div className="h-full">
        <div className="grid lg:grid-cols-2 ">
          <div className="p-10">
            <div className="bg-[url('/header3.jpg')] bg-center bg-cover rounded-3xl h-96"></div>
            <h1 className=" text-xl sm:text-2xl font-semibold text-orange-500 py-5 pr-5 flex justify-end">
              5 left
            </h1>
            <p>
              In this workshop, learn how to optimize your users' digital
              journeys with hands-on, guided examples of effective in-app
              programs. You'll learn what user and customer milestones are
              critical to proving your ROI, how to drive adoption and engagement
              with key features, and how to tie your product-driven programs to
              larger business objectives and end-to-end customer experiences.
            </p>
            <h1 className="text-xl font-semibold py-10">Hosted By : Irwan</h1>
          </div>
          <div className="bg-white rounded-tl-@yes p-10 flex flex-col gap-8">
            <div className="flex space-x-2 items-center bg-black p-5 rounded-2xl">
              <BiMap className="text-orange-500 text-2xl" />
              <h1 className="text-xl xl:text-2xl font-semibold">{"Senayan"}</h1>
            </div>
            <div className="flex space-x-2 items-center bg-black p-5 rounded-2xl">
              <div>
                {/* <div>{today.toString()}</div> */}
                <div className="text-xl xl:text-2xl font-semibold flex flex-col gap-5">
                  <div className="flex space-x-3 items-center">
                    <BiTime className="text-orange-500 text-2xl" />
                    <h1 className="text-xl xl:text-2xl font-semibold">
                      {fullDate}
                    </h1>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <BiTimer className="text-orange-500 text-2xl" />
                    <h1 className="text-xl xl:text-2xl font-semibold">
                      Duration: {"1 hour"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black rounded-3xl">
              <div className="border-b-4 border-white rounded-b-3xl py-7 flex justify-center">
                <h1 className="text-2xl font-semibold">Get Ticket</h1>
              </div>
              <div className="p-12 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 xl:gap-10">
                <CardTicket
                  ticket={"VIP"}
                  price={"Rp 150.000"}
                  onClick={() => handleCheckout()}
                />
                <CardTicket
                  ticket={"Reguler"}
                  price={"Rp 100.000"}
                  onClick={() => handleCheckout()}
                />
                <CardTicket
                  ticket={"Free"}
                  price={"Rp 0"}
                  onClick={() => handleCheckout()}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 ">
          <div className="px-10 pb-10">
            <div>
              <h1 className="text-xl font-semibold py-5">Attandance : 5</h1>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5">
                <CardAttandance image="/avatar.jpg" name="irwan" />
                <CardAttandance image="/avatar.jpg" name="irwan" />
                <CardAttandance image="/avatar.jpg" name="irwan" />
                <CardAttandance image="/avatar.jpg" name="irwan" />
                <CardAttandance image="/avatar.jpg" name="irwan" />
                <CardAttandance image="/avatar.jpg" name="irwan" />
                <CardAttandance image="/avatar.jpg" name="irwan" />
              </div>
            </div>
            <div className="py-10">
              <h1 className="text-xl font-semibold py-5">Comment</h1>
              <div className="flex space-x-3">
                <Input />
                <ButtonAction label="Add" />
              </div>
            </div>
            <div className="grid grid-flow-row gap-5 border-2 rounded-2xl p-5">
              <CardComment
                image={"/avatar.jpg"}
                name={"Irwan"}
                comment={"apakah event nya bagus?"}
              />
              <CardComment
                image={"/avatar.jpg"}
                name={"Wibowo"}
                comment={"apakah event nya bagus?"}
              />
              <CardComment
                image={"/avatar.jpg"}
                name={"Alfian hadis"}
                comment={"apakah event nya bagus?"}
              />
            </div>
          </div>
          <div className="bg-white rounded-bl-@yes "></div>
        </div>
      </div>
      {/* main */}
    </Layout>
  );
};

export default DetailEvent;

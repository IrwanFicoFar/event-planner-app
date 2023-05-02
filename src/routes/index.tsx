import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DetailEvent from "../pages/event/DetailEvent";
import AddEvent from "../pages/event/AddEvent";
import Cart from "../pages/transactions/Cart";
import Profile from "../pages/Profile";
import MyPdf from "../pages/PDF";
import EditEvent from "../pages/event/EditEvent";
import { useCookies } from "react-cookie";
import MyEvent from "../pages/event/MyEvent";
import Transaction from "../pages/transactions/Transaction";

axios.defaults.baseURL = "https://virtserver.swaggerhub.com/ropel12/tes/1.0.0";

const Router = () => {
  const [cookie] = useCookies(["tkn"]);
  const checToken = cookie.tkn;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: checToken ? <Home /> : <Login />,
    },
    {
      path: "/register",
      element: checToken ? <Home /> : <Register />,
    },
    {
      path: "/profile",
      element: checToken ? <Profile /> : <Home />,
    },
    {
      path: "/my-event",
      element: checToken ? <MyEvent /> : <Home />,
    },
    {
      path: "/add-event",
      element: checToken ? <AddEvent /> : <Home />,
    },
    {
      path: "/event/:id",
      element: <DetailEvent />,
    },
    {
      path: "/event/:id/edit",
      element: checToken ? <EditEvent /> : <Home />,
    },
    {
      path: "/cart",
      element: checToken ? <Cart /> : <Home />,
    },
    {
      path: "/transaction",
      element: checToken ? <Transaction /> : <Home />,
    },
    {
      path: "/pdf",
      element: checToken ? <MyPdf /> : <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

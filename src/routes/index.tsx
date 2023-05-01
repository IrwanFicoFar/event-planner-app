import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DetailEvent from "../pages/DetailEvent";
import AddEvent from "../pages/AddEvent";
import Cart from "../pages/Cart";
import DetailTransaction from "../pages/DetailTransaction";
import Profile from "../pages/Profile";
import Event from "../pages/Event";
import MyPdf from "../pages/PDF";
import EditEvent from "../pages/EditEvent";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

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
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/add-event",
      element: checToken ? <AddEvent /> : <Home />,
    },
    {
      path: "/edit-event/:id",
      element: <EditEvent />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/detail-event/:id",
      element: <DetailEvent />,
    },
    {
      path: "/detail-transaction",
      element: <DetailTransaction />,
    },
    {
      path: "/event",
      element: <Event />,
    },
    {
      path: "/Profile",
      element: <Profile />,
    },
    {
      path: "/pdf",
      element: <MyPdf />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

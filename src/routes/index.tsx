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

axios.defaults.baseURL = "https://virtserver.swaggerhub.com/ropel12/tes/1.0.0";

const Router = () => {
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
      element: <AddEvent />,
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

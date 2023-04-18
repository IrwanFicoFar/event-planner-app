import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

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
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

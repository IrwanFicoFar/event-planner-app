import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DetailEvent from "../pages/event/DetailEvent";
import AddEvent from "../pages/event/AddEvent";
import Cart from "../pages/transactions/Cart";
import Profile from "../pages/Profile";
import EditEvent from "../pages/event/EditEvent";
import { useCookies } from "react-cookie";
import MyEvent from "../pages/event/MyEvent";
import Transaction from "../pages/transactions/Transaction";
import { ThemeContext } from "../utils/context";

axios.defaults.baseURL = "https://virtserver.swaggerhub.com/ropel12/tes/1.0.0";

const Router = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
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
  ]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;

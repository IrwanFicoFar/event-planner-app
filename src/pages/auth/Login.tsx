import { FC } from "react";
import { Link } from "react-router-dom";

const Login: FC = () => {
  return (
    <div className="h-screen">
      <h1>Login Page</h1>
      <Link to="/register">
        <h1>to Register</h1>
      </Link>
      <Link to="/">
        <h1>to Home</h1>
      </Link>
    </div>
  );
};

export default Login;

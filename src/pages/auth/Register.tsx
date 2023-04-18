import { FC } from "react";
import { Link } from "react-router-dom";

const Register: FC = () => {
  return (
    <div>
      <h1>Register Page</h1>
      <Link to="/login">
        <h1>to Login</h1>
      </Link>
      <Link to="/">
        <h1>to Home</h1>
      </Link>
    </div>
  );
};

export default Register;

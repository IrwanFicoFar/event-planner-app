import { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">
        <h1>to Login</h1>
      </Link>
      <Link to="/register">
        <h1>to Register</h1>
      </Link>
    </div>
  );
};

export default Home;

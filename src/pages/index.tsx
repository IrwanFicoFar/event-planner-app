import { FC } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

const Home: FC = () => {
  return (
    <Layout>
      <div className="h-screen">
        <h1>Home Page</h1>
        <Link to="/login">
          <h1>to Login</h1>
        </Link>
        <Link to="/register">
          <h1>to Register</h1>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;

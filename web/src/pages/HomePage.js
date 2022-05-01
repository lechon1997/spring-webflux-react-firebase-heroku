import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const HomePage = ({ children }) => (
  <section className="flex-8">
    <h1>Home</h1>
    <div>{children}</div>
    <p>welcome to the question and answer app.</p>
    <Link to="/questions" className="button">
      View Questions
    </Link>
  </section>
);
export default HomePage;

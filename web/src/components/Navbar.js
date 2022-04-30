import React from "react";
import { Link } from "react-router-dom";
import img from "../static/images/discusion.png";

export const PublicNavbar = () => (
  <nav>
    <img src={img} className="ms-3" />
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
    </section>
  </nav>
);

export const PrivateNavbar = () => (
  <nav>
    <img src={img} className="ms-3" />
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/new">New</Link>
      <Link to="/list">List</Link>
      <Link to="/profile">Profile</Link>
    </section>
  </nav>
);

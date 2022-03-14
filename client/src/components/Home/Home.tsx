import React from "react";
import Header from "../Navbar/Header";
import Footer from "../Footer/Footer";
import Image from 'react-bootstrap/Image'
import './Home.css';
import { Button } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Header />
      <div className="container-image">
        <Image
          src={process.env.PUBLIC_URL + "image.png"}
          roundedCircle
          className="img-fluid"
        />
      </div>
      <div className="vertical-line"></div>
      <div className="buttons-home">
        <Button className="login-button" variant="primary" size="lg">Log In</Button>
        <Button className="signup-button" variant="outline-dark" size="lg">Sign Up</Button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
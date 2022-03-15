import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Image from "react-bootstrap/Image";
import GoogleButton from "react-google-button";
import "./Home.css";
import { Button } from "react-bootstrap";
import Pitch from "./Pitch";
import Login from "../Forms/Login";

function Home() {
  const [click, setClick] = useState<boolean>(false);
  function handleClick(event: any) {
    setClick(true);
    console.log(event);
  }

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

      {!click ? <Pitch /> : <Login />}

      <div className="buttons-home">
        <Button
          className="login-button"
          variant="primary"
          size="lg"
          onClick={handleClick}
        >
          Log In
        </Button>
        <Button
          className="signup-button"
          variant="outline-dark"
          size="lg"
          onClick={handleClick}
        >
          Sign Up
        </Button>
        <GoogleButton className="google-login-button" />
      </div>
      <Footer />
    </div>
  );
}

export default Home;

import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import "./Form.css";
import { Button, Form } from "react-bootstrap";
import Pitch from "../Home/Pitch";

function Signup() {
  function handleSubmit() {}

  return (
    <div>
      <div className="container-image">
        <Image
          src={process.env.PUBLIC_URL + "image.png"}
          roundedCircle
          className="img-fluid"
        />
      </div>
      <div className="pitch-text">
        Onboarding <br />
        ʕᵔᴥᵔʔ
      </div>
      <div className="vertical-line"></div>

      <Form className="signup">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control type="text" placeholder="Enter your Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number [0-9]"
            pattern="[1-9]{1}[0-9]{9}"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          className="signup-button"
          variant="outline-dark"
          type="submit"
          size="lg"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import "./Form.css";
import { Button, Form } from "react-bootstrap";
import Pitch from "../Home/Pitch";

function Login() {
  function handleSubmit() {}
  function setEmail(event: any) {}
  function setPassword(event: any) {}
  function validateForm() {
    return true;
  }
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
        Welcome back <br />
        ⊂(◉‿◉)つ
      </div>
      <div className="vertical-line"></div>
      <Form className="login">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          className="login-button"
          variant="primary"
          type="submit"
          size="lg"
        >
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default Login;

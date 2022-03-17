import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import "./Form.css";
import { Button, Form } from "react-bootstrap";
import validator from "validator";

interface ICredentials {
  email: string;
  password: string;
}

function Login() {
  const [credentials, setCredentials] = useState<Partial<ICredentials>>({
    email: "",
    password: ""
  });

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log(credentials);
  };

  const validateForm = () => {
    // will return false if both present and return true if any one or zero present
    // and set it to the disable which accepts a boolean
    if (
      credentials.email &&
      credentials.password &&
      validator.isEmail(credentials.email)
    ) {
      return false;
    } else {
      return true;
    }
  };

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
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={event => {
              const email: string = event.currentTarget.value;
              setCredentials({
                ...credentials,
                email: email
              });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            required
            type="password"
            placeholder="Password"
            onChange={event => {
              const password: string = event.currentTarget.value;
              setCredentials({
                ...credentials,
                password: password
              });
            }}
          />
        </Form.Group>

        <Button
          disabled={validateForm()}
          className="login-button"
          variant="primary"
          type="submit"
          size="lg"
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default Login;

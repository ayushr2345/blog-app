import React from "react";
import './Header.css';
import { Navbar, Nav, Container } from 'react-bootstrap';


function Header() {
  return (
    <div>
      <Navbar className="custom-navbar" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="heading-navbar">Tweeter</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#features">About Us</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

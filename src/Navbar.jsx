import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Navbars = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-body">
        <Container>
          <Navbar.Brand href="#">TO DO </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="register" className="mx-3">SIGN UP</Nav.Link>
              <Nav.Link href="project" className="mx-3">PROJECTS</Nav.Link>
              <Nav.Link href="add" className="mx-3">ADD PROJECTS</Nav.Link>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Navbars;

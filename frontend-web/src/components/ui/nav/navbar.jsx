import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from 'react-bootstrap/Badge';

const MainNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#" className="me-5">E-com</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="gap-3 d-flex align-items-baseline">
            <Nav.Link href="/">Products</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/listings">Listings</Nav.Link>
            <Nav.Link href="/users">User Management</Nav.Link>
            <Nav.Link href="/cart">
            <i className="bi bi-bag-check" style={{fontSize:'23px'}}></i>
            <Badge bg="secondary" className="position-absolute top-4">0</Badge>
            </Nav.Link>
            <NavDropdown title="Dashboard" id="basic-nav-dropdown">
              <NavDropdown.Item href="/adminDashboard">Admin</NavDropdown.Item>
              <NavDropdown.Item href="/csr">CSR</NavDropdown.Item>
              <NavDropdown.Item href="/vendor">Vendor</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;

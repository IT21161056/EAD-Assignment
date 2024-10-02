import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { useCartContext } from "../../providers/ContextProvider";
import CartModal from "./CartModal";
import { Image } from "react-bootstrap"; // For the avatar

const MainNavbar = () => {
  const { itemCount } = useCartContext();
  const [showCartModal, setShowCartModal] = useState(false);

  const handleOpenModal = () => setShowCartModal(true);
  const handleCloseModal = () => setShowCartModal(false);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
        <Container>
          <Navbar.Brand href="#" className="me-5">
            E-com
          </Navbar.Brand>
          {/* Toggle for mobile view */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left-side navigation */}
            <Nav className="me-auto gap-3">
              <Nav.Link href="/">Product Listing</Nav.Link>
              <Nav.Link href="/orders">Orders</Nav.Link>
              <NavDropdown title="Dashboard" id="basic-nav-dropdown">
                <NavDropdown.Item href="/adminDashboard">
                  Admin
                </NavDropdown.Item>
                <NavDropdown.Item href="/csr">CSR</NavDropdown.Item>
                <NavDropdown.Item href="/vendor">Vendor</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Right-side: Cart and Avatar */}
            <Nav className="d-flex align-items-center">
              {/* Cart Icon */}
              <div
                className="d-flex justify-content-center align-items-center position-relative me-3"
                style={{ width: "30px", height: "30px" }}
              >
                <i
                  className="bi bi-bag-check fs-4"
                  onClick={handleOpenModal}
                  style={{ cursor: "pointer" }}
                ></i>
                <Badge
                  bg="primary"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {itemCount}
                </Badge>
              </div>

              {/* Avatar Dropdown for Login/Register */}
              <NavDropdown
                align="end"
                title={
                  <Image
                    src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg" // Placeholder for avatar
                    roundedCircle
                    width="30"
                    height="30"
                    alt="User Avatar"
                  />
                }
                id="user-nav-dropdown"
              >
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartModal show={showCartModal} onClose={handleCloseModal} />
    </>
  );
};

export default MainNavbar;

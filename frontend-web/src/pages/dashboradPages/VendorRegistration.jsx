import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    vendorName: "",
    vendorEmail: "",
    vendorPhone: "",
    vendorAddress: "",
    vendorCity: "",
  });

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} className="text-center mb-4">
            <h3>Request For Register as a Vendor</h3>
          </Col>
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formVendorName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="vendorName"
                  placeholder="Enter name"
                  value={formData.vendorName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formVendorEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="vendorEmail"
                  placeholder="Enter email"
                  value={formData.vendorEmail}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formVendorPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="vendorPhone"
                  placeholder="Enter phone number"
                  value={formData.vendorPhone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formVendorAddress">
                <Form.Label>Adrress</Form.Label>
                <Form.Control
                  type="text"
                  name="vendorCity"
                  placeholder="Enter address"
                  value={formData.vendorAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formVendorCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="vendorCity"
                  placeholder="Enter city"
                  value={formData.vendorCity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VendorRegistration;

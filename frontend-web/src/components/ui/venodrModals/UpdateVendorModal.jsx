import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const VendorModal = ({ show, handleClose }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter name"
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter mobile"
                maxlength="10"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a mobile number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-3 justify-content-end">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VendorModal;

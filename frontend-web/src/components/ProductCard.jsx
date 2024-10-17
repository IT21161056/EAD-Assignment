import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Card className="h-100 shadow-sm border w-100">
        {/* Added w-100 here */}
        <div
          className="card-img-wrapper"
          style={{ height: "200px", overflow: "hidden" }}
        >
          <Card.Img
            variant="top"
            src={
              product.imageUrl ||
              "https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg"
            }
            alt={product.productName}
            className="w-100 h-100"
            style={{ objectFit: "fill", objectPosition: "center" }} // objectFit and objectPosition remain as inline styles for now
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="h5 mb-2">{product.productName}</Card.Title>
          <Card.Text className="mb-1">
            <span className="fw-bold">Vendor:</span> {product.vendorName}
          </Card.Text>
          <Card.Text className="mb-3">
            <span className="fw-bold">Price:</span> Rs{" "}
            {product.productPrice.toFixed(2)}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            className="mt-auto w-100"
          >
            View
          </Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>
            {product.id ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={product.productName}
                    required
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="productPrice"
                    value={product.productPrice}
                    required
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>

              <div className="mt-2">
                <Image
                  src={product.imageUrl}
                  rounded
                  className="img-thumbnail"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                  alt="Product preview"
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    description: PropTypes.string,
    productPrice: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    vendorId: PropTypes.string.isRequired,
    vendorName: PropTypes.string.isRequired,
    stock: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;

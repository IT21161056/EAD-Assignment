import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Modal,
  Image,
} from "react-bootstrap";

import ProductService from "../../../APIService/ProductService";

const VendorDashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      description: "Description for Product 1",
      image:
        "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_Colors_09142021_big.jpg.large.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      description: "Description for Product 2",
      image:
        "https://www.greenware.lk/wp-content/uploads/2021/09/Apple-iPhone-13.jpg",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    imageUrl: null,
    stock: 0,
  });
  const [previewImage, setPreviewImage] = useState("");

  const getProductList = async () => {
    const response = await ProductService.getVenderProducts(
      "65074c59a3e8fa0c65432109"
    );
    if (response.data) setProducts(response.data);
  };

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    // Cleanup function to revoke object URL when component unmounts or previewImage changes
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleShowModal = (
    product = { id: null, name: "", price: "", description: "", image: null }
  ) => {
    setCurrentProduct(product);
    setPreviewImage(product.image || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct({
      id: null,
      name: "",
      price: "",
      description: "",
      image: null,
    });
    setPreviewImage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentProduct({ ...currentProduct, image: file });

      // Create a preview using URL.createObjectURL
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", currentProduct.name);
    formData.append("price", currentProduct.price);
    formData.append("description", currentProduct.description);
    if (currentProduct.image instanceof File) {
      formData.append("image", currentProduct.image);
    }

    // For this example, we'll just update the local state
    if (currentProduct.id) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id
            ? { ...currentProduct, image: previewImage }
            : p
        )
      );
    } else {
      // Add new product
      // setProducts([
      //   ...products,
      //   { ...currentProduct, id: Date.now(), image: previewImage },
      // ]);
      const response = await ProductService.addProduct(formData);
      if (response) {
        alert("product add successful");
      }
    }
    getProductList();
    handleCloseModal();
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Vendor Dashboard</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Product Listings</Card.Header>
            <ListGroup variant="flush">
              {products.map((product) => (
                <ListGroup.Item
                  key={product.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={product.imageUrl}
                      rounded
                      className="me-3"
                      width={50}
                      height={50}
                    />
                    <div>
                      <h6>{product.name}</h6>
                      <small>Price: ${product.price}</small>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header as="h5">Quick Actions</Card.Header>
            <Card.Body>
              <Button variant="primary" onClick={() => handleShowModal()}>
                Add New Product
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct.id ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
            {currentProduct.image && (
              <Image
                src={previewImage}
                rounded
                className="mb-3"
                width={100}
                height={100}
              />
            )}
            <Button variant="primary" type="submit">
              {currentProduct.id ? "Update Product" : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default VendorDashboard;

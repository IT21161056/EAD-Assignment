// ProductCard.js
import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="mb-4 shadow-sm border">
      <Card.Img
        variant="top"
        src={product.productImage}
        alt={product.productName}
      />
      <Card.Body>
        <Card.Title className="h5">{product.productName}</Card.Title>
        <Card.Text>
          <span className="fw-bold">Vendor:</span> {product.vendorName}
        </Card.Text>
        <Card.Text>
          <span className="fw-bold">Price:</span> Rs{" "}
          {product.productPrice.toFixed(2)}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant="primary"
            onClick={() => onAddToCart(product)}
            className="add-to-cart-btn"
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    productImage: PropTypes.string.isRequired,
    vendorId: PropTypes.string.isRequired,
    vendorName: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
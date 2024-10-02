import React, { useState } from "react";
import { useCartContext } from "../components/providers/ContextProvider";
import ProductCard from "../components/ProductCard";
import p from "../assets/p.jpg";

const hardcodedProducts = [
  {
    _id: "65074c59a3e8fa0c12345679",
    productName: "Papaya",
    productPrice: 150.45,
    productImage: p,
    vendorId: "65074c59a3e8fa0c12345679",
    vendorName: "pasindu",
  },
  {
    _id: "66f6e68c01146e059c116cb1",
    productName: "Mango",
    productPrice: 200.24,
    productImage: p,
    vendorId: "65074c59a3e8fa0c12345679",
    vendorName: "pasindu",
  },
  {
    _id: "65074c59a3e8fa0c12345680",
    productName: "Banana",
    productPrice: 50.21,
    productImage: p,
    vendorId: "65074c59a3e8fa0c12345679",
    vendorName: "pasindu",
  },
  {
    _id: "66f6eda701146e059c116cb4",
    productName: "Pine",
    productPrice: 300.2,
    productImage: p,
    vendorId: "65074c59a3e8fa0c12345671",
    vendorName: "pasindu",
  },
];

const ProductList = () => {
  const { addToCart } = useCartContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(hardcodedProducts);

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = hardcodedProducts.filter((product) =>
      product.productName.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleItemCart = (product) => {
    addToCart(product);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row mb-4">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4"
                key={product._id}
              >
                <ProductCard product={product} onAddToCart={handleItemCart} />
              </div>
            ))
          ) : (
            <div className="text-center">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

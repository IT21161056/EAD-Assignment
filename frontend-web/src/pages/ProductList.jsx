import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import { useCartContext } from "../components/providers/ContextProvider";
import p from "../assets/p.jpg";

const ProductList = () => {
  const { addToCart } = useCartContext();
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Replace API call with hardcoded data
    const hardcodedProducts = [
      { _id: 1, productName: "Papaya", productPrice: 150, productImage: p },
      { _id: 2, productName: "Mango", productPrice: 200, productImage: p },
      { _id: 3, productName: "Banana", productPrice: 50, productImage: p },
      {
        _id: 4,
        productName: "Pine",
        productPrice: 300,
        productImage: p,
      },
    ];
    setProductData(hardcodedProducts);
  }, []);

  const filterProductData = productData.filter((procudtItem) => {
    const { productName, productPrice } = procudtItem;
    const prodPrice = productPrice.toString();
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      productName.toLowerCase().includes(lowerCaseQuery) ||
      prodPrice.includes(lowerCaseQuery)
    );
  });

  const handleItemCart = (product) => {
    addToCart(product);
  };

  const proceedToCart = () => {
    navigate(`/cart`);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row mb-4">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {filterProductData.map((prData, index) => {
            return (
              <div
                className="col-lg-3 col-md-2 col-sm-6 col-12 d-flex justify-content-center mb-4"
                key={index}
              >
                <div
                  className="card shadow-sm p-2 mb-5 bg-white rounded "
                  style={{ width: "250px" }}
                >
                  <h5 className="card-title text-center">
                    {prData.productName}
                  </h5>
                  <img
                    src={prData.productImage}
                    className="card-img-top mx-auto d-block"
                    alt="product_img"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="">Price: Rs: {prData.productPrice}</h5>
                    <button
                      className=" btn btn-primary"
                      onClick={() => handleItemCart(prData)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ProductList;

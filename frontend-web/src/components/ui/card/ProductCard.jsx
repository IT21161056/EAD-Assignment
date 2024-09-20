import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import p from "../../../assets/p.jpg";

const Products = () => {
  return (
    <div className="col-md-4 m-4">
      <div
        className="card shadow-sm p-2 mb-5 bg-white rounded "
        style={{ width: "250px" }}
      >
        <h5 className="card-title text-center">ProductName</h5>
        <img
          src={p}
          className="card-img-top mx-auto d-block"
          alt="product_img"
          style={{ width: "150px", height: "140px" }}
        />
        <div className="card-body text-center">
          <button className=" btn btn-primary">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Products;

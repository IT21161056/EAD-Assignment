import React from "react";
import { Route, Routes } from "react-router-dom";
import Order from "../pages/Order";
import Listings from "../pages/Listings";
import ProductList from "../pages/ProductList";
import ProductCart from "../pages/ProductCart";

// dasbhboard components

import UserManagement from "../pages/dashboradPages/UserManagement";
import ProductManagement from "../pages/dashboradPages/ProdcutManagement";
import ProdcutAdd from "../pages/dashboradPages/ProductAdd";
import ProductUpdate from "../pages/dashboradPages/ProductUpdate";

const Router = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Routes>
      {/* Component routes */}

      <Route path="/" element={<ProductList />} />
      <Route path="/cart" element={<ProductCart />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/users" element={<UserManagement />} />

      {/* Dashboard component routes */}

      <Route path="dashboard/allproducts" element={<ProductManagement />} />
      <Route path="dashboard/addproduct" element={<ProdcutAdd />} />
      <Route path="dashboard/updateproduct/:id" element={<ProductUpdate />} />
    </Routes>
  );
};

export default Router;

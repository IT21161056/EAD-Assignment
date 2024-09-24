import React from "react";
import { Route, Routes } from "react-router-dom";
import Order from "../pages/Order";
import ProductList from "../pages/ProductList";
import ProductCart from "../pages/ProductCart";

// dasbhboard components

import UserManagement from "../pages/dashboradPages/UserManagement";
import ProductManagement from "../pages/dashboradPages/ProdcutManagement";
import ProdcutAdd from "../pages/dashboradPages/ProductAdd";
import ProductUpdate from "../pages/dashboradPages/ProductUpdate";
import AdminDashboard from "../pages/AdminDashboard";
import CreateVendor from "../pages/CreateVendor"
import AllOrder from "../pages/AllOrder";
import OrderCancelationRequest from "../pages/OrderCancelationRequest";
import CSRDashboard from "../pages/dashboradPages/csrDashboard";
import VendorDashboard from "../pages/dashboradPages/vendorDashboard";
import VendorListings from "../pages/dashboradPages/VendorListings";

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
      <Route path="/users" element={<UserManagement />} />

      {/* Dashboard component routes */}

      <Route path="dashboard/allproducts" element={<ProductManagement />} />
      <Route path="dashboard/addproduct" element={<ProdcutAdd />} />
      <Route path="dashboard/updateproduct/:id" element={<ProductUpdate />} />
      <Route path="adminDashboard" element={<AdminDashboard />} />
      <Route path="createVendor" element={<CreateVendor />} />
      <Route path="allOrders" element={<AllOrder />} />
      <Route path="cancelRequest" element={<OrderCancelationRequest />} />
      <Route path="csr" element={<CSRDashboard/>} />
      <Route path="vendor" element={<VendorDashboard />} />
      <Route path="vendorOrder" element={<VendorListings />} />
      <Route path="products" element={<ProductManagement />} />
    </Routes>
  );
};

export default Router;

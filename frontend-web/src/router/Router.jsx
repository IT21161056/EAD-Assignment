import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Order from "../pages/Order";
import Listings from "../pages/Listings";
import UserManagements from "../pages/UserManagements";

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
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<Order/>}/>
      <Route path="/listings" element={<Listings/>}/>
      <Route path="/users" element={<UserManagements/>}/>
    </Routes>
  );
};

export default Router;

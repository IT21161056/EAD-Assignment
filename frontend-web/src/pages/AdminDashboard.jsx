import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <Link to="/createVendor">
        <p>Vendor Dashboard</p>
      </Link>
    </div>
  );
};

export default AdminDashboard;

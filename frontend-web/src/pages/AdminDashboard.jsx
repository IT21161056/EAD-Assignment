import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const AdminDashboard = () => {
  return (
    <div className="mt-5 d-flex gap-3">
      <Link to="/createVendor">
        <Card style={{ width: '15rem' }}>
          <Card.Body className="d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <i className="bi bi-person-lines-fill" style={{ fontSize: '2rem' }}></i>
              <p className="text-center">Vendor Management</p>
            </div>
          </Card.Body>
        </Card>
      </Link>

      <Link to="/allOrders">
        <Card style={{ width: '15rem' }}>
          <Card.Body className="d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-box-fill" style={{ fontSize: '2rem' }}></i>
              <p className="text-center">Order Management</p>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default AdminDashboard;

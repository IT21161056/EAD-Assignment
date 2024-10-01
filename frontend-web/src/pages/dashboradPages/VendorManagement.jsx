import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AddVendorModal from "../../components/ui/venodrModals/AddVendorModal";
import UpdateVendorModal from "../../components/ui/venodrModals/UpdateVendorModal";

const VendorManagement = () => {
  const [show, setShow] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const fetchVendorData = async () => {
  //     try {
  //       const response = await axios.get(`http//localhost:5050/api/vendor`);
  //       setVendors(response.data);
  //     } catch (error) {
  //       console.log("Error fetching Vendor data", error);
  //     }
  //   };
  //   fetchVendorData();
  // }, []);

  console.log(">>.", vendors);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const filterVendors = vendors.filter((vendorElement) => {
  //   const { VendorName, VendorEmail, VendorAddress, VendorCity } =
  //     vendorElement;
  //   const vendorName = VendorName.toString().toLowerCase();
  //   const vendorEmail = VendorEmail.toString();
  //   const vendorAddress = VendorAddress.toString();
  //   const vendorCity = VendorCity.toString().toLowerCase();

  //   const lowerCaseQuery = searchQuery.toLowerCase();

  //   return (
  //     vendorName.includes(lowerCaseQuery) ||
  //     vendorEmail.includes(lowerCaseQuery) ||
  //     vendorAddress.includes(lowerCaseQuery) ||
  //     vendorCity.includes(lowerCaseQuery)
  //   );
  // });

  return (
    <div>
      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4>Vendor Management</h4>
          <Button variant="primary" onClick={handleShow}>
            Add New Vendor
          </Button>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>City</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/*{filterVendors.map((venodrDta, index) => {
              return (*/}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  style={{
                    fontSize: "12px",
                  }}
                  onClick={handleShow}
                >
                  Feedbacks
                </button>
              </td>
              <td>
                <i
                  class="bi bi-pencil-square m-1"
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    fontSize: "24px",
                  }}
                  onClick={handleShow}
                ></i>
                <i
                  className="bi bi-trash m-1"
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "24px",
                  }}
                  onClick={handleShow}
                ></i>
              </td>
            </tr>
            {/* //); */}
            {/* })} */}
          </tbody>
        </table>
        <AddVendorModal show={show} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default VendorManagement;

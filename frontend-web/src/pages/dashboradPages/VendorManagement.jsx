import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VendorService from "../../../APIService/VendorService";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchVendorData = async () => {
      try {
        const response = await VendorService.getAllVendors({
          signal: abortController.signal,
        });
        setVendors(response.data);
      } catch (error) {
        if (error === "AbortError") {
          console.log("Fetch aborted!");
        } else {
          setError("Error fetching Vendor data...");
          console.log("Error fetching Vendor data", error);
        }
      }
    };
    fetchVendorData();

    return () => {
      abortController.abort();
    };
  }, []);

  const filterVendors = vendors.filter((vendorElement) => {
    const { vendorName = "", vendorEmail = "" } = vendorElement;

    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      vendorName.toLowerCase().includes(lowerCaseQuery) ||
      vendorEmail.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const navigateToUpdate = (id) => {
    navigate(`/dashboard/updatevendor/${id}`);
  };

  const deleteExistingVendor = async (id) => {
    try {
      await APIService.deleteVendor(id);
      const updatedList = vendors.filter((item) => id !== item.id);
      setVendors(updatedList);
    } catch (error) {
      setError("Error deleting the Vendor...");
      console.log("Error deleting paticular Vendor!", error);
    }
  };

  console.log(">>>>", vendors);

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <h4 className="text-center">Vendor Management</h4>
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
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-light">
          {filterVendors.map((venodrDta, index) => {
            return (
              <tr key={index}>
                <td>{venodrDta.vendorName}</td>
                <td>{venodrDta.vendorEmail}</td>
                <td>{venodrDta.vendorPhone}</td>
                <td>{venodrDta.vendorAddress}</td>
                <td>{venodrDta.vendorCity}</td>
                <td>
                  {venodrDta.isActive ? (
                    <button
                      className="btn btn-primary"
                      diabled
                      style={{ fontSize: "0.8rem", pointerEvents: "none" }}
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      diabled
                      style={{ fontSize: "0.8rem", pointerEvents: "none" }}
                    >
                      In-active
                    </button>
                  )}
                </td>
                <td>
                  <i
                    className="bi bi-pencil-square m-1"
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      fontSize: "24px",
                    }}
                    onClick={() => navigateToUpdate(venodrDta.id)}
                  ></i>
                  <i
                    className="bi bi-trash m-1"
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "24px",
                    }}
                    onClick={() => deleteExistingVendor(venodrDta.id)}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VendorManagement;

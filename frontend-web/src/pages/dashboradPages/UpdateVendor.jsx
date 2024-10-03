import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/ReactToastify.css";

const UpdateVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchVendorData = async () => {
      try {
        const response = await APIService.getVendorById({
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

  const updateVendorDetails = () => {};

  return (
    <>
      <div className="container my-4">
        <div className="card shadow-sm p-4">
          <h3 className="mb-4">Update Vendor Details</h3>
          <form action="">
            <div className="form-group">
              <label htmlFor="" className="m-2">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter a name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="m-2">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter a email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="m-2">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter a phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="m-2">
                Address Location
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter a address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="m-2">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter a city"
              />
            </div>
            <div className="d-flex align-items-center justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-primary m-1"
                style={{ width: "7rem", fontSize: "18px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success m-1"
                style={{ width: "7rem", fontSize: "18px" }}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateVendor;

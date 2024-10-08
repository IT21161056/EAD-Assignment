import { axiosAPI } from "../api";

class VendorService {
  // Vendor end points

  getAllVendors(config = {}) {
    return axiosAPI.get(`/vendor`, config);
  }

  getVendorById(id, config = {}) {
    return axiosAPI.get(`/vendor/${id}`, config);
  }

  addVendor(vendor) {
    return axiosAPI.post(`/vendor/register`, vendor);
  }

  loginVendor(credentials) {
    return axiosAPI.post(`/auth/login`, credentials);
  }

  updateVendorDetails(id, vendor) {
    return axiosAPI.put(`/vendor/${id}`, vendor);
  }

  // updateVendorStatus() {
  //   return axiosAPI.put(`/vendor/${id}`);
  // }

  deleteVendor(id) {
    return axiosAPI.delete(`/vendor/${id}`);
  }
}

export default new VendorService();

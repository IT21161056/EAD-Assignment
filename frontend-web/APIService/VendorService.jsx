import { axiosAPI } from "../api";

class VendorService {
  // Vendor end points

  getCustomerFeedback() {
    return axiosAPI.get(`/feedback`);
  }
}

export default new VendorService();

import axios from "axios";
import { BASE_URL } from "./BASEUrl";

class APIService {
  // Order end points

  purchaseOrder(orderObj) {
    return axios.post(`${BASE_URL}/api/order`, orderObj);
  }

  getAllOrders() {
    return axios.get(`${BASE_URL}/api/order`);
  }

  updateOrderDetails(updateOrderObj, id) {
    return axios.put(`${BASE_URL}/api/order/${id}`, updateOrderObj);
  }

  // Vendor end points

  getAllVendors(config = {}) {
    return axios.get(`${BASE_URL}/api/vendor`, config);
  }

  addVendor() {}

  updateVendor() {}
}

export default new APIService();

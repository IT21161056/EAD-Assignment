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

  deleteOrder(id) {
    return axios.delete(`${BASE_URL}/api/order/${id}`);
  }

  getVendorOrders(vendorId) {
    return axios.get(`${BASE_URL}/api/order/vendor/${vendorId}/suborders`);
  }

  updateOrderStatus(orderId, orderObj) {
    return axios.put(`${BASE_URL}/api/order/orderitems/${orderId}`, orderObj);
  }

  getOrderWithItems() {
    return axios.get(`${BASE_URL}/api/order/items`);
  }
}

export default new APIService();

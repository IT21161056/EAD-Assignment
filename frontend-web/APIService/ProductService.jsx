import { axiosAPI } from "../api/index";

class ProductService {
  addProduct(product) {
    console.log("Product >>", product);
    return axiosAPI.post("/products", product);
  }

  getVenderProducts(venderID) {
    return axiosAPI.get(`/products/vendor/${venderID}`);
  }

  updateVenderProduct(product, productId) {
    return axiosAPI.put(`/products/${productId}`, product);
  }
  deleteVenderProduct(productId) {
    return axiosAPI.delete(`/products/${productId}`);
  }
}

export default new ProductService();

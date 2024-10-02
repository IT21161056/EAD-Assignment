import { axiosAPI } from "../api/index";

class ProductService {
  addProduct(product) {
    console.log("Product >>", product);
    return axiosAPI.post("/products", product);
  }

  getVenderProducts(venderID) {
    return axiosAPI.get(`/products/vendor/${venderID}`);
  }
}

export default new ProductService();

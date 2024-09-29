import axios from 'axios'
import { BASE_URL } from "./BASEUrl";

class APIService {
    
    purchaseOrder(orderObj){
        return axios.post(`${BASE_URL}/api/order`,orderObj)
    }

    getAllOrders(){
        return axios.get(`${BASE_URL}/api/order`)
    }
}

export default new APIService;

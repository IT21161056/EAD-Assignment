import axios from 'axios'
import { BASE_URL } from "./BASEUrl";

class APIService {
    
    purchaseOrder(orderObj){
        return axios.post(`${BASE_URL}/api/order`,orderObj)
    }
}

export default new APIService;

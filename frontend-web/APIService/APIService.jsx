import axios from 'axios'
import { BASE_URL } from "./BASEUrl";

class APIService {
    
    //order endpoints
    purchaseOrder(orderObj){
        return axios.post(`${BASE_URL}/api/order`,orderObj)
    }

    getAllOrders(){
        return axios.get(`${BASE_URL}/api/order`)
    }

    updateOrderDetails(updateOrderObj,id){
        return axios.put(`${BASE_URL}/api/order/${id}`,updateOrderObj)
    }

    deleteOrder(id){
        return axios.delete(`${BASE_URL}/api/order/${id}`)
    }
}

export default new APIService;

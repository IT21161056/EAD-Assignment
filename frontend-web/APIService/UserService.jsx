import axios from "axios";
import { axiosAPI } from "../api";
import { BASE_URL } from "./BASEUrl";

class UserService {
  getAllUsers() {
    return axiosAPI.get(`/user`);
  }

  updateUserStatus(userId,userObj){
    return axiosAPI.put(`${BASE_URL}/auth/update/${userId}`,userObj)
  }
}

export default new UserService();

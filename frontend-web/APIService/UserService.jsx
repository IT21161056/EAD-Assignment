import { axiosAPI } from "../api";

class UserService {
  getAllUsers() {
    return axiosAPI.get(`/user`);
  }

  updateUserStatus(userId, userObj) {
    return axiosAPI.put(`/user/update/${userId}`, userObj);
  }
}

export default new UserService();

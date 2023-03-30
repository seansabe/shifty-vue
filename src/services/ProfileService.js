import http from "../http-common.js";
class ProfileService{
    registration(data){
        return http.post("/users", data);
    }
}

export default new RegisterService();
import http from "../http-common.js";
class RegisterService{
    registration(data){
        return http.post("/users", data);
    }
}

export default new RegisterService();
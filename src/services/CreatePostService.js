import http from "../http-common.js";
class CreatePostService{
    createpost(data){
        return http.post("/jobs", data);
    }
}

export default new CreatePostService();
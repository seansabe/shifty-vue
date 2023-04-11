import http from "../http-common.js";
class EditProfileService {
    editProfile(data, userId) {
        return http.put("/users/"+userId, data);
    }
}

export default new EditProfileService();
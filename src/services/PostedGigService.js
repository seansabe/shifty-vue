import http from "../http-common.js";
class PostedGigService {
  getJobsByUserId(userId) {
    return http.get(`/users/${userId}/jobs`);
  }
  getApplicationsByJobId(jobId){
    return http.get(`/applications/job/${jobId}`);
  }
  
}

export default new PostedGigService();

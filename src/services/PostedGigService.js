import http from "../http-common.js";
class PostedGigService {
  getJobsByUserId(userId) {
    return http.get(`/users/${userId}/jobs`);
  }
  getApplicationsByJobId(jobId){
    return http.get(`/applications/job/${jobId}`);
  }
  cancelJob(jobId) {
    return http.delete(`/jobs/${jobId}`)
        .then(response => {
            console.log(response);
            console.log("Job Deleted #" + jobId);

        })
        .catch(error => {
            console.log(error);
        });
}
  
}

export default new PostedGigService();

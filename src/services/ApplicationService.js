import http from "../http-common.js";
class ApplicationService{
    showJobs(){
        return http.get('/jobs');
    }
    apply(user_id, job_id) {
        const newApp = {
            "userId": user_id,
            "jobId": job_id,
            "status": "Applied"
        }
    return http.post('/applications', newApp);
    }
    // getPostedJobs(user_id) {
    //     return http.get(`/users/${user_id}/jobs`);
    // }
    // getUnPostedJobs(user_id) {
    //     return new Promise ((resolve, reject) => {
    //         this.getPostedJobs(user_id)
    //         .then(response => {
    //             const jobs = response.data.map(job => job.jobId);
    //             http.get('/jobs')
    //             .then(response => {
    //                 const allJobs = response.data;
    //                 const unpostedJobs = allJobs.filter(
    //                     (a) => !(jobs.map(c => c.id).includes(a.id))  );
    //                     if(unpostedJobs) {
    //                         response.data = unpostedJobs;
    //                         console.log(unpostedJobs);
    //                         resolve(response);
    //                     }
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             })
    //         })
    //         .catch(error =>{
    //             reject(error);
    //         })
    //     }

    //     );
    // }
}

export default new ApplicationService();
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
    getUserApplications(user_id){
        return new Promise ((resolve, reject) => {
            http.get('/applications')
            .then(response => {
                const allApplications = response.data;
                const userApplications = allApplications.filter(
                    application => application.userBuster.userId == user_id);
                    if(userApplications) {
                        response.data = userApplications;
                        console.log(userApplications);
                        resolve(response);
                    }
            })
            .catch(error =>{
                reject(error);
            })
        }
        );
    }
    cancelApplication(applicationId) {
        console.log("Application Deleted #" + applicationId);
        return http.delete(`/applications/${applicationId}`);
    }
}

export default new ApplicationService();
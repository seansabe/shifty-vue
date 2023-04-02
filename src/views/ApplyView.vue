<template>
    <div class="content"> 
        <div class="wrapper d-flex flex-column justify-content-center align-items-center">
            <table v-if="jobs.length">
                <tr><th>Job Number</th><th>Title</th><th>Job Type</th><th>Description</th><th>Hourly Rate</th><th>Posted</th><th>From</th><th>To</th></tr>
                <tr v-for="(job, index) in jobs.filter(job => !currentUserJobIds.includes(job.jobId))" :key="index">
                    <td>(Job #{{ job.jobId }})</td><td>{{ job.title }}</td><td>{{ job.kindOfJob }}</td><td>{{ job.description }}</td><td>{{ job.hourRate }}</td><td>{{ job.postingDate }}</td><td>{{ job.jobStartDate }}</td><td>{{ job.jobFinishDate }}</td>
                    <td><button :id="index" :disabled="job.applied" @click="applyNow(job.jobId,job) ">{{job.applied ? 'Applied' : 'Apply'}}</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import ApplicationService from '../services/ApplicationService';
export default{
    name: "applyView",
    data(){
        return{
            jobs: [], //stage variable
            currentUserJobIds: [], //this includes Applications of the currentUser
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
    }},
    methods: {
        applyNow(jobId,job) {
            console.log("This is the job id " + jobId);
            // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                ApplicationService.apply(this.currentUser.userId, jobId)
                    .then(response => {
                        const newApplication = response.data;
                        console.log(newApplication);
                        //this.refreshJobList();
                        job.applied = true;
                    })
                    .catch(error => {
                        console.log(error);
                    })
        },
        showAllJobs() {
            ApplicationService.showJobs()
            .then(response=> {
                let userJobs = this.currentUser.userJobs;
                        console.log("this is the length " + this.currentUser.userJobs.length); //jobs posted by currentUser
                        for (let i = 0; i < userJobs.length; i++) {
                            let jobId = userJobs[i].jobId;
                            this.currentUserJobIds.push(userJobs[i].jobId);
                            console.log(jobId);
                            }
                            console.log("current user job ids " + this.currentUserJobIds);
                //if there was a jobId in the Application object, so it has to be added
                // let currentUserApplications = this.currentUser.userApplications;
                // for (let i = 0; i < currentUserApplications.length; i++) {
                //             let aplicationId = currentUserApplications[i].jobId; 
                //             this.currentUserJobIds.push(currentUserApplications[i].jobId);
                //             console.log("this is the application id: " + aplicationId);
                //             }
                 this.jobs = response.data;
            })
            .catch(error=> {
                console.log(error);
            })
        }
        
    },
    mounted(){
        this.showAllJobs();
    }
}
</script>

<style>
.wrapper {
    background-color: white;
    width: 400px;
    height: 500px;
    border-radius: 20px;
}

.wrapper img {
    margin-bottom: 50px;
}
</style>


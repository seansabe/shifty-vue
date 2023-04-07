<template>
    <div class="content"> 
        <div class="wrapperApply d-flex flex-column  align-items-center">
            <table class="table table-borderless mb-3" v-for="(job, index) in jobs.filter(job => !filterJobs.includes(job.jobId))" :key="index">
                <tbody>
                    <tr>
                        <td>
                            <h3>{{ job.title }}</h3>
                        </td>
                        <td class="text-end">{{ job.kindOfJob }} &nbsp;&nbsp;&nbsp; Hourly Rate: ${{ job.hourRate }}
                            &nbsp;&nbsp;&nbsp; Posted {{ job.postingDate}}</td>
                    </tr>
                    <tr>
                        <td colspan="4" ><b>Start Date:</b> {{ job.jobStartDate }} &nbsp;&nbsp;&nbsp;<b>Finish Date: </b>{{ job.jobFinishDate
                        }} &nbsp;&nbsp;&nbsp; </td>
                    </tr>
                    <tr>
                        <td colspan="4" >{{ job.description }}</td>
                    </tr>
                    <tr>
                        <td><button class="btn btn-dark me-2 btn-shifty-primary" :id="index" :disabled="job.applied" 
                            @click="applyNow(job.jobId,job) ">{{job.applied ? 'Applied' : 'Apply'}}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ApplicationService from '../services/ApplicationService';
// import UserApplications from '../UserApplications';
export default{
    name: "applyView",
    data(){
        return{
            jobs: [], //stage variable
            filterJobs: [], //this includes Applications of the currentUser
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
                        job.applied = true;
                    })
                    .catch(error => {
                        console.log(error);
                    })
        },
        getUserApplications(){
            ApplicationService.getUserApplications(this.currentUser.userId)
            .then(response=> {
                let applications = response.data;
                 for( let i = 0; i < applications.length; i++) {
                    let jobBuster = applications[i].userBuster.userId;
                    console.log("job buster:"+ i + " : " + jobBuster);
                    if(jobBuster == this.currentUser.userId) {
                        this.filterJobs.push(applications[i].jobListing.jobId);
                    }
                 }
            })
            .catch(error=> {
                console.log(error);
            })
        },
        showAllJobs() {
            ApplicationService.showJobs()
            .then(response=> {
                 this.jobs = response.data;
                 for( let i = 0; i < this.jobs.length; i++) {
                    let jobPoster = this.jobs[i].userPoster.userId;
                    console.log("job poster:"+ i + " : " + jobPoster);
                    if(jobPoster == this.currentUser.userId) {
                        this.filterJobs.push(this.jobs[i].jobId);
                    }
                 }
                //  let userApplications = UserApplications.showUserApplications();
                //  for( let i = 0; i < userApplications.length; i++) {
                //     let jobBuster = userApplications[i].userbuster.userId;
                //     console.log("job buster:"+ i + " : " + jobBuster);
                //     if(jobBuster == this.currentUser.userId) {
                //         this.filterJobs.push(userApplications[i].jobListing.jobId);
                //     }
                //  }  
            })
            .catch(error=> {
                console.log(error);
            })
        }
        
    },
    mounted(){
        this.getUserApplications();
        this.showAllJobs();
    }
}
</script>

<style>
.wrapperApply {
    background-color: white;
    width: 80%;
    height: 720px;
    border-radius: 20px;
    margin-top: 10px;
    overflow: auto;
    padding: 50px;
}

.wrapper img {
    margin-bottom: 50px;
}
table {
    border-collapse: separate;
    border-spacing: 0;
    border: 2px solid #03192e;
    box-shadow: 4px 5px 5px rgba(189, 93, 93, 0.3);
    border-image: linear-gradient(to right, rgba(107, 22, 208, 1), rgba(153, 45, 176, 1), rgba(199, 32, 145, 1)) 1;
    border-image-slice: 1;
}
</style>


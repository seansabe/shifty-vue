<template>
    <div class="content"> 
        <div class="wrapperUserApplications d-flex flex-column  align-items-center">
            <table class="table table-borderless mb-3" v-for="(job, index) in jobs" :key="index">
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
                        }} &nbsp;&nbsp;&nbsp;<b>Status: </b>{{job.canceled ? 'Canceled' : 'Applied'}} &nbsp;&nbsp;&nbsp; 
                        <button class="btn btn-dark me-2 btn-shifty-primary" :id="index" :disabled="job.canceled" @click="cancel(job.jobId, job) ">
                        {{job.canceled ? 'Canceled' : 'Cancel'}}</button></td>
                    </tr>
                    <tr>
                        <td colspan="4" >{{ job.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ApplicationService from '../services/ApplicationService';
export default{
    name: "userApplications",
    data(){
        return{
            jobs: [], //jobs that currentUser have applied for
            allApplications: [], //all user applications
            whatever: [],
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
    }},
    methods: {
        cancel(jobId,job) {
            console.log("This is the job id to cancel" + jobId);
        for( let i = 0; i < this.allApplications.length; i++) {
            if(jobId === this.allApplications[i].jobListing.jobId) {
                ApplicationService.cancelApplication(this.allApplications[i].applicationId)
                    .then(response => {
                        this.whatever = response.data;
                        job.canceled = true;
                        console.log("Cancelled application #" + this.allApplications[i].applicationId + ". For the job #" + jobId);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
                
        },
        showUserApplications() {
            ApplicationService.getUserApplications(this.currentUser.userId)
            .then(response=> {
                let applications = response.data;
                console.log("Applications objects:" + applications);
                console.log(applications.length)
                 for( let i = 0; i < applications.length; i++) {
                    this.allApplications.push(applications[i]);
                    //filter out repeated Applications
                    if(!(this.jobs.find(j=> j.jobId === applications[i].jobListing.jobId))){
                        console.log("user applications:"+ i + " : " + applications[i].jobListing.title);
                        this.jobs.push(applications[i].jobListing);
                        console.log("jobs pushes:"+ i + " : " + this.jobs[i].jobId);
                    }
                 }
            })
            .catch(error=> {
                console.log(error);
            })
        }
        
    },
    mounted(){
        this.showUserApplications();
    }
}
</script>

<style>
.wrapperUserApplications {
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

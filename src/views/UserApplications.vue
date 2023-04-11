<template>
    <div class="content">
        <div class="wrapperUserApplications d-flex flex-column align-items-center">
            <table class="table table-borderless mb-3" v-for="(job, index) in jobs" :key="index">
                <tbody>
                    <tr>
                        <td class="first-row">
                            <h3>{{ job.title }}</h3>
                        </td>
                        <td class="first-row text-end"><span class="badge rounded-pill text-bg-dark">{{ job.kindOfJob
                        }}</span> &nbsp;&nbsp;&nbsp; <span class="badge rounded-pill text-bg-dark">Hourly
                                Rate: ${{ job.hourRate
                                }}</span>
                            &nbsp;&nbsp;&nbsp; <span class="badge rounded-pill text-bg-dark">Posted {{ job.postingDate
                            }}</span></td>
                    </tr>
                    <tr>
                        <td colspan="4"><span class="badge rounded-pill text-bg-dark">Start Date: {{ job.jobStartDate
                        }}</span> &nbsp;&nbsp;&nbsp; <span class="badge rounded-pill text-bg-dark">Finish
                                Date: {{
                                    job.jobFinishDate
                                }}</span> &nbsp;&nbsp;&nbsp;<span class="badge rounded-pill text-bg-dark">Status: {{
    job.canceled ? 'Canceled' : 'Applied' }}</span>
                            &nbsp;&nbsp;&nbsp;

                        </td>

                    </tr>
                    <tr>
                        <td colspan="4">{{ job.description }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" class="last-row text-end">
                            <button class="btn btn-dark me-2 btn-shifty-primary" :id="index" :disabled="job.canceled"
                                @click="cancel(job.jobId, job)">
                                {{ job.canceled ? 'Canceled' : 'Cancel Application' }}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ApplicationService from '../services/ApplicationService';
export default {
    name: "userApplications",
    data() {
        return {
            jobs: [], //jobs that currentUser have applied for
            allApplications: [], //all user applications
            whatever: [],
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
        }
    },
    methods: {
        cancel(jobId, job) {
            console.log("This is the job id to cancel" + jobId);
            for (let i = 0; i < this.allApplications.length; i++) {
                if (jobId === this.allApplications[i].jobListing.jobId) {
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
                .then(response => {
                    let applications = response.data;
                    console.log("Applications objects:" + applications);
                    console.log(applications.length)
                    for (let i = 0; i < applications.length; i++) {
                        this.allApplications.push(applications[i]);
                        //filter out repeated Applications
                        if (!(this.jobs.find(j => j.jobId === applications[i].jobListing.jobId))) {
                            console.log("user applications:" + i + " : " + applications[i].jobListing.title);
                            this.jobs.push(applications[i].jobListing);
                            console.log("jobs pushes:" + i + " : " + this.jobs[i].jobId);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

    },
    mounted() {
        this.showUserApplications();
    }
}
</script>

<style>
.wrapperUserApplications {
    width: 100%;
    overflow: auto;
}

.wrapperUserApplications h5 {
    color: white;
}

table {
    background-color: white;
    border-radius: 20px;
}

td {
    padding-left: 50px !important;
    padding-right: 50px !important;
}

.first-row {
    padding-top: 50px !important;
}

.first-row h3 {
    color: rgba(153, 45, 176, 1) !important;
}

.last-row {
    padding-bottom: 50px !important;
}

.wrapperUserApplications .badge {
    background-color: #7c24c4 !important;
}
</style>

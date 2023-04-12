<template>
    <div class="content">
        <div v-if="postedGigsResponse.length > 0" class="wrapperPostedGigs d-flex flex-column align-items-center">
            <table class="table table-borderless mb-3" v-for="job in postedGigsResponse" :key="job.jobId">
                <tbody>
                    <tr>
                        <td class="first-row">
                            <h3>{{ job.title }}</h3>
                        </td>
                        <td class="first-row text-end"><span class="badge rounded-pill text-bg-dark">{{ job.kindOfJob
                        }}</span> &nbsp;&nbsp;&nbsp; <span class="badge rounded-pill text-bg-dark">Hourly
                                Rate: ${{ job.hourRate
                                }}</span>
                            &nbsp;&nbsp;&nbsp; <span class="badge rounded-pill text-bg-dark">Posted {{
                                getDaysAgo(job.postingDate) }}</span></td>
                    </tr>
                    <tr>
                        <td colspan="4"><span class="badge rounded-pill text-bg-dark">Start Date: {{ job.jobStartDate
                        }}</span> &nbsp;&nbsp;&nbsp; <span class="badge rounded-pill text-bg-dark">Finish
                                Date: {{
                                    job.jobFinishDate
                                }}</span></td>
                    </tr>
                    <tr>
                        <td colspan="4">{{ job.description }}</td>
                    </tr>
                    <tr>
                        <td class="last-row">
                            You have <b>{{ appsize[job.jobId] }}</b> applicants.
                            <a class="nav-link" aria-current="page" href="#">See applicants</a>
                        </td>
                        <td class="last-row text-end">
                            <button class="btn btn-dark me-2 btn-shifty-primary" type="button">Edit</button>
                            <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnCancel"
                    @click="cancel(job.jobId)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="wrapperPostedGigs d-flex flex-column align-items-center" v-else>
            <h5>You haven't posted any gigs posted yet.</h5>
        </div>

    </div>
</template>
<script>
import PostedGigService from "../services/PostedGigService";
export default {
    name: "listPostedGigs",
    data() {
        return {
            currentUser: null,
            postedGigsResponse: {},
            appsize: {},
            deleteJobResponse: {}
        }
    },
    methods: {
        getDaysAgo(date) {
            const today = new Date();
            const postingDate = new Date(date);
            const diffTime = today.getTime() - postingDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 0) {
                return "today";
            } else if (diffDays === 1) {
                return "yesterday";
            } else {
                return `${diffDays} days ago`;
            }
        },
        getCurrentUser() {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (this.currentUser != null) {
                this.disabled = "";
            }
            console.log(this.currentUser);
        },
        cancel(jobId) {
            console.log(typeof jobId);
            PostedGigService.cancelJob(jobId)
                .then(response => {
                    this.deleteJobResponse = response;
                    console.log("Deleted job ");
                    this.$router.go(0);
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },
    created() {
        //  const userId = 1;
        // const userId = this.getCurrentUser().id;
        this.getCurrentUser();
        PostedGigService.getJobsByUserId(this.currentUser.userId)
            .then((response) => {
                const postedGigs = response.data;
                const promises = postedGigs.map(job => {
                    return PostedGigService.getApplicationsByJobId(job.jobId)
                        .then((applicationsResponse) => {
                            this.appsize[job.jobId] = applicationsResponse.data.length;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
                Promise.all(promises).then(() => {
                    this.postedGigsResponse = postedGigs.reverse();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
}
</script>


<style>
.wrapperPostedGigs {
    width: 100%;
    overflow: auto;
}

.wrapperPostedGigs h5 {
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

.wrapperPostedGigs .badge {
    background-color: #7c24c4 !important;
}
</style>
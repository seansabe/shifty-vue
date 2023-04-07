<template>
    <div class="content">
            <div v-if="postedGigsResponse.length > 0"  class="wrapperPostedGigs d-flex flex-column  align-items-center">
            <table class="table table-borderless mb-3" v-for="job in postedGigsResponse" :key="job.jobId">
                <tbody>
                    <tr>
                        <td>
                            <h3>{{ job.title }}</h3>
                        </td>
                        <td class="text-end">{{ job.kindOfJob }} &nbsp;&nbsp;&nbsp; Hourly Rate: ${{ job.hourRate }}
                            &nbsp;&nbsp;&nbsp; Posted {{ getDaysAgo(job.postingDate) }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" ><b>Start Date:</b> {{ job.jobStartDate }} &nbsp;&nbsp;&nbsp;<b>Finish Date: </b>{{ job.jobFinishDate
                        }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" >{{ job.description }}</td>
                    </tr>
                    <tr>
                        <td>
                            You have <b>{{ appsize[job.jobId] }}</b> applicants.
                            <a class="nav-link" aria-current="page" href="#">See applicants</a>
                        </td>
                        <td class="text-end">
                            <button class="btn btn-dark me-2 btn-shifty-primary" type="button">Edit</button>
                            <button class="btn btn-dark me-2 btn-shifty-primary" type="button">Delete</button>
                        </td> 
                    </tr>
                </tbody>
            </table>
            </div>
            <div class="wrapperPostedGigs d-flex flex-column  align-items-center" v-else>
                No jobs posted yet.
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
            appsize : {}
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
    background-color: white;
    width: 80%;
    height: 720px;
    border-radius: 20px;
    margin-top: 10px;
    overflow: auto;
    padding: 50px;
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
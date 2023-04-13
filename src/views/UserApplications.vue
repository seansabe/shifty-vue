<template>
    <div class="content user-app-view">
        <div v-if="allApplications.length > 0" class="wrapperUserApplications d-flex flex-column align-items-center">
            <table class="table table-borderless mb-3" v-for="app in allApplications" :key="app">
                <tbody>
                    <tr>
                        <td class="first-row">
                            <h3>{{ app.jobListing.title }}</h3>
                        </td>
                        <td class="first-row text-end"><span class="badge rounded-pill text-bg-dark">{{
                            app.jobListing.kindOfJob
                        }}</span>&nbsp;&nbsp;&nbsp;<span class="badge rounded-pill text-bg-dark">Hourly
                                Rate: ${{ app.jobListing.hourRate
                                }}</span>&nbsp;&nbsp;&nbsp;<span class="badge rounded-pill text-bg-dark">Posted {{
    app.jobListing.postingDate
}}</span></td>
                    </tr>
                    <tr>
                        <td colspan="4"><span class="badge rounded-pill text-bg-dark">Start Date: {{
                            app.jobListing.jobStartDate
                        }}</span>&nbsp;&nbsp;&nbsp;<span class="badge rounded-pill text-bg-dark">Finish
                                Date: {{
                                    app.jobListing.jobFinishDate
                                }}</span>&nbsp;&nbsp;&nbsp;<span class="badge rounded-pill text-bg-dark">Status: {{
    this.isCancelled ? 'Cancelled' : app.status }}</span>&nbsp;&nbsp;&nbsp;
                        </td>

                    </tr>
                    <tr>
                        <td colspan="4">{{ app.jobListing.description }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" class="last-row text-end">
                            <button class="btn btn-dark me-2 btn-shifty-primary" :id="index"
                                @click="cancel(app.applicationId)" :disabled="this.isCancelled">
                                {{ this.isCancelled ? 'Cancelled' : 'Cancel Application' }}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="wrapperUserApplications d-flex flex-column align-items-center" v-else>
            <h5>You haven't applied to any gig yet.</h5>
        </div>
    </div>
</template>

<script>
import ApplicationService from '../services/ApplicationService';
export default {
    name: "userApplications",
    data() {
        return {
            allApplications: {}, //all user applications
            currentUser: JSON.parse(localStorage.getItem('currentUser')),
            isCancelled: false
        }
    },
    methods: {
        cancel(id) {
            console.log(id);
            ApplicationService.cancelApplication(id).then(response => {
                this.isCancelled = true;
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        }

    },
    created() {
        ApplicationService.getUserApplications(this.currentUser.userId)
            .then(response => {
                this.allApplications = response.data;
                console.log(this.allApplications);
            })
            .catch(error => {
                console.log(error);
            })
    }
}
</script>

<style>
.wrapperUserApplications h5 {
    color: white;
}

table {
    background-color: white;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
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

<template>
    <div class="content"> <!-- DON'T DELETE THIS DIV. ALL THE CONTENT MUST GO INSIDE -->
        <div class="wrapperCreatePost d-flex flex-column justify-content-center align-items-center">
            <form>
                <div class="mb-3">
                    <label for="jobTitle" class="form-label">Gig Title</label>
                    <input type="text" class="form-control" id="jobTitle" v-model="createPostRequest.job.title"
                        style="width: 800px;">
                </div>
                <div class="mb-3">
                    <label for="jobType" class="form-label">Type</label>
                    <select class="form-select" v-model="createPostRequest.job.kindOfJob">
                        <option value="Grocery">Grocery</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Dog Walking">Dog Walking</option>
                        <option value="Gardening">Gardening</option>
                        <option value="Painting">Painting</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="hourlyRate" class="form-label">Hourly Rate</label>
                    <input type="number" min="1.00" step="0.50" class="form-control" id="hourlyRate"
                        v-model="createPostRequest.job.hourRate">
                </div>
                <div class="mb-3">
                    <label for="startDate" class="form-label">Start Date</label>
                    <input type="date" class="form-control" id="startDate" :min="minStartDate"
                        v-model="createPostRequest.job.jobStartDate" />
                </div>
                <div class="mb-3">
                    <label for="finishDate" class="form-label">Finish Date</label>
                    <input type="date" class="form-control" id="finishDate" :min="minStartDate"
                        v-model="createPostRequest.job.jobFinishDate" />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="5"
                        v-model="createPostRequest.job.description"></textarea>
                </div>
                <p id="incorrectInput" style="position:absolute; margin-left: 100px; height: 20px;">{{ message }}</p>
                <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnSubmit"
                    @click="createPost">Create</button>

            </form>
        </div>

    </div>
</template>

<script>
import CreatePostService from "../services/CreatePostService";
export default {
    name: "createPost",
    data() {
        return {
            minStartDate: new Date().toISOString().slice(0, 10),
            currentUser: null,
            createPostRequest: {
                //   currentUser: null,
                userId: 0,
                job: {
                    title: "",
                    postingDate: new Date().toISOString().slice(0, 10),
                    hourRate: 5.0,
                    kindOfJob: "",
                    description: "",
                    jobStartDate: new Date().toISOString().slice(0, 10),
                    jobFinishDate: new Date().toISOString().slice(0, 10)
                }

            },
            message: "",
        }
    },
    methods: {
        createPost(event) {
            event.preventDefault();
            if (this.createPostRequest.job.title == "" || this.createPostRequest.job.hourRate == "" || this.createPostRequest.job.kindOfJob == "" || this.createPostRequest.job.description == "") {
                this.message = "Please fill out all required fields.";
            } else if (new Date(this.createPostRequest.job.jobFinishDate) < new Date(this.createPostRequest.job.jobStartDate)) {
                this.message = "Finish date cannot be less than start date.";
            } else {
                this.createPostRequest.userId = this.currentUser.userId;
                CreatePostService.createpost(this.createPostRequest)
                    .then(response => {
                        let job = response.data;
                        console.log(job);
                        this.message = job;
                        this.$router.push({ name: "listPostedGigs" });

                    })
                    .catch(error => {
                        this.message = error.response.data.message;
                        console.log(error.response.data);
                    })
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
    mounted() {
        this.message = "";
        this.getCurrentUser();

    }
}
</script>

<style>
.wrapperCreatePost {
    background-color: white;
    border-radius: 20px;
    margin-top: 10px;
    padding: 50px;
}

#incorrectInput {
    color: red;
    margin-top: 10px;
}
</style>
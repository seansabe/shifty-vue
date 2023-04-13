<template>
    <div class="content"> <!-- DON'T DELETE THIS DIV. ALL THE CONTENT MUST GO INSIDE -->
        <div class="wrapperRegister d-flex flex-column justify-content-center align-items-center">
            <p id="incorrectInput"><b>{{ message }}</b></p>
            <div class="mb-3">
                <label for="pswdCheck" class="form-label">Old Password</label>
                <input type="password" class="form-control" id="pswdCheck">
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnCheck"
                    @click="passwordCheck">Check</button>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Enter New Password</label>
                <input type="password" class="form-control" id="newPassword">
            </div>
            <div class="mb-3">
                <label for="passwordProove" class="form-label">Enter your password again</label>
                <input type="password" class="form-control" id="passwordProove">
            </div>
            <div id="buttonLine">
                <button type="submit" class="btn btn-dark btn-shifty-primary me-2" id="btnUpdate"
                    @click="update">Save</button>
                <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnCancel" @click="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import EditProfileService from "../services/EditProfileService";
export default {
    name: "userRegister",
    data() {
        return {
            userRegisterRequest: {
                firstName: "", lastName: "",
                address: "", phone: "", email: "", password: ""
            },
            message: "",
            userId: ""
        }
    },
    methods: {
        cancel() {
            this.$router.push({ name: "profileView" });
        },
        passwordCheck() {
            if ((document.getElementById("pswdCheck").value) == this.userRegisterRequest.password) {
                document.getElementById("newPassword").disabled = false;
                document.getElementById("passwordProove").disabled = false;
                document.getElementById("btnUpdate").disabled = false;
                document.getElementById("pswdCheck").disabled = true;
                document.getElementById("btnCheck").disabled = true;

            } else {
                this.message = "Your password is incorrect."
            }
        },
        disablePasswordUpdate() {
            document.getElementById("newPassword").disabled = true;
            document.getElementById("passwordProove").disabled = true;
            document.getElementById("btnUpdate").disabled = true;
        },
        getCurrentUser() {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.userId = this.currentUser.userId;
            this.userRegisterRequest.firstName = this.currentUser.firstName;
            this.userRegisterRequest.lastName = this.currentUser.lastName;
            this.userRegisterRequest.address = this.currentUser.address;
            this.userRegisterRequest.phone = this.currentUser.phone;
            this.userRegisterRequest.email = this.currentUser.email;
            this.userRegisterRequest.password = this.currentUser.password;
        },
        update(event) {
            event.preventDefault();
            if (document.getElementById("newPassword").value == document.getElementById("passwordProove").value) {
                this.userRegisterRequest.password = document.getElementById("newPassword").value;
                EditProfileService.editProfile(this.userRegisterRequest, this.userId)
                    .then(response => {
                        let user = response.data;
                        console.log(user);
                        localStorage.setItem("currentUser", JSON.stringify(user))
                        this.$router.push({ name: "profileView" });
                    })
                    .catch(error => {
                        this.message = error;
                        console.log(error);
                    })
            } else {
                this.message = "You entered password check wrong";
            }
        }
    },
    mounted() {
        this.message = "";
        this.getCurrentUser();
        this.disablePasswordUpdate();
    }
}
</script>

<style>
#incorrectInput {
    color: red;
}
</style>
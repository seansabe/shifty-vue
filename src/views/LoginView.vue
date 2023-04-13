<template>
    <div class="content"> <!-- DON'T DELETE THIS DIV. ALL THE CONTENT MUST GO INSIDE -->
        <div class="wrapperLogin d-flex flex-column justify-content-center align-items-center">
            <img src="../assets/shifty-prototype@3840x900.png" alt="Shifty" height="50">
            <span class="badge rounded-pill text-bg-danger mb-3">{{ message }}</span>
            <form id="form">
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                        v-model="userLoginRequest.email">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="userLoginRequest.password">
                </div>
                <button type="submit" class="btn btn-dark btn-shifty-primary" @click="login">Sign In</button>
            </form>
        </div>
    </div>
</template>

<script>
import LoginService from '@/services/LoginService';

export default {
    name: "LoginView",
    data() {
        return {
            userLoginRequest: { email: "", password: "" },
            message: "",
        }
    },
    methods: {
        login(event) {
            event.preventDefault();

            if (!(this.userLoginRequest.email).includes("@") && this.userLoginRequest.email != "") {
                this.message = "Please enter a valid email address";
                setTimeout(() => {
                    this.message = "";
                }, 3000);
            }

            else if (this.userLoginRequest.email == "" && this.userLoginRequest.password != "") {
                this.message = "Email is required";
                setTimeout(() => {
                    this.message = "";
                }, 3000);
            }

            else if (this.userLoginRequest.password == "" && this.userLoginRequest.email != "") {
                this.message = "Password is required";
                setTimeout(() => {
                    this.message = "";
                }, 3000);
            }

            else if (this.userLoginRequest.email == "" && this.userLoginRequest.password == "") {
                this.message = "Email and password are required";
                setTimeout(() => {
                    this.message = "";
                }, 3000);
            }

            if (this.userLoginRequest.email != "" && this.userLoginRequest.password != "") {
                LoginService.login(this.userLoginRequest).then(response => {
                    var user = response.data;
                    console.log(user);
                    this.message = user;
                    localStorage.setItem("currentUser", JSON.stringify(user)) //saved user info in local storage
                    this.$emit('get-user-data', user);
                    this.$router.push({ name: "home" });
                }).catch(error => {
                    this.userLoginRequest.email = "";
                    this.userLoginRequest.password = "";
                    console.log(error)
                    this.message = "Invalid email or password";
                    setTimeout(() => {
                        this.message = "";
                    }, 3000);
                });
            }
        }
    },
    mounted() {
        this.message = "";
    }
}
</script>

<style>
.remove {
    display: none;
}

.wrapperLogin img {
    margin-bottom: 50px;
}
</style>
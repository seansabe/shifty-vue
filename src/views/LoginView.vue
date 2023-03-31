<template>
    <div class="content"> <!-- DON'T DELETE THIS DIV. ALL THE CONTENT MUST GO INSIDE -->
        <div class="wrapper d-flex flex-column justify-content-center align-items-center">
            <img src="../assets/shifty-prototype@3840x900.png" alt="Shifty" height="50">
            <form>
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
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Remember this device</label>
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
            LoginService.login(this.userLoginRequest).then(response => {
                var user = response.data;
                console.log(user);
                this.message = user;
                localStorage.setItem("currentUser", JSON.stringify(user))
                this.$emit('get-user-data', user);
                this.$router.push({ name: "home" });
            }).catch(error => {
                this.userLoginRequest.email = "";
                this.userLoginRequest.password = "";
                console.log(error)
            });
        }
    },
    mounted() {
        this.message = "";
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
<template>
    <div class="content"> <!-- DON'T DELETE THIS DIV. ALL THE CONTENT MUST GO INSIDE -->
        <div class="wrapper d-flex flex-column justify-content-center align-items-center">
            <form>
                <div class="mb-3">
                    <label for="firstName" class="form-label">First name</label>
                    <input type="text" class="form-control" id="firstName" v-model="userRegisterRequest.firstName">
                </div>
                <div class="mb-3">
                    <label for="lastName" class="form-label">Last name</label>
                    <input type="text" class="form-control" id="lastName" v-model="userRegisterRequest.lastName">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" v-model="userRegisterRequest.address">
                </div>
                <div class="mb-3">
                    <label for="phoneNumber" class="form-label">Cellphone Number</label>
                    <input type="text" class="form-control" id="phoneNumber" v-model="userRegisterRequest.phone">
                </div>
                <div class="mb-3">
                    <label for="userEmail" class="form-label">Email address</label>
                    <input type="text" class="form-control" id="userEmail" aria-describedby="emailHelp" v-model="userRegisterRequest.email">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="text"  class="form-control" id="password" v-model="userRegisterRequest.password">
                </div >
                <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnSubmit" @click="register">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
import RegisterService from "../services/RegisterService";
export default{
    name: "userRegister",
    data(){
        return{
            userRegisterRequest:{firstName: "", lastName: "",
             address:"", phone:"", email: "", password:""},
             message: ""
        }
    },
    methods: {
        register(event){
            event.preventDefault();
            RegisterService.registration(this.userRegisterRequest)
            .then(response => {
                let user = response.data;
                console.log(user);
                this.message = user;
                this.$router.push({name: "login"});
            })
            .catch(error=>{
        
                // this.user.userRegisterRequest.lastName = "";
                // this.user.userRegisterRequest.address = "";
                // this.user.userRegisterRequest.phoneNumber = "";
                // this.user.userRegisterRequest.
                this.message = error.response.data.message;
                console.log(error.response.data);
            })
        }
    },
    mounted(){
        this.message = "";
    }
}
</script>

<style>
.wrapper {
    background-color: white;
    width: 400px;
    height: 620px;
    border-radius: 20px;
}

.wrapper img {
    margin-bottom: 50px;
}
/* #btnSubmit{
    text-align: center;
} */
</style>
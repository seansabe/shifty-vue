<template>
    <div class="content"> <!-- DON'T DELETE THIS DIV. ALL THE CONTENT MUST GO INSIDE -->
        <div class="wrapperProfile d-flex flex-column justify-content-center align-items-center">
            <form>
                <!-- <div class="mb-3">
                    <p>{{firstName}}</p>
                </div>
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
                <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnSubmit" @click="register">Register</button> -->
            </form>
        </div>
    </div>
</template>

<script>

export default{
    name: "userProfile",
    data(){
        return{
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            password: ""
        }
    },
    methods: {
        setData(){
            // this.firstName = localStorage.getItem("firstName");
            // this.lastName = localStorage.getItem("lastName");
            // this.email = localStorage.getItem("email");
            // this.address = localStorage.getItem("address");
            // this.password = localStorage.getItem("password");
            // this.document.getElementById("firstName").setAttribute('value', this.firstName);
            // document.getElementById("lastName").setAttribute('value', this.lastName);
            // document.getElementById("email").setAttribute('value', this.email);
            // document.getElementById("address").setAttribute('value', this.address);
            // document.getElementById("password").setAttribute('value', this.password);
        }
    },
    mounted(){
        this.setData();
    }
}
</script>

<style>
.wrapperProfile {
    background-color: white;
    width: 400px;
    height: 620px;
    border-radius: 20px;
}
</style>
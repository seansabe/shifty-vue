<template>
    <div class="content"> <!-- DON'T DELETE THIS DIV. ALL THE CONTENT MUST GO INSIDE -->
        <div class="wrapperEditProfile d-flex flex-column justify-content-center align-items-center">
            <form>
                <p id="incorrectInput"><b>{{ message }}</b></p>
                <div class="mb-3">
                    <label for="firstName" class="form-label">First name</label>
                    <input type="text" class="form-control" id="firstName"  v-model="userRegisterRequest.firstName">
                </div>
                <div class="mb-3">
                    <label for="lastName" class="form-label">Last name</label>
                    <input type="text" class="form-control" id="lastName"  v-model="userRegisterRequest.lastName">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address"  v-model="userRegisterRequest.address">
                </div>
                <div class="mb-3">
                    <label for="phoneNumber" class="form-label">Cellphone Number</label>
                    <input type="number" class="form-control" id="phoneNumber"  v-model="userRegisterRequest.phone">
                </div>
                <div class="mb-3">
                    <label for="userEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="userEmail" aria-describedby="emailHelp"  v-model="userRegisterRequest.email">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">NEW Password</label>
                    <input type="password"  class="form-control" id="password"  v-model="userRegisterRequest.password">
                </div >
                <div class="mb-3">
                    <label for="passwordProove" class="form-label">Enter your NEW password again</label>
                    <input type="password"  class="form-control" id="passwordProove" v-model="passwordProove">
                </div >
                <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnSubmit" @click="save">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import EditProfileService from "../services/EditProfileService";
export default{
    name: "editProfile",
    data(){
        return{
            userRegisterRequest:{firstName: "", lastName: "",
             address:"", phone:"", email: "", password:""},
             message: "",
             passwordProove: "",
             currentUser: null,
             userId : ""
        }
    },
    methods: {
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.userId = this.currentUser.userId;
            this.userRegisterRequest.firstName = this.currentUser.firstName;
            this.userRegisterRequest.lastName = this.currentUser.lastName;
            this.userRegisterRequest.address = this.currentUser.address;
            this.userRegisterRequest.phone = this.currentUser.phone;
            this.userRegisterRequest.email = this.currentUser.email;
            this.userRegisterRequest.password = this.currentUser.password;
        },
        save(event){
            event.preventDefault();
            if(this.userRegisterRequest.firstName==""||this.userRegisterRequest.lastName==""||this.userRegisterRequest.address==""||this.userRegisterRequest.phone==""||this.userRegisterRequest.email==""||this.userRegisterRequest.password==""){
                this.message = "Please enter the table in every field";
            }else{
                if(!(this.userRegisterRequest.email).includes("@")){
                    this.message = "Your email is incorrect"; 
                }else{
                    if(this.userRegisterRequest.password !== this.passwordProove){
                    this.message = "You entered password check wrong";                    
                    }else{
                        EditProfileService.editProfile(this.userRegisterRequest, this.userId)
                        .then(response=>{
                            let user = response.data;
                            localStorage.setItem("currentUser", JSON.stringify(user))
                            this.$router.push({name: "profileView"});
                        })
                    }
                }
            }
        }
    },
    mounted(){
        this.message = "";
        this.getCurrentUser();
    }
}
</script>

<style>
.wrapperEditProfile {
    background-color: white;
    width: 400px;
    height: 720px;
    border-radius: 20px;
}

.wrapper img {
    margin-bottom: 50px;
}
#incorrectInput{
    color:red;
}

</style>
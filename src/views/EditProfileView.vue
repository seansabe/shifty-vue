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
                </div>
            </form>
                <div id="btnLine">
                    <button type="submit" class="btn btn-dark btn-shifty-primary" id="securityUpdate" @click="updatePassword">Change password</button>
                    <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnSave" @click="save">Save</button>
                    <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnCancel" @click="cancel">Cancel</button>
                </div>
        </div>
    </div>
</template>

<script>
import EditProfileService from "../services/EditProfileService";
export default{
    name: "editProfile",
    props: ['newFirstName','setUpdatedFirstName'],
    data(){
        return{
            userRegisterRequest:{firstName: "", lastName: "",
             address:"", phone:"", email: "", password:""},
             message: "",
             currentUser: null,
             userId : ""
        }
    },
    methods: {
        cancel(){
            this.$router.push({name: "profileView"});
        },
        updatePassword(){
            this.$router.push({ name: "editPassword" });
        },
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
                    EditProfileService.editProfile(this.userRegisterRequest, this.userId)
                    .then(response=>{
                        let user = response.data;
                        localStorage.setItem("currentUser", JSON.stringify(user))
                        this.setUpdatedFirstName(user.firstName);
                        this.$router.push({name: "profileView"});
                    })
                    .catch(error=>{
                        this.message = error.response.data.message;
                        console.log(error.response.data);
                    })
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
    width: 450px;
    height: 550px;
    border-radius: 20px;
}

.wrapper img {
    margin-bottom: 50px;
}
#incorrectInput{
    color:red;
}
#btnLine{
    margin-inline: auto;
}
#btnSave{
    margin-left: 20px;
}
#btnCancel{
    margin-left: 20px;
}
</style>
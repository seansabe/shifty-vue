<template>
    <div class="content"> <!-- DON'T DELETE THIS DIV. ALL THE CONTENT MUST GO INSIDE -->
        <div class="wrapperProfile d-flex flex-column justify-content-center align-items-center">          
            <div class="info">
                <p><b>First Name:</b>&emsp;&emsp;{{userRegisterRequest.firstName}}</p>
                <p><b>Last Name:</b>&emsp;&emsp;{{userRegisterRequest.lastName}}</p>
                <p><b>Address:</b>&emsp;&emsp;{{userRegisterRequest.address}}</p>
                <p><b>Phone:</b>&emsp;&emsp;{{userRegisterRequest.phone}}</p>
                <p><b>Email:</b>&emsp;&emsp;{{userRegisterRequest.email}}</p>
                <p><b>Password:</b>&emsp;&emsp;******</p>
                <br>
            </div>
            <button type="submit" class="btn btn-dark btn-shifty-primary" id="btnEdit" @click="editProfile">Edit</button>
        </div>
    </div>
</template>

<script>
export default{
    name: "profileView",
    data(){
        return{
            currentUser: null,
            userRegisterRequest:{firstName: "", lastName: "",
             address:"", phone:"", email: "", password:""},
             message: "",
        }
    },
    methods: {
        editProfile(event){
            event.preventDefault();
            this.$router.push({name: "editProfile"});
        },
        getCurrentUser(){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.userRegisterRequest.firstName = this.currentUser.firstName;
            this.userRegisterRequest.lastName = this.currentUser.lastName;
            this.userRegisterRequest.address = this.currentUser.address;
            this.userRegisterRequest.phone = this.currentUser.phone;
            this.userRegisterRequest.email = this.currentUser.email;
            this.userRegisterRequest.password = this.currentUser.password;
        }
    },
    mounted(){
        this.message = "";
        this.getCurrentUser();
    }
}
</script>

<style>
.wrapperProfile {
    background-color: white;
    width: 350px;
    height: 380px;
    border-radius: 20px;
}

.wrapper img {
    margin-bottom: 50px;
}
.info{
    font-size: larger;
    
}
#incorrectInput{
    color:red;
}

</style>
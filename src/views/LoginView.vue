<template>
    <div class="content"> <!-- DON'T DELETE THIS DIV. ALL THE CONTENT MUST GO INSIDE -->
        <div class="wrapper d-flex flex-column justify-content-center align-items-center">
            <img src="../assets/shifty-prototype@3840x900.png" alt="Shifty" height="50">
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Remember this device</label>
                </div>
                <button type="submit" class="btn btn-dark btn-shifty-primary">Sign In</button>
            </form>
        </div>
    </div>
</template>

<script>

export default{
    name: "userLogin",
    data(){
        return{
            studentLoginRequest:{studentId:"",password:""},
            message:""
        }
    },
    methods: {
    },
    mounted(){
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
<template>
    <div class="bar container">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="../assets/shifty-prototype@3840x900.png" alt="Bootstrap" height="35">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" aria-current="page" href="/">Home</a>
                        <a class="nav-link disabled" aria-current="page" href="#">Post</a>
                        <a class="nav-link disabled" aria-current="page" href="#">Apply</a>
                    </div>
                </div>
            </div>
            <form class="container-fluid justify-content-end">
                <div class="navbar-nav">
                    <a class="nav-link" href="/register">Register</a>
                </div>
                <button class="btn login btn-dark me-2" type="button" @click="goToSignIn">Sign In</button>
            </form>
        </nav>
    </div>
    <div class="container d-flex flex-column align-items-center justify-content-center banner">
        <h1>Get side gigs</h1>
        <h1>anytime, anywhere!</h1>
    </div>
</template>

<script>

export default {
    methods: {
        goToSignIn() {
            this.$router.push('/login');
        }
    }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.bar.container {
    background-color: white;
    border-radius: 8px;
}

.banner {
    height: 90vh;
}

.banner h1 {
    line-height: 1;
    font-size: 6.5em;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    color: white;
}

button.login {
    /*background-color: rgba(153, 45, 176, 1);
    border: rgba(153, 45, 176, 1);*/
    background-color: #7c24c4;
    border: #7c24c4;
}
</style>
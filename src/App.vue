<template>
  <div class="space-vertical"></div>
  <div class="bar container d-flex flex-row align-items-center">
    <nav class="navbar navbar-expand-lg w-100">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="./assets/shifty-prototype@1280x900.png" alt="Bootstrap" height="35">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" aria-current="page" href="#" @click="goToHome">Home</a>
          </div>
        </div>
      </div>
      <form class="container-fluid justify-content-end">
        <button class="btn btn-dark me-2 opt-link disabled" type="button">Post a gig</button>
        <button class="btn btn-dark me-2 opt-link disabled" type="button">Apply for a gig</button>
        <span class="space-horizontal"></span>
        <div class="navbar-nav">
          <a class="nav-link" href="#" @click="goToRegister">Register</a>
        </div>
        <button class="btn login btn-dark me-2" type="button" @click="goToSignIn">Sign In</button>
      </form>
    </nav>
  </div>
  <RouterView />
  <div class="footer d-flex flex-row justify-content-center align-items-center w-100">
    <span>&copy; Shifty</span>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import './App.css'

export default {
  name: 'App',
  components: { RouterView },
  methods: {
    goToSignIn() {
      this.$router.push('/login');
    },

    goToRegister() {
      this.$router.push('/register');
    },

    goToHome() {
      this.$router.push('/');
    }
  }
}

</script>

<style></style>

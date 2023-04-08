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
            <a class="nav-link" aria-current="page" v-if="currentUser" href="#" @click="userApplications">Gigs I've
              Applied</a>
            <a class="nav-link" aria-current="page" v-if="currentUser" href="#" @click="listPostedGigs">Posted Gigs</a>
          </div>
        </div>
      </div>
      <form class="container-fluid justify-content-start">
        <button class="btn btn-dark me-2 btn-shifty-primary" v-if="currentUser" :class="disabled" type="button"
          @click="createPost">Post a
          gig</button>
        <button class="btn btn-dark me-2 btn-shifty-primary" v-if="currentUser" :class="disabled" type="button"
          @click="goToApply">Apply for
          a gig</button>
      </form>
      <form class="container-fluid justify-content-end">
        <div class="navbar-nav">
          <a class="nav-link" :class="currentUser ? 'disabled' : ''" href=" #" @click="goToRegister">{{ currentUser ?
            ("Hello, ") +
            currentUser.firstName : ("Register") }}</a>
        </div>
        <button class="btn btn-shifty-primary btn-dark me-2" type="button"
          @click="currentUser ? logout() : goToLogin()">{{
            currentUser ? 'Sign Out'
            : 'Sign In' }}</button>
      </form>
    </nav>
  </div>
  <div class="container p-0">
    <RouterView @get-user-data="getCurrentUser" />
  </div>
  <div class="footer d-flex flex-row justify-content-center align-items-center w-100">
    <span>&copy; Shifty</span>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import './App.css'

export default {
  name: 'App',

  data() {
    return {
      currentUser: null,
      disabled: "disabled"
    }
  },

  components: { RouterView },

  methods: {
    getCurrentUser() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (this.currentUser != null) {
        this.disabled = "";
      }
      console.log(this.currentUser);
    },

    goToLogin() {
      this.$router.push('/login');
    },

    logout() {
      localStorage.removeItem('currentUser');
      this.currentUser = null;
      this.disabled = "disabled";
      console.log("Logout successfully")
      this.$router.push('/');
    },

    goToRegister() {
      this.$router.push({ name: "register" });
    },

    goToHome() {
      this.$router.push('/');
    },

    goToApply() {
      this.$router.push('/jobs');
    },

    userApplications() {
      this.$router.push('/applications');
    },

    createPost() {
      this.$router.push({ name: "createPost" });
    },

    listPostedGigs() {
      this.$router.push({ name: "listPostedGigs" });
    }
  },

  mounted() {
    this.getCurrentUser();
  },

  watch: {

  }
}
</script>

<style></style>

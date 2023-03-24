<template>
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
  components: { RouterView }
}
</script>

<style>
.footer {
  color: white;
  height: 10vh;
  position: fixed;
  bottom: 0;
}

.footer span {
  font-weight: 500;
}
</style>

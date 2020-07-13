<template>
  <div id="app">
    <navbar />
    <div class="container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import navbar from './components/Layouts/Navbar'
import Footer from './components/Layouts/Footer'

//
export default {
  name: 'app',
  components: {
    navbar, 
    Footer,
  }
}
</script>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
</style>

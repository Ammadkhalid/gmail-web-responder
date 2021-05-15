<template>
  <div id="app">
    <!-- Main Application Content-->
    <Header></Header>
    <Main class="content m-5 flex-fill">
      <router-view/>
    </Main>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from "@/components/Partial/Header";
import Main from "@/components/Partial/Main";
import Footer from "@/components/Partial/Footer";

export default {
  name: 'App',
  components: {
    Header, Main, Footer
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<template>
  <div id="app">

    <header>
      <NavigationBar></NavigationBar>
    </header>
    <main>
      <div class="container is-fluid">
      <div class="columns">
        <div class="column is-three-quarters">
          <router-view></router-view>
        </div>
        <div class="column">
          <SideBar></SideBar>
        </div>
      </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavigationBar from './components/navigationbar'
import SideBar from './components/sidebar'

export default {
  name: 'app',
  components: {NavigationBar, SideBar},
  created () {
    this.$store.dispatch('updateQuestion')
    this.$store.commit('updateToken')
    this.$store.commit('updateUserId')
  }
}
</script>

<style>
  .columns{
    padding-top: 3em;
  }
</style>

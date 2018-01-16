<template>
  <nav class="navbar awal" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="../assets/logo.png" title="Photo Sharing" alt="Logo" width="auto" height="28">
          &nbsp&nbspQnA
        </router-link>

        <button class="button navbar-burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start" v-if="token">
          <!--  -->
        </div>

        <div class="navbar-end" v-if="token">
          <div class="navbar-item">
            <router-link :to="{ name: 'AddQuestion'}" class="navbar-item">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </router-link>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            </a>

            <div class="navbar-dropdown is-right">
              <router-link class="navbar-item" :to="{'name': 'Profile', 'params':{'userId': userId}}">
                My Profile
              </router-link>
              <a class="navbar-item" @click="signout()">
                Signout
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end" v-if="!token">
          <div class="navbar-item">
            <router-link :to="{ name: 'Auth'}" class="navbar-item">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp;Authenticate
            </router-link>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
export default {

  name: 'navigationbar',

  data () {
    return {

    }
  },
  methods: {
    signout: function () {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      this.$store.commit('updateToken')
      this.$store.commit('updateUserId')
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    userId () {
      return this.$store.state.userId
    }
  },
  mounted: function () {
    document.addEventListener('DOMContentLoaded', function () {
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {
            // Get the target from the "data-target" attribute
            var target = $el.dataset.target
            var $target = document.getElementById(target)
            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active')
            $target.classList.toggle('is-active')
          })
        })
      }
    })
  }
}
</script>

<style lang="css" scoped>
  .awal{
    padding: 0 0.75em;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  }
</style>
<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
    <div class="box is-radiusless">
      <div class="columns ">
        <div class="column is-two-fifths has-text-centered is-hidden-mobile">
            <img src="../assets/login.png" alt="Logo" class="gambar"> 
        </div>
        <div class="column has-text-centered">
            <!-- Login -->
            <h1 class="title">Welcome back</h1>
            <h2 class="subtitle">Time to ask some question</h2>
            <div class="field">
              <label class="label">Username</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" type="text" :disabled="isprocess" v-model="username">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
              <transition name="fade">
                <p class="help is-danger" v-if="$vuelidation.error('username')">{{ $vuelidation.error('username') }}</p>
              </transition>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" type="password" :disabled="isprocess" v-model="password">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
              <transition name="fade">
                <p class="help is-danger" v-if="$vuelidation.error('password')">{{ $vuelidation.error('password') }}</p>
              </transition>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <a class="button is-info is-rounded" :class="{ 'is-loading': isprocess }" :disabled="$vuelidation.errors() || isprocess" @click="login()">
                  Signin
                </a>
              </p>
            </div>
            <!-- Login -->
            <p>Don't have an account yet? <router-link :to="{ name: 'Signup' }">Sign Up</router-link></p>
        </div>
      </div>
    </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
</template>

<script>
export default {

  name: 'signin',
  data () {
    return {
      username: '',
      password: null,
      isprocess: false
    }
  },
  vuelidation: {
    data: {
      username: {
        required: true,
        alphabetic: true
      },
      password: {
        required: true
      }
    }
  },
  methods: {
    login: function () {
      let _this = this
      this.isprocess = true
      if (!this.$vuelidation.errors()) {
        this.$http.post(`http://localhost:3000/signin`, {
          username: this.username,
          password: this.password
        })
          .then(function (resp) {
            console.log(resp)
            _this.username = ''
            _this.password = null
            localStorage.token = resp.data.data
            localStorage.userId = resp.data.userId
            _this.$store.commit('updateToken')
            _this.$store.commit('updateUserId')
            _this.isprocess = false
            _this.$router.push('/')
          })
      } else {
        _this.username = ''
        _this.password = null
        _this.isprocess = false
      }
    },
    close () {
      this.$router.push({name: 'Home'})
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  created: function (argument) {
    if (this.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
  .title {
      color: #31221F;
  }
  .box {
    background-color: white;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    display: block;
    padding: 1.25rem;
  }
  .gambar {
    position: relative;
    height: auto;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
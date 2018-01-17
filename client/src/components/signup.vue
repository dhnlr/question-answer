<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="box is-radiusless">
      <div class="columns">
        <div class="column is-two-fifths has-text-centered is-hidden-mobile">
            <img src="../assets/login.png" alt="Logo" class="gambar"> 
        </div>
        <div class="column has-text-centered">
            <!-- Login -->
            <h1 class="title">Join us</h1>
            <h2 class="subtitle">Help other or being helped.</h2>
            <transition name="fade">
              <div class="message-body" v-if="warning">
                {{warning}}
              </div>
            </transition>
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
              <label class="label">Email</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" type="email" :disabled="isprocess" v-model="email">
                <span class="icon is-small is-left">
                  <i class="fa fa-at"></i>
                </span>
              </p>
              <transition name="fade">
                <p class="help is-danger" v-if="$vuelidation.error('email')">{{ $vuelidation.error('email') }}</p>
              </transition>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" :class="[!samepassword || $vuelidation.error('password') ? 'is-danger' : '']" type="password" :disabled="isprocess" v-model="password">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
              <transition name="fade">
                <p class="help is-danger" v-if="$vuelidation.error('password')">{{ $vuelidation.error('password') }}</p>
              </transition>
            </div>
            <div class="field">
              <label class="label">Verification Password</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" :class="[!samepassword || $vuelidation.error('password') ? 'is-danger' : '']" type="password" :disabled="isprocess" v-model="verifpassword">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
              <transition name="fade">
                <p class="help is-danger" v-if="!samepassword">Password not confirmed</p>
                <p class="help is-danger" v-if="$vuelidation.error('verifpassword')">{{ $vuelidation.error('verifpassword') }}</p>
              </transition>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <a class="button is-primary is-rounded" :class="{ 'is-loading': isprocess }" :disabled="$vuelidation.errors() || isprocess" @click="signup()">
                  Signup
                </a>
              </p>
            </div>
            <!-- Login -->
            <p>Already have an account? <router-link :to="{ name: 'Signin' }">Sign In</router-link></p>
        </div>
      </div>
    </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
</template>

<script>
export default {

  name: 'signup',

  data () {
    return {
      username: null,
      email: null,
      password: null,
      verifpassword: null,
      samepassword: true,
      isprocess: false,
      warning: null
    }
  },
  vuelidation: {
    data: {
      username: {
        required: true,
        alphabetic: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      },
      verifpassword: {
        required: true
      }
    }
  },
  methods: {
    signup: function () {
      let _this = this
      this.isprocess = true
      if (!this.$vuelidation.errors()) {
        if (this.password === this.verifpassword) {
          this.$http.post(`http://localhost:3000/signup`, {
            username: this.username,
            email: this.email,
            password: this.password
          })
            .then(function (resp) {
              _this.password = null
              _this.verifpassword = null
              _this.username = null
              _this.email = null
              _this.isprocess = false
              _this.warning = null
              _this.$router.push({name: 'Signin'})
            })
            .catch(error => {
              _this.isprocess = false
              _this.warning = error.response.data.error.message
            })
        } else {
          _this.samepassword = true
          _this.password = null
          _this.verifpassword = null
          _this.username = null
          _this.email = null
          _this.isprocess = false
          _this.warning = 'Please confirm your password'
        }
      } else {
        _this.samepassword = true
        _this.password = null
        _this.verifpassword = null
        _this.username = null
        _this.email = null
        _this.isprocess = false
        _this.warning = null
      }
    },
    close () {
      this.$router.push({name: 'Home'})
    }
  },
  watch: {
    verifpassword: function () {
      if (this.verifpassword !== this.password) {
        this.samepassword = false
      } else {
        this.samepassword = true
      }
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
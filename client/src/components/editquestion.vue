<template>
  <div class="modal is-active" v-if="token">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add New Question</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <transition name="bounce">
          <div class="notification is-danger" v-show="iswarning">
            <button class="delete" @click="iswarning = false"></button>
            {{warningmsg}}
          </div>
        </transition>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" placeholder="Question Title" v-model="newQuestion.title" :disabled="isprocess">
          </div>
          <p class="help is-danger" v-if="$vuelidation.error('newQuestion.name')">{{ $vuelidation.error('newQuestion.name') }}</p>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea class="textarea" placeholder="Question Description" v-model="newQuestion.description" :disabled="isprocess"></textarea>
          </div>
          <p class="help is-danger" v-if="$vuelidation.error('newQuestion.desc')">{{ $vuelidation.error('newQuestion.desc') }}</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" :class="{ 'is-loading': isprocess }" :disabled="$vuelidation.errors() || isprocess" @click="submit" >  
          Edit
        </button>
        <button class="button" @click="reset">Reset</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {

  name: 'editquestion',

  data () {
    return {
      isprocess: false,
      iswarning: false,
      warningmsg: ''
    }
  },
  vuelidation: {
    data: {
      newQuestion: {
        title: {
          required: true,
          alphaSpace: true
        },
        description: {
          required: true
        }
      }
    }
  },
  methods: {
    close () {
      this.$router.go(-1)
    },
    reset () {
      this.newQuestion = this.newQuestionPure
    },
    submit () {
      this.$http.put(`http://loclahost:3000/qa/${this.$route.params.question}`, {
        title: this.newQuestion.title,
        description: this.newQuestion.desc
      }, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.reset()
          this.$store.dispatch('updateQuestion')
          this.$router.push({name: 'Question', params: { 'question': resp.data.data._id }})
        })
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    newQuestion () {
      return this.$store.state.currentQuestion
    },
    newQuestionPure () {
      return this.$store.state.currentQuestion
    }
  },
  created () {
    this.$store.dispatch('updateCurrentQuestion', { id: this.$route.params.question })
  }
}
</script>

<style lang="css" scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
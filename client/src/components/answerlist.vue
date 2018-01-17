<template>
  <div>
    <div class="field is-grouped" v-if="token">
      <p class="control is-expanded">
        <textarea class="textarea" placeholder="Your answer" v-model="answerBox"></textarea>
      </p>
      <p class="control">
        <a class="button is-info" @click="submit()">
          Answer
        </a>
      </p>
    </div>
    <div class="columns" v-for="(answers, key) in answerList">
      <div class="box">
        <article class="media">
          <div class="media-left has-text-centered">
            <p>
              <h1 class="title is-size-4">{{answers.voted.length}}</h1>
              <p class="heading">LIKE</p>
              <button class="like is-radiusless" @click="vote(answers['_id'])" v-if="!islike(key) && token"></button>
              <button class="unlike is-radiusless" @click="vote(answers['_id'])" v-if="islike(key) && token"></button>
            </p>
            <p v-if="token">
              <button class="star is-radiusless" @click="top(answers['_id'])" v-show="ismyquestion && istopable"></button><br v-show="ismyquestion && istopable"/>
              <button class="delete is-radiusless" @click="destroy(answers['_id'])" v-if="ismine(answers.author._id)">Delete</button>
            </p>
          </div>
          <div class="media-content">
            <div class="content">
              <p class="answer">
                {{answers.answer}}
              </p>
            </div>
            <nav class="level is-bottom is-mobile">
              <div class="level-left">
                <a class="level-item" v-if="answers.top">
                  <span class="tag is-danger"><i class="fa fa-fire"></i>&nbsp; TOP</span>
                </a>
                <a class="level-item">
                  <span class="tag is-light"><i class="fa fa-user"></i>&nbsp; {{answers.author.username}}</span>
                </a>
                <a class="level-item">
                <span class="tag is-light"><i class="fa fa-clock-o"></i>&nbsp;{{datepost(answers.createOn)}}</span>
              </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'answerlist',
  props: ['questionAuthorId'],
  data () {
    return {
      answerBox: null,
      isprocess: false
    }
  },
  methods: {
    submit (id) {
      this.isprocess = true
      this.$http.post(`http://localhost:3000/qa/${this.routeId}/add/${id}`, {
        answer: this.answerBox
      }, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.isprocess = false
          this.answerBox = null
          this.$store.dispatch('updateCurrentAnswer', {id: this.routeId})
        })
    },
    destroy (id) {
      this.$http.delete(`http://localhost:3000/qa/${this.routeId}/${id}`, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.$store.dispatch('updateCurrentAnswer', {id: this.routeId})
        })
    },
    vote (id) {
      this.$http.post(`http://localhost:3000/qa/${this.routeId}/${id}/vote`, {}, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.$store.dispatch('updateQuestion')
          this.$store.dispatch('updateCurrentQuestion', {id: this.routeId})
          this.$store.dispatch('updateCurrentAnswer', {id: this.routeId})
        })
    },
    top (id) {
      this.$http.post(`http://localhost:3000/qa/${this.routeId}/top/${id}`, {}, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.$store.dispatch('updateQuestion')
          this.$store.dispatch('updateCurrentQuestion', {id: this.routeId})
          this.$store.dispatch('updateCurrentAnswer', {id: this.routeId})
        })
    },
    ismine (id) {
      return (this.userId === id)
    },
    islike (id) {
      return (this.answerList[id].voted.indexOf(this.userId) > -1)
    },
    datepost (datadate) {
      let date = new Date(datadate)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dt = date.getDate()

      if (dt < 10) {
        dt = '0' + dt
      }
      if (month < 10) {
        month = '0' + month
      }
      return dt + '-' + month + '-' + year
    }
  },
  computed: {
    answerList () {
      return this.$store.state.currentAnswer
    },
    token () {
      return this.$store.state.token
    },
    userId () {
      return this.$store.state.userId
    },
    routeId () {
      return this.$route.params.question
    },
    istopable () {
      return (this.answerList.filter(answer => answer.top === true).length === 0)
    },
    ismyquestion () {
      return (this.userId === this.questionAuthorId)
    }
  }
}
</script>

<style lang="css" scoped>
.media-left {
    margin-right: 1.5rem;
    padding: 0 2em;
    border-right: 1px solid #ccc;
  }
.is-bottom{
    position: relative;
    bottom: 10%;
  }
  .box{
    min-width: 100%
  }
  .answer{
    white-space: pre-line;
    padding-bottom: 1em; 
  }
  .columns{
    padding: 1em 0 2em 0 !important;
  }
  .delete{
    vertical-align: middle;
    background-color: #ff3860;
  }
  .star {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: rgba(10, 10, 10, 0.2);
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: middle;
    width: 20px;
    color: #ffdd57;
  }
  .star::before, .star::after {
    content: "\f005";
    font: normal normal normal 14px/1.4 FontAwesome;
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    transform-origin: center center;
  }
  .edit {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: rgba(10, 10, 10, 0.2);
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: middle;
    width: 20px;
    color: white;
  }
  .edit::before, .edit::after {
    content: "\f044";
    font: normal normal normal 14px/1.4 FontAwesome;
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    transform-origin: center center;
  }
  .like {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: #209cee;
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: middle;
    width: 20px;
    color: white;
  }
  .like::before, .like::after {
    content: "\f164";
    font: normal normal normal 14px/1.4 FontAwesome;
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    transform-origin: center center;
  }
  .unlike {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: #209cee;
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: middle;
    width: 20px;
    color: white;
  }
  .unlike::before, .unlike::after {
    content: "\f165";
    font: normal normal normal 14px/1.4 FontAwesome;
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    transform-origin: center center;
  }
</style>
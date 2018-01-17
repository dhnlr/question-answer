<template>
  <div class="container is-fluid">
    <div class="box">
      <article class="media">
        <div class="media-left has-text-centered">
          <p>
            <h1 class="title is-size-3">{{question.voted.length}}</h1>
            <p class="heading">LIKE</p>
            <button class="like is-radiusless" @click="vote(question['_id'])" v-if="!islike && token"></button>
            <button class="unlike is-radiusless" @click="vote(question['_id'])" v-if="islike && token"></button>
          </p>
          <p v-if="token">
            <button class="edit is-radiusless" @click="edit(question['_id'])" v-if="ismine(question.author[0]._id)"></button><br/>
            <button class="delete is-radiusless" @click="destroy(question['_id'])" v-if="ismine(question.author[0]._id)"></button>
          </p>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title">
                {{question.title}}
            </p>
            <p class="question">{{question.description}}</p>
          </div>
          <nav class="level is-bottom is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="tag is-success" v-if="question.topanswer"><i class="fa fa-check"></i>&nbsp; Solved</span>
                <span class="tag is-warning" v-if="!question.topanswer"><i class="fa fa-times"></i>&nbsp; Unsolved</span>
              </a>
              <a class="level-item">
                <span class="tag is-light"><i class="fa fa-user"></i>&nbsp;{{question.author[0].username}}</span>
              </a>
              <a class="level-item">
                <span class="tag is-light"><i class="fa fa-clock-o"></i>&nbsp;{{datepost}}</span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
    <AnswerList :questionAuthorId="question.author[0]._id"></AnswerList>
  </div>
</template>

<script>
import AnswerList from './answerlist'

export default {

  name: 'questionitem',
  components: {AnswerList},
  data () {
    return {

    }
  },
  methods: {
    ismine (id) {
      return (this.userId === id)
    },
    vote (id) {
      this.$http.post(`http://localhost:3000/qa/${id}/vote`, {}, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.$store.dispatch('updateQuestion')
          this.$store.dispatch('updateCurrentQuestion', {id: this.routeId})
        })
    },
    destroy (id) {
      this.$http.delete(`http://localhost:3000/qa/${id}`)
        .then(resp => {
          this.$store.dispatch('updateQuestion')
          this.$router.push({name: 'Home'})
        })
    },
    edit (id) {
      this.$router.push({name: 'EditQuestion', params: {'question': id}})
    }
  },
  computed: {
    question () {
      return this.$store.state.currentQuestion
    },
    userId () {
      return this.$store.state.userId
    },
    islike () {
      return (this.question.voted.indexOf(this.userId) > -1)
    },
    routeId () {
      return this.$route.params.question
    },
    token () {
      return this.$store.state.token
    },
    datepost () {
      let date = new Date(this.question.createOn)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dt = date.getDate()

      if (dt < 10) {
        dt = '0' + dt
      }
      if (month < 10) {
        month = '0' + month
      }
      return year + '-' + month + '-' + dt
    }
  },
  watch: {
    routeId () {
      this.$store.dispatch('updateCurrentQuestion', {id: this.routeId})
    }
  },
  created () {
    this.$store.dispatch('updateCurrentQuestion', {id: this.routeId})
    this.$store.dispatch('updateCurrentAnswer', {id: this.routeId})
  }
}
</script>

<style lang="css" scoped>
.is-bottom{
    position: relative;
    bottom: 10%;
  }
  .question{
    white-space: pre-line;
    padding-bottom: 1em; 
  }
  .delete{
    vertical-align: middle;
    background-color: #ff3860;
  }
  .edit {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: #23d160;
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
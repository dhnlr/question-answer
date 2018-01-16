<template>
  <div class="container is-fluid" v-if="token">
    <div class="box" v-for="(question, key) in questions">
      <article class="media">
        <div class="media-left">
          <p>
            <h1 class="title">{{question.voted.length}}</h1>
            <button class="like is-radiusless" @click="vote(question['_id'])" v-if="!islike(key)"></button>
            <button class="unlike is-radiusless" @click="vote(question['_id'])" v-if="islike(key)"></button>
          </p>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title">
              <router-link :to="{'name': 'Question', 'params':{'question': question._id}}">
                {{question.title}}
              </router-link>
            </p>
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
                <span class="tag is-light"><i class="fa fa-time"></i>&nbsp;{{datepost(question.createOn)}}</span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {

  name: 'profile',

  data () {
    return {

    }
  },
  methods: {
    vote (id) {
      this.$http.post(`http://loclahost:3000/qa/${id}/vote`, {}, {headers: {
        token: this.token
      }})
        .then(resp => {
          this.$store.detach('updateQuestion')
        })
    },
    islike (id) {
      return (this.questions[id].voted.indexOf(this.userId) > -1)
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
    questions () {
      return this.$store.state.allquestion
    },
    userId () {
      return this.$store.state.userId
    },
    token () {
      return this.$store.state.token
    }
  },
  created () {
    this.$store.dispatch('updateUserQuestion', {id: this.$route.params.userId})
  }
}
</script>

<style lang="css" scoped>
.media-left {
    margin-right: 1.5rem;
    padding: 0 2em;
    border-right: 1px solid #ccc;
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
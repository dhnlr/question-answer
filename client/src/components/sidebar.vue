<template>
  <div class="container is-fluid">
    <aside class="menu">
      <p class="menu-label">
        Top Question
      </p>
      <ul class="menu-list" v-for="q in q5">
        <li><router-link :to="{'name': 'Question', params: {'question': q._id}}">{{q.title}}</router-link></li>
      </ul>
      <p class="menu-label">
        Top Answer
      </p>
      <ul class="menu-list" v-for="a in a5">
        <li><router-link :to="{'name': 'Question', params: {'question': a.question._id}}">{{a.question.title}}</router-link></li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {

  name: 'sidebar',

  data () {
    return {

    }
  },
  computed: {
    a5 () {
      return this.$store.state.a5
    },
    q5 () {
      return this.$store.state.q5
    }
  },
  created () {
    this.$store.dispatch('updatea5')
    this.$store.dispatch('updateq5')
  }
}
</script>

<style lang="css" scoped>
</style>
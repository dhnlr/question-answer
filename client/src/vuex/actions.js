import * as axios from 'axios'

const actions = {
  updateQuestion ({state}) {
    axios.get(`http://loclahost:3000/qa`)
      .then(resp => {
        state.allquestion = resp.data.data
      })
  },
  updatea5 ({state}) {
    axios.get(`http://loclahost:3000/qa/5/answer`)
      .then(resp => {
        state.a5 = resp.data.data
      })
  },
  updateq5 ({state}) {
    axios.get(`http://loclahost:3000/qa/5/question`)
      .then(resp => {
        state.q5 = resp.data.data
      })
  },
  updateCurrentQuestion ({state}, payload) {
    axios.get(`http://loclahost:3000/qa/${payload.id}`)
      .then(resp => {
        state.currentQuestion = resp.data.data
      })
  },
  updateCurrentAnswer ({state}, payload) {
    axios.get(`http://loclahost:3000/qa/${payload.id}/answer`)
      .then(resp => {
        state.currentAnswer = resp.data.data
      })
  },
  updateUserQuestion ({state}, payload) {
    axios.get(`http://loclahost:3000/qa/by/${payload.id}`)
      .then(resp => {
        state.currentQuestion = resp.data.data
      })
  }
}

export default actions

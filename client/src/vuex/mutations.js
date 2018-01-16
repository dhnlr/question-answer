const mutations = {
  updateToken ({state}) {
    this.state.token = localStorage.token
  },
  updateUserId ({state}) {
    this.state.userId = localStorage.userId
  }
}

export default mutations

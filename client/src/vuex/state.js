const state = {
  token: null,
  userId: null,
  allquestion: [],
  a5: [],
  q5: [],
  currentQuestion: {
    __v: ' ',
    _id: ' ',
    author: [{
      __v: ' ',
      _id: ' ',
      email: ' ',
      password: ' ',
      username: ' '
    }],
    createOn: ' ',
    description: ' ',
    title: ' ',
    voted: [
      ' '
    ]
  },
  currentAnswer: [{
    __v: ' ',
    _id: ' ',
    answer: ' ',
    author: {
      __v: ' ',
      _id: ' ',
      email: ' ',
      password: ' ',
      username: ' '
    },
    createOn: ' ',
    question: ' ',
    top: null,
    voted: []
  }]
}

export default state

const Answer = require('../models/answerModel.js')
module.exports = (req, res, next) =>{
  Answer.findOne({'_id': req.params.answer})
  .then(answer=>{
    if (req.decoded && answer.author == req.decoded.userId) {
      next()
    }
    else {
      res.status(403).json({
        message: 'User not authorize'
      })
    }
  })
}
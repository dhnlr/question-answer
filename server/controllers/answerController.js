const Answer = require('../models/answerModel.js');

class AnswerController {
  static create (req, res, next) {
    let dataNewAnswer = {
      question: req.params.question,
      answer: req.body.answer,
      author: req.decoded.userId
    }
    Answer.create(dataNewAnswer)
    .then( data => {
      res.status(200).json({
        message: 'Success',
        data: data
      })
    })
    .catch( error => {
      res.status(400).json({
        message: 'Failed',
        error : error
      })
    })
  }
  static read (req, res) {
    Answer.find()
    .then( answers => {
      res.status(200).json({
        message: 'Success',
        data : answers
      })
    })
    .catch (error=>{
      res.status(400).json({
        message: 'Error',
        error: error
      })
    })
  }
  static read5 (req, res) {
    Answer.find().limit(5).where('top', true ).populate('question').exec()
    .then( answers => {
      console.log(answers)
      res.status(200).json({
        message: 'Success',
        data : answers
      })
    })
    .catch (error=>{
      res.status(400).json({
        message: 'Error',
        error: error
      })
    })
  }
  static readQ (req, res){
    Answer.find({'question': req.params.question}).sort( '-top' )
    .populate('author')
    .exec()
    .then( answer => {
      res.status(200).json({
        message: 'Success',
        data: answer
      })
    })
    .catch(error=>{
      res.status(400).json({
        message: 'Error',
        error: error
      })
    })
  }
  static update (req, res){
    Answer.findOne({'_id': req.params.answer})
    .then( answer => {
      let dataUpdateAnswer = {
        answer: req.body.answer || answer.answer,
      }
      Answer.findOneAndUpdate({'_id': req.params.answer}, {$set: dataUpdateAnswer}, {upsert: true, new : true})
      .then(data=>{
        res.status(200).json({
          message: 'Success',
          data: data
        })
      })
      .catch(error=>{
        res.status(200).json({
          message: 'Error',
          error: error
        })
      })
    })
  }
  static vote (req, res){
    Answer.findOne({'_id': req.params.answer})
    .then(answer => {
      if (answer.voted.indexOf(req.decoded.userId) == -1) {
        answer.voted.push(req.decoded.userId)
        answer.voteCount++
        Answer.findOneAndUpdate({'_id': req.params.answer}, {$set: answer}, {upsert: true, new : true})
        .then(data=>{
          res.status(200).json({
            message: 'Success',
            data: data
          })
        })
        .catch(error=>{
          res.status(400).json({
            message: 'Error',
            error: error
          })
        })
      }
      else if (answer.voted.indexOf(req.decoded.userId) != -1) {
        answer.voted.splice(answer.voted.indexOf(req.decoded.userId), 1)
        answer.voteCount--
        Answer.findOneAndUpdate({'_id': req.params.answer}, {$set: answer}, {upsert: true, new : true})
        .then(data=>{
          res.status(200).json({
            message: 'Success',
            data: data
          })
        })
        .catch(error=>{
          res.status(400).json({
            message: 'Error',
            error: error
          })
        })
      }
    })
  }
  static topAnswer (req, res){
    Answer.findOne({'_id': req.params.answer})
    .then(answer => {
        answer.top = !answer.top
        Answer.findOneAndUpdate({'_id': req.params.answer}, {$set: answer}, {upsert: true, new : true})
        .then(data=>{
          res.status(200).json({
            message: 'Success',
            data: data
          })
        })
        .catch(error=>{
          res.status(400).json({
            message: 'Error',
            error: error
          })
        })
    })
  }
  static destroy (req, res){
    Answer.remove({'_id': req.params.answer})
    .then(data=>{
      res.status(200).json({
        messsage: 'Success',
        data: data
      })
    })
    .catch(error=>{
      res.status(200).json({
        message: 'Error',
        error: error
      })
    })
  }
}

module.exports = AnswerController
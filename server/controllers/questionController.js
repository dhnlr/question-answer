const Question = require('../models/questionModel.js');

class QuestionController {
  static create (req, res) {
    let dataNewQuestion = {
      title: req.body.title,
      description: req.body.description,
      author: req.decoded.userId
    }
    Question.create(dataNewQuestion)
    .then(data => {
      res.status(200).json({
        message: 'Success',
        data: data
      })
    })
    .catch(error => {
      res.status(400).json({
        message: 'Failed',
        error : error
      })
    })
  }
  static read (req, res) {
    Question.find().sort( 'createdOn')
    .populate('author')
    .exec()
    .then(questions => {
      res.status(200).json({
        message: 'Success',
        data : questions
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
    Question.find().limit(5).sort( 'voteCount' )
    .then( questions => {
      res.status(200).json({
        message: 'Success',
        data : questions
      })
    })
    .catch (error=>{
      res.status(400).json({
        message: 'Error',
        error: error
      })
    })
  }
  static readId (req, res){
    Question.findOne({'_id': req.params.question})
    .populate('author')
    .populate('topanswer')
    .populate('author')
    .exec()
    .then( question => {
      res.status(200).json({
        message: 'Success',
        data: question
      })
    })
    .catch(error=>{
      res.status(400).json({
        message: 'Error',
        error: error
      })
    })
  }
  static readUserId (req, res){
    Question.findOne({'author': req.params.userId})
    .populate('author')
    .populate('topanswer')
    .populate('author')
    .exec()
    .then( question => {
      res.status(200).json({
        message: 'Success',
        data: question
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
    Question.findOne({'_id': req.params.question})
    .then( question => {
      let dataUpdateQuestion = {
        title: req.body.title || question.title,
        description: req.body.description || question.description,
      }
      Question.findOneAndUpdate({'_id': req.params.question}, {$set: dataUpdateQuestion}, {upsert: true, new : true})
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
    Question.findOne({'_id': req.params.question})
    .then(question => {
      if (question.voted.indexOf(req.decoded.userId) == -1) {
        question.voted.push(req.decoded.userId)
        question.voteCount++
        Question.findOneAndUpdate({'_id': req.params.question}, {$set: question}, {upsert: true, new : true})
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
      } else if (question.voted.indexOf(req.decoded.userId) != -1) {
        question.like.splice(question.voted.indexOf(req.decoded.userId), 1)
        question.voteCount--
        Question.findOneAndUpdate({'_id': req.params.question}, {$set: question}, {upsert: true, new : true})
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
    .catch(error => {
      console.log(error, 'Error')
    })
  }
  static destroy (req, res){
    Question.remove({'_id': req.params.question})
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

module.exports = QuestionController
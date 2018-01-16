const Question = require('../models/questionModel.js')
module.exports = (req, res, next) =>{
	Question.findOne({'_id': req.params.question})
	.then(question=>{
		if (req.decoded && question.author == req.decoded.userId) {
			next()
		}
		else {
			res.status(403).json({
				message: 'User not authorize'
			})
		}
	})
}
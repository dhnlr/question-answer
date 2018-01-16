const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const answerController = require('../controllers/answerController');
const auth = require('../middlewares/auth');
const author = require('../middlewares/author')
const authora = require('../middlewares/authora')

/* GET questions listing. */
router.get('/', questionController.read);
router.get('/5/question', questionController.read5);
router.get('/5/answer', answerController.read5);
router.get('/by/:userId', questionController.readUserId);
router.get('/:question', questionController.readId);
router.get('/:question/answer', answerController.readQ);
router.post('/add', auth, questionController.create);
router.post('/:question/vote', auth, questionController.vote);
router.post('/:question/top/:answer', auth, author, answerController.topAnswer)
router.post('/:question/add/:answer', auth, answerController.create)
router.post('/:question/:answer/vote', auth, answerController.vote);
router.put('/:question', auth, author, questionController.update);
router.put('/:question/:answer', auth, authora, answerController.update);
router.delete('/:question', auth, author, questionController.destroy);
router.delete('/:question/:answer', auth, authora, answerController.destroy)

module.exports = router;
import express from 'express';
import Answers from '../models/Answers.js';
import Question from '../models/Question.js'
const router = express.Router();


router.post('/answers/:questionId', async (req, res) => {
    const { text } = req.body;
    const userId = req.session.userId; // assume session middleware is in place
    const questionId = req.params.questionId;
  
    if (!userId) return res.status(401).json({ message: 'Please log in' });
  
    try {
      const newAnswer = new Answers({ text, userId, questionId });
      await newAnswer.save();
  
      // Push the answer to the corresponding question's answers array
      await Questions.findByIdAndUpdate(questionId, {
        $push: { answers: newAnswer._id }
      });
  
      res.status(201).json(newAnswer);
    } catch (error) {
      res.status(500).json({ message: 'Error creating answer', error });
    }
  });

  router.get('/answers/:questionId', async (req, res) => {
    try {
      const answers = await Answers.find({ questionId: req.params.questionId }).sort({ timestamp: -1 });
      res.status(200).json(answers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching answers', error });
    }
  });

  router.post('/answers/:id/upvote', async (req, res) => {
    try {
      const answer = await Answers.findByIdAndUpdate(req.params.id, {
        $inc: { upvotes: 1 }
      }, { new: true });
      res.status(200).json(answer);
    } catch (err) {
      res.status(500).json({ message: 'Upvote failed' });
    }
  });
  
  router.post('/answers/:id/downvote', async (req, res) => {
    try {
      const answer = await Answers.findByIdAndUpdate(req.params.id, {
        $inc: { downvotes: 1 }
      }, { new: true });
      res.status(200).json(answer);
    } catch (err) {
      res.status(500).json({ message: 'Downvote failed' });
    }
  });
  export default router;
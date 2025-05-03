import express from "express";
import Question from '../models/Question.js';

const router = express.Router();


router.post('/questions', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: 'Login required' });
  
    const { text, description, tags } = req.body;
  
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Question text is required' });
    }
  
    try {
      const question = new Question({
        text,
        description,
        tags,
        userId: req.session.userId,
      });
  
      await question.save();
      res.status(201).json(question);
    } catch (err) {
      res.status(500).json({ error: 'Failed to post question' });
    }
  });


  router.get('/questions', async (req, res) => {
    try {
      const questions = await Question.find().populate('userId', 'username').sort({ timestamp: -1 });
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  });


  router.put('/questions/:id', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: 'Login required' });
  
    const { text, description, tags } = req.body;
  
    try {
      const question = await Question.findById(req.params.id);
      if (!question) return res.status(404).json({ message: 'Question not found' });
  
      if (question.userId.toString() !== req.session.userId) {
        return res.status(403).json({ message: 'Not authorized to edit this question' });
      }
  
      question.text = text || question.text;
      question.description = description || question.description;
      question.tags = tags || question.tags;
  
      await question.save();
      res.status(200).json(question);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update question' });
    }
  });


  router.delete('/questions/:id', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: 'Login required' });
  
    try {
      const question = await Question.findById(req.params.id);
      if (!question) return res.status(404).json({ message: 'Question not found' });
  
      if (question.userId.toString() !== req.session.userId) {
        return res.status(403).json({ message: 'Not authorized to delete this question' });
      }
  
      await question.deleteOne();
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete question' });
    }
  });

  export default router;
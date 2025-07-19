import express from 'express';
import mongoose from 'mongoose';
import { userResponse } from '../models/response.model.js'; // assumes you have a response model

const router = express.Router();

// POST /api/submitVote
router.post('/api/submitVote', async (req, res) => {
  try {
    const { pollId, selectedOption } = req.body;

    // Basic input validation
    if (!pollId || !selectedOption) {
      return res.status(400).json({ message: 'Poll ID and selected option are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(pollId)) {
      return res.status(400).json({ message: 'Invalid poll ID format' });
    }

    const newVote = new userResponse({
      poll_id: pollId,
      option_selected: selectedOption,
      submitted_at: new Date()
    });

    const savedVote = await newVote.save();

    return res.status(201).json({
      message: 'Vote submitted successfully',
      data: savedVote
    });

  } catch (err) {
    console.error('Error submitting vote:', err);
    return res.status(500).json({ message: 'Failed to submit vote', error: err.message });
  }
});

export default router;

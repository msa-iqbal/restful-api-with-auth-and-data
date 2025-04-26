const express = require('express');
const Data = require('../models/dataModel');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Create data          -- OK
router.post('/', authMiddleware, async (req, res) => {
  try {
    const data = new Data({ ...req.body, userId: req.user.userId });
    await data.save();
    res.status(201).json({ message: 'Data created successfully!', data });
  } catch (error) {
    res.status(500).json({ error: 'Data creation failed' });
  }
});

// Get all data
router.get('/', authMiddleware, async (req, res) => {
  try {
    const data = await Data.find({ userId: req.user.userId });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Update data
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedData = await Data.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data updated successfully!', updatedData });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete data
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedData = await Data.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!deletedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;

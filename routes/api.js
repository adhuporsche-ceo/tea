
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// GET /api/applications - retrieve all applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({ error: 'Failed to retrieve applications.' });
  }
});

// POST /api/applications - save an application
router.post('/applications', async (req, res) => {
  try {
    const { name, email, rollNumber, internship } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !rollNumber?.trim() ||
      !internship?.trim()
    ) {
      return res.status(400).json({
        error: 'Name, email, roll number, and internship are required.'
      });
    }

    const application = await Application.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      rollNumber: rollNumber.trim(),
      internship: internship.trim()
    });

    return res.status(201).json({
      message: 'Application submitted successfully!',
      application
    });
  } catch (error) {
    console.error('Submit application error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({
      error: 'Failed to submit application. Please try again.'
    });
  }
});

module.exports = router;

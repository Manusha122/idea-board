const express = require('express');
const multer = require('multer');
const Idea = require('../models/Idea');
const router = express.Router();

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// GET /api/ideas - list ideas sorted by upvotes and date
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ upvotes: -1, createdAt: -1 }).limit(200);
    
    // Convert image buffers to base64 strings for transmission
    const processedIdeas = ideas.map(idea => {
      const processed = idea.toObject();
      if (processed.image && processed.image.data) {
        processed.image.data = processed.image.data.toString('base64');
      }
      return processed;
    });
    
    res.json(processedIdeas);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ideas' });
  }
});

// POST /api/ideas - create an idea with optional image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: 'Text is required' });
    
    const ideaData = {
      text: text.trim().slice(0, 280)
    };

    // If an image was uploaded, add it to the idea
    if (req.file) {
      ideaData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        originalName: req.file.originalname
      };
    }

    const idea = new Idea(ideaData);
    await idea.save();
    
    // Convert image buffer to base64 for response
    const response = idea.toObject();
    if (response.image && response.image.data) {
      response.image.data = response.image.data.toString('base64');
    }
    
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create idea' });
  }
});

// POST /api/ideas/:id/upvote - increment upvote
router.post('/:id/upvote', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true });
    if (!idea) return res.status(404).json({ error: 'Not found' });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upvote' });
  }
});

// PUT /api/ideas/:id - update an idea's text
router.put('/:id', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: 'Text is required' });
    const idea = await Idea.findByIdAndUpdate(req.params.id, { text: text.trim().slice(0, 280) }, { new: true });
    if (!idea) return res.status(404).json({ error: 'Not found' });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update idea' });
  }
});

// DELETE /api/ideas/:id - delete an idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete idea' });
  }
});

module.exports = router;

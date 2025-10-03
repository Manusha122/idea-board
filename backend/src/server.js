const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ideasRouter = require('./routes/ideas');

const app = express();
app.use(cors());
app.use(express.json());


const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://manusha:EezbbjTXCmFpIUMD@cluster0.c2ixz7p.mongodb.net/ideaboard';
//const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/ideaboard';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Mongo connection error', err));

app.use('/api/ideas', ideasRouter);

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

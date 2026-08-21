require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'User Authentication API is running' }));
app.use('/api/auth', authRoutes);
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Email is already registered' });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: 'Validation error' });
  }
  console.error(err.message);
  res.status(500).json({ message: 'Internal server error' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Auth API running on http://localhost:${PORT}`)))
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });

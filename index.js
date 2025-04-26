const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

// Configure environment variables
dotenv.config();

// Initialize the app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Database connection error:', err));

// API routes
app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

// Default error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// backend/app.js

require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // must come before routes

// Routes
const jobberWebhooks = require('./routes/jobberWebhooks');
app.use('/webhooks/jobber', jobberWebhooks);

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);


// Health check
app.get('/', (req, res) => {
  res.send('ELDS Backend is live!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


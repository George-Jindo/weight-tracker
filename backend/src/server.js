const express = require('express');
const cors = require('cors');
const weightEntriesRoutes = require('./routes/weightEntries');
require('dotenv').config();

const app = express();

// Enable CORS so our React client can call the API.
app.use(cors());

// Parse JSON bodies.
app.use(express.json());

// Mount the weight entries routes at /api/WeightEntries to be compatible with the front‑end.
app.use('/api/WeightEntries', weightEntriesRoutes);

// Start the server.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
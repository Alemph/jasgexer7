const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 443;

// Use CORS to allow requests from your HTML page
app.use(cors());

// Endpoint to log IP addresses
app.get('/log-ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`IP Address: ${ip}`);
  res.send('IP address logged.');
});

app.listen(port, () => {
  console.log(`Server running at garakobama.mvhsrobotics.org/site.html`);
});

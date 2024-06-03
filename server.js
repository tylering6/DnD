const express = require('express');
const cors = require('cors');
const fs = require('fs');
const xlsx = require('xlsx');
const app = express();
const port = process.env.PORT || 443;

// Use CORS to allow requests from your HTML page
app.use(cors());

const excelFile = 'ip_addresses.xlsx';

function logIpAddress(ip) {
  let workbook;
  let sheet;

  // Check if file exists
  if (fs.existsSync(excelFile)) {
    workbook = xlsx.readFile(excelFile);
    sheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = xlsx.utils.book_new();
    sheet = xlsx.utils.aoa_to_sheet([['IP Address', 'Timestamp']]);
    xlsx.utils.book_append_sheet(workbook, sheet, 'IP Log');
  }

  // Add the IP address to the sheet
  const newRow = {
    A: ip,
    B: new Date().toISOString()
  };

  // Find the next empty row
  const rowCount = xlsx.utils.decode_range(sheet['!ref']).e.r + 2;
  sheet[`A${rowCount}`] = { v: newRow.A };
  sheet[`B${rowCount}`] = { v: newRow.B };

  // Update the range
  sheet['!ref'] = xlsx.utils.encode_range({
    s: { c: 0, r: 0 },
    e: { c: 1, r: rowCount - 1 }
  });

  xlsx.writeFile(workbook, excelFile);
}

// Endpoint to log IP addresses
app.get('/log-ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`IP Address: ${ip}`);

  try {
    logIpAddress(ip);
    res.send('IP address logged.');
  } catch (error) {
    console.error('Error logging IP address:', error);
    res.status(500).send('Error logging IP address.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
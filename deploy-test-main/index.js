
const express = require('express');
const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
 const Log = require('./models/user'); // Import the log schema
const db = require('./config/mongoose');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded());
// use express router
app.use('/', require('./routes'));

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({});
});

app.post('/api', async (req, res) => {
  const requestBody = req.body;

  // Do something with the JSON data
  // console.log(requestBody);

  // Save the received log to MongoDB
  const newLog = new Log({ content: JSON.stringify(requestBody) });
  await newLog.save();

  res.status(200).json({ message: 'Log saved successfully.' });
});

app.get('/truncate', async (req, res) => {
  try {
    // Find the largest log entry in MongoDB
    const largestLog = await Log.findOne({}, {}, { sort: { content: -1 }, lean: true });

    if (!largestLog) {
      return res.status(404).json({ message: 'No logs found.' });
    }

    const logLines = largestLog.content.split('\n');
    const truncatedLines = logLines.slice(0, 100).join('\n');

    // Update the log content in the database with truncated content
    await Log.findByIdAndUpdate(largestLog._id, { content: truncatedLines });

    res.status(200).json({ message: 'Log truncated successfully.' });
  } catch (error) {
    console.error('Error truncating log:', error);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

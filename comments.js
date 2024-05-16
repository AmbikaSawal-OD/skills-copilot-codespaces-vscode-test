// Create web server and set up express
const express = require('express');
const app = express();

// Path: comments.js
// Set up body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Path: comments.js
// Set up the database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('comments.json');
const db = low(adapter);

// Path: comments.js
// Set up the routes
app.get('/comments', (req, res) => {
  const comments = db.get('comments').value();
  res.send(comments);
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  db.get('comments').push(newComment).write();
  res.send(newComment);
});

// Path: comments.js
// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Path: comments.js
// Add some comments to the database
db.defaults({ comments: [] }).write();
db.get('comments').push({ id: 1, author: 'John', body: 'Hello!' }).write();
db.get('comments').push({ id: 2, author: 'Jane', body: 'Hi there!' }).write();

// Path: comments.js
// Export the app
module.exports = app;
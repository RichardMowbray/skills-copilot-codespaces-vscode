// Create web server application    
var express = require('express'); // Use the express library
var app = express();              // Create server with express
var port = 8080;                  // Set port number
var fs = require('fs');           // Load file system library
var bodyParser = require('body-parser'); // Load body-parser library
var comments = require('./comments.json'); // Load comments JSON file

// Tell server to use bodyParser to read JSON
app.use(bodyParser.json());

// Tell server to use bodyParser to read URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Set directory for static files
app.use(express.static(__dirname + '/public'));

// Set up route to get comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Set up route to post comments
app.post('/comments', function(req, res) {
  // Get comment data from request body
  var newComment = req.body;
  // Add date to comment
  newComment.date = new Date();
  // Add comment to array in memory
  comments.unshift(newComment);
  // Save comments to disk
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      console.log(err);
    }
  });
  // Send comment back to client
  res.json(newComment);
});

// Start server
app.listen(port);
console.log('Server running on port ' + port);


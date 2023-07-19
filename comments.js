// Create web server
var express = require('express');
var router = express.Router();
var Comments = require('../models/comments');

// Get all comments
router.get('/', function(req, res) {
  Comments.find({}, function(err, comments) {
    if (err) {
      res.status(500).send('Error occurred: database error');
    } else {
      res.send(comments);
    }
  });
});

// Get comments for a specific user
router.get('/:user', function(req, res) {
  Comments.find({user: req.params.user}, function(err, comments) {
    if (err) {
      res.status(500).send('Error occurred: database error');
    } else {
      res.send(comments);
    }
  });
});

// Add a comment
router.post('/', function(req, res) {
  var comment = new Comments(req.body);
  comment.save(function(err) {
    if (err) {
      res.status(500).send('Error occurred: database error');
    } else {
      res.send(comment);
    }
  });
});

// Delete a comment
router.delete('/:id', function(req, res) {
  Comments.findByIdAndRemove(req.params.id, function(err, comment) {
    if (err) {
      res.status(500).send('Error occurred: database error');
    } else {
      res.send(comment);
    }
  });
});

module.exports = router;

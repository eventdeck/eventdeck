var Comment      = require('./../../db/models/comment.js');
var markdown     = require('markdown').markdown;
var email        = require('./../email');
var notification = require('./../notification');

module.exports = create;

function create(request, reply) {

  var comment = request.payload;

  comment.member = request.auth.credentials.id;

  comment.html = markdown.toHTML(request.payload.markdown);

  var newComment = new Comment(comment);

  newComment.save(function (err) {
    if (err) {
      console.log("Error creating comment.");
      reply({error: "Error creating comment."});
    }
    else {
      email.comment(comment);
      notification.notify(comment.member, comment.thread, 'posted a new comment', newComment._id);

      reply({success: "Comment created."});
    }
  });

}

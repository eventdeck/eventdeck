var Topic = require('../../db/models/topic');

exports = module.exports = list;

function list(request, reply) {

  Topic.findByDuedate(request.params.start, request.params.end, function (err, result) {
    if (err) {
      return reply(err);
    }

    reply(result);
  });

}

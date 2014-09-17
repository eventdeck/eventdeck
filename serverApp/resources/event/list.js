var Event = require('../../db/models/event');
var log = require('../../helpers/logger');

module.exports = list;

function list(request, reply) {

  Event.findAll(function(err, result) {
    if (err) {
      log.error({err: err, username: request.auth.credentials.id}, '[event] error listing events');
      return reply({error: 'There was an error getting all the events.'});
    }
    
    reply(result);
  });

}

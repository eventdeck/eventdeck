var server = require('server').hapi;
var handlers = require('./handlers');


server.route({
  method: 'GET',
  path: '/api/auth/login/{id}',
  config: handlers.createCode
});

server.route({
  method: 'GET',
  path: '/api/auth/login/{id}/{code}',
  config: handlers.loginWithCode
});

server.route({
  method: 'GET',
  path: '/api/auth/logout',
  config: handlers.logout
});

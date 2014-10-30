'use strict';

eventdeckServices.factory('NotificationFactory', function ($resource) {
  return {
    Notification: $resource(url_prefix+'/notifications/:id', null, {
      'getAll': {method: 'GET', isArray: true},
      'update': {method: 'PUT'}
    }),
    Company: $resource(url_prefix+'/companies/:id/notifications', null, {
      'getAll': {method: 'GET', isArray: true}
    }),
    Speaker: $resource(url_prefix+'/speakers/:id/notifications', null, {
      'getAll': {method: 'GET', isArray: true}
    }),
    Topic: $resource(url_prefix+'/topics/:id/notifications', null, {
      'getAll': {method: 'GET', isArray: true}
    })
  };
});

'use strict';

angular.module('theTool.filters', [])
  .filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  .filter('filterEventStatus', function(){
    return function(objs, event, status) {
      var result = objs;
      if(event) {
        result = objs.filter(function(o) {
          return o.participations.filter(function(p) {
            if(status && status !== '') {
               console.log('status',status, p.event === event && p.status === status);
              return p.event === event && p.status === status;
            } else {
              console.log('no status');
              return p.event === event;
            }
          });//.length > 0;
        });
      }
      return result;
    };
  })
  .filter('filterRole', function() {
    return function(members, role) {
          var result = members;
          if(role) {
            result = members.filter(function(m) {
              return m.roles.filter(function(r) {
                return r.id == role;
              }).length > 0;
            });
          }
          return result;
      };
  });
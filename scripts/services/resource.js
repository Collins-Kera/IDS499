'use strict';

/**
 * @ngdoc service
 * @name angbaseApp.fbResource
 * @description
 * # fbResource
 * provides a FireBase ref connected to a specific path
 */
angular.module('angbaseApp')
  .factory('fbResource', function ($firebase) {
    //set FireBase URL
    var FBURL = 'https://improvement.firebaseio.com';

    //parse path variable
    function pathRef(args) {
      for (var i = 0; i < args.length; i++) {
        if (angular.isArray(args[i])) {
          args[i] = pathRef(args[i]);
        }
        else if( typeof args[i] !== 'string' ) {
          throw new Error('Argument '+i+' to firebaseRef is not a string: '+args[i]);
        }
      }
      return args.join('/');
    }

    //function to return a FireBase Ref for the passed in path
    function firebaseRef(path) { // jshint ignore:line
      var ref = new Firebase(FBURL); // jshint ignore:line
      var args = Array.prototype.slice.call(arguments);
      if( args.length ) {
        ref = ref.child(pathRef(args));
      }
      return ref;
    }

    return {
      ref: firebaseRef,
      sync: function(ref) {
          return $firebase(ref);
       }
    };

    

    
  });
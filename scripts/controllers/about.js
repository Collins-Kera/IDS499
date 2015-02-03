'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('AboutCtrl', function ($scope, profileRepository) {
    
    //normally the info for the new user would be gathered through a form...shortcut here
    var profile = { userId: 'shanet', profile: {name: 'Bro T', email: 'thompsonda@'}};
     //returns an object that contains the ID of the new element.
     profileRepository.addProfile(profile).then(function(ref) {
      
      $scope.userId = ref.key();

    });
    $scope.name = "";

    //add anything to $scope that you want to be able to access in the view
    $scope.user = profileRepository.getProfile('shanet');
      
    //check to make sure the data is loaded before moving on
    $scope.user.$loaded().then(function() {
        $scope.user.email = 'matkat@';
      profileRepository.editProfile($scope.user);
      //notice I'm passing in the whole user object with the desired modifications and not just an ID here
    
  }, function(err) { console.log(err);});

    $scope.fbusers = profileRepository.getProfiles();
    
    //we can add methods to the scope as well.  See in the view how I linked this up to a button
    $scope.removeUser = function(user, list) {
        profileRepository.removeProfile(user, list);

    }
    
    $scope.users = [
      { userId: 'shanet', profile: {name: 'Bro T', email: 'thompsonda@'}},
      { userId: 'kerac', profile: {name: 'Kera C', email: 'kera@'}},
      { userId: 'leesar', profile: {name: 'LeesaR', email: 'leesa@'}},
      { userId: 'krystam', profile: {name: 'Krysta M', email: 'krysta'}},
      { userId: 'arkadiusk', profile: {name: 'Arkadius K', email: 'arkadius@'}},
      { userId: 'karlal', profile: {name: 'Karla L', email: 'karla@'}}
    ];
    //example of looping through and adding several users
    for (var i = $scope.users.length - 1; i >= 0; i--) {
     profileRepository.addProfile($scope.users[i]);
   };
  });

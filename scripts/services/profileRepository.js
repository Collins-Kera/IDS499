'use strict';

/**
 * @ngdoc service
 * @name angbaseApp.profileRepository
 * @description
 * # profileRepository
 * Provides getters and setters for profiles.
 */
angular.module('angbaseApp')
  .factory('profileRepository', function (fbResource) {
    //get the Firebase reference linked to the profiles document.
    var ref = fbResource.ref('profiles');


    // Public API here
    return {
      //get one profile
      getProfile: function (userId) {
        return fbResource.sync(ref.child(userId)).$asObject();
      },
      //get all the profiles
      getProfiles: function () {
        return fbResource.sync(ref).$asArray();
      },
      addProfile: function (newProfile) {
        /*if we want to specify what the id of the record is we can use $set with 2 args.  
        First is the id of the new node...2nd is the payload
        if a random id is fine we can use $push() instead.  
        It returns a promise that will send back the new id once resolved.
           fbResource.sync(ref).$set(newProfile).then(
            function(newId){ //success callback
              return newId.key() 
            }, 
            function(error) { //error callback
              console.log("Error:", error); 
            }) */
       return fbResource.sync(ref).$set(newProfile.userId, newProfile.profile);
      
      },
      editProfile: function (profile) {
        return profile.$save();

      },
      
      /* profile is required.  It is the object to remove. 
       If a list is passed in it is assumed the object was returned by $asArray as part of a list
      If no list then it is assumed it was retrieved by $asObject as a singleton
       */
      removeProfile: function(profile, list) {
        if(list) {  //is the object part of a list?
            return list.$remove(profile);
        } else { //otherwise it's a single object
            return profile.$remove();
        }
        
      }
    };
  });
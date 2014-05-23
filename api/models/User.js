 "owner",/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      
      name: {
          type: 'string',
          required: true            
      },
      
      password: {
          type: 'string',
          required: true          
      },
      
      post: {
          collection: "post",
          via: "owner"
      },
      
      profile: {
          model: "profile"    
      },
      
      toDisplay: function(){
          return "user name is " + this.name;
      
      }

  },beforeCreate: function(values, next){
      console.log("create params: ");
      console.log(values);
      
      next();
  }
};


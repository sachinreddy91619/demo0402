

const fastify = require('fastify')({
  logger:true
}); // Import fastify
const registerUserSchema = {
    body: {
      type: 'object',
      required: ['username', 'email', 'password','role'], 
      properties: {
        username:{type:'string'},
         
        email:{type:'string'},
            password:{type:'string'},
            role:{type:'string'}
        
      }
    },
  };
  
  module.exports = registerUserSchema;
  
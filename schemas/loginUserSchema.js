
// const fastify = require('fastify'); // Import fastify
// const loginUserSchema = {
//     body: {
//       type: 'object',
//       required: ['username', 'password'], 
//       properties: {
//         username:{type:'string'},
        
//             password:{type:'string'}
        
//       }
//     },
//   };
  
//   module.exports = loginUserSchema;


import fastify from 'fastify';

const loginUserSchema = {
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: { type: 'string' },
            password: { type: 'string' }
        }
    },
};

export default loginUserSchema;

  

// const fastify = require('fastify')(
//   {
//     logger: true
//   }
// ); // Import fastify
// const createUserSchema = {
//     body: {
//       type: 'object',
//       required: ['eventname', 'eventdate', 'eventlocation', 'amountrange','eventtime'], 
//       properties: {
//         eventname:{type:'string'},
//             eventdate:{type:'string',format:'date'},
//             eventlocation:{type:'string'},
//             amountrange:{type:'number'},
//             eventtime:{type:'string',format:'time'}
        
//       }
//     },
//   };
  
//   module.exports = createUserSchema;
import fastify from 'fastify';

const app=fastify({
    logger:true
})

const createUserSchema = {
    body: {
        type: 'object',
        required: ['eventname', 'eventdate', 'eventlocation', 'amountrange', 'eventtime'],
        properties: {
            eventname: { type: 'string' },
            eventdate: { type: 'string', format: 'date' },
            eventlocation: { type: 'string' },
            amountrange: { type: 'number' },
            eventtime: { type: 'string', format: 'time' }
        }
    },
};

export default createUserSchema;

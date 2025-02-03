// const fastify=require('fastify')({
//     logger:true
// })

// const {createEvent,getevent,getbyid,deleteevent,updateevent,loc,eventbook}=require('../controllers/eventopera');

// const createEventSchema=require('../schemas/createEventSchema');

// const updateEventSchema=require('../schemas/createEventSchema');

// const getbyidEventSchema=require('../schemas/getbyidEventSchema');
// const posteventidSchema=require('../schemas/posteventidSchema');


// const auth=require('../middleware/authmiddle');

// const roleauth=require('../middleware/roleauth');
// //const { schema } = require('../models/Event');


// async function eventRoutes(fastify,options){





// // fastify.post('/create',{preHandler:auth},createEvent);

// fastify.post('/create',{schema:createEventSchema,preHandler:[auth,roleauth(['admin'])]},createEvent);

// fastify.get('/get',{preHandler:auth},getevent);

// fastify.get('/get/:id',{schema:getbyidEventSchema,preHandler:auth},getbyid);

// fastify.put('/update/:id',{schema:updateEventSchema,preHandler:[auth,roleauth(['admin'])]},updateevent);

// fastify.delete('/delete/:id',{preHandler:[auth,roleauth(['admin'])]},deleteevent);


//    fastify.post('/location',{preHandler:auth},loc);
//    fastify.post('/eventit/:id',{preHandler:auth},eventbook);
//   //  fastify.get('/get',{preHandler:auth},getevent);

// }

// module.exports=eventRoutes; 

import fastify from 'fastify';
const app = fastify({
  logger: true
});
import { createEvent, getevent, getbyid, deleteevent, updateevent, loc, eventbook, getallbookings, booking, eventdelete } from '../controllers/eventopera.js';
import createEventSchema from '../schemas/createEventSchema.js';
import updateEventSchema from '../schemas/createEventSchema.js';
import getbyidEventSchema from '../schemas/getbyidEventSchema.js';
import posteventidSchema from '../schemas/posteventidSchema.js';
import auth from '../middleware/authmiddle.js';
import roleauth from '../middleware/roleauth.js';

async function eventRoutes(fastify, options) {



  fastify.post('/create', { schema: createEventSchema, preHandler: [auth, roleauth(['admin'])] }, createEvent);
  fastify.get('/get', { preHandler: auth }, getevent);
  fastify.get('/get/:id', { schema: getbyidEventSchema, preHandler: auth }, getbyid);
  fastify.put('/update/:id', { schema: updateEventSchema, preHandler: [auth, roleauth(['admin'])] }, updateevent);
  fastify.delete('/delete/:id', { preHandler: [auth, roleauth(['admin'])] }, deleteevent);

  fastify.post('/location', { preHandler: auth }, loc);
  fastify.post('/eventit/:id', { preHandler: auth }, eventbook);

  fastify.get('/all', { preHandler: auth }, getallbookings);
  fastify.put('/bookings/:id', { preHandler: auth }, booking);
  fastify.delete('/cc/:id', { preHandler: auth }, eventdelete);
}

export default eventRoutes;


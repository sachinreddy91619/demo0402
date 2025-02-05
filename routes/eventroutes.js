
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


  // ROUTES FOR THE EVENT-MANGER :

  // this route is to create the create the event 
  fastify.post('/create', { schema: createEventSchema, preHandler: [auth, roleauth(['admin'])] }, createEvent);

  // This route is to get all  the  events of the particular event manager
  fastify.get('/get', { preHandler: auth }, getevent);

  // This route is to get a particular event based on Id
  fastify.get('/get/:id', { schema: getbyidEventSchema, preHandler: auth }, getbyid);

  //fastify.put('/update/:id', { schema: updateEventSchema, preHandler: [auth, roleauth(['admin'])] }, updateevent);

  // This route is to update the event 
  fastify.put('/update/:id', { preHandler: [auth, roleauth(['admin'])] }, updateevent);

  // This route is to delete the event
  fastify.delete('/delete/:id', { preHandler: [auth, roleauth(['admin'])] }, deleteevent);



  // ROUTES FOR THE USER 

  // this is the provide the location
  fastify.post('/location', { preHandler: auth }, loc);

  // this route is book the event
  fastify.post('/eventit/:id', { preHandler: auth }, eventbook);

  // this is is to get all  the bookings of the user 
  fastify.get('/all', { preHandler: auth }, getallbookings);

  // this route is to update the update a booking 
  fastify.put('/bookings/:id', { preHandler: auth }, booking);

  // this route is to delete the booking
  fastify.delete('/cc/:id', { preHandler: auth }, eventdelete);
}

export default eventRoutes;


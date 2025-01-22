const fastify=require('fastify')({
    logger:true
})

const {createEvent,getevent,getbyid,deleteevent,updateevent,loc,eventbook}=require('../controllers/eventopera');

const createEventSchema=require('../schemas/createEventSchema');

const updateEventSchema=require('../schemas/createEventSchema');

const getbyidEventSchema=require('../schemas/getbyidEventSchema');
const posteventidSchema=require('../schemas/posteventidSchema');


const auth=require('../middleware/authmiddle');

const roleauth=require('../middleware/roleauth');
//const { schema } = require('../models/Event');


async function eventRoutes(fastify,options){





// fastify.post('/create',{preHandler:auth},createEvent);

fastify.post('/create',{schema:createEventSchema,preHandler:[auth,roleauth(['admin'])]},createEvent);

fastify.get('/get',{preHandler:auth},getevent);

fastify.get('/get/:id',{schema:getbyidEventSchema,preHandler:auth},getbyid);

fastify.put('/update/:id',{schema:updateEventSchema,preHandler:[auth,roleauth(['admin'])]},updateevent);

fastify.delete('/delete/:id',{preHandler:[auth,roleauth(['admin'])]},deleteevent);


   fastify.post('/location',{preHandler:auth},loc);
   fastify.post('/eventit/:id',{preHandler:auth},eventbook);
  //  fastify.get('/get',{preHandler:auth},getevent);

}

module.exports=eventRoutes; 


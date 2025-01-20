const fastify=require('fastify')({
    logger:true
})

const {createEvent,getevent,getbyid,deleteevent,updateevent}=require('../controllers/eventopera');

const createEventSchema=require('../schemas/createEventSchema');

const updateEventSchema=require('../schemas/createEventSchema');


const auth=require('../middleware/authmiddle');

const roleauth=require('../middleware/roleauth');
//const { schema } = require('../models/Event');


async function eventRoutes(fastify,options){



// fastify.post('/create',{preHandler:auth},createEvent);

fastify.post('/create',{schema:createEventSchema,preHandler:[auth,roleauth(['admin'])]},createEvent);

fastify.get('/get',{preHandler:auth},getevent);

fastify.get('/get/:id',{preHandler:auth},getbyid);

fastify.put('/update/:id',{schema:createEventSchema,preHandler:[auth,roleauth(['admin'])]},updateevent);

fastify.delete('/delete/:id',{preHandler:[auth,roleauth(['admin'])]},deleteevent);

}

module.exports=eventRoutes; 


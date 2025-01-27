
// const fastify=require('fastify')({
//     logger:true
// });

// const mongoose=require('mongoose');


// const dotenv=require('dotenv');

// const eventRou=require('./routes/eventroutes');


// dotenv.config();


// mongoose.connect(process.env.MONGO_URL).then( ()=>{
//     fastify.log.info('database connected successfully');
// }).catch( (err)=>{
//     fastify.log.error("mongodb not connected successfully",err)
// });





// // fastify.register(eventRou,{prefix:'/event'});
// fastify.register(require('./routes/eventroutes'),{prefix:'/event'})

// fastify.register(require('./routes/authroutes'),{prefix:'/auth'})

// fastify.setErrorHandler( (error,request,reply)=>{
//     fastify.log.error('error');

//     reply.status(500).send({error:error.message});

// });


// const PORT=process.env.PORT || 3000;

// fastify.listen(PORT,(err,address)=>{
//     if(err){
//         fastify.log.error(err);
//         process.exit(1);

//     }
//     fastify.log.info(`server listening on${address}`);
// });

import fastify from 'fastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventRou from './routes/eventroutes.js';
import authRou from './routes/authroutes.js';

dotenv.config();

const app = fastify({
    logger: true
});

//app.decorate('backlisted', []);

global.backlistedTokens=["abc",];


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.log.info('Database connected successfully');
    })
    .catch((err) => {
        app.log.error('MongoDB not connected successfully', err);
    });

app.register(eventRou, { prefix: '/event' });
app.register(authRou, { prefix: '/auth' });

app.setErrorHandler((error, request, reply) => {
    app.log.error('Error:', error);
    reply.status(500).send({ error: error.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening on ${address}`);
});


export default app;

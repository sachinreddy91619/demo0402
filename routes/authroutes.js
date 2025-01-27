// const fastify=require('fastify')({
//     logger:true

// });


// const {register,login}=require('../controllers/authopera');

// const auth=require('../middleware/authmiddle');

// const registerUserSchema=require('../schemas/registerUserSchema');
// const loginUserSchema=require('../schemas/loginUserSchema');
// const { Schema } = require('mongoose');

// async function authroutes(fastify,options){

//     fastify.post('/login',{schema:loginUserSchema},login);//login route
//     fastify.post('/register',{schema:registerUserSchema},register);//register route
// }

// module.exports=authroutes;

import fastify from 'fastify';
const app = fastify({
    logger: true
});

import { register, login } from '../controllers/authopera.js';
import auth from '../middleware/authmiddle.js';
import registerUserSchema from '../schemas/registerUserSchema.js';
import loginUserSchema from '../schemas/loginUserSchema.js';

import {logout} from '../controllers/authopera.js';

async function authroutes(fastify, options) {
    fastify.post('/login', { schema: loginUserSchema }, login); // login route
    fastify.post('/register', { schema: registerUserSchema }, register); // register route
    fastify.post('/logout',{preHandler:auth},logout); // logout route
}

export default authroutes;

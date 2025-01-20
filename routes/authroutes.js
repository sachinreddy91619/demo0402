const fastify=require('fastify')({
    logger:true

});


const {register,login}=require('../controllers/authopera');

const auth=require('../middleware/authmiddle');

const registerUserSchema=require('../schemas/registerUserSchema');
const loginUserSchema=require('../schemas/loginUserSchema');
const { Schema } = require('mongoose');

async function authroutes(fastify,options){

    fastify.post('/login',{schema:loginUserSchema},login);//login route
    fastify.post('/register',{schema:registerUserSchema},register);//register route
}

module.exports=authroutes;

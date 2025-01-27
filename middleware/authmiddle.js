import fastify from 'fastify';
import jwt from 'jsonwebtoken';

const app = fastify({
    logger: true
});


// Attach the backlisted array to the Fastify instance
//app.decorate('backlisted',[]); // This attaches `backlisted` to the Fastify instance

//import app from '../app.js';
//export   let backlisted=[];


export default(request,reply,done)=>{

    const authHeader=request.headers['authorization'];

    const token=authHeader && authHeader.split(' ')[1];

    if(!token) return reply.status(401).send({error:'token not found'})
        

        console.log(global.backlistedTokens,"before"); 

        if(global.backlistedTokens && global.backlistedTokens.includes(token))
            
            {
                console.log(global.backlistedTokens,"after"); 
            return reply.status(401).send({
                error:'token has been  invalidated,please login again'
            })
        }

        jwt.verify(token,process.env.SEC,(err,user)=>{ //secret key
            
        if(err){
            return reply.status(403).json({error:'token not found'})
        }
        request.user=user;
        done();
    });
};


//export {app}
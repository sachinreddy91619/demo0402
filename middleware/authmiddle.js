import fastify from 'fastify';
import jwt from 'jsonwebtoken';

const app = fastify({
    logger: true
});

import Logs from '../models/Logs.js';


// // Attach the backlisted array to the Fastify instance
// //app.decorate('backlisted',[]); // This attaches `backlisted` to the Fastify instance

// //import app from '../app.js'; noneeed code for [] blacklisted logic 
// //export   let backlisted=[]; noneeded code for [] blacklisted logic 


// export default(request,reply,done)=>{

//     const authHeader=request.headers['authorization'];

//     const token=authHeader && authHeader.split(' ')[1];

//     if(!token) return reply.status(401).send({error:'token not found'})
        

//         // console.log(global.backlistedTokens,"before"); 11

//         // if(global.backlistedTokens && global.backlistedTokens.includes(token))11
            
//         //     {11
//         //         console.log(global.backlistedTokens,"after"); 11
//         //     return reply.status(401).send({11
//         //         error:'token has been  invalidated,please login again'11
//         //     })11
//         // } 11

//         jwt.verify(token,process.env.SEC,(err,user)=>{ //secret key
            
//         if(err){
//             return reply.status(403).json({error:'token not found'})
//         }
//         request.user=user;
//         done();
//     });
// };


// //export {app}
export default async (request, reply, done) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extract the token from the authorization header

    if (!token) {
        return reply.status(401).send({ error: 'Token not found' });
    }

    console.log(token);


    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.SEC);
        const userId = decoded.id;

        // Check if the user has an active session in the Logs model
        const userLogs = await Logs.findOne({ UserId: userId });

        console.log(userLogs);

        // If no logs are found or if the UserToken is null, it means the user is logged out
        if (!userLogs || userLogs.UserToken === null) {
            return reply.status(403).send({ error: 'User is logged out, access denied' });
        }

        // Attach the user info to the request object for further use in route handlers
        request.user = decoded;

        // Continue with the request processing
        done();
    } catch (err) {
        console.error('Token verification failed:', err);
        return reply.status(403).send({ error: 'Invalid or expired token' });
    }
};

import fastify from 'fastify';
import bcrypt from 'bcrypt';
import User from '../models/Users.js';
import Logs from '../models/Logs.js';
import jwt from 'jsonwebtoken';

//import { backlisted } from '../middleware/authmiddle.js';

const eee=fastify({
    logger:true
})
import app from '../app.js';



export const register=async(request,reply)=>{
    const {username,password,email,role}=request.body;

 // Validate that all required fields are present
 if(!username || !password || !email || !role) {
    return reply.status(400)
    // here we are getting the error mesage from the schemavalidation 
    //.send({ error: 'Missing required fields (username, password, email, role)' });
    console.log(reply.status(400))
  }


    try{

        const existingUser=await User.findOne({username});
        if(existingUser){
            return reply.status(400).send({error:'Username already exists. Try with another username'});
        }

        const user=new User({username,email,password,role}); 

        await user.save();  
      //  reply.status(201).send({user})
        reply.status(201).send({message:'user created successfully'});
       // reply.status(201).send({user})
    }
    catch(err){
      //  console.error('Error creating the user',err);
        reply.status(500).send({error:'error creating the user'});
    }
}

export const login=async (request,reply)=>{
    
    const {username,password}=request.body;
    try{
        const user=await User.findOne({username});
        if(!user){
            return reply.status(400).send({error:'user not found'});
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch) return reply.status(400).send({error:'invalid credentials'});
        const payload={id:user._id,role:user.role};
        const token=jwt.sign(payload,process.env.SEC);
        reply.status(200).send({token});

        const data=new User.findOne({username});
        Userid=data._id;
         
        const user1=new Logs({Userid,token}); 

        await user1.save();  
        

    
    }catch(err){
        //console.error('Error durign the login',err);
        reply.status(500).send({error:'error while login in the user'});
    }
};






// export const logout= async (request,reply)=>{


//     try{

//         const authHeader=request.headers['authorization'];
//         const token=authHeader && authHeader.split(' ')[1];

//         if(!token) 
//             {
// return reply.status(401).send({error:'token required for the logging out functionality'})
//             }

//             if(!global.backlistedTokens){
//                 global.backlistedTokens=[];

//             }
            
//             global.backlistedTokens.push(token);
//             console.log('Token blacklisted:', token);
//             console.log('Blacklisted tokens:', global.backlistedTokens);
//             //console.log(global.backlistedTokens); 
//             reply.send({message:'user logged out successfully'})

//     }
//     catch(err){
//         console.error('Error durign the logout',err);
//         reply.status(500).send({error:'error while logout in the current-user'});
//     }

// };




export const logout=(request,reply)=>{

    try{


        const authHeader=request.headers['authorization'];
        const token=authHeader && authHeader.split(' ')[1];

        if(!token) 
            {    
                return reply.status(401).send({error:'token required for the logging'})
            };


    }

    catch(err){
        console.log('Error durign the logout',err);
        reply.status(500).send({error:'error while logout in the current-user'});
    }
    
    }
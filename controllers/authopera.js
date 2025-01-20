const fastify =require('fastify')({
    logger:true
});

const bcrypt=require('bcrypt');

const User=require('../models/Users');

const jwt=require('jsonwebtoken');

module.exports.register=async(request,reply)=>{
    const {username,password,email,role}=request.body;




    try{
        const user=new User({username,email,password,role}); 

        await user.save();  
        reply.status(201).send({message:'user created successfully'});

    }
    catch(err){
        console.error('Error creating the user',err);
        reply.status(400).send({error:'error creating the user'});
    }
}

module.exports.login=async (request,reply)=>{
    const {username,password}=request.body;
    try{
        const user=await User.findOne({username});
        if(!user){
            return reply.send(400).send({error:'user not found'});
        }

        const ismatch=await bcrypt.compare(password,user.password);

        if(!ismatch) return reply.status(400).send({error:'invalid credentials'});

        const payload={id:user._id,role:user.role};

        const token=jwt.sign(payload,process.env.SEC);

        reply.send({token});






    }catch(err){
        console.error('Error durign the login',err);
        reply.status(400).send({error:'error while login in the user'});
    }
};


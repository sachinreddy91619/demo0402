const fastify=require('fastify')({
    logger:true
});

const jwt=require('jsonwebtoken');


module.exports=(request,reply,done)=>{

    const authHeader=request.headers['authorization'];

    const token=authHeader && authHeader.split(' ')[1];

    if(!token) return reply.status(401).send.json({error:'token not found'})

        jwt.verify(token,process.env.SEC,(err,user)=>{ //secret key
            
        if(err){
            return reply.status(403).json({error:'token not found'})
        }
        request.user=user;
        done();
    });
}
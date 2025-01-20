
const fastify=require('fastify')({
    logger:true
});



const jwt=require('jsonwebtoken');

module.exports=(requiredRoles)=>{
    return (request,reply,done)=>{

        if(!requiredRoles.includes(request.user.role)){
            return reply.status(401).send({error:'User role not having the permissions to do'});
    }

    done();
}
}
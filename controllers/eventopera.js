const fastify=require('fastify')({
    logger:true
})
const Event=require('../models/Events');

exports.createEvent=async(request,reply)=>{

    const {eventname,eventdate,eventlocation,amountrange,eventtime}=request.body;


    const eventDate = new Date(eventdate);
    const currentDate = new Date();
  
    if (eventDate <= currentDate) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Event date must be in the future.',
      });
    }






    try{
        const event=new Event({
            eventname,
            eventdate,
            eventlocation,
            amountrange,
            eventtime,
            userId: request.user.id,
        });
     
        await event.save();
        // const ArrayUserId=[];
    //    ArrayUserId= ArrayUserId.push(request.user.id);
    //     console.log(ArrayUserId)

        

        reply.send(event);


    }catch(err){
        reply.status(400).send({error:err.message})
    }

};


exports.getevent=async(request,reply)=>{
    try{

        const isAdmin = request.user.role === 'admin';

       // const admins = await User.find({ role: 'admin' });
        if(isAdmin){
            const event=await Event.find({ userId: request.user.id });
            reply.send(event);

        }
        else{
            const event1=await Event.find({})
            reply.send(event1);
        }
       

    }catch(err){
        reply.status(400).send({error:err.message})
    }
};

exports.getbyid=async(request,reply)=>{

    try{
         const event=await Event.findById(request.params.id);

         if(!event || event.userId.toString() !== request.user.id ){
            return reply.status(404).send({error:"event not found"})
         }

         reply.send(event);

    }catch(err){ 
        reply.status(400).send({error:err.message})
    }
}


exports.updateevent=async(request,reply)=>{
    const {eventname,eventdate,eventlocation,amountrange,eventtime}=request.body;

    try{
        const event=await Event.findById(request.params.id);
        
        if(!event || event.userId.toString() !== request.user.id ){
            return reply.status(400).send({error:'event not found'})
        }
        if(eventname) event.eventname=eventname;
        if(eventdate) event.eventdate=eventdate;   
        if(eventlocation) event.eventlocation=eventlocation;
        if(amountrange) event.amountrange=amountrange;
        if(eventtime) event.eventtime=eventtime;

        await event.save();
        reply.send(event);

    }catch(err){
        reply.status(400).send({error:err.message});

    }
};


exports.deleteevent=async (request,reply)=>{
    try{

        const event=await Event.findById(request.params.id);
        if(!event || event.userId.toString() !== request.user.id ){
            return reply.status(400).send({error:'event not found'})
        }
        await event.deleteOne();

        reply.send({message:'event deleted successfully'});



    }catch(err){
        reply.status(400).send({error:err.message});

    }
};

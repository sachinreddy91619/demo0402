import fastify from 'fastify';
import Event from '../models/Events.js';
import EventLoc from '../models/EventLoc.js';
import User from '../models/Users.js';
import EMB from '../models/EMB.js';

const app = fastify({
    logger: true
});


export const createEvent=async(request,reply)=>{

    let {eventname,eventdate,eventlocation,amountrange,eventtime}=request.body;


    const eventDate = new Date(eventdate);
    const currentDate = new Date();
  
    if (eventDate <= currentDate) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Event date must be in the future.',
      });
    }

    try{
        eventlocation=eventlocation.toLowerCase();
        const event=new Event({
            eventname,
            eventdate,
            eventlocation,
            amountrange,
            eventtime,
            userId: request.user.id,
        });
     
        console.log(event)
        await event.save();
        // const ArrayUserId=[];
    //    ArrayUserId= ArrayUserId.push(request.user.id);
    //     console.log(ArrayUserId)

        

        reply.send(event);
        console.log(event)

    }catch(err){
        reply.status(400).send({error:err.message})
    }

};


export const loc=async(request,reply)=>{
    const {eventneedlocation}=request.body;
    try{
        const event= new EventLoc({
            eventneedlocation,
            userId:request.user.id
        });
        console.log(request.user.id)
        await event.save();
        reply.send(event);

    }catch(err){
        reply.status(400).send({message:"getting the error while giving the event location"})
    }
}

export const getevent=async(request,reply)=>{
    try{


        const isAdmin = request.user.role === 'admin';

       // const admins = await User.find({ role: 'admin' });
        if(isAdmin){
            const event=await Event.find({ userId: request.user.id });
            reply.send(event);
            console.log(global.backlistedTokens);
            console.log(global.backlistedTokens); 

        }
        else{
            const loc= await EventLoc.find({ });
            console.log(request.user.id)
            console.log(loc)


            let t=loc[loc.length-1].eventneedlocation;
            console.log(t)

            const loc1=t.toLowerCase();
            const event1=await Event.find({eventlocation:loc1})

            if(!event1){
                return reply.status(404).send({message:"location not matched"})
            }
            reply.send(event1);
        }
       

    }catch(err){
        reply.status(400).send({error:err.message})
    }
};


export const eventbook=async(request,reply)=>{
     
    const {eventStatus}=request.body;

    



    try{
        //const event=await Event.find({ _id: request.params.id }); 
        const event = await Event.findById(request.params.id);


        console.log(event)

        reply.send(event);

        const e=event.userId;
        console.log(e)  

        const user=await User.findById(e);
        console.log(user)

        const eventname=event.eventname;
        const eventdate=event.eventdate;
        const eventlocation=event.eventlocation;
    const amountrange=event.amountrange;
    const eventtime=event.eventtime;
    const eventManager=user.username;
    const eventManagerEmail=user.email;
        console.log(request.user.id)

        
        const n=await User.findById(request.user.id);
        console.log(n)
        const eventBookedBy=n.username;
        const email=n.email;

        console.log({eventManager,eventManagerEmail,eventname,eventdate,eventlocation,amountrange,eventtime,eventBookedBy,email})

        const com=new EMB({
            eventManager,
            eventManagerEmail,
            eventname,
            eventdate,
            eventlocation,
            amountrange,
            eventtime,
            eventStatus,
            eventBookedBy,
            email
        })

        await com.save();
        console.log(com)
        reply.send(com);
        //const event1=await User.findById(request.user.id);  

    }catch(err){
        reply.status(400).send({error:err.message})
}

}


export const getbyid=async(request,reply)=>{

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


export const updateevent=async(request,reply)=>{
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


export const deleteevent=async (request,reply)=>{
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

//const mongoose=require('mongoose');

import fastify from 'fastify';

import mongoose from 'mongoose';

const EventLocSchema= new mongoose.Schema(
{
    eventneedlocation:{
        type:String,
        required:true
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
    
     //userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
}
)

//module.exports=mongoose.model('EventLoc',EventLocSchema);
export default mongoose.model('EventLoc',EventLocSchema);
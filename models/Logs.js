import fastify from 'fastify';

const app=fastify({
    logger:true
})

import mongoose from 'mongoose';

const LogSchema=new mongoose.Schema({

   // userid:{type:mongoose.Schema.Types.ObjectId,ref:'User',
    //userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    
    Userid:{
    type:String,
    required:true
        },
    logintime:{
        type:Date,
        required:true
    },

    logouttime:{
        type:Date,
        required:true
    },

    UserToken:{
        type:String,
        required:true
    },

    username:{
        type:String,
        required:true
    }

})

export default mongoose.model('Logs',LogSchema);
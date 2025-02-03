import fastify from 'fastify';

const app=fastify({
    logger:true
})

import mongoose from 'mongoose';

const LogSchema=new mongoose.Schema({

   // userid:{type:mongoose.Schema.Types.ObjectId,ref:'User',
    //userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    
    UserId: {
        type: mongoose.Schema.Types.ObjectId,  // Changing to ObjectId to reference the User model directly
        ref: 'User',
        required: true
    },


    logintime:{
        type:Date,
        default:Date.now,
        required:true
    },

    logouttime:{
        type:Date,
        default:null,
        required:false
    },

    UserToken:{
        type:String,
        default:null,
        //required:true
    }

})

export default mongoose.model('Logs',LogSchema);
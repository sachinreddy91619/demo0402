const mongoose=require('mongoose');

const EventLocSchema= new mongoose.Schema(
{
    eventneedlocation:{
        type:String,
        required:true
    }
    
     //userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
}
)

module.exports=mongoose.model('EventLoc',EventLocSchema);
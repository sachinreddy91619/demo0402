
import fastify from 'fastify';
import mongoose from 'mongoose';


const app = fastify({
    logger: true
})

const eventMBSchema = new mongoose.Schema({
    amountrange: {
        type: Number
    },
    eventname: {
        type: String,
        required: true
    },
    eventdate: {
        type: Date,
        required: true
    },
    eventlocation: {
        type: String,
        required: true
    },
    eventtime: {
        type: String,
        required: true
    },
    eventManager: {
        type: String,
        required: true
    },
    eventManagerEmail: {
        type: String,
        required: true
    },
    eventStatus: {
        type: String,
        required: true
    },
    eventBookedBy: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    NoOfSeatsBooking: {
        type: Number,
        required: true
    },
    AmountNeedPay: {
        type: Number,
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }




});

//module.exports=mongoose.model('EMB',eventMBSchema)
export default mongoose.model('EMB', eventMBSchema);
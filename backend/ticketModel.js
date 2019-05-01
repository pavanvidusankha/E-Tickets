const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let Ticket=new Schema({
   
    ticket_description:{
        type:String
    },
    ticket_name:{
        type:String
    },
    ticket_count:{
        type:Number
    }
});

module.exports=mongoose.model('ticket',Ticket);




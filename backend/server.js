const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const tRouter=express.Router();
const PORT=4000;

let Ticket=require('./ticketModel');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/ticket',{useNewUrlParser:true});
const connection=mongoose.connection;

connection.once('open',function(){
    console.log("MongoDB connection established successfully");
})
tRouter.route('/').get(function(req,res){
    Ticket.find(function(err,ticket){
        if(err){
            console.log(err);
        }else{
            res.json(ticket);
        }
    });
});

tRouter.route('/:id').get(function(req,res){
    let id=req.params.id;
    Ticket.findById(id,function(err,ticket){
        res.json(ticket);
    });

    tRouter.route('/add').post(function(req,res){
        let ticket=new Ticket(req.body);
        ticket.save().then(ticket=>{
            res.status(200).json({'ticket':'Ticket added successfully'});
        }).catch(err =>{
            res.status(400).send('adding new ticket has failed');
        });
    });

    tRouter.route('/update/id').post(function(req,res){
        Ticket.findById(req.params.id, function (err,ticket){
                if(!ticket)
                res.status(404).send('data is not found');
                else
                ticket.ticket_description=req.body.ticket_description;
                ticket.ticket_name=req.body.ticket_name;
                ticket.ticket_count=req.body.ticket_count;

                ticket.save().then(ticket=>{
                    res.json('Ticket Updated');
                })
                .catch(err=>{
                    res.status(400).send("Update not possible");
                });
        })
        
        
        ticket.save().then(ticket=>{
            res.status(200).json({'ticket':'Ticket added successfully'});
        }).catch(err =>{
            res.status(400).send('adding new ticket has failed');
        });
    });
})
app.use('/ticket',tRouter);
app.listen(PORT,function(){
    console.log("Server is running on Port: " +PORT);
});

 
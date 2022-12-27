var app = require('express')();
var http = require('http').Server(app);
const mongoose = require('mongoose');
const DB = require("./db"); // INITILIZE DATABASE
const moment = require('moment');
const today = moment();
const  userSchema = new mongoose.Schema({
    amount: {
    type: String
    },
    wallet_address:{
        type: String
    },
    txid:{
    type: String,
    default: "0"
    
    },
   // lisence:{
    //type: String,
    //default: "63aabe79694d682a8c9ff54b"
    
    //},
    date:{
        type: Date,
        default: today.format()
    }
});
const  lisSchema = new mongoose.Schema({
    lisence:{
    type: String,
    },
});

const User = mongoose.model('item', userSchema);
const Lisence = mongoose.model('lisence', lisSchema);
  
  app.get('/', (req, res) => {
    User.find({},(err, data) => {
        if (err) {
          res.end("500")
        } else {
        res.json(data)
        }
    })
  })
  app.get('/add', (req, res) => {
   Lisence.find({lisence: req.query.lisence},(err, data) => {
        if (err) {
          res.end("500")
        } 
        if(data !== undefined && data.length !== 0) {
        let newUSer = new User({
      amount: req.query.amount,
      wallet_address: req.query.wallet_address

    });
        newUSer.save((err, data1) => {
        if (err) {
          res.end("500")
         return;
       } 
       res.end(data1._id.toString())
      })
        }else{
        res.end("500")
        }
    })
    
  })
  app.get('/addv', (req, res) => {
         let newUSer = new Lisence({
       Lisence: req.query.lisence
     });
         newUSer.save((err, data1) => {
         if (err) {
           res.end("500")
          return;
        } 
        res.end(data1._id.toString())
       })
     
   })
  app.get('/add_txid', async (req, res) => {
   const filter = { _id: req.query.id };
   const update = { txid: req.query.txid };
   let doc = await User.findOneAndUpdate(filter, update);
    res.json(doc)
  })
  app.get('/txid', (req, res) => {
  console.log(req.query.id)
  Lisence.find({lisence: req.query.lisence},(err, data) => {
        if (err) {
          res.end("500")
        } 
         if(data != undefined && data.length != 0) {
    User.find({_id: req.query.id},(err, docs) => {
      console.log(docs)
          if (err){
              res.end("500")
          }
          else{
      if(data != undefined && data.length != 0){
      res.end(docs[0].txid.toString())
      }else{
      res.end("500")
      
      }
          }
      });
      }else{
      res.end("500")
      
      
      }
      })
  })
 

http.listen(3000, function(){
    console.log('listening on *:8080');
});
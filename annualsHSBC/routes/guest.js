const express = require('express')
const router = express.Router();
const db = require('../db.js');


router.get('/count', function (req,res) {
  console.log("Total Count Query" )
  db.Guest.findAll({
   
  }).then(
    (guests) => {

      var guestTotals = 0;

      for (var i =0; i < guests.length; i++ ) {
        guestTotals += guests[i].entered;
      }
      
      return res.status(200).send({"responseData":`${guestTotals}`});
    }
  ).catch(err => {
    return res.status(400).send(err);
  });
});


router.put('/:qrcode', function (req,res) {  
  var qrcode = req.params.qrcode;
  db.Guest.findOne({
    where : {
      uid : qrcode
    }
  }).then (guest => {
    if (!guest) {
      throw new Error("Guest Not Found");
    } else if(guest.entered >= 1){
      throw new Error("Already Entered"); 
    }else{
      var guestChanged = db.Guest.build({uid:guest.uid,number:guest.number,entered:1}, {isNewRecord : false});
      return guestChanged.save();
    }
  }).then (guest => {
    return res.status(200).send({"responseData":"valid"});
  }).catch ( err => {
    if((err.toString()).includes("Not")){
      return res.status(200).send({"responseData":"invalid"});
    }else if((err.toString()).includes("Already")){
      return res.status(200).send({"responseData":"exists"});
    }else{
      return res.status(400).send(err);
    }
  });
});


module.exports = router;

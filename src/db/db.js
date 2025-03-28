 const mongoose = require('mongoose');

 function connect(){
     mongoose.connect("mongodb://localhost:27017/razorpay")
    .then(() => console.log("Connected to Razorpay database"))
    .catch((err) => console.error(err));
 }

 module.exports = connect;
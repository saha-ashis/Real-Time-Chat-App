const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err)=>{
    if(!err){
        console.log("Successfully connected to MongoDB");
    }else{
        console.log("There is an error in Mongo DB connection:" + JSON.stringify(err,undefined,2));
    }
});

require('./user.model');
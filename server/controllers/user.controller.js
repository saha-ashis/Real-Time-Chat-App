
const mongoose=require('mongoose');
const User=mongoose.model('User');
const passport=require('passport');
const lodash=require('lodash');

//User Registration or User SignUp Function
module.exports.register=(req,res,next)=>{
 console.log('I am inside the register function');
 var user=new User();
 user.username=req.body.username;
 user.name=req.body.name;
 user.email=req.body.email;
 user.password=req.body.password;
 user.save((err,doc)=>{
     if(!err)
        res.send(doc);
    else
        console.log(err);
        if (err.code == 11000){
            res.status(422).send(['Duplicate email adrress found.']);
            console.log('Duplicate email adrress found.');
        }
        else{
            return next(err);
        }
 })
}

module.exports.userAuthenticate=(req,res,next)=>{
    console.log('I am in user auth');
    //Call the passport authenticate
    passport.authenticate('local',(err,user,info)=>{
        // Error from Passport Middleware
        if(err){
            return res.status(400).json(err);
        }
        // Success Registered User
        else if(user){
            return res.status(200).json({ "token":user.generateJwt() }); // JWT token
        }
        // Unkown User or wrng password
        else{
            return res.status(400).json(info)
        }
    })(req,res)
}

module.exports.userProfiile=(req,res,next)=>{
    User.findOne({_id:req._id},
        (err,user)=>{
            if(!user){
                return res.status(404).json({ status:false, message:'User not found' });
            }else{
                return res.status(200).json({ status:true, user:lodash.pick(user,['username','name','email'])});
            }
        }
        )
}
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');

var User= mongoose.model('User');

passport.use(
    new localStrategy(
        {usernameField:'email'},
        (username, password, done)=>{
            User.findOne({email:username},
                (err,user)=>{
                    if(err){
                        return done(err);
                    }
                    // To check the Username
                    else if(!user){
                        return done(null,false,{message:'User is not registered with this email'});
                    }
                    //To check password
                     else if(!user.verifyPassword(password)){
                         return done(null, false, {message: 'You have entered a wrong password'});
                     }
                    //Success function
                    else{
                        return done(null,user);
                    }
                })
        })
    )
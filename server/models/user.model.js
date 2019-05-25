const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:"Please enter your name!"
    },
    email:{
        type:String,
        required:"Please enter your email!",
        unique:true
    },
    password:{
        type:String,
        required:"Please enter your password!",
        minlength:[6,"Password must be six character long!"]
    },
    saltSecret:String
});

//Email Custom Validation
userSchema.path('email').validate((val)=>{
    var emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegx.test(val);
},'Oops! The given email is invalid');

userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

userSchema.methods.generateJwt=function(){
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRT,
        {
            expiresIn:process.env.JWT_EXP_TIME
        });
}

//Register userSchema Object inside Mongoose
mongoose.model('User',userSchema);
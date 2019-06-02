require('./config/config');
require('./models/db');
require('./config/paassportConfig');

const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const socket = require('socket.io');

const routesIndex=require('./routers/index.router');

const app=express();

//Middleware

app.use(bodyParser.json());
app.use(cors());
app.use('/api',routesIndex);
app.use(passport.initialize());

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

const port=process.env.PORT;
const server=app.listen(port,()=>console.log(`App started at port ${port}...`));
const io=socket.listen(server);
io.on('connection',(socket)=>{
    console.log('New connection Made');
})
// io=io(server);
// app.use(function(req,res,next){
//     req.io=io;
//     next();
// });
// io.on('connection',function(socket){
//     console.log('socket.io connection made');
// });
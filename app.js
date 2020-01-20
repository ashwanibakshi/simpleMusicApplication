var express   = require('express');
var mongoose  = require('mongoose');
var bodyParser= require('body-parser');
var path      = require('path');


//connect to db
mongoose.connect('mongodb://localhost:27017/demooaudio',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((error)=>console.log('connection error',error));

var app = express();

//set the template engine
app.set('view engine','ejs');

//fetch dataa from the request
app.use(bodyParser.urlencoded({extended:false}));

//set the static folder path
app.use(express.static(path.join(__dirname,'public')));

//default page
app.get('/',(req,res)=>{
    res.redirect('/audio')
});

app.use('/audio',require('./routes/audio'));

//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at'+port));
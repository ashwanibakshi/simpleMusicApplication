var express = require('express');
var audioModel = require('../models/data');
var multer = require('multer');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

var upload = multer({storage:storage});

var router = express.Router();

router.get('/',(req,res)=>{
         audioModel.find((err,result)=>{
              if(err){
                  console.log(err);
              }else{
                  if(result){
                      res.render('home',{data:result});
                  }else{
                      res.render('home');
                  }
              }
         });
});

router.post('/',upload.single('audio'),(req,res)=>{
    var path = '/uploads/'+req.file.originalname;
   var audioo =  new audioModel({
       name:req.file.originalname,
       audio:path
   });
  audioo.save((err,result)=>{
       if(err){
           console.log(err)
       }else{
           res.redirect('/');
       }
   });
});

module.exports = router;
const express=require("express");
const router =express.Router();
var db=require('./config');


router.route('/register').post((req,res)=>
{
    var uid = req.body.uid;
    var username=req.body.username;
    var bio=req.body.bio;
    var email = req.body.email;
    var password=req.body.password;
    var phone=req.body.phone;


    //create query
    var sqlQuery="Insert into users(uid,username,bio,email,password,phone)values(?,?,?,?,?,?)"

db.query(sqlQuery,[uid,username,bio,email,password,phone],function(err,data,fields){
    if(err){
        res.send(JSON.stringify({sucess:false,message:err}));
    }else{
        res.send(JSON.stringify({sucess:true,message:data}));
    }
}
);

/*
{
"uid":"sadfssdfsdfsdfsd2",
"username":"username",
"bio":"bio",
"email":"email",
"password":"password",
"phone":"phone"
} */


});

router.route('/login').post((req,res)=>{

    var uusername=req.body.username;
    var ppassword=req.body.password;
    
    var sql ="SELECT * FROM users WHERE username=? AND  password=?";
    console.log(uusername);
    console.log(ppassword);
    db.query(sql,[uusername,ppassword], function(err,data,fields){
       if(err){
           res.send(JSON.stringify({sucess:false,message:err}));
       }else{
           if(data.length>0){
               res.send(JSON.stringify({sucess:true,message:data}));
           }else{
               res.send(JSON.stringify({sucess:false,message:'no user '}));
           }
          
       }
    });
});
module.exports=router;


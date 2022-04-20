const express=require("express");
const app=express();
const mysql = require('mysql');
const { connect } = require("./routes");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "chatapp",
});
connection.connect(function(err)  {
    if (err) throw err;
    console.log('MySql Connected');
});
module.exports=connection;
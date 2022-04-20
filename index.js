const express=require("express");
var http=require("http");
const mysql = require('mysql');
const app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extented:true}));
const cors = require('cors');
app.use(express.json());
const port = process.env.port||5000;
var server =http.createServer(app);
var io= require("socket.io")(server);
var db=require('./config');
const userRouter=require("./user");
app.use("/user",userRouter);


var clients={}

const routes=require("./routes");
app.use("/routes", routes);
app.use("/uploads",express.static("uploads"));


io.on("connection",(socket)=>{
    console.log("connected");
    console.log(socket.id,"has joined");
    socket.on("signin",(id)=>{
        console.log(id);
        clients[id]=socket;
        console.log(clients);

        //socket.id==uid in sql server
        //database.table('signup').withFields(["id","username","bio"])
    });
    socket.on("message",(msg)=>{
        console.log(msg);
        let targetId=msg.targetId;
        if(clients[targetId]) clients[targetId].emit("message",msg);
    });
});

app.use(cors({
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST","DELETE", "PUT"],
    credentials: true,
}));
server.listen(port,"0.0.0.0",()=>{
    console.log(`${port}server started`);
})






/*
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "chatapp",
});

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('MySql Connected');
});


app.get('/api/getusers', (req, res) => {
    db.query("SELECT * FROM signup", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.post('/api/setusers', (req, res) => {
    const uid = req.body.user.uid;
    const username=req.body.username;
    const bio=req.body.bio;
    db.query("Insert INTO signup (idsignup,signupusername,signupbio) values(?,?,?);",[uid],[username],[bio], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});*/
/*
app.put('/api/putusers', (req, res) => {
    db.query("Update signup set idsignup=socket.id,signupusername,signupbio)", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.delete('/api/setusers', (req, res) => {
    db.query("Insert INTO signup values (idsignup,signupusername,signupbio)", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});*/
/*
app.route("/check").get((req,res)=>{
    return res.json("your app is working fine")
});
*/
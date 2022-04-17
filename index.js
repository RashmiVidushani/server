const express=require("express");
var http=require("http");
const mysql = require('mysql');
const app=express();
const cors = require('cors');
const port = process.env.port||5000;
var server =http.createServer(app);
var io= require("socket.io")(server);
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "chatapp",
});

app.use(express.json());
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

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('MySql Connected');
});
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE", "PUT"],
    credentials: true,
}));
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
    db.query("Insert INTO signup values (idsignup,signupusername,signupbio)", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
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
server.listen(port,"0.0.0.0",()=>{
    console.log("server started");
})

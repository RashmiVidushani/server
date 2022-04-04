const express=require("express");
var http=require("http");
const app=express();
const port = process.env.port||5000;
var server =http.createServer(app);
var io= require("socket.io")(server);
app.use(express.json());
var clients={}
io.on("connection",(socket)=>{
    console.log("connected");
    console.log(socket.id,"has joined");
    socket.on("signin",(id)=>{
        console.log(id);
        clients[id]=socket;
        console.log(clients);
    });
    socket.on("message",(msg)=>{
        console.log(msg);
        let tartgetId=msg.tartgetId;
        if(clients[tartgetId])clients[tartgetId].emit("message",msg);
    });
});
server.listen(port,"0.0.0.0",()=>{
    console.log("server started");
})

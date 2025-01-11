import express from "express";
import { Server } from "socket.io";
import { createServer } from 'http';
import cors from 'cors';

const port = 3000;

const app = express();
const server = createServer(app);

app.use(cors({
    origin:"*",
    methods:["GET","POST"],
    credentials: true,
}));

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials: true,
    },
});

app.get("/",(req,res)=> {
    res.send("Hello World");
})

io.on("connection",(socket) => {
    console.log("User connected");
    console.log(`Socket ID : ${socket.id}`);

    // socket.emit("Welcome", `Welcome to the Server`);
    // socket.broadcast.emit("Welcome", `${socket.id} joined the server`);

})

server.listen(port,() => {
    console.log(`Server is running at port ${port}`);
})
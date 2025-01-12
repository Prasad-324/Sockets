import React, { useEffect, useState,useMemo } from "react";
import {io} from "socket.io-client";
import {Container, TextField, Typography} from "@mui/material";
import {Button} from '@mui/material';
const  App = () => {

  const socket = useMemo(()=>io("http://localhost:3000"),[]);

  const [message,setMessage] = useState("");
  const [room,setRoom] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message",{message,room});
    setRoom("");
  }

  useEffect(()=>{
    socket.on("connect",() =>{
      console.log("Connected", socket.id);
    })

    socket.on("receive-message", (data)=> {
      console.log(data);
    })


    socket.on("Welcome", (s)=> {
      console.log(s);
    })

    return () => {
      socket.disconnect();
    }

  },[]);

  return (
  <Container maxWidth="sm">
    <Typography>Welcome to Socket.io</Typography>

    <form onSubmit={handleSubmit}>
      <TextField value={message} onChange={ (e)=>setMessage(e.target.value)}>
      </TextField>
      <TextField label="Room" value={room} onChange={ (e)=>setRoom(e.target.value)}>
      </TextField>
      <Button type="submit">Send</Button>

    </form>
  </Container>
  );
}

export default App;

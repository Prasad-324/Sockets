import React, { useEffect } from "react";
import {io} from "socket.io-client";

const  App = () => {

  const socket = io("http://localhost:3000");

  useEffect(()=>{
    socket.on("connect",() =>{
      console.log("Connected", socket.id);
    })

    socket.on("Welcome", (s)=> {
      console.log(s);
    })
  },[]);

  return (
    <div className="App">
      "Hello World"
    </div>
  );
}

export default App;

import express from 'express';

const app=express();
const port = 5000;

app.get("/", (req,res)=> res.send("Hello world"));


app.listen(port,()=>console.log(`Server is listening on the port ${port}`))
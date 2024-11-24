import express from 'express';
import dotenv from 'dotenv';

const app = express();
const Port = process.env.PORT || 8000;

app.listen(Port,()=>{
    
    console.log(`server is running on port ${Port}`);
})



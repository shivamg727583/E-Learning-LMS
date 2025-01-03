import express from 'express';
import dotenv from 'dotenv';
dotenv.config({});
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './database/db.js';
import UserRoute from './routes/UserRouter.js';
import courseRoute from './routes/courseRoute.js';

const app = express();
const Port = process.env.PORT || 8000;
db();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));




app.get('/home',(_,res)=>{
    res.status(200).json({
        message: 'Welcome to home page',
        success:true
    });
});

// APIs
app.use('/api/v1/user',UserRoute);
app.use('/api/v1/course',courseRoute);

app.listen(Port,()=>{   
    console.log(`server is running on port ${Port}`);
})



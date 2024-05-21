import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'

dotenv.config();

mongoose.connect(process.env.MONGOOSE).then(()=>{
    console.log('mongoDB is connected')
}).catch((err)=>{
    console.log(err);
})



const app = express();

app.listen(4000,()=>{
    console.log('Server is running on 4000')
})

app.use('/api/user',userRoutes);
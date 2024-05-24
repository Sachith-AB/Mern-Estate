import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
       type:String,
       default: "https://static.vecteezy.com/system/resources/previews/002/387/693/non_2x/user-profile-icon-free-vector.jpg"
    }
},{timestamps:true});

const User= mongoose.model('User',userSchema);
export default User;
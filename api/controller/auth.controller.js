import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async(req,res,next)=>{
    
    

    const {username,email,password} = req.body;
    if(!username || !email || !password || username === '' || email=== '' || password === ''){
        next(errorHandler(400,'All fields are required'));
     }
     
    const hashedPassowrd=bcryptjs.hashSync(password,10)
    const newUser= new User({username,email,password:hashedPassowrd});

   

    try{
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error){
        next(error);
    }
}

export const signin=async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password|| email===''||password===''){
        next(errorHandler(400,'All field are required'))
       }

    try{
        const validUser = await User.findOne({email});
        
        if(!validUser){
            return next(errorHandler(404,'User not found'))
        }
        const validPassowrd = bcryptjs.compareSync(password,validUser.password);

        if(!validPassowrd){
            return next(errorHandler(401,'Password incorrect'))
        }

        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
         .cookie('access_token',token,{httpOnly:true})
         .status(200)
         .json(rest);
    }
    catch(error){
        next(error);
    }
}

export const google = async(req,res,next)=>{
    try{
        const user= await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            const {password:pass, ...rest} = user._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);
        }
        else{
            const genaratePassowrd = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassowrd = bcryptjs.hashSync(genaratePassowrd,10)
            const newUser = new User({username: req.body.name.split(" ").join(" ").toLowerCase() + Math.random().
            toString(36) , email: req.body.email, password:hashedPassowrd,avatar:req.body.photo});
            await newUser.save();

            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            const {password:pass, ...rest} = user._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);

        }
    }
    catch(error){

    }
}
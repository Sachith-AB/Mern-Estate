import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const create = async(req,res,next)=>{
    try{
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
        
    }
    catch(error){
        next(error)
    }
}

export const deletelisting = async(req,res,next)=>{

    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to delete this listing'));
    }

    try{
        await Listing.findByIdAndDelete(req.params.listingId);
        res.status(200).json({message:'Listing has been deleted'})

    }catch(error){
        next(error);
    }
}


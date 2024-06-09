import { verifyTokrn } from '../utils/verifyUset.js';
import { create, deletelisting, updateListing , getListings, getListing} from "../controller/listing.controllet.js";
import express from 'express'

const router = express.Router();

router.post('/create',verifyTokrn,create);
router.delete('/deletelisting/:listingId/:userId',verifyTokrn,deletelisting);
router.post('/editlisting/:listingId/:userId',verifyTokrn,updateListing);
router.get('/getlisting/:listingId',getListings)
router.get('/getlistings',getListing);


export default router;
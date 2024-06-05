import { verifyTokrn } from '../utils/verifyUset.js';
import { create, deletelisting, updateListing , getListings} from "../controller/listing.controllet.js";
import express from 'express'

const router = express.Router();

router.post('/create',verifyTokrn,create);
router.delete('/deletelisting/:listingId/:userId',verifyTokrn,deletelisting);
router.post('/editlisting/:listingId/:userId',verifyTokrn,updateListing);
router.get('/getlisting/:listingId',getListings)


export default router;
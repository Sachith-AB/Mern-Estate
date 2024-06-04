import { verifyTokrn } from '../utils/verifyUset.js';
import { create, deletelisting } from "../controller/listing.controllet.js";
import express from 'express'

const router = express.Router();

router.post('/create',verifyTokrn,create);
router.delete('/deletelisting/:listingId/:userId',verifyTokrn,deletelisting);


export default router;
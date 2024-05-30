import { verifyTokrn } from '../utils/verifyUset.js';
import { create } from "../controller/listing.controllet.js";
import express from 'express'

const router = express.Router();

router.post('/create',verifyTokrn,create);


export default router;
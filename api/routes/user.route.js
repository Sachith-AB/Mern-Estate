import express from 'express';
import { editUser, test } from '../controller/user.controller.js';
import { verifyTokrn } from '../utils/verifyUset.js';

const router= express.Router();

router.get('/test',test);
router.put('/update/:userId',verifyTokrn,editUser);


export default router;
import express from 'express';
import { signout, test, updateUser } from '../controller/user.controller.js';
import { verifyTokrn } from '../utils/verifyUset.js';

const router= express.Router();

router.get('/test',test);
router.put('/update/:userId',verifyTokrn,updateUser);
router.post('/signout',signout)


export default router;
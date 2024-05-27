import express from 'express';
import { deleteUser, signout, test, updateUser } from '../controller/user.controller.js';
import { verifyTokrn } from '../utils/verifyUset.js';

const router= express.Router();

router.get('/test',test);
router.put('/update/:userId',verifyTokrn,updateUser);
router.post('/signout',signout);
router.delete('/delete/:userId',verifyTokrn,deleteUser);


export default router;
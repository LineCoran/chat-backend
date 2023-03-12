import express from 'express';
import { getUser, getAllUser } from '../controllers/user.js';

const router = express.Router();

router.get('/:userId', getUser);
router.get('/', getAllUser);

export default router;
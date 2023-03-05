import express from 'express';
import { Like } from '../controllers/like.js';

const router = express.Router();

router.get('', Like);

export default router;
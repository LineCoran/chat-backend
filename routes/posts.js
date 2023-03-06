import express from 'express';
import { Post } from '../controllers/post.js';

const router = express.Router();

router.get('', Post);

export default router;
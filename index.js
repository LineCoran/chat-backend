import express  from 'express';
import mysql from 'mysql';
import userRouters from './routes/users.js';
import postRouters from './routes/posts.js';
import commentRouters from './routes/comments.js';
import likeRouters from './routes/likes.js';
import authRouters from './routes/auth.js';

const app = express();
const PORT = 4000;

app.use(express.json());

app.use('/users', userRouters);
app.use('/posts', postRouters);
app.use('/comments', commentRouters);
app.use('/likes', likeRouters);
app.use('/auth', authRouters);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));



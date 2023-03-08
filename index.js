import express  from 'express';
import mysql from 'mysql';
import userRouters from './routes/users.js';
import postRouters from './routes/posts.js';
import commentRouters from './routes/comments.js';
import likeRouters from './routes/likes.js';
import authRouters from './routes/auth.js';
import cors from "cors";
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();
const PORT = 4000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
})
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../chat/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});

const upload = multer({ storage: storage} );

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
})

app.use('/users', userRouters);
app.use('/posts', postRouters);
app.use('/comments', commentRouters);
app.use('/likes', likeRouters);
app.use('/auth', authRouters);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));



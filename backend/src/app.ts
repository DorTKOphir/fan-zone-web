import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import chatRoutes from './routes/chatRoutes';
import matchRoutes from './routes/matchRoutes';
import { setupSwagger } from './swagger/swagger';
import path from 'path';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/matches', matchRoutes);
app.use('/uploads/profile_pictures', express.static('uploads/profile_pictures'));
app.use('/uploads/post_images', express.static('uploads/post_images'));
app.use(express.static('front'));
app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '../../front', 'index.html')) });
setupSwagger(app);

export default app;

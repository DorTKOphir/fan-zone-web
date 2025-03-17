import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import chatRoutes from './routes/chatRoutes';
import { setupSwagger } from './swagger/swagger';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('./api/comments', commentRoutes);
app.use('./api/chat', chatRoutes);
setupSwagger(app);

export default app;

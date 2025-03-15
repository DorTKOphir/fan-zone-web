import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import matchRoutes from './routes/matchRoutes';
import { setupSwagger } from './swagger/swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('./api/comments', commentRoutes);
app.use('/api/matches', matchRoutes);
setupSwagger(app);

export default app;

import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import ChatGateway from './gateways/chatGateway';

const PORT = process.env.PORT ?? 5000;
const MONGO_URI = process.env.MONGO_URI;
const INITIAL_DELAY_MS = 2000;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*"} });
const chatGateway = new ChatGateway(io);

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1);
}

const connectWithRetry = async (delay = INITIAL_DELAY_MS) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');

    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(`MongoDB connection failed`, error);

    const nextDelay = Math.min(delay * 2, 30000);
    console.log(`Retrying in ${nextDelay / 1000} seconds...`);

    setTimeout(() => connectWithRetry(nextDelay), nextDelay);
  }
};

connectWithRetry();

export { chatGateway };
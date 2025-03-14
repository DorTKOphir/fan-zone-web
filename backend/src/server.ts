import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT ?? 5000;
const MONGO_URI = process.env.MONGO_URI;
const INITIAL_DELAY_MS = 2000;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1);
}

const connectWithRetry = async (delay = INITIAL_DELAY_MS) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(`MongoDB connection failed`, error);

    const nextDelay = Math.min(delay * 2, 30000);
    console.log(`Retrying in ${nextDelay / 1000} seconds...`);

    setTimeout(() => connectWithRetry(nextDelay), nextDelay);
  }
};

connectWithRetry();

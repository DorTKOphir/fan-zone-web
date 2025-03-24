import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

jest.spyOn(console, 'error').mockImplementation(() => {});

beforeAll(async () => {
	await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
	await mongoose.connection.close();
});

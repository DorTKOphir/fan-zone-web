import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Mock console errors to keep test output clean
jest.spyOn(console, 'error').mockImplementation(() => {});

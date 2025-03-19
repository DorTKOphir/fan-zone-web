import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

const MODEL_NAME = 'gemini-1.5-flash-8b';
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
	throw new Error('GOOGLE_API_KEY is not set in the environment.');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export async function getPostSuggestion(matchDetails: string): Promise<string> {
	const prompt = `Generate a post for a football match with the following details: ${matchDetails}`;

	try {
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();
		return text;
	} catch (error) {
		console.error('Error generating content:', error);
		throw error;
	}
}

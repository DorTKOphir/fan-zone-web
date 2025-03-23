import request from 'supertest';
import app from '../app';
import userModel from '../models/userModel';
import messageModel from '../models/messageModel';

describe('Chat API Tests', () => {
	let user1: any;
	let user2: any;
	let token: string;

	beforeAll(async () => {
		await userModel.collection.drop();
		await messageModel.collection.drop();

		await request(app).post('/api/auth/register').send({
			email: 'user1@example.com',
			username: 'user1',
			password: 'pass1234',
		});

		await request(app).post('/api/auth/register').send({
			email: 'user2@example.com',
			username: 'user2',
			password: 'pass1234',
		});

		user1 = await userModel.findOne({ username: 'user1' });
		user2 = await userModel.findOne({ username: 'user2' });

		const loginRes = await request(app).post('/api/auth/login').send({
			email: 'user1@example.com',
			password: 'pass1234',
		});

		token = loginRes.body.accessToken;
	});

	it('should send a message between users', async () => {
		const res = await request(app)
			.post('/api/chat/send')
			.set('Authorization', `Bearer ${token}`)
			.send({
				senderId: user1._id,
				receiverId: user2._id,
				content: 'Hello',
			});

		expect(res.status).toBe(201);
		expect(res.body.content).toBe('Hello');
		expect(res.body.sender).toBe(user1._id.toString());
		expect(res.body.receiver).toBe(user2._id.toString());
	});

	it('should fail to send a message with missing fields', async () => {
		const res = await request(app).post('/api/chat/send').send({
			senderId: user1._id,
			content: 'Missing receiver',
		});

    expect([400, 401, 404]).toContain(res.status);
	});

	it('should fetch chat history between two users', async () => {
		const res = await request(app)
  			.get(`/api/chat/history/${user1._id}/${user2._id}`)
  			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body[0]).toHaveProperty('content');
	});

	it('should return 404 for invalid user in chat history', async () => {
		const res = await request(app)
  			.get(`/api/chat/history/invalidId/${user2._id}`)
  			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toBe(404);
	});

	it('should fetch all chat users for a logged-in user', async () => {
		const res = await request(app).get('/api/chat/chats').set('Authorization', `Bearer ${token}`);

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body[0]).toHaveProperty('username');
	});
});

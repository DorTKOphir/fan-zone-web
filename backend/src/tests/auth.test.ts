import request from 'supertest';
import app from '../app';
import userModel from '../models/userModel';

describe('Auth API Tests', () => {
  beforeAll(async () => {
    await userModel.collection.drop();
  })

  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
  };

  let refreshToken = '';
  let accessToken = '';

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    expect(res.body.user.email).toBe(testUser.email);
  });

  it('should fail to register the same user again', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.status).toBe(500);
  });

  it('should login the user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');

    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it('should reject login with invalid password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });

    expect(res.status).toBe(401);
  });

  it('should refresh access token using refresh token', async () => {
    const res = await request(app).post('/api/auth/refresh').send({
      refreshToken,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });
  
  it('should reject refresh with invalid token', async () => {
    const res = await request(app).post('/api/auth/refresh').send({
      refreshToken: 'invalid-token',
    });

    expect(res.status).toBe(403);
  });
});

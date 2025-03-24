import request from 'supertest';
import path from 'path';
import app from '../app';
import userModel from '../models/userModel';

describe('User API Tests', () => {
  let user: any;
  let token: string;

  beforeAll(async () => {
    await userModel.collection.drop();

    await request(app).post('/api/auth/register').send({
      email: 'search@example.com',
      username: 'searchuser',
      password: 'search123',
    })

    user = await userModel.findOne({ username: 'searchuser' });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'search@example.com',
      password: 'search123',
    });

    token = loginRes.body.accessToken;
  });

  it('should return current user info', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(user.email);
    expect(res.body).not.toHaveProperty('password');
  });

  it('should update username and email', async () => {
    const res = await request(app)
      .patch('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'updatedUser', email: 'updated@example.com' });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('updatedUser');
    expect(res.body.email).toBe('updated@example.com');
  });

  it('should return 400 if no valid fields in update', async () => {
    const res = await request(app)
      .patch('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ invalid: 'field' });

    expect(res.status).toBe(400);
  });

  it('should search for users by username', async () => {
    const res = await request(app)
    .get('/api/users/search?usernameQuery=updated')
    .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 400 if no query provided in search', async () => {
    const res = await request(app)
      .get('/api/users/search')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
  });
});

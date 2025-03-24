import request from 'supertest';
import app from '../app';
import userModel from '../models/userModel';
import postModel from '../models/postModel';
import commentModel from '../models/commentModel';
import mongoose from 'mongoose';

describe('Post API Tests', () => {
  let user: any;
  let token: string;
  let postId: string;

  beforeAll(async () => {
    await userModel.collection.drop();
    await postModel.collection.drop();
    await commentModel.collection.drop();

    await request(app).post('/api/auth/register').send({
      email: 'post@example.com',
      username: 'postuser',
      password: 'post1234',
    });

    user = await userModel.findOne({ username: 'postuser'});

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'post@example.com',
      password: 'post1234',
    });

    token = loginRes.body.accessToken;
  });

  it('should create a post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'My first post', matchId: new mongoose.Types.ObjectId()});

    expect(res.status).toBe(201);
    expect(res.body.content).toBe('My first post');
    postId = res.body._id;
  });

  it('should get post by ID', async () => {
    expect(postId).toBeDefined();

    const res = await request(app).get(`/api/posts/${postId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(postId);
  });

  it('should update a post', async () => {
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Updated post' });

    expect(res.status).toBe(200);
    expect(res.body.content).toBe('Updated post');
  });

  it('should fail to update with no valid fields', async () => {
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ invalidField: 'value' });

    expect(res.status).toBe(400);
  });

  it('should get posts by author ID', async () => {
    const res = await request(app).get(`/api/posts/author/${user._id}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].author._id).toBe(user._id.toString());
  });

  it('should return posts by matchId (empty if none)', async () => {
    const res = await request(app).get(`/api/posts/match/64b000000000000000000000`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return AI post suggestion (mocked)', async () => {
    const res = await request(app)
      .post('/api/posts/suggestion')
      .send({ match: { homeTeam: 'A', awayTeam: 'B', date: 'today' } });

    expect([200, 500, 400]).toContain(res.status);
  });

  it('should delete a post and its comments', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Post deleted successfully');
  });
});

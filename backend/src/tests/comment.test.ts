import request from 'supertest';
import app from '../app';
import userModel from '../models/userModel';
import postModel from '../models/postModel';
import commentModel from '../models/commentModel';
import mongoose from 'mongoose';

describe('Comment API Tests', () => {
  let user: any;
  let token: string;
  let post: any;
  let commentId: string;

  beforeAll(async () => {
    await userModel.collection.drop();
    await postModel.collection.drop();
    await commentModel.collection.drop();

    await request(app).post('/api/auth/register').send({
      email: 'comment@example.com',
      username: 'commentUser',
      password: 'comment123',
    });

    user = await userModel.findOne({ username: 'commentUser' });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'comment@example.com',
      password: 'comment123',
    });

    token = loginRes.body.accessToken;

    // Create a post
    post = await postModel.create({
      author: user._id,
      content: 'Post for commenting',
      matchId: new mongoose.Types.ObjectId(),
      dateCreated: new Date(),
      comments: [],
    });
  });

  it('should create a comment on a post', async () => {
    const res = await request(app)
      .post(`/api/comments/${post._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Nice post!' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.content).toBe('Nice post!');
    commentId = res.body._id;
  });

  it('should fail to create a comment without content', async () => {
    const res = await request(app)
      .post(`/api/comments/${post._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
  });

  it('should update a comment', async () => {
    const res = await request(app)
      .patch(`/api/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Updated comment!' });

    expect(res.status).toBe(200);
    expect(res.body.content).toBe('Updated comment!');
  });

  it('should return 404 if comment not found during update', async () => {
    const res = await request(app)
      .patch(`/api/comments/123456789012345678901234`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Does not matter' });

    expect(res.status).toBe(404);
  });

  it('should delete a comment', async () => {
    const res = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Comment deleted successfully');
  });

  it('should return 404 when deleting non-existent comment', async () => {
    const res = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});

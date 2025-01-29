import request from 'supertest';
import app from '../../testServer'; // Import the Express test server
import mongoose from 'mongoose';
import dbConnect from './dbConnect';

describe('Auth API', () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user successfully', async () => {
    const res = await request(app) // Use `app` instead of calling `handler`
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(201);
  });

  it('should return 401 for invalid credentials', async () => {
    const res = await request(app) // Use `app` instead of calling `handler`
      .post('/api/login')
      .send({ email: 'nonexistent@example.com', password: 'password123' });

    expect(res.status).toBe(401);
  });
});

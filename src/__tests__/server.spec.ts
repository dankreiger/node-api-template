import request from 'supertest';
import { app } from '../server';
import { User } from '../resources/user/user.model';
import { newToken } from '../utils/auth/auth';
import mongoose from 'mongoose';

describe('API Authentication:', () => {
  let token = '';
  beforeEach(async () => {
    const user = await User.create({ email: 'a@a.com', password: 'hello' });
    token = newToken(user);
  });

  describe('api auth', () => {
    test('api should be locked down', async () => {
      let response = await request(app).get('/resources/item');
      expect(response.status).toBe(401);

      response = await request(app).get('/resources/list');
      expect(response.status).toBe(401);

      response = await request(app).get('/resources/user');
      expect(response.status).toBe(401);
    });

    test('passes with JWT', async () => {
      const jwt = `Bearer ${token}`;
      const id = mongoose.Types.ObjectId();
      const results = await Promise.all([
        request(app).get('/resources/item').set('Authorization', jwt),
        request(app).get(`/resources/item/${id}`).set('Authorization', jwt),
        request(app).post('/resources/item').set('Authorization', jwt),
        request(app).put(`/resources/item/${id}`).set('Authorization', jwt),
        request(app).delete(`/resources/item/${id}`).set('Authorization', jwt),
      ]);

      results.forEach((res) => expect(res.status).not.toBe(401));
    });
  });
});

import request from 'supertest';

import app from '../../src/app';

describe('Session', () => {
  it('should be able to admin authenticate if credentials is valid', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to admin authenticate if credentials is not valid', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: '123455',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to admin authenticate if user not found', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com.br',
        password: '123455',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });
});

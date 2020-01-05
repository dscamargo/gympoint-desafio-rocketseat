import request from 'supertest';

import Plan from '../../src/app/models/Plan';
import factories from '../factories';

import app from '../../src/app';

let token = '';

describe('Plan', () => {
  beforeEach(async () => {
    await Plan.sync({ force: true });

    const response = await request(app)
      .post('/sessions')
      .send({ email: 'admin@gympoint.com', password: '123456' });

    const { token: authToken } = response.body;

    token = authToken;
  });

  it('should be able to create plans if admin is authenticated', async () => {
    const data = await factories.attrs('Plan');
    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create plans if admin is not authenticated', async () => {
    const data = await factories.attrs('Plan');
    const response = await request(app)
      .post('/plans')
      .send(data);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to create plans if admin is any body data is not valid or empty', async () => {
    const data = await factories.attrs('Plan', {
      price: '',
    });
    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to list plans if admin is authenticated', async () => {
    const data = await factories.attrs('Plan');
    await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    const response = await request(app)
      .get('/plans')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBeGreaterThan(0);
  });

  it('should not be able to list plans if admin is not authenticated', async () => {
    const response = await request(app).get('/plans');

    expect(response.status).toBe(401);
  });

  it('should be able to list plan details if admin is authenticated and plan id is valid', async () => {
    const data = await factories.attrs('Plan');
    const plan = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    const response = await request(app)
      .get(`/plans/${plan.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to list plan details if admin is not authenticated', async () => {
    const data = await factories.attrs('Plan');
    const plan = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    const response = await request(app).get(`/plans/${plan.body.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to list plan details if plan is not found', async () => {
    const response = await request(app)
      .get(`/plans/1`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to update plan details if admin is authenticated', async () => {
    const data = await factories.attrs('Plan');
    const plan = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    const response = await request(app)
      .put(`/plans/${plan.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        duration: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to update plan details if admin is not authenticated', async () => {
    const data = await factories.attrs('Plan');
    const plan = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    const response = await request(app)
      .put(`/plans/${plan.body.id}`)
      .send({
        duration: 10,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to update plan details if any request body data is not valid or empty', async () => {
    const data = await factories.attrs('Plan');
    const plan = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    const response = await request(app)
      .put(`/plans/${plan.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        duration: '',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to update plan details if plan is not found', async () => {
    const response = await request(app)
      .put(`/plans/1`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        duration: 1,
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to remove plan if admin is authenticated', async () => {
    const data = await factories.attrs('Plan');
    const plan = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    const response = await request(app)
      .delete(`/plans/${plan.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

  it('should not be able to remove plan if plan is not founded', async () => {
    const response = await request(app)
      .delete(`/plans/1`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to remove plan if admin is not authenticated', async () => {
    const data = await factories.attrs('Plan');
    const plan = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(data);

    const response = await request(app).delete(`/plans/${plan.body.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
});

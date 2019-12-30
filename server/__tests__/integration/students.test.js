import request from 'supertest';

import factory from '../factories';

import app from '../../src/app';
import Student from '../../src/app/models/Student';

let authToken = '';

describe('Student', () => {
  beforeEach(async () => {
    await Student.sync({ force: true });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: '123456',
      });

    const { token } = response.body;

    authToken = token;
  });

  it('should be able to register a new student when admin is authenticated', async () => {
    const data = await factory.attrs('Student');
    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${authToken}`)
      .send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register a new student when admin is not authenticated', async () => {
    const data = await factory.attrs('Student');
    const response = await request(app)
      .post('/students')
      .send(data);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to register a new student when admin jwt token is not valid', async () => {
    const data = await factory.attrs('Student');
    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer abc`)
      .send(data);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to register a new student if data body is not valid', async () => {
    const data = await factory.attrs('Student', {
      height: 'abc',
    });
    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${authToken}`)
      .send(data);

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to list students when admin is authenticated', async () => {
    const data = await factory.attrs('Student');
    await Student.create(data);

    const response = await request(app)
      .get('/students')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBeGreaterThan(0);
  });

  it('should be able to list students when admin is authenticated and page, per_page, query is defined', async () => {
    const data = await factory.attrs('Student', {
      name: 'Tester',
    });
    const user = await factory.attrs('Student');
    await Student.create(data);
    await Student.create(user);

    const response = await request(app)
      .get(`/students?page=1&per_page=2&q=ster`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBeGreaterThan(0);
  });

  it('should not be able to list students when admin token is not provided', async () => {
    const user = await factory.attrs('Student');
    await Student.create(user);

    const response = await request(app).get(`/students`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to list students when admin token is malformed', async () => {
    const user = await factory.attrs('Student');
    await Student.create(user);

    const response = await request(app)
      .get(`/students`)
      .set('Authorization', `Bearer ${authToken.slice(0, 1)}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to update students when admin is authenticated', async () => {
    const data = await factory.attrs('Student');
    const user = await Student.create(data);

    const response = await request(app)
      .put(`/students/${user.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ height: 20 });

    expect(response.status).toBe(200);
    expect(response.body.height).toBe(20);
  });

  it('should not be able to update students when admin is not authenticated', async () => {
    const data = await factory.attrs('Student');
    const user = await Student.create(data);

    const response = await request(app)
      .put(`/students/${user.id}`)
      .send({ height: 20 });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to update students if student not found', async () => {
    const data = await factory.attrs('Student', { weight: 'abc' });
    const user = await Student.create(data);

    const response = await request(app)
      .put(`/students/${user.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(data);

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to update students if body data is not valid', async () => {
    const response = await request(app)
      .put(`/students/10`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ height: 20 });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to show student if authenticated and user id is valid', async () => {
    const data = await factory.attrs('Student');
    const user = await Student.create(data);

    const response = await request(app)
      .get(`/students/${user.id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to show student if user not found', async () => {
    const response = await request(app)
      .get(`/students/2`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to show student if admin is not authenticated', async () => {
    const data = await factory.attrs('Student');
    const user = await Student.create(data);

    const response = await request(app).get(`/students/${user.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to delete student if admin is authenticated and user was founded', async () => {
    const data = await factory.attrs('Student');
    const user = await Student.create(data);

    const response = await request(app)
      .delete(`/students/${user.id}`)
      .set('Authorization', `Bearer ${authToken}`);

    const show = await request(app)
      .get(`/students/${user.id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(show.status).toBe(422);
    expect(show.body).toHaveProperty('error');
  });

  it('should not be able to delete student if user was not founded', async () => {
    const response = await request(app)
      .delete(`/students/10`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });
});

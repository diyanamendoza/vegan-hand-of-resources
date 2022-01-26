const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cheese = require('../lib/models/Cheese');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a cheese', async () => {
    const res = await request(app)
      .post('/api/v1/cheeses')
      .send({ name: 'sample cheese', category: 'sample category', link: 'url' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'sample cheese',
      category: 'sample category', 
      link: 'url',
    });
  });

  it('should be able to list a cheese by id', async () => {
    const cheese = await Cheese.insert({ name: 'sample cheese', category: 'sample category', link: 'url' });
    const res = await request(app).get(`/api/v1/cheeses/${cheese.id}`);

    expect(res.body).toEqual(cheese);
  });

  it('should be able to list cheeses', async () => {
    await Cheese.insert({ name: 'sample cheese', category: 'sample category', link: 'url' });
    const res = await request(app).get('/api/v1/cheeses');

    expect(res.body).toEqual(expect.arrayContaining(
      [{
      id: expect.any(String),
      name: 'sample cheese',
      category: 'sample category', 
      link: 'url',
     }]
    ))
  });

  it('should be able to update a cheese', async () => {
    const cheese = await Cheese.insert({ name: 'sample cheese', category: 'sample category', link: 'url' });
    const res = await request(app)
      .patch(`/api/v1/cheeses/${cheese.id}`)
      .send({ name: 'sample cheese', category: 'edited category', link: 'url' });

    const expected = {
      id: expect.any(String),
      name: 'sample cheese',
      category: 'edited category',
      link: 'url'
    };

    expect(res.body).toEqual(expected);
    expect(await Cheese.getById(cheese.id)).toEqual(expected);
  });

  it('should be able to delete a cheese', async () => {
    const cheese = await Cheese.insert({ name: 'sample cheese', category: 'sample category', link: 'url' });
    const res = await request(app).delete(`/api/v1/cheeses/${cheese.id}`);

    expect(res.body).toEqual(cheese);
    expect(await Cheese.getById(cheese.id)).toBeNull();
  });
});


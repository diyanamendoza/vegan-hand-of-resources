const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dessert = require('../lib/models/Dessert');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a dessert', async () => {
    const res = await request(app)
      .post('/api/v1/desserts')
      .send({ name: 'sample dessert', category: 'sample category', link: 'url' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'sample dessert',
      category: 'sample category', 
      link: 'url',
    });
  });

  it('should be able to list a dessert by id', async () => {
    const dessert = await Dessert.insert({ name: 'sample dessert', category: 'sample category', link: 'url' });
    const res = await request(app).get(`/api/v1/desserts/${dessert.id}`);

    expect(res.body).toEqual(dessert);
  });

  it('should be able to list desserts', async () => {
    await Dessert.insert({ name: 'sample dessert', category: 'sample category', link: 'url' });
    const res = await request(app).get('/api/v1/desserts');

    expect(res.body).toEqual(expect.arrayContaining(
      [{
      id: expect.any(String),
      name: 'sample dessert',
      category: 'sample category', 
      link: 'url',
     }]
    ))
  });

  it('should be able to update a dessert', async () => {
    const dessert = await Dessert.insert({ name: 'sample dessert', category: 'sample category', link: 'url' });
    const res = await request(app)
      .patch(`/api/v1/desserts/${dessert.id}`)
      .send({ name: 'sample dessert', category: 'edited category', link: 'url' });

    const expected = {
      id: expect.any(String),
      name: 'sample dessert',
      category: 'edited category',
      link: 'url'
    };

    expect(res.body).toEqual(expected);
    expect(await Dessert.getById(dessert.id)).toEqual(expected);
  });

  it('should be able to delete a dessert', async () => {
    const dessert = await Dessert.insert({ name: 'sample dessert', category: 'sample category', link: 'url' });
    const res = await request(app).delete(`/api/v1/desserts/${dessert.id}`);

    expect(res.body).toEqual(dessert);
    expect(await Dessert.getById(dessert.id)).toBeNull();
  });
});


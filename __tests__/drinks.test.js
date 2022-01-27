const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Drink = require('../lib/models/Drink');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a drink', async () => {
    const res = await request(app)
      .post('/api/v1/drinks')
      .send({ name: 'sample drink', category: 'sample category', link: 'url' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'sample drink',
      category: 'sample category', 
      link: 'url',
    });
  });

  it('should be able to list a drink by id', async () => {
    const drink = await Drink.insert({ name: 'sample drink', category: 'sample category', link: 'url' });
    const res = await request(app).get(`/api/v1/drinks/${drink.id}`);

    expect(res.body).toEqual(drink);
  });

  it('should be able to list drinks', async () => {
    await Drink.insert({ name: 'sample drink', category: 'sample category', link: 'url' });
    const res = await request(app).get('/api/v1/drinks');

    expect(res.body).toEqual(expect.arrayContaining(
      [{
      id: expect.any(String),
      name: 'sample drink',
      category: 'sample category', 
      link: 'url',
     }]
    ))
  });

  it('should be able to update a drink', async () => {
    const drink = await Drink.insert({ name: 'sample drink', category: 'sample category', link: 'url' });
    const res = await request(app)
      .patch(`/api/v1/drinks/${drink.id}`)
      .send({ name: 'sample drink', category: 'edited category', link: 'url' });

    const expected = {
      id: expect.any(String),
      name: 'sample drink',
      category: 'edited category',
      link: 'url'
    };

    expect(res.body).toEqual(expected);
    expect(await Drink.getById(drink.id)).toEqual(expected);
  });

  it('should be able to delete a drink', async () => {
    const drink = await Drink.insert({ name: 'sample drink', category: 'sample category', link: 'url' });
    const res = await request(app).delete(`/api/v1/drinks/${drink.id}`);

    expect(res.body).toEqual(drink);
    expect(await Drink.getById(drink.id)).toBeNull();
  });
});


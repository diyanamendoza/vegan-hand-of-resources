const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Meal = require('../lib/models/Meal');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a meal', async () => {
    const res = await request(app)
      .post('/api/v1/meals')
      .send({ name: 'sample meal', category: 'sample category', link: 'url' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'sample meal',
      category: 'sample category', 
      link: 'url',
    });
  });

  it('should be able to list a meal by id', async () => {
    const meal = await Meal.insert({ name: 'sample meal', category: 'sample category', link: 'url' });
    const res = await request(app).get(`/api/v1/meals/${meal.id}`);

    expect(res.body).toEqual(meal);
  });

  it('should be able to list meals', async () => {
    await Meal.insert({ name: 'sample meal', category: 'sample category', link: 'url' });
    const res = await request(app).get('/api/v1/meals');

    expect(res.body).toEqual(expect.arrayContaining(
      [{
      id: expect.any(String),
      name: 'sample meal',
      category: 'sample category', 
      link: 'url',
     }]
    ))
  });

  it('should be able to update a meal', async () => {
    const meal = await Meal.insert({ name: 'sample meal', category: 'sample category', link: 'url' });
    const res = await request(app)
      .patch(`/api/v1/meals/${meal.id}`)
      .send({ name: 'sample meal', category: 'edited category', link: 'url' });

    const expected = {
      id: expect.any(String),
      name: 'sample meal',
      category: 'edited category',
      link: 'url'
    };

    expect(res.body).toEqual(expected);
    expect(await Meal.getById(meal.id)).toEqual(expected);
  });

  it('should be able to delete a meal', async () => {
    const meal = await Meal.insert({ name: 'sample meal', category: 'sample category', link: 'url' });
    const res = await request(app).delete(`/api/v1/meals/${meal.id}`);

    expect(res.body).toEqual(meal);
    expect(await Meal.getById(meal.id)).toBeNull();
  });
});


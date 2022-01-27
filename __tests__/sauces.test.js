const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Sauce = require('../lib/models/Sauce');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a sauce', async () => {
    const res = await request(app)
      .post('/api/v1/sauces')
      .send({ name: 'sample sauce', category: 'sample category', link: 'url' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'sample sauce',
      category: 'sample category', 
      link: 'url',
    });
  });

  it('should be able to list a sauce by id', async () => {
    const sauce = await Sauce.insert({ name: 'sample sauce', category: 'sample category', link: 'url' });
    const res = await request(app).get(`/api/v1/sauces/${sauce.id}`);

    expect(res.body).toEqual(sauce);
  });

  it('should be able to list sauces', async () => {
    await Sauce.insert({ name: 'sample sauce', category: 'sample category', link: 'url' });
    const res = await request(app).get('/api/v1/sauces');

    expect(res.body).toEqual(expect.arrayContaining(
      [{
      id: expect.any(String),
      name: 'sample sauce',
      category: 'sample category', 
      link: 'url',
     }]
    ))
  });

  it('should be able to update a sauce', async () => {
    const sauce = await Sauce.insert({ name: 'sample sauce', category: 'sample category', link: 'url' });
    const res = await request(app)
      .patch(`/api/v1/sauces/${sauce.id}`)
      .send({ name: 'sample sauce', category: 'edited category', link: 'url' });

    const expected = {
      id: expect.any(String),
      name: 'sample sauce',
      category: 'edited category',
      link: 'url'
    };

    expect(res.body).toEqual(expected);
    expect(await Sauce.getById(sauce.id)).toEqual(expected);
  });

  it('should be able to delete a sauce', async () => {
    const sauce = await Sauce.insert({ name: 'sample sauce', category: 'sample category', link: 'url' });
    const res = await request(app).delete(`/api/v1/sauces/${sauce.id}`);

    expect(res.body).toEqual(sauce);
    expect(await Sauce.getById(sauce.id)).toBeNull();
  });
});


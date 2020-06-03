const request = require('supertest');
const { getShips } = require('../src/space');

describe('Requisition test', () => {
  it('should test spacexApiReturn', async () => {
    const res = await getShips();
    expect(res.status).toEqual(200)
  });
});

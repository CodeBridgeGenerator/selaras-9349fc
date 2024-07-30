const assert = require('assert');
const app = require('../../src/app');

describe('\'contractor\' service', () => {
  it('registered the service', () => {
    const service = app.service('contractor');

    assert.ok(service, 'Registered the service (contractor)');
  });
});

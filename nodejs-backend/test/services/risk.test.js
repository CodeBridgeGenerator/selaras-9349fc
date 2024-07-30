const assert = require('assert');
const app = require('../../src/app');

describe('\'risk\' service', () => {
  it('registered the service', () => {
    const service = app.service('risk');

    assert.ok(service, 'Registered the service (risk)');
  });
});

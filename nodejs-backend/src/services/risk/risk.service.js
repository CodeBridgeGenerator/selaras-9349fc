const { Risk } = require('./risk.class');
const createModel = require('../../models/risk.model');
const hooks = require('./risk.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/risk', new Risk(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('risk');

  service.hooks(hooks);
};
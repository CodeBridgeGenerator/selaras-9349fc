const { Contractor } = require('./contractor.class');
const createModel = require('../../models/contractor.model');
const hooks = require('./contractor.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/contractor', new Contractor(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('contractor');

  service.hooks(hooks);
};
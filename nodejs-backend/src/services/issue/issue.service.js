const { Issue } = require('./issue.class');
const createModel = require('../../models/issue.model');
const hooks = require('./issue.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/issue', new Issue(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('issue');

  service.hooks(hooks);
};
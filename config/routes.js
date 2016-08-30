/**
 * Route Mappings
 */
const
  _ = require('lodash'),
  glob = require('glob'),
  path = require('path');

module.exports.routes = {

  'GET /ping': {
    controller: 'Ping',
    action: 'index',

    swagger: {
      methods: ['GET'],
      summary: 'ping app',
      description: 'check that the server is working',
      produces: ['application/json'],
      tags: ['Ping'],
      responses: {'200': {description: 'Server OK'}},
      parameters: []
    }
  },

  'GET /swagger/doc': 'Swagger.doc'

};

glob.sync('api/controllers/**/routes.js').forEach(function (file) {
  const dictioonary = require(path.resolve(file));
  _.each(dictioonary.routes, function (target, address) {
    if (module.exports.routes[address]) {
      throw new Error('la ruta (`' + address + '`) esta duplicada!');
    }
    module.exports.routes[address] = target;
  });
});

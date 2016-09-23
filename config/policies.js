/**
 * Policy Mappings
 */


module.exports.policies = {

  /*******************************************************************************
  * Default policy for all controllers and actions (`true` allows public access) *
  ********************************************************************************/

  '*': [
    'isAuthenticated'
  ],

  'user/AuthController': {
    '*': true
  },

  SwaggerController: {
    '*': true
  },

  ConductoresController: {
    '*': ['isAuthenticated', 'fiterByUser']
  },

  VehiculosController: {
    '*': ['isAuthenticated', 'fiterByUser']
  },

  CentralesController: {
    '*': ['isAuthenticated', 'fiterByUser']
  },

  RutasController: {
    '*': ['isAuthenticated', 'fiterByUser']
  }
};

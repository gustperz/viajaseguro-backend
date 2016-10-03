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
    '*': ['isAuthenticated', 'fiterByEmpresa']
  },

  VehiculosController: {
    '*': ['isAuthenticated', 'fiterByEmpresa']
  },

  CentralesController: {
    '*': ['isAuthenticated', 'fiterByEmpresa']
  },

  RutasController: {
    '*': ['isAuthenticated', 'fiterByCentral'],
    'create': ['isAuthenticated', 'fiterByEmpresa']
  },

  SolicitudesController: {
    '*': ['isAuthenticated', 'fiterByCentral']
  },
};

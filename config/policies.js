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

  ViajesController: {
    '*': ['isAuthenticated', 'fiterByEmpresa']
  },

  CentralesController: {
    '*': ['isAuthenticated', 'fiterByEmpresa']
  },

  RutasController: {
    'find': ['isAuthenticated', 'fiterByCentral'],
    '*': ['isAuthenticated', 'fiterByEmpresa']
  },

  SolicitudesController: {
    '*': ['isAuthenticated', 'fiterByCentral']
  },

  ViajesController: {
    '*': ['isAuthenticated', 'fiterByCentral']
  },
};

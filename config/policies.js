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
        'find': ['isAuthenticated', 'fiterByCentral'],
        'findOne': ['isAuthenticated', 'filterByConductor'],
        'findVehiculo': ['isAuthenticated', 'filterByConductor'],
        'saveImagen': ['isAuthenticated', 'filterByConductor'],
        'updateEstado': ['isAuthenticated', 'filterByConductor'],
        '*': ['isAuthenticated', 'filterByEmpresa'],
    },
    VehiculosController: {
        '*': ['isAuthenticated', 'filterByConductor']
    },
    VehiculosController: {
        '*': ['isAuthenticated', 'filterByEmpresa'],
    },

    ViajesController: {
        '*': ['isAuthenticated', 'filterByEmpresa'],
        'find': ['isAuthenticated', 'fiterByCentral']
    },

    CentralesController: {
        '*': ['isAuthenticated', 'filterByEmpresa']
    },

    RutasController: {
        'find': ['isAuthenticated', 'fiterByCentral'],
        '*': ['isAuthenticated', 'filterByEmpresa']
    },

    SolicitudesController: {
        '*': ['isAuthenticated', 'fiterByCentral']
    },

    ViajesController: {
        '*': ['isAuthenticated', 'fiterByCentral']
    },
};

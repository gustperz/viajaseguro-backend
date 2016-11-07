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

    ClientesController: {
        '*': true
    },

    ConductoresController: {
        '*': ['isAuthenticated', 'filterByEmpresa'],
        // 'find': ['isAuthenticated', 'fiterByCentral'],
        // 'findOne': ['isAuthenticated'],
        // 'findVehiculo': ['isAuthenticated'],
        // 'saveImagen': ['isAuthenticated'],
        // 'updateEstado': ['isAuthenticated'],
    },

    VehiculosController: {
        '*': ['isAuthenticated', 'filterByEmpresa'],
        'update': ['isAuthenticated'],
        'saveImagen': ['isAuthenticated']
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

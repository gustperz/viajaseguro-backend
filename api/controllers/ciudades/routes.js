/**
 * Created by Jose Soto Acosta on 16/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {
    'GET /ciudades': {
        action: 'find',
        model: 'municipios',
        nofields: true,

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas las centrales',
            tags: ['Ciudades'],
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /departamentos': {
        action: 'find',
        model: 'departamentos',
        nofields: true,

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas las centrales',
            tags: ['Ciudades'],
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
}

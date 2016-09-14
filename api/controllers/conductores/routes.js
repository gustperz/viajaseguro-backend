/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {
    'GET /conductores': {
        controller: 'Conductores',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas los conductores de una empresa',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
}

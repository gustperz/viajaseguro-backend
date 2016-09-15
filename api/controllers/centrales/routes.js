/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {
    'GET /centrales': {
        controller: 'Centrales',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas las centrales',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
}

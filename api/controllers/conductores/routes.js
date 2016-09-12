/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {
    'GET /empresas/:parentid/conductores': {
        controller: 'conductores/Conductores',
        action: 'populate',
        alias: 'conductores',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas los conductores de una empresa',
            tags: ['Condcutores'],
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
}

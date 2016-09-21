/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {
    'GET /clientes/:id': {
        controller: 'Clientes',
        action: 'findOne',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene un cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /clientes/:id': {
        controller: 'Clientes',
        action: 'update',

        swagger: {
            methods: ['GET'],
            summary: 'Actualiza un cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'DELETE /clientes/:id':{
        controller: 'Conductores',
        action: 'destroy',

        swagger: {
            methods: ['DELETE'],
            summary: 'Elimina un cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    }

}
